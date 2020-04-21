import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    } 
  },
  actions: {
    getWheels({ commit }) {
      Vue.http.get('https://wheelsshop-89c1d.firebaseio.com/wheels.json')
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
    }
  }
})
