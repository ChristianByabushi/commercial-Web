import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import handlecount from '../views/admin/account.vue'
import login from '../views/Authentification/login.vue'
Vue.use(VueRouter)  

const routes: Array<RouteConfig> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard/index.vue')

  },
  {
    path: '/merchandise',
    name: 'merchandise',
    component: () => import('@/views/merchandise/menu_merchandise.vue')
  },
  {
    path: '/invoice',
    name: 'invoice',
    component: () => import('@/views/invoices/invoice.vue')

  },
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import('@/views/analysis/analysis.vue')
  },
  
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/Authentification/account.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
 
  {
    path: '/handlecount',
    name: 'listusers',
    component: handlecount,
    children: [
      {
        path: '/add',
        name: 'addaccount',
        props: true,
        component: () => import('../views/admin/addaccount.vue')
      }, 

      {
        path: '/listusers',
        name: 'listusers',
        component: () => import('../views/admin/listusers.vue'),
        props: true
      },
      {
        path: '/editaccount/:id',
        name: 'editaccount',
        component: () => import('../views/admin/editaccount.vue'),
        props: true
      },
     
    ]
  },
  {
    path: 'indexMsg',
    name: 'indexMsg',
    component: () => import('../views/messages/indexMsg.vue'),
    children: [
      {
        path: 'showmessage/:id',
        name: 'showmessage',
        component: () => import('../views/messages/showmessage.vue'),
        props: true,
      },
      {
        path: 'newmessage',
        name: 'newmessage',
        component: () => import('../views/messages/newmessage.vue'),
        props: true,
      },
      {
        path: 'listemessage',
        name: 'indexMsg',
        component: () => import('../views/messages/listemessage.vue'),
        props: true,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
}) 

export default router
