import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import WheelsList from '@/components/wheels/WheelsList';
import WheelDetails from '@/components/wheels/WheelDetails';
import AddWheel from '@/components/wheels/AddWheel';
import TyresList from '@/components/tyres/TyresList';
import Contacts from '@/components/Contacts';
import SignUp from '@/components/auth/SignUp';
import SignIn from '@/components/auth/SignIn';
import store from '../store/index.js';

Vue.use(Router);

export default new Router({
  mode:'history',
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
      path: '/tyreslist',
      name: 'Tyres List',
      component: TyresList
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts
    },
    {
      path: '/wheelDetails/:id',
      name: 'wheelDetail',
      component: WheelDetails,
      props: true
    },    
    {
      path: '/addWheel',
      name: 'Add Wheel',
      component: AddWheel,
      beforeEnter (to, from, next){
        if(store.state.idToken){
          next()
        } else {
          next('/signin')
        }
      }
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn
    }
  ]
});


