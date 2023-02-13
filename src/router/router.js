import {createRouter, createWebHistory} from 'vue-router';

import startComponent from '../views/startComponent.vue'

const routes = [
  { path: "/", component: startComponent,  alias: '/' },
  {path: "/:pathMatch(.*)*", component: startComponent,  alias: '/'},
  
]


const router = new createRouter({
 
  history: createWebHistory(),
  routes,
})


export default router;