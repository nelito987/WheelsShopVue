<template>
  <div>
    <form id="addWheel" @submit="onSubmit">
      <h3 class="formHeader">Add Wheel Form</h3>

      <div v-for="(value, index) in wheelFormData" v-bind:key="index">
        <InputField
          :type="value.type"
          :label="value.label"
          :placeholder="value.placeholder"
          v-model="value.value"
        />
      </div>

      <b-button type="submit" variant="primary">Submit</b-button>
    </form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ wheelFormData }}</pre>
    </b-card>
  </div>
</template>

<script>
import InputField from "../InputField.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      wheelFormData: [
        {
          label: "Brand",
          value: "",
          type: "text",
          placeholder: "Brand"
        },
        {
          label: "Name",
          value: "",
          type: "text",
          placeholder: "Enter the name of the wheel"
        },

        {
          label: "Size",
          value: "",
          type: "number",
          placeholder: "Size"
        },

        {
          label: "PCD",
          value: "",
          type: "number",
          placeholder: "PCD"
        },
        {
          label: "Holes",
          value: "",
          type: "number",
          placeholder: "Number of holes"
        },
        {
          label: "Offset",
          value: "",
          type: "number",
          placeholder: "Offset"
        },
        {
          label: "Price",
          value: "",
          type: "text",
          placeholder: "Price"
        },
        {
          label: "Stock",
          value: "",
          type: "number",
          placeholder: "Wheels on stock"
        },
        {
          label: "Image",
          value: "",
          type: "text",
          placeholder: "Enter Image Url"
        }
      ]
    };
  },
  components: {
    InputField
  },
  computed: {
    ...mapGetters(["wheelsData"])
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.wheelFormData));

      let newData = {};
      for (let i in this.wheelFormData) {
        var itemKey = this.wheelFormData[i].label;
        var val = this.wheelFormData[i].value;
        newData[itemKey] = val; //c
      }

      let id = -1;
      let self = this;

      if (this.$store.getters.wheelsData.length > 0) {
        id = ++this.$store.getters.wheelsData.length;
      } else {
        await this.$store.dispatch("getWheels").then(function() {
          id = ++self.$store.getters.wheelsData.length;
        });
      }
      newData.id = id;
      this.$store.dispatch("addNewWheel", newData)
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