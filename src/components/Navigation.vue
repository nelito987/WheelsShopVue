<template>
  <div class="navbar">
    <nav>
      <div id="navigation-links">
        <!-- Using v-if and v-for together is not recommended.  -->
        <div v-for="routes in links" v-bind:key="routes.id">
          <router-link
            class="spacing"
            :to="`${routes.page}`"
            v-show="auth || !routes.hideOnAuth"
          >{{routes.text}}</router-link>
        </div>
      </div>
      <div id="sign">
        <router-link v-if="!auth" to="/signup">Sign Up</router-link>
        <router-link v-if="!auth" to="/signin">Sign In</router-link>
        <div id="logout" v-if="auth" @click="onLogout">Log Out</div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      show: true,
      links: [
        {
          id: 0,
          text: "Home",
          page: "/",
          hideOnAuth: false
        },
        {
          id: 1,
          text: "Wheels List",
          page: "/WheelsList",
          hideOnAuth: false
        },
        {
          id: 2,
          text: "Tyres List",
          page: "/TyresList",
          hideOnAuth: false
        },
        {
          id: 3,
          text: "Contacts",
          page: "/Contacts",
          hideOnAuth: false
        },
        {
          id: 4,
          text: "Add Wheel",
          page: "/addwheel",
          hideOnAuth: true
        }
      ]
    };
  },
  computed: {
    auth() {     
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
<style>
.navbar {
  border: 2px solid #e5e7e9;
  background: #fd5a4e;
  color: #566573;
  height: 80px;
}
nav {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
nav a {
  padding: 20px;
  color: rgb(82, 77, 77);
  font-weight: bold !important;
}
nav a:hover {
  color: black;
}
.router-link-exact-active {
  color: rgb(49, 30, 30);
  background: #fa857d;
  padding: 20px;
  font-weight: bold;
}

#sign {
  margin-left: 50px;
}

#navigation-links {
  display: inline-flex;
}

#logout {
  cursor: pointer;
  font-weight: bold !important;
  color: #9c160c;
}
</style>

