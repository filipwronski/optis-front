<template>
    <div class="events">
        <v-form v-model="valid">
            <v-card wrap justify-end>
                <v-card-title>
                    <h2>Dodaj Event</h2>
                    <v-spacer/>
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex md12 class="px-1">
                            <h3>Opis</h3>
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-text-field
                                    label="Nazwa"
                                    v-model="name"
                                    :rules="nameRules"
                                    required
                            />
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-select
                                    label="Typ"
                                    v-bind:items="eventTypeList"
                                    v-model="type"
                            />
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-menu
                                    lazy
                                    :close-on-content-click="false"
                                    v-model="startMenu"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    :nudge-right="40"
                                    max-width="290px"
                                    min-width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        label="Data rozpoczęcia"
                                        v-model="startDate"
                                        prepend-icon="event"
                                        readonly
                                />
                                <v-date-picker v-model="startDate" no-title scrollable actions>
                                    <template slot-scope="{ save, cancel }">
                                        <v-card-actions>
                                            <v-spacer/>
                                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="save">OK</v-btn>
                                        </v-card-actions>
                                    </template>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-menu
                                    lazy
                                    :close-on-content-click="false"
                                    v-model="endMenu"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    :nudge-right="40"
                                    max-width="290px"
                                    min-width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        label="Data zakończenia"
                                        v-model="endDate"
                                        prepend-icon="event"
                                        readonly
                                />
                                <v-date-picker v-model="endDate" no-title scrollable actions>
                                    <template slot-scope="{ save, cancel }">
                                        <v-card-actions>
                                            <v-spacer/>
                                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="save">OK</v-btn>
                                        </v-card-actions>
                                    </template>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
            <br>
            <v-card wrap justify-end>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex md12 class="px-1">
                            <h3>Adres</h3>
                        </v-flex>
                    <v-flex md6 class="px-1">
                        <br>
                        <v-text-field
                                label="Miejscowość"
                                v-model="city"
                                :rules="nameRules"
                                required
                        />
                        <v-text-field
                                label="Kod pocztowy"
                                v-model="postCode"
                                :rules="nameRules"
                                required
                        />
                        <v-text-field
                                label="Ulica"
                                v-model="street"
                                :rules="nameRules"
                                required=""
                        />
                        <v-text-field
                                label="Województwo"
                                v-model="voivodeship"
                                :rules="nameRules"
                                required
                        />
                        <v-text-field
                                label="Długość geograficzna"
                                v-model="lat"
                                disabled
                        />
                        <v-text-field
                                label="Szerokość geograficzna"
                                v-model="lng"
                                disabled
                        />
                    </v-flex>
                    <v-flex md6 class="px-1">
                        <v-checkbox v-bind:label="`Nadpisz adres po ustawieniu punktu na mapie`" v-model="mapAddress" dark></v-checkbox>
                        <google-map
                                name="test"
                                @markerChange="getMarkerData"
                        ></google-map>
                    </v-flex>
                    <v-divider/>

                    </v-layout>
                </v-card-text>
            </v-card>
            <br>
            <v-btn @click="submit">Dodaj</v-btn>
            <v-btn @click="clear">Wyczyść</v-btn>
        </v-form>

    </div>
</template>
<script>
    import axios from 'axios';
    import GoogleMap from '@/components/GoogleMap'

    export default {
        name: 'CarsAdd',
        components: {GoogleMap},
        data: () => ({
            mapAddress: false,
            valid: true,
            date: null,
            endMenu: false,
            startMenu: false,
            name: '',
            city: '',
            postCode: '',
            street: '',
            startDate: '',
            endDate: '',
            type: '',
            voivodeship: '',
            lat: '',
            lng: '',
            eventTypeList: [
                'Impreza plenerowa', 'Impreza w hotelu', 'Sala koncertowa', 'Festiwal'
            ],
            loginRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 100 || 'Name must be less than 10 characters'
            ],
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 100 || 'Name must be less than 10 characters'
            ],

        }),
        methods: {
            getMarkerData(markerData) {
                this.lat = markerData.lat;
                this.lng = markerData.lng;
                if(this.mapAddress) {
                    this.city = markerData.city;
                    this.street = markerData.street;
                    this.postCode = markerData.postCode;
                    this.voivodeship = markerData.voivodeship;
                }

            },
            submit() {
                let self = this;
                axios({
                    method: 'post',
                    url: this.backendUrl + 'events',
                    headers: {
                        'Authorization': 'Bearer ' + self.$store.state.accessToken,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        name: this.name,
                        city: this.city,
                        post_code: this.postCode,
                        street: this.street,
                        voivodeship: this.voivodeship,
                        start_date: this.startDate,
                        end_date: this.endDate,
                        type: this.type
                    }
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log(response);
                            self.$store.commit('setAlert',
                                {
                                    type: 'success',
                                    text: 'Dodano event: ' + self.name
                                }
                            );
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            },
            clear() {

            }
        },
        computed: {},
    }
</script>
<style>

</style>