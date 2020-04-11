<template>
  <div class="navbar">
    <nav>
      <router-link
        class="spacing"
        v-for="routes in links"
        v-bind:key="routes.id"
        :to="`${routes.page}`"
      >{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      links: [
        // {
        //   id: 0,
        //   text: 'Hello World',
        //   page:'/HelloWorld'
        // },
        {
          id: 1,
          text: "Home",
          page: "/"
        },
        {
          id: 2,
          text: "Wheels List",
          page: "/WheelsList"
        },
        {
          id: 3,
          text: "Contacts",
          page: "/Contacts"
        }
      ]
    };
  }
};
</script>
<style>
.spacing {
  margin-right: 10px;
}

.navbar {
  border: 2px solid #e5e7e9;
  background: #f7dc6f;
  color: #566573;
  height: 80px;
}
nav {
  flex: 1;
  
  display: flex;
  justify-content: space-between;
}
nav > a {
    width: 33%;
    padding: 20px;

}
.router-link-exact-active {
  color: grey;
  background: rgb(235, 190, 14);
  padding: 20px;
  font-weight: bold;
}
</style>

