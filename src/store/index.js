import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wheelsData: [
      {
        id: 1,
        brand: "OZ",
        name: "Ultraleggera",
        holes: 5,
        PCD: 115,
        offset: 35,
        imageUrl:
          "https://www.baanvelgen.com/media/catalog/product/cache/1/image/85e4522595efc69f496374d01ef2bf13/o/z/oz-hyper-gt-wheels-star-graphite.jpg"
      },
      {
        id: 2,
        brand: "Fondmetal",
        name: "7600",
        holes: 5,
        PCD: 114.3,
        offset: 40,
        imageUrl:
          "https://www.felgenoutlet.com/rims-images/151/347/popup/oz_leggera_hlt_gloss_black.jpg?1475782616"
      },
      {
        id: 3,
        brand: "OZ",
        name: "Superturismo",
        holes: 4,
        PCD: 100,
        offset: 35,
        imageUrl:
          "https://www.felgenoutlet.com/rims-images/151/347/popup/oz_leggera_hlt_gloss_black.jpg?1475782616"
      },
      {
        id: 4,
        brand: "OZ",
        name: "Allegerita",
        holes: 5,
        PCD: 108,
        offset: 45,
        imageUrl:
          "https://www.felgenoutlet.com/rims-images/151/347/popup/oz_leggera_hlt_gloss_black.jpg?1475782616"
      }
    ]
  },
  getters: {
    wheelsData: state => {
      var wheels = state.wheelsData;
      console.log('store')
      console.log(wheels)
      return wheels;
    },
    getWheelDetails: state => {
      console.log("test")
      var wheel = state.wheelsData.find(x => x.id === 3)
      return wheel;
    }
  },
  mutations: {

  },
  actions: {

  }
})
