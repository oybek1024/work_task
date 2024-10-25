import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'posts',
        component: () => import(/* webpackChunkName: "about" */ '../views/PostsView.vue')
    },
    {
        path: '/kanban',
        name: 'kanban',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/KanbanView.vue')
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import(/* webpackChunkName: "about" */ '../views/CalendarView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
