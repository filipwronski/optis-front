<template>
    <v-layout wrap justify-end align-right>
        <v-layout wrap justify-end>
            <v-btn @click.stop="drawer = !drawer"  small dark fab color="grey darken-3">
                <v-icon dark>account_circle</v-icon>
            </v-btn>
        </v-layout>
        <v-navigation-drawer
                temporary
                v-model="drawer"
                dark
                absolute
                right
                fixed
        >
            <v-list class="pt-0">
                <v-list-tile avatar class="grey darken-4">
                    <v-list-tile-action @click.stop="drawer = !drawer">
                        <v-icon>account_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Filip Wroński</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile >
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Moje konto</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="logout">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Wyloguj</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<script>
    export default {
        name: 'NavigationAccount',
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