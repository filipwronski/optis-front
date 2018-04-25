<template>
    <v-container>
        <v-flex xs12 sm6 offset-sm3 align-center>
            <v-card class="text-center">
                <v-card>
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline">Logowanie</span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
                <v-card>
                    <v-container>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field
                                    label="Login"
                                    v-model="login"
                                    :rules="loginRules"
                                    required
                            />
                            <v-text-field
                                    label="Hasło"
                                    v-model="password"
                                    :rules="loginRules"
                                    required
                                    type="password"
                                    @keyup.enter="loginAction"
                            />
                            <v-btn
                                    @click="loginAction"
                                    :disabled="!valid"
                            >
                                Zaloguj
                            </v-btn>
                        </v-form>
                    </v-container>
                </v-card>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Login',
        data: () => ({
            drawer: null,
            logged: false,
            login: null,
            password: null,
            valid: true,
            name: '',
            loginRules: [
                (v) => !!v || 'Pole wymagane',
                (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
            ],
        }),
        methods: {
            loginAction() {
                // if (this.login === "admin" && this.password === "admin") {
                //     this.$store.commit('login');
                // }
                let self = this;
                axios({
                    method: 'get',
                    url: this.backendUrl + 'oauth/v2/token',
                    params: {
                        grant_type: 'password',
                        client_id: '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
                        client_secret: '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k',
                        username: this.login,
                        password: this.password,
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        if (response.status === 200) {
                            self.$store.commit('setAccessToken', response.data.access_token);
                            self.$store.commit('setRefreshToken', response.data.refresh_token);
                            self.setCookie('accessToken', response.data.access_token, 1/24);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        if (error.response.data.error === 'invalid_grant') {
                            this.$store.commit('setAlert',
                                {
                                    type: 'error',
                                    text: 'Błędny login i hasło'
                                }
                            );
                        }
                    });

            },
            validateAction() {
                if (this.login.length > 1 && this.password.length > 1) {
                    this.logged = true;
                }
            },
            setCookie(cname, cvalue, exdays) {
                console.log(cvalue);
                let date = new Date();
                date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
                let expires = "expires=" + date.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            },
        },
    }
</script>