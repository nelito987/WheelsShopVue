<template>
  <div>
    <form id="addWheel" @submit="onSubmit" @reset="onReset">
      <h3 class="formHeader">Add Wheel Form</h3>

      <div v-for="(value, index) in wheelFormData" v-bind:key="index">
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
      this.$store.dispatch("addNewWheel").then(
        response => {
          console.log(response);
          this.$router.push("/wheelslist");
        },
        error => {
          console.log(error);
        }
      );
    },
    onReset(evt) {
      evt.preventDefault();
      //TODO
      // Reset our form values
      // this.wheelData.email = "";
      // this.wheelData.name = "";
      // this.wheelData.food = null;
      // this.wheelData.checked = [];
      // // Trick to reset/clear native browser form validation state
      // this.show = false;
      // this.$nextTick(() => {
      //   this.show = true;
      // });
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