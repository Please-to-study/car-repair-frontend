import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/login/index.vue'
import Home from '../view/home/index.vue'
import Register from '../view/register/index.vue'
import Manager from '../view/manager/index.vue'
import ManagerHome from "../view/managerHome/index.vue";

const routes = [
    { path: "/", redirect: "/login" },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/manager',
        name: 'Manager',
        component: Manager,
    },
    {
        path: '/managerHome',
        name: 'ManagerHome',
        component: ManagerHome,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
