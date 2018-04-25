<template>
    <v-app id="app" dark>
        <alerts/>
        <div v-if="logged" transition="slide-y-transition">
            <navigation/>
            <v-toolbar app fixed clipped-left>
                <v-toolbar-title>Optis CRM</v-toolbar-title>
                <navigation-account/>
            </v-toolbar>
            <v-content>
                <v-container fluid fill-height>
                    <v-layout>
                        <transition name="fade" mode="out-in">
                            <router-view/>
                        </transition>
                    </v-layout>
                </v-container>
            </v-content>
            <v-footer app fixed>
                <span>&copy; Filip Wroński 2018</span>
            </v-footer>
        </div>
        <v-layout dark fill-height v-else>
            <login/>
        </v-layout>

    </v-app>
</template>

<script>
    import Navigation from '@/components/Navigation'
    import Login from '@/components/Login'
    import Alerts from '@/components/Alerts'
    import NavigationAccount from '@/components/NavigationAccount'

    export default {
        name: 'app',
        components: {Navigation, Login, Alerts, NavigationAccount},
        data: () => ({
        }),
        mounted: function () {
        },
        methods: {
            getCookie(cname) {
                let name = cname + "=";
                let ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }
            // logged: function () {
            //     return this.$store.state.logged;
            // }
        },
        computed: {
            logged() {
                let self = this;
                let accessToken = this.getCookie('accessToken');
                if(this.$store.state.logged) {
                    return true;
                }
                else if(accessToken.length) {
                    setTimeout(function() {
                        self.$store.commit('setAccessToken', accessToken);
                        return true;
                    },200);
                }
                else {
                    return false;
                }
            }
        }

    }
</script>
<style lang="scss">
    * {
        outline: none;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .cars, .employees, .loadings, .equipment, .events{
        width: 100%;
    }
    .alert-wrapper {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    .loading-container {
        justify-content: center;
        align-items: center;
        display: flex;
        width: 100%;
        height: calc(100vh - 130px);
    }
    .footer.footer--fixed {
        width: 300px;
    }
    .application .theme--dark.toolbar, .theme--dark .toolbar {
        background-color: rgba(33, 33, 33, 0.50) !important;
    }
    .fixed-margin {
        margin-top: 63px;
    }
    .button-icon {
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
</style>