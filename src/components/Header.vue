<template>
  <div>
    <Navigation></Navigation>
    <div id="cart-profile">
      <ShoppingCart />
      <div id="profile">
        <p v-if="auth">
          <span>Email addres of the logged user: <p><b>{{ email }}</b></p></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import ShoppingCart from "./ShoppingCart.vue";
import { mapGetters } from "vuex";

export default {
  name: "Header",
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
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    },
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    this.$store.dispatch("fetchUser");
  }
};
</script>

<style>
#cart-profile {
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
}
#profile {
  margin-top: 20px;
  font-style:  italic;
}
</style>
