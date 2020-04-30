<template>
  <div>
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  created(){
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

#app {
  text-align: center;
}
.content {
  margin: 20px;
  border: 2px solid salmon;
  padding: 150px;
}

.k-filtercell-operator {
  display: none !important;
}

.detailImage {
  max-width: 300px;
}

.footer{
        align-content: center !important;
        background: orange;
        padding: 10% 30%;
    }
</style>
