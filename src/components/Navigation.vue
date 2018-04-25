<template>
    <v-navigation-drawer clipped fixed v-model="drawer" app>
        <v-list dense>
            <v-list-tile :to="{name:'Loadings'}">
                <v-list-tile-action>
                    <v-icon>dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Załadunki</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name:'LoadingsAdd'}">
                <v-list-tile-action>
                    <v-icon>add</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Nowy Załadunek</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile :to="{name:'Events'}">
                <v-list-tile-action>
                    <v-icon>event</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Eventy</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name:'EventsAdd'}">
                <v-list-tile-action>
                    <v-icon>add</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Dodaj Event</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile :to="{name:'Equipment'}">
                <v-list-tile-action>
                    <v-icon>widgets</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Sprzęt</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name:'EquipmentAdd'}">
                <v-list-tile-action>
                    <v-icon>add</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Dodaj Sprzęt</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile :to="{name:'Cars'}">
                <v-list-tile-action>
                    <v-icon>local_shipping
                    </v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Samochody</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name:'CarsAdd'}">
                <v-list-tile-action>
                    <v-icon>add</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Dodaj Samochód</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile :to="{name:'Employees'}">
                <v-list-tile-action>
                    <v-icon>people</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Pracownicy</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name:'EmployeesAdd'}">
                <v-list-tile-action>
                    <v-icon>add</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Dodaj Pracownika</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'Navigation',
        components: {},
        data: () => ({
            drawer: null
        }),
        methods: {
            logout() {
                this.$store.commit('logout');
            }
        }
    }
</script>
<style>

</style>