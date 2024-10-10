import { createRouter, createWebHistory } from "vue-router"; 
import '@mdi/font/css/materialdesignicons.css';
import home from "../components/HomeRoute.vue";
import about from "../components/About.vue";
import notfound from "../components/Notfound.vue";
import service from '../components/service.vue';
import location from '../components/location.vue';
import contact from '../components/contact.vue';
import emis from "../components/emis.vue";
import login from "../components/login.vue"
// import login from "../components/app2.vue"

const routes = [
    {
        path: '/',
        redirect: '/login', // Redirect to the login page by default
    },
    {
        path:'/login',
        component: login
    },
    {
        path:'/about',
        component: about
    },

    {
        path:'/service',
        component:service
    },
    {
        path:'/location',
        component:location
    },
    {
        path:'/contact',
        component: contact
    },
    {
        path:'/emis',
        component: home
    },
    {
        path:'/:pathMatch(.*)*',
        component: notfound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router