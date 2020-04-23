<template>
  <div id="wheelDetails" class="container">
    <div class="row">
      <div class="col-md-5" v-if="details.Image">
        <img class="detailImage" :src="details.Image" alt />
      </div>
      <div class="col-md-5">
        <h3>{{details.brand}} {{details.name}}</h3>
        <div class="detailsRow" v-for="(value,key, index) in detailsWithoutImg" :key="index">
          <div>
            <b>{{key}}:</b>
            <span>{{value}}</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="row">
          <numerictextbox v-model="wheelsCount" id="wheelsCount" :min="0" :format="'0'"></numerictextbox>
        </div>
        <div class="row">
          <b-button class="col-md-12" variant="warning" @click="addToCart()">Add to cart</b-button>
        </div>
      </div>
    </div>
    <kendo-notification
      ref="popupNotification"
      :position-top="150"
      :position-right="250"
      :width="300"
      :height="50"
    ></kendo-notification>
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
  mounted: function() {
    this.popupNotificationWidget = this.$refs.popupNotification.kendoWidget();
  },
  //props: ["id"],
  computed: {
    details() {
      //if the page is reloaded and the state does not persist, get the list of wheels from sessionStorage
      var wheel = this.$store.getters.getWheelDetails(this.id);      
      if (wheel == undefined) {
        var appData = JSON.parse(sessionStorage.getItem("App"));
        var wheels = appData.wheelsData;
        wheel = wheels.find(x => x.id == this.id)
        console.log(wheels);
      }
      return wheel;
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
      let stock = this.details.Stock;
      if (stock < this.wheelsCount) {
        //alert("Not enough quantity!!!");
        this.popupNotificationWidget.show("Not enough quantity", "warning");
      } else {
        this.$store.dispatch("addToCart", {
          id: this.id,
          count: this.wheelsCount
        });
      }
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