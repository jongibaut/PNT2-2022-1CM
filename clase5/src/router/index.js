import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from "../components/HelloWorld.vue";
import About from "../components/About.vue";

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/about/:id',
        name: 'About',
        component: About
    }
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

export default router;