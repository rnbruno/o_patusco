import { createRouter, createWebHistory } from "vue-router";

import AuthenticatedLayout from "../layouts/Authenticated.vue";
import GuestLayout from "../layouts/Guest.vue";

import PostsIndex from '../components/Posts/Index.vue'
import PostsCreate from '../components/Posts/Create.vue'
import PostsEdit from '../components/Posts/Edit.vue'
import Usuarios from '../Usuario/Usuarios.vue'
import Login from '../components/Login.vue'

const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };
const Product = { template: "<div>Product</div>" };
import LayoutComponent from '../layouts/Layout.vue';

import AcessoIndex from '../components/AcessoIndex.vue';
import MainApp from '../components/mainapp.vue';
import ContasIndex from '../layouts/ContasIndex.vue';
import CartaoIndex from '../Usuario/Cartao.vue';
import Index from '../components/Posts/Index.vue';

function auth(to, from, next) {
    const loggIn = JSON.parse(localStorage.getItem('loggedIn'));
    if (loggIn) {
        next()
    }else{
        if (to.name == 'login'){
            next({name: 'login'});
        }else if (to.name == 'logout'){
            next({name: 'logout'});
        }else{
            next({name: 'layout'});
        }
    }
    console.log(localStorage.getItem('loggedIn'))

}

const routes = [
    {
        path: '/',
        name: 'layout',
        component: GuestLayout,
        children: [
            {
                path: '/login',
                name: 'login1',
                component: Login
            },
        ]
    },
    {
        path: '/login',
        redirect: { name: 'login' },
        component: Login,

    },
    {
        path: '/logout',
        redirect: { name: 'logout' },
        component: Index,

    },
    {
        component: AuthenticatedLayout,
        beforeEnter: auth,
        children: [
            {
                path: '/posts',
                name: 'posts.index',
                component: ContasIndex,
                meta: { title: 'Posts' }
            },
            {
                path: '/posts/create',
                name: 'posts.create',
                component: PostsCreate,
                meta: { title: 'Add new post' }
            },
            {
                path: '/posts/edit/:id',
                name: 'posts.edit',
                component: PostsEdit,
                meta: { title: 'Edit post' }
            },
            { path: "/", name: 'home', component: GuestLayout },
            { path: "/acessosIndex", name: 'acesso.index', component: AcessoIndex },
            { path: "/about", name: 'about', component: About },
            { path: "/product", component: Product },
            { path: "/dasboard", component: Product },
            { path: "/contas", name: 'conta',  component: ContasIndex },
            { path: "/cartao", name: 'cartaoIndex', component: CartaoIndex },
            { path: "/index", name: 'index', component: Index }
        ]
    }
]
// path: '/login',
//                 name: 'login',
//                 component: Login

// const routes = [
//     { path: "/", name: 'home', component: AcessoIndex },
//     { path: "/acessosIndex", name: 'acesso.index', component: AcessoIndex },
//     { path: "/about", name: 'about', component: About},
//     { path: "/product", component: Product},
//     { path: "/dasboard", component: Product},
//     { path: "/contas", component: ContasIndex},
//     { path: "/cartao", name: 'cartaoIndex', component: CartaoIndex},
//     { path: "/login", name: 'login', component: Login}
// ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;