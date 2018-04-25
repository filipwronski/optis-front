<template>
    <div class="equipment">
        <v-card wrap justify-end>
            <v-card-title>
                <h2>Dodaj sprzęt</h2>
                <v-spacer/>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-layout row wrap>
                        <v-flex md6 class="px-1">
                            <v-text-field
                                    label="Producent"
                                    v-model="producent"
                                    :rules="nameRules"
                                    required
                            />
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-text-field
                                    label="Model"
                                    v-model="model"
                                    :rules="nameRules"
                                    required
                            />
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-select
                                    label="Magazyn"
                                    v-bind:items="warehouseList"
                                    item-text="item-text"
                                    item-value="item-value"
                                    v-model="warehouse"
                                    multiple
                                    chips
                                    persistent-hint
                                    deletable-chips
                            />
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-select
                                    label="Kategoria"
                                    v-bind:items="categoryList"
                                    item-text="item-text"
                                    item-value="item-value"
                                    v-model="category"
                                    multiple
                                    chips
                                    persistent-hint
                                    deletable-chips
                            />
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-text-field
                                    label="Ilość"
                                    v-model="count"
                                    type="number"
                                    :rules="nameRules"
                                    required
                                    suffix="szt."
                            />
                        </v-flex>
                        <v-flex md6 class="px-1">
                            <v-text-field
                                    label="Waga"
                                    v-model="weight"
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
        name: 'EquipmentAdd',
        data: () => ({
            valid: true,
            producent: '',
            model: '',
            warehouse: [],
            category: [],
            count: '',
            weight: '',
            warehouseList: [
                {
                    'item-value': 1,
                    'item-text': "Światło"
                },
                {
                    'item-value': 2,
                    'item-text': "Nagłośnienie"
                }
            ],
            categoryList: [
                {
                    'item-value': 1,
                    'item-text': "Światło"
                },
                {
                    'item-value': 2,
                    'item-text': "Nagłośnienie"
                }
            ],
            loginRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
            ],
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 100 || 'Name must be less than 100 characters'
            ],
        }),
        methods: {
            submit() {
                let self = this;
                axios({
                    method: 'post',
                    url: this.backendUrl + 'equipment',
                    headers: {
                        'Authorization': 'Bearer ' + self.$store.state.accessToken,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        producent: this.producent,
                        model: this.model,
                        warehouse: this.warehouse,
                        category: this.category,
                        count: this.count,
                        weight: this.weight
                    }
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log(response);
                            self.$store.commit('setAlert',
                                {
                                    type: 'success',
                                    text: 'Dodano urządzenie: '+ self.producent + ' ' + self.model
                                }
                            );
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            },
            clear() {
                this.producent = '';
                this.model = '';
                this.warehouse = [];
                this.category = [];
                this.count = '';
                this.weight = '';
            }
        },
        computed: {},
        watch: {}
    }
</script>
<style lang="scss">
    .chip__close {
        color: #212121 !important;
    }
</style>