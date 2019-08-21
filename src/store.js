import Vue from 'vue'
import Vuex from 'vuex'

import routes from './routes';
import response from "vue-resource/src/http/response";


Vue.use(Vuex);

const FbAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const FbApiKey = "AIzaSyDg08DcVpdlbamgRwd24Rb_3k7CsUvnwys";


export default new Vuex.Store({
    state: {
        email: "",
        token: "",
        refresh: "",
        user: null
    },
    getters: {
        isAuth(state) {
            if (state.token) {
                return true
            }
            return false
        }
    },
    mutations: {
        auth(state, authData) {
            state.email = authData.email;
            state.token = authData.idToken;
            state.refresh = authData.refreshToken;
        },
        logout(state) {
            state.email = null;
            state.token = null;
            state.refresh = null;

            localStorage.removeItem("token");
            localStorage.removeItem("refresh");

            routes.push('/')
        },
        addUserInfo(state, userInfo) {
            state.user = userInfo
        }
    },
    actions: {
        signup({
            commit
        }, payload) {

            Vue.http.post(`${FbAuth}/signupNewUser?key=${FbApiKey}`, {
                    ...payload,
                    returnSecureToken: true
                })
                .then(response => response.json())
                .then(authData => {
                    commit("auth", authData)

                    localStorage.setItem("token", authData.idToken);
                    localStorage.setItem("refresh", authData.refreshToken);

                })
                .catch(error => {
                    console.log(error)
                })
        },
        signin({
            commit
        }, payload) {
            Vue.http.post(`${FbAuth}/verifyPassword?key=${FbApiKey}`, {
                    ...payload,
                    returnSecureToken: true
                })
                .then(response => response.json())
                .then(authData => {
                    commit("auth", authData)

                    localStorage.setItem("token", authData.idToken);
                    localStorage.setItem("refresh", authData.refreshToken);

                })
                .catch(error => {
                    console.log(error)
                })
        },
        refreshToken({
            commit
        }) {
            const refreshToken = localStorage.getItem("refresh");

            if (refreshToken) {
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbApiKey}`, {
                        grant_type: 'refresh_token',
                        refresh_token: refreshToken
                    })
                    .then(response => response.json())
                    .then(authData => {
                        commit("auth", {
                            idToken: authData.id_token,
                            refreshToken: authData.refresh_token,
                        });
                        localStorage.setItem("token", authData.id_token);
                        localStorage.setItem("refresh", authData.refresh_token);
                    })
            }
        },
        getUserInfo({
            commit
        }, payload) {
            Vue.http.post(`${FbAuth}/getAccountInfo?key=${FbApiKey}`, {
                    idToken: payload
                })
                .then(response => response.json())
                .then(res => {
                    commit("addUserInfo", res.users[0])
                })
        }
    }
})