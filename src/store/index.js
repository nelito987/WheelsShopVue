import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    state: {
      forms: {
        registrationForm: {
          brand: '',
          price: ''
        }
      }
    },
    // wheelsData: [
    //   {
    //     id: 1,
    //     brand: "OZ",
    //     name: "Ultraleggera",
    //     holes: 5,
    //     PCD: 115,
    //     offset: 35,
    //     price: 100,
    //     imageUrl:
    //       "https://www.baanvelgen.com/media/catalog/product/cache/1/image/85e4522595efc69f496374d01ef2bf13/o/z/oz-hyper-gt-wheels-star-graphite.jpg"
    //   },
    //   {
    //     id: 2,
    //     brand: "Fondmetal",
    //     name: "7600",
    //     holes: 5,
    //     PCD: 114.3,
    //     offset: 40,
    //     price: 150,
    //     imageUrl:
    //       "https://www.felgenoutlet.com/rims-images/151/347/popup/oz_leggera_hlt_gloss_black.jpg?1475782616"
    //   },
    //   {
    //     id: 3,
    //     brand: "OZ",
    //     name: "Superturismo",
    //     holes: 4,
    //     PCD: 100,
    //     offset: 35,
    //     price: 130,
    //     imageUrl:
    //       "https://www.felgenoutlet.com/rims-images/151/347/popup/oz_leggera_hlt_gloss_black.jpg?1475782616"
    //   },
    //   {
    //     id: 4,
    //     brand: "OZ",
    //     name: "Allegerita",
    //     holes: 5,
    //     PCD: 108,
    //     offset: 45,
    //     price: 200,
    //     imageUrl:
    //       "https://www.felgenoutlet.com/rims-images/151/347/popup/oz_leggera_hlt_gloss_black.jpg?1475782616"
    //   }
    // ],
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
    LOAD_WHEELS (state, wheels) {
        state.wheelsData = wheels
    },
    ADD_TO_CART(state, purchase) {
      state.inCart.push(purchase);
    },
    REMOVE_FROM_CART(state, index) {
      state.inCart.splice(index, 1);
    },
    // unified way to set properties in 'state.forms' Observer object
    // setFormFieldValue(state, { targetFieldPath, value }) {
    //   //console.log('test')
    //   const targetFieldPathList = targetFieldPath.split('.');
    //   const targetFieldPathIndex = targetFieldPathList.length - 1;
    //   let currentProp = state.forms;

    //   // traversing Observer object properties until we get to the target property parent
    //   for (let pathNodeIndex = 0; pathNodeIndex < targetFieldPathIndex; pathNodeIndex++) {
    //     currentProp = currentProp[targetFieldPathList[pathNodeIndex]];
    //   }

    //   currentProp[targetFieldPathList[targetFieldPathIndex]] = value;
    // }

  },
  actions: {
    getWheels({commit}){
        Vue.http.get('https://wheelsshop-89c1d.firebaseio.com/wheels.json')
        .then(response => {            
          return response.json()
        }).then( data => {
            const resultArray = [];
            for(let key in data){             
              resultArray.push(data[key])
            }           
            commit('LOAD_WHEELS', resultArray)

        });
    },
    addToCart(context, purchase) {
     
      context.commit('ADD_TO_CART', purchase);
    },
    removeFromCart(context, index) {
      context.commit('REMOVE_FROM_CART', index);
    },
    setFormFieldValue({ commit }, { targetFieldPath, value }) {
      commit('setFormFieldValue', { targetFieldPath, value });
    }
  }
})
