<template>
  <div>
    <Navigation></Navigation>

    <ShoppingCart />
    <div>
      <p v-if="email">
      <span>Your email address: {{ email }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import ShoppingCart from "./ShoppingCart.vue";
import { mapGetters } from "vuex";

export default {
  name: "Basic",
  components: {
    Navigation,
    ShoppingCart
  },
  computed: {
    ...mapGetters({
      user: "user"
    }),
    inCart() {
      return this.$store.getters.inCart;
    },
    email() {
      console.log('HEADER EMAIL')
      console.log(this.$store.getters.user)
      console.log(this.$store.getters.user.email)
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    }
  },
  
  created() {
    console.log("Header");
    this.$store.dispatch("fetchUser");
  }
};
</script>
