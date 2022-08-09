import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        alias: "/home",
        name: "Home",
        component: () => import("./components/Home")
    },
    {
        path: "/",
        alias: "/search",
        name: "search",
        component: () => import("./components/Search")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
