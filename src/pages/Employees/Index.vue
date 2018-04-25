<template>
    <div class="employees">
        <transition name="fade" mode="out-in">
            <v-card wrap justify-end v-if="dataLoaded" key="content">
                <v-card-title>
                    <h2>Pracownicy</h2>
                    <v-spacer/>
                    <v-text-field
                            append-icon="search"
                            label="Szukaj"
                            single-line
                            hide-details
                            v-model="search"
                    />
                </v-card-title>
                <v-data-table
                        v-bind:headers="headers"
                        v-bind:items="items"
                        v-bind:search="search"
                        :rows-per-page-items="[10,50,100]"
                >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-right">{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.surname }}</td>
                        <td class="text-xs-right">{{ props.item.username }}</td>
                        <td class="text-xs-right">{{ props.item.phonenumber }}</td>
                        <td class="text-xs-right">{{ props.item.email }}</td>
                        <td class="text-xs-right">{{ props.item.position}}</td>
                        <td class="text-xs-right">
                            <span>
                                <v-icon @click="remove(props.item.id, props.item.name)" class="button-icon" color="white">delete_forever</v-icon>
                            </span>
                            <span>
                                <router-link :to="{name:'EmployeesEdit',  params: { id: props.item.id }}" >
                                    <v-icon class="button-icon" color="white">build</v-icon>
                                </router-link>
                            </span>
                            <span>
                                <router-link :to="{name:'EmployeesDetails',  params: { id: props.item.id }}" >
                                    <v-icon class="button-icon" color="white">description</v-icon>
                                </router-link>
                            </span>
                        </td>
                    </template>
                    <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                        From {{ pageStart }} to {{ pageStop }}
                    </template>
                </v-data-table>
            </v-card>
            <div v-else class="loading-container" key="loader">
                <v-progress-circular indeterminate v-bind:size="70" v-bind:width="4" color="primary"/>
            </div>
        </transition>
        <v-dialog v-model="dialog" max-width="320">
            <v-card>
                <v-card-title><h3>Potwierdź</h3></v-card-title>
                <v-card-text>Czy napewno chcesz usunąc użytkownika? {{deleteItemName}}?</v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="rejectDelete">Anuluj</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="confirmDelete">Usuń</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>

    import axios from 'axios';

    export default {
        name: 'EquipmentIndex',
        data: () => ({
            dataLoaded: false,
            max25chars: (v) => v.length <= 25 || 'Input too long!',
            deleteItemName: '',
            deleteItemId: '',
            dialog: false,
            tmp: '',
            search: '',
            pagination: {},
            headers: [
                {text: 'Imię', value: 'name'},
                {text: 'Nazwisko', value: 'username'},
                {text: 'Nazawa użytkownika', value: 'surname'},
                {text: 'Numer telefonu', value: 'phonenumber'},
                {text: 'E-mail', value: 'email'},
                {text: 'Stanowisko', value: 'position'},
            ],
            items: []
        }),
        mounted: function () {
            this.getCars();
        },
        methods: {
            getCars() {
                let self = this;
                axios({
                    method: 'get',
                    url: this.backendUrl + 'employee',
                    headers: {'Authorization': 'Bearer ' + self.$store.state.accessToken}
                })
                    .then(function (response) {

                        if (response.status === 200) {
                            self.items = JSON.parse(response.data);
                            self.dataLoaded = true;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            remove(id, name) {
                this.deleteItemName = name;
                this.deleteItemId = id;
                this.dialog = true;
            },
            confirmDelete() {
                let self = this;
                axios({
                    method: 'delete',
                    url: this.backendUrl + 'employee/' + self.deleteItemId,
                    headers: {'Authorization': 'Bearer ' + self.$store.state.accessToken},
                }).then(function (response) {
                    if (response.status === 200) {
                        self.removeDeletedById(self.deleteItemId);
                        self.deleteItemId = '';
                        self.deleteItemName = '';
                        self.$store.commit('setAlert',
                            {
                                type: 'success',
                                text: 'Użytkownik usunięty pomyślnie'
                            }
                        );
                    }
                })
                    .catch(error => {
                        console.log(error);
                    });
                self.dialog = false;
            },
            removeDeletedById(id) {
                let self = this;
                for (let i = 0; i < self.items.length; i++) {
                    if (self.items[i].id === id) {
                        console.log(i);
                        self.items.splice(i, 1);
                        break;
                    }
                }
            },
            rejectDelete() {
                this.deleteItemId = '';
                this.deleteItemName = '';
                this.dialog = false;
            }
        },
        computed: {},
        watch: {}
    }
</script>
<style>

</style>