<template>
  <div>
    <Navigation></Navigation>
    <ShoppingCart />    
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import ShoppingCart from "./ShoppingCart.vue"

export default {
  name: "Basic",
  components: {
    Navigation,
    ShoppingCart
  },
  computed: {
    inCart() {
      return this.$store.getters.inCart;
    }
  }
};
</script>
