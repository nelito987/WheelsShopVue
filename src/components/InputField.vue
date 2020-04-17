<template>
  <div>
    <div id="formInput">
      <label>{{label}}</label>
      <input
        :id="value"
        class="form-control"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        v-on:input="updateValue($event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: ["value", "required", "label","type", "placeholder"],
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
      this.$emit("update", value);
    }
  }
};
</script>

<style>
#formInput{
  margin-bottom: 20px;
}
label{
  color: #fd5a4e;
}

input::placeholder{
  font-style: italic;
}
</style>