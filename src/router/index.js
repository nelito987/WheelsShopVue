import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import WheelsList from '@/components/wheels/WheelsList';
import Contacts from '@/components/Contacts';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/wheelslist',
      name: 'Wheels List',
      component: WheelsList
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts
    }
  ]
});
