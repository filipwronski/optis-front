// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import 'animate.css'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css');
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
    }
});
Vue.mixin({
    data: function() {
        return {
            get backendUrl() {
                // return "https://optisbackend.vue-js.pl/";
                return "http://127.0.0.1:8000/";
            }
        }
    },
    methods: {
        handleError(error) {
            switch(error.status){
                case 401:
                    this.$store.commit('logout');
                    break;
                default:
                    console.log(error)
            }
        }
    }
});

router.beforeEach((to, from, next) => {
    document.title = 'Aplikacja webowa'
    next()
});


new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
