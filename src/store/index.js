import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

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
    inCart: []
  },
  plugins: [vuexPersist.plugin],
  getters: {
    wheelsData: state => state.wheelsData,
    inCart: state => state.inCart,
    getWheelDetails: (state) => (id) => {
      var wheel = state.wheelsData.find(x => x.id === id)
      return wheel;
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
    EMPTY_CART(state){
      state.inCart = []
    },
    UPDATE_WHEELS_DATA(state, newData){
      Vue.http
        .put(
          "https://wheelsshop-89c1d.firebaseio.com/wheels.json",
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
    ADD_NEW_WHEEL(state, wheel){
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
    emptyCart(context){
      context.commit('EMPTY_CART')
    },
    updateWheelsData(context, newWheelsData){
      return context.commit('UPDATE_WHEELS_DATA', newWheelsData);
    },
    addNewWheel(context, wheel){
      return context.commit('ADD_NEW_WHEEL', wheel)
    }
  }
})
