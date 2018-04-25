<template>
    <div class="alert-wrapper">
        <v-alert color="success" icon="check_circle" dismissible v-model="alertSuccess">
            {{ alertText }}
        </v-alert>

        <v-alert color="info" icon="info" dismissible v-model="alertInfo">
            {{ alertText }}
        </v-alert>

        <v-alert color="warning" icon="priority_high" dismissible v-model="alertWarning">
            {{ alertText }}
        </v-alert>

        <v-alert color="error" icon="warning" dismissible v-model="alertError">
            {{ alertText }}
        </v-alert>
    </div>
</template>
<script>

    export default {
        name: 'Alerts',
        data: () => ({
            alertSuccess: false,
            alertInfo: false,
            alertWarning: false,
            alertError: false,
            alertText: ''
        }),
        methods: {
            hideAlerts() {
                this.alertSuccess = false;
                this.alertInfo = false;
                this.alertWarning = false;
                this.alertError = false;
            }
        },
        computed: {
            alert: function () {
                return this.$store.state.alert;
            }

        },
        watch: {
            alert: function (val) {
                let self = this;
                this.alertText = val.text;
                console.log(val.type);
                switch (val.type) {
                    case 'success':
                        this.alertSuccess = true;
                        break;
                    case 'info':
                        this.alertInfo = true;
                        break;
                    case 'warning':
                        this.alertWarning = true;
                        break;
                    case 'error':
                        this.alertError = true;
                        break;
                }
                setTimeout(function () {
                    self.hideAlerts();
                }, 6000)
            },
        }
    }
</script>
