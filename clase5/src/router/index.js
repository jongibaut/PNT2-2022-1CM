import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from "../components/HelloWorld.vue";
import About from "../components/About.vue";
import Unauth from "../components/401.vue";

const logged = () => {
    if (localStorage.logged === 0 || !localStorage.logged) {
        return { path: '/401', name: '401', component: Unauth }
    }
}
const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
        beforeEnter: [logged],
    },
    {
        path: '/about/:id',
        name: 'About',
        component: About,
        
    },
    {
        path: '/401',
        name: '401',
        component: Unauth 
    }
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

export default router;