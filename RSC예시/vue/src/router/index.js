import { createRouter, createWebHistory } from "vue-router";
import User from "../views/User";
import Comment from "../views/Comment";
const routes = [
    {
        path: "/user",
        name: "User",
        component: User,
    },
    {
        path: "/comment",
        name: "Comment",
        component: Comment
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
