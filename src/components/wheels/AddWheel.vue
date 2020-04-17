<template>
  <div>
    <form id="addWheel" @submit="onSubmit" @reset="onReset">
      <h3 class="formHeader">Add Wheel Form</h3>

      <div v-for="(value, index) in wheelData" v-bind:key="index">
        <InputField
          :type="value.type"
          :label="value.label"
          :placeholder="value.label"
          v-model="value.value"
        />
      </div>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ wheelData }}</pre>
    </b-card>
  </div>
</template>

<script>
import InputField from "../InputField.vue";

export default {
  data() {
    return {
      wheelData: [
        {
          label: "Brand",
          value: "",
          type: "text"
        },
        {
          label: "Name",
          value: "",
          type: "text"
        },

        {
          label: "Size",
          value: "",
          type: "number"
        },

        {
          label: "PCD",
          value: "",
          type: "number"
        },
        {
          label: "Holes",
          value: "",
          type: "number"
        },
        {
          label: "Offset",
          value: "",
          type: "number"
        },
        {
          label: "Price",
          value: "",
          type: "text"
        },
        {
          label: "Stock",
          value: "",
          type: "number"
        },
        {
          label: "Image",
          value: "",
          type: "text"
        }
      ]
    };
  },
  components: {
    InputField
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.wheelData));      

      let newData = {};
      for (let i in this.wheelData) {        
        var itemKey = this.wheelData[i].label;
        var val = this.wheelData[i].value;
        newData[itemKey] = val;        //c
      }    

      this.$http
        .post(
          "https://wheelsshop-89c1d.firebaseio.com/wheels.json",
          newData
        )
        .then(
          response => {
            console.log(response)
            this.$router.push('/wheelslist')
          },
          error => {
            console.log(error);
          }
        );
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.wheelData.email = "";
      this.wheelData.name = "";
      this.wheelData.food = null;
      this.wheelData.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
#addWheel {
  margin: 10%;
  padding: 10%;
  border: 1px solid #fd5a4e;
  border-radius: 8px;
}

.formHeader {
  margin-bottom: 30px;
  color: #fd5a4e;
}
</style>