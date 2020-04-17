<template>
  <div id="wheelDetails" class="container">
    <div class="row">
      <div class="col-md-5" v-if="details.Image">
        <img class="detailImage" :src="details.Image" alt />
      </div>
      <div class="col-md-5">
        <h3>{{details.brand}} {{details.name}}</h3>
        <div class="detailsRow" v-for="(value,key) in detailsWithoutImg" :key="value">
          <div>
            <b>{{key}}:</b>
            <span>{{value}}</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="row">
          <numerictextbox v-model="wheelsCount" id="wheelsCount"  :min= 0 :format="'0'"></numerictextbox>
        </div>
        <div class="row">
          <b-button class="col-md-12" variant="warning" @click="addToCart()">Buy</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {    
    return {
      id: this.$route.params.id,
      Image: "",
      wheelsCount: 4
    };
  },
  //props: ["id"],
  computed: {
    details() {        
     
      return this.$store.getters.getWheelDetails(this.id);
    },
    detailsWithoutImg() {
      var obj = {};      
      for (let [key, value] of Object.entries(this.details)) {
        if (key != "Image") {
          obj[key] = value;
        }
      }
      return obj;
    },
    ...mapGetters(["getWheelDetails"])
  },
  methods: {
    addToCart() {       
        
      this.$store.dispatch("addToCart", { id: this.id, count: this.wheelsCount});
    }
  }
};
</script>

<style scoped>
.detailsRow {
  display: flex;
  flex-wrap: wrap;
}

.detailsRow > div {
  font-size: 130%;
}

#wheelDetails.container {
  margin: 7%;
  border: 1px solid orange;
  padding: 10%;
  border-radius: 8%;
}

.k-numerictextbox {
  margin: 50px 0;
}
</style>