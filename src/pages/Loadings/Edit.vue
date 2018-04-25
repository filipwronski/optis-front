<template>
    <div class="loadings">
        <transition name="fade" mode="out-in">
            <div v-if="dataLoaded">
                <v-form v-model="valid">
                    <v-card wrap justify-end key="content">
                        <v-card-title>
                            <h2>Edytuj Załadunek</h2>
                            <v-spacer/>
                        </v-card-title>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex md6 class="px-1">
                                    <v-menu
                                            lazy
                                            :close-on-content-click="false"
                                            v-model="dateMenu"
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            :nudge-right="40"
                                            max-width="290px"
                                            min-width="290px"
                                    >
                                        <v-text-field
                                                slot="activator"
                                                label="Data załadunku"
                                                v-model="date"
                                                prepend-icon="event"
                                                readonly
                                        />
                                        <v-date-picker v-model="date" no-title scrollable actions>
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
                                    <v-select
                                            label="Kierowca"
                                            v-bind:items="employeeList"
                                            v-model="driver"
                                            item-text="text"
                                            item-value="value"
                                    />
                                </v-flex>
                                <v-flex md6 class="px-1">
                                    <v-select
                                            label="Samochód"
                                            v-bind:items="carList"
                                            v-model="car"
                                            item-text="text"
                                            item-value="value"
                                    />
                                </v-flex>
                                <v-flex md6 class="px-1">
                                    <v-select
                                            label="Kierownik załadunku"
                                            v-bind:items="employeeList"
                                            v-model="leader"
                                            item-text="text"
                                            item-value="value"
                                    />
                                </v-flex>
                                <v-flex md6 class="px-1">
                                    <v-select
                                            label="Event"
                                            v-bind:items="eventList"
                                            v-model="event"
                                            item-text="text"
                                            item-value="value"
                                    />
                                </v-flex>
                                <v-flex md6 class="px-1">
                                    <!--<v-select-->
                                    <!--label="Sprzęt"-->
                                    <!--v-bind:items="equipmentList"-->
                                    <!--item-text="text"-->
                                    <!--item-value="value"-->
                                    <!--v-model="equipment"-->
                                    <!--multiple-->
                                    <!--chips-->
                                    <!--persistent-hint-->
                                    <!--deletable-chips-->
                                    <!--@click.native="dialog = true"-->
                                    <!--/>-->
                                </v-flex>

                            </v-layout>

                        </v-card-text>
                    </v-card>
                    <br>
                    <v-card>
                        <v-card-text>
                            <v-layout row wrap center>
                                <v-flex md3 center class="px-1">
                                    <v-btn color="white" @click.native="dialog = true" light slot="activator">
                                        wybierz sprzęt
                                    </v-btn>
                                </v-flex>
                                <v-flex md3 class="px-1">
                                    <v-card-text>Liczba wybranych urządzeń: {{ selectedEquipmentNumber }}</v-card-text>
                                </v-flex>
                                <v-flex md3 class="px-1">
                                    <v-card-text>Waga wybranych urządzeń: {{ selectedEquipmentWeight }} kg</v-card-text>
                                </v-flex>
                                <v-flex md3 class="px-1">
                                    <v-card-text>Ładowność samochodu: {{ carMaxWeight }} kg</v-card-text>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                    <br>
                    <v-card>
                        <v-card-text>
                            <v-btn @click="submit">zapisz</v-btn>
                            <v-btn @click="clear" class="error">wyczyść</v-btn>
                        </v-card-text>
                    </v-card>
                    <v-layout row justify-center>
                        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
                            <v-card>
                                <v-tabs centered>
                                    <v-toolbar dark fixed color="primary">
                                        <v-btn icon @click.native="dialog = false" dark>
                                            <v-icon>close</v-icon>
                                        </v-btn>
                                        <v-tabs-bar>
                                            <v-tabs-slider color="white"></v-tabs-slider>
                                            <v-tabs-item
                                                    :href="'#tab-1'"
                                            >
                                                Oświetlenie
                                            </v-tabs-item>
                                            <v-tabs-item
                                                    :href="'#tab-2'"
                                            >
                                                Nagłośnienie
                                            </v-tabs-item>
                                        </v-tabs-bar>
                                        <v-toolbar-items>
                                            <v-btn dark flat @click="addEquipment" @click.native="dialog = false">Dodaj
                                                sprzęt
                                            </v-btn>
                                        </v-toolbar-items>
                                    </v-toolbar>
                                    <v-tabs-items>
                                        <v-tabs-content
                                                :id="'tab-1'"
                                                class="fixed-margin"
                                        >
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field
                                                            append-icon="search"
                                                            label="Szukaj"
                                                            single-line
                                                            hide-details
                                                            v-model="search"
                                                            item-key="id"
                                                    />
                                                    <!--<span v-for="item in lightEquipment">-->
                                                    <!--{{item.categoryName}}-->
                                                    <!--</span>-->
                                                    <v-data-table
                                                            v-bind:headers="headers"
                                                            v-bind:items="lightEquipment"
                                                            v-bind:search="search"
                                                            :rows-per-page-items="[10,50,100]"
                                                            v-model="selectedLight"
                                                            select-all
                                                    >
                                                        <template slot="items" slot-scope="props">
                                                            <td>
                                                                <v-checkbox
                                                                        primary
                                                                        hide-details
                                                                        v-model="props.selected"
                                                                />
                                                            </td>
                                                            <td class="text-xs-right">{{ props.item.producent }}</td>
                                                            <td class="text-xs-right">{{ props.item.model }}</td>
                                                            <td class="text-xs-right">{{ props.item.weight }} kg</td>
                                                            <td class="text-xs-right">{{ props.item.categoryName }}</td>
                                                        </template>
                                                        <template slot="pageText"
                                                                  slot-scope="{ pageStart, pageStop }">
                                                            From {{ pageStart }} to {{ pageStop }}
                                                        </template>
                                                    </v-data-table>
                                                </v-card-text>
                                            </v-card>
                                        </v-tabs-content>
                                        <v-tabs-content
                                                :id="'tab-2'"
                                                class="fixed-margin"
                                        >
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field
                                                            append-icon="search"
                                                            label="Szukaj"
                                                            single-line
                                                            hide-details
                                                            v-model="search"
                                                            item-key="id"
                                                    />
                                                    <!--<span v-for="item in lightEquipment">-->
                                                    <!--{{item.categoryName}}-->
                                                    <!--</span>-->
                                                    <v-data-table
                                                            v-bind:headers="headers"
                                                            v-bind:items="soundEquipment"
                                                            v-bind:search="search"
                                                            :rows-per-page-items="[10,50,100]"
                                                            v-model="selectedSound"
                                                            select-all
                                                    >
                                                        <template slot="items" slot-scope="props">
                                                            <td>
                                                                <v-checkbox
                                                                        primary
                                                                        hide-details
                                                                        v-model="props.selected"
                                                                />
                                                            </td>
                                                            <td class="text-xs-right">{{ props.item.producent }}</td>
                                                            <td class="text-xs-right">{{ props.item.model }}</td>
                                                            <td class="text-xs-right">{{ props.item.weight }} kg</td>
                                                            <td class="text-xs-right">{{ props.item.categoryName }}</td>
                                                        </template>
                                                        <template slot="pageText"
                                                                  slot-scope="{ pageStart, pageStop }">
                                                            From {{ pageStart }} to {{ pageStop }}
                                                        </template>
                                                    </v-data-table>
                                                </v-card-text>
                                            </v-card>
                                        </v-tabs-content>
                                    </v-tabs-items>
                                </v-tabs>
                            </v-card>
                        </v-dialog>
                    </v-layout>

                </v-form>
            </div>
            <div v-else class="loading-container" key="loader">
                <v-progress-circular indeterminate v-bind:size="70" v-bind:width="4" color="primary"/>
            </div>
        </transition>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'LoadingsEdit',
        data: () => ({
            valid: true,
            dateMenu: false,
            date: null,
            car: null,
            driver: null,
            leader: null,
            event: null,
            selectedEquipment: null,
            carList: null,
            employeeList: null,
            eventList: null,
            equipmentList: null,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            selectedLight: [],
            selectedSound: [],
            selectedEquipmentNumber: 0,
            selectedEquipmentWeight: 0,
            carMaxWeight: 0,
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 100 || 'Name must be less than 10 characters'
            ],
            headers: [
                {text: 'Producent', value: 'producent'},
                {text: 'Model', value: 'model'},
                {text: 'Waga', value: 'weight'},
                {text: 'Kategoria', value: 'categoryName'},
            ],
            search: null,

        }),
        methods: {
            addEquipment() {
                let self = this;
                this.selectedEquipmentWeight = 0;
                this.selectedEquipmentNumber = 0;
                this.selectedLight.forEach(function (item) {
                    self.selectedEquipmentWeight += item.weight;
                    self.selectedEquipmentNumber++;
                });
                this.selectedSound.forEach(function (item) {
                    self.selectedEquipmentWeight += item.weight;
                    self.selectedEquipmentNumber++;
                });
            },
            getCarList() {
                let self = this;
                axios({
                    method: 'get',
                    url: this.backendUrl +'cars/list',
                    headers: {'Authorization': 'Bearer ' + self.$store.state.accessToken}
                })
                    .then(function (response) {

                        if (response.status === 200) {
                            self.carList = [];
                            let cars = JSON.parse(response.data);
                            cars.forEach(function (item) {
                                self.carList.push(
                                    {
                                        text: item.name,
                                        value: item.id,
                                        maxWeight: item.maxLoadingWeight
                                    }
                                )
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getEmployeeList() {
                let self = this;
                axios({
                    method: 'get',
                    url: this.backendUrl + 'employees/list',
                    headers: {'Authorization': 'Bearer ' + self.$store.state.accessToken}
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            self.employeeList = [];
                            let employees = JSON.parse(response.data);
                            employees.forEach(function (item) {
                                self.employeeList.push(
                                    {
                                        text: item.name + ' ' + item.surname,
                                        value: item.id
                                    }
                                )
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getEventList() {
                let self = this;
                axios({
                    method: 'get',
                    url: this.backendUrl + 'events/list',
                    headers: {'Authorization': 'Bearer ' + self.$store.state.accessToken}
                })
                    .then(function (response) {

                        if (response.status === 200) {
                            self.eventList = [];
                            let events = JSON.parse(response.data);
                            events.forEach(function (item) {
                                self.eventList.push(
                                    {
                                        text: item.name + ' - ' + self.$options.filters.formatDate(item.startDate),
                                        value: item.id
                                    }
                                )
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getEquipmentList() {
                let self = this;
                axios({
                    method: 'get',
                    url: this.backendUrl +'equipment/list',
                    headers: {'Authorization': 'Bearer ' + self.$store.state.accessToken}
                })
                    .then(function (response) {

                        if (response.status === 200) {
                            self.equipmentList = JSON.parse(response.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getLoadingFormData() {
                this.getEmployeeList();
                this.getEventList();
                this.getEquipmentList();
                this.getCarList();
            },
            createSelectList() {

            },
            submit() {
                let equipment = [];
                this.selectedLight.forEach(function (item) {
                    equipment.push(item.id);
                });
                this.selectedSound.forEach(function (item) {
                    equipment.push(item.id);
                });
                let self = this;
                axios({
                    method: 'post',
                    url: this.backendUrl + 'loadings',
                    headers: {
                        'Authorization': 'Bearer ' + self.$store.state.accessToken,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        id: 1,
                        date: this.date,
                        driver: this.driver,
                        car: this.car,
                        leader: this.leader,
                        event: this.event,
                        equipment: equipment
                    }
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log(response);
                            self.$store.commit('setAlert',
                                {
                                    type: 'success',
                                    text: 'Dodano załadunek: ' + self.name
                                }
                            );
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            },

            getLoading() {
                let self = this;
                axios({
                    method: 'get',
                    url: this.backendUrl + 'loadings/' + self.$route.params.id,
                    headers: {'Authorization': 'Bearer ' + self.$store.state.accessToken}
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            let loading = JSON.parse(response.data);
                            console.log(loading);
                            self.date = self.$options.filters.formatDate(loading.date);
                            self.driver = loading.driver;
                            self.car = loading.car;
                            self.leader = loading.leader;
                            self.event = loading.event;
                            loading.equipment.forEach(function(item) {
                                self.selectedLight.push({id: item})
                            });
                            self.selectedSound = self.selectedLight;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        self.handleError(error.response);
                    });
            },

            clear() {

            },
            getMaxWeight() {
                console.log('change');
                let self = this;
                self.carList.forEach(function (el) {
                    if (el.value === self.car) {
                        console.log(el);
                        self.carMaxWeight = el.maxWeight;
                    }
                });

            }
        },
        computed: {
            dataLoaded: function () {
                return (this.carList && this.eventList && this.employeeList && this.equipmentList);
            },
            lightEquipment() {
                let tempList = this.equipmentList;
                return tempList.filter(function (el) {
                    return el.categoryName === "Oświetlenie";
                });
            },
            soundEquipment() {
                let tempList = this.equipmentList;
                return tempList.filter(function (el) {
                    return el.categoryName === "Nagłośnienie";
                });
            },
        },
        mounted: function () {
            this.getLoadingFormData();
            this.getLoading();
        },
        watch: {
            'car': function () {
                this.getMaxWeight()
            }
        }
    }
</script>
<style>

</style>