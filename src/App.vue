<template>
  <div id="view">
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
  padding: 5%
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

    #view{
      height: 100% !important
    }
</style>
