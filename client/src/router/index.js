import { createRouter, createWebHistory } from 'vue-router'
import Session from '../services/session'
import Home from '../views/Home.vue'
import MyProfile from '../views/MyProfile.vue'
import Friends from '../views/Friends.vue'
import Activity from '../views/Activity.vue'
import Feed from '../views/Feed.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/myprofile',
        name: 'MyProfile',
        component: MyProfile,
        meta: { requiresLogin: true }
    },
    {
        path: '/activity',
        name: 'Activity',
        component: Activity,
        meta: { requiresLogin: true }
    },
    {
        path: '/friends',
        name: 'Friends',
        component: Friends,
        meta: { requiresLogin: true }
    },
    {
        path: '/feed',
        name: 'Feed',
        component: Feed,
        meta: { requiresLogin: true }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresLogin && !Session.user) {
        next('/login')
    } else {
        next()
    }
});

export default router
