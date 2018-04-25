import axios from 'axios';

export default {
    login(state) {
        state.logged = true;
    },
    logout(state) {
        state.logged = false;
        state.accessToken = null;
        document.cookie = 'accessToken' + '=; Max-Age=-99999999;';
    },
    setAccessToken(state, accessToken) {
        state.accessToken = accessToken;
        state.logged = true;
    },
    setRefreshToken(state, refreshToken) {
        state.refreshToken = refreshToken;
    },
    setAlert(state, value) {
        state.alert = value;
    },
}