import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import router from '../router/index'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'App',
  storage: window.sessionStorage
})


export default new Vuex.Store({
  state: {
    forms: {
      registrationForm: {
        brand: '',
        price: ''
      }
    },
    wheelsData: [],
    inCart: [],
    user: {
      loggedIn: false,
      data: null,
      email: ''
    }
  },
  plugins: [vuexPersist.plugin],
  getters: {
    wheelsData: state => state.wheelsData,
    user: state => state.user,
    inCart: state => state.inCart,
    getWheelDetails: (state) => (id) => {
      var wheel = state.wheelsData.find(x => x.id === id)
      return wheel;
    },
    isAuthenticated (state){
      return state.idToken !== null
    }
  },
  mutations: {
    LOAD_WHEELS(state, wheels) {
      state.wheelsData = wheels
    },
    ADD_TO_CART(state, purchase) {
      state.inCart.push(purchase);
    },
    REMOVE_FROM_CART(state, index) {
      state.inCart.splice(index, 1);
    },
    EMPTY_CART(state) {
      state.inCart = []
    },
    UPDATE_WHEELS_DATA(state, newData) {
      if(!state.idToken){
        return;
      }
      Vue.http
        .put(
          "https://wheelsshop-89c1d.firebaseio.com/wheels.json"+ '?auth=' + state.idToken,
          newData
        )
        .then(
          response => {
            console.log(response)
          },
          error => {
            console.log(error);
          }
        );
    },
    ADD_NEW_WHEEL(state, wheel) {
      if(!state.idToken){
        return;
      }
      return Vue.http
        .post(
          "https://wheelsshop-89c1d.firebaseio.com/wheels.json",
          wheel
        )
        .then(
          response => {
            console.log(response)
          },
          error => {
            console.log(error);
          }
        );
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    AUTH_USER(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    STORE_USER(state, user) {
      state.user = user
    },
    CLEAR_AUTH_DATA(state){
      state.idToken = null;
      state.userId = null;      
    }
  },
  actions: {
    getWheels({ commit }) {      
      return Vue.http.get('https://wheelsshop-89c1d.firebaseio.com/wheels.json')
        .then(response => {
          return response.json()
        }).then(data => {
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key])
          }
          commit('LOAD_WHEELS', resultArray);
        });
    },
    addToCart(context, purchase) {
      context.commit('ADD_TO_CART', purchase);
    },
    removeFromCart(context, index) {
      context.commit('REMOVE_FROM_CART', index);
    },
    emptyCart(context) {
      context.commit('EMPTY_CART')
    },
    updateWheelsData(context, newWheelsData) {
      return context.commit('UPDATE_WHEELS_DATA', newWheelsData);
    },
    addNewWheel(context, wheel) {
      return context.commit('ADD_NEW_WHEEL', wheel)
    },  
    signup({ commit, dispatch }, authData) {
      return Vue.http
        .post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCN_oWtgjw8fQi5owePLETjK9acHdDE-0Q", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expiresIn', expirationDate)
          this.state.user.email = res.data.email;
          commit('AUTH_USER', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          dispatch('storeUser', authData);
          dispatch('setLogoutTimer', res.data.expiresIn);
        })
        .catch(error => console.log(error));
    },
    signin({ commit, dispatch }, authData) {
      return Vue.http
        .post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCN_oWtgjw8fQi5owePLETjK9acHdDE-0Q", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expiresIn', expirationDate)
          this.state.user.email = res.data.email;
          commit('AUTH_USER', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin({commit}){
      const token = localStorage.getItem('token');
      if(!token){
        return;
      }
      const expirationDate = localStorage.getItem('expiresIn');
      const now = new Date();
      if(now >= expirationDate){
        return;
      }
      const userId = localStorage.getItem('userId')
      commit('AUTH_USER', {
        token: token,
        userId: userId
      })
    },
    setLogoutTimer({commit}, expirationTime){
      setTimeout(()=>{
        commit('CLEAR_AUTH_DATA')
      }, expirationTime*1000)
    },
    storeUser({ state }, userData) {
      if (!state.idToken) {
        return
      }
      console.log('STOREUSER ACTION')
      Vue.http.post('https://wheelsshop-89c1d.firebaseio.com/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchUser({ commit, state }) {     

      if (!state.idToken) {
        return
      }
      Vue.http.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCN_oWtgjw8fQi5owePLETjK9acHdDE-0Q', {'Access-Control-Allow-Origin': '*', "idToken": state.idToken})
        .then(res => {              
          const user = res.body.users[0]
          commit('STORE_USER', user)
        })
        .catch(error => console.log(error))
    },
    logout({commit}){
      commit('CLEAR_AUTH_DATA');
      localStorage.removeItem('expiresIn')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin')
    }
  }
})
