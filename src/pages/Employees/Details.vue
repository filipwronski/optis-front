<template>
    <div class="cars">
        <v-card wrap justify-end>
            <v-card-title>
                <h2>Szczegóły samochodu</h2>
                <v-spacer/>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-layout row wrap>
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
                                    v-bind:items="carTypeList"
                                    v-model="carType"
                            />
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-menu
                                    lazy
                                    :close-on-content-click="false"
                                    v-model="reviewMenu"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    :nudge-right="40"
                                    max-width="290px"
                                    min-width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        label="Data ostatniego przeglądu"
                                        v-model="carReviewDate"
                                        prepend-icon="event"
                                        readonly
                                />
                                <v-date-picker v-model="carReviewDate" no-title scrollable actions>
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
                                    v-model="insuranceMenu"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    :nudge-right="40"
                                    max-width="290px"
                                    min-width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        label="Data ostatniego ubezpieczenia"
                                        v-model="carInsuranceDate"
                                        prepend-icon="event"
                                        readonly
                                />
                                <v-date-picker v-model="carInsuranceDate" no-title scrollable actions>
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
                            <v-text-field
                                    label="Liczba miejsc siedzących"
                                    v-model="placeNumber"
                                    type="number"
                                    :rules="nameRules"
                                    required
                                    suffix="szt."
                            />
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-text-field
                                    label="Maksymalna waga ładunku"
                                    v-model="maxLoadingWeight"
                                    type="number"
                                    :rules="nameRules"
                                    required
                                    suffix="kg"
                            />
                        </v-flex>
                    </v-layout>
                    <v-btn @click="submit">Dodaj</v-btn>
                    <v-btn @click="clear">Wyczyść</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'CarsDetails',
        data: () => ({
            valid: true,
            date: null,
            reviewMenu: false,
            insuranceMenu: false,
            name: '',
            carType: '',
            carReviewDate: '',
            carInsuranceDate: '',
            placeNumber: '',
            maxLoadingWeight: '',
            carTypeList: [
                'Ciężarowy', 'Osobowy', 'Bus', 'TIR', 'Przyczepa'
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
            submit() {
                let self = this;
                axios({
                    method: 'post',
                    url: this.backendUrl + 'cars',
                    headers: {
                        'Authorization': 'Bearer ' + self.$store.state.accessToken,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        id: 1,
                        name: this.name,
                        type: this.carType,
                        car_review_date: this.carReviewDate,
                        car_insurance_date: this.carInsuranceDate,
                        place_number: this.placeNumber,
                        max_loading_weight: this.maxLoadingWeight
                    }
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log(response);
                            self.$store.commit('setAlert',
                                {
                                    type: 'success',
                                    text: 'Dodano samochód: '+ self.name
                                }
                            );
                        }
                    })
                    .catch(error => {
                        self.handleError(error.response);
                    });
            },
            clear() {

            }
        },
        computed: {
        },
        watch: {
        }
    }
</script>
<style>

</style>