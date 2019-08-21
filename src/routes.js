import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Pages/home.vue'
import SignUp from './components/User/signup.vue'
import SignIn from './components/User/signin.vue'
import Dashboard from './components/User/dashboard.vue';

import store from './store';
Vue.use(VueRouter)

const preventRoutes = {
    beforeEnter: (to, from, next) => {
        if (store.state.token){
            next()
        } else{
            next('/');
        }
    }
}

const routes = [
    { path:'/',component:Home },
    { path:'/signin', component: SignIn },
    { path:'/signup', component: SignUp },
    { path:'/dashboard', component: Dashboard, ...preventRoutes}
]

export default new VueRouter({mode: 'history', routes})
