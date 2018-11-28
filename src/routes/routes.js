import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Statistic from '../components/pages/Statistic';
import Contacts from '../components/pages/Contacts';
import E404 from '../components/pages/E404';

const routes = [
  {
    name: 'statistic',
    path: '/',
    component: Statistic,
    meta: {
      title: 'Crypto statistic'
    }
  },
  {
    name: 'contacts',
    path: '/contacts',
    component: Contacts,
    meta: {
      title: 'Owner contacts'
    }
  }
]

export const router = new VueRouter({
  routes,
  mode: 'history'
});
