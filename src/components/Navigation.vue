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
        {
          id: 0,
          text: "Home",
          page: "/"
        },
        {
          id: 1,
          text: "Wheels List",
          page: "/WheelsList"
        },
        {
          id: 2,
          text: "Tyres List",
          page: "/TyresList"
        },        
        {
          id: 3,
          text: "Contacts",
          page: "/Contacts"
        },
                {
          id: 4,
          text: "Add Wheel",
          page: "/addwheel"
        },
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
  background: #fd5a4e;
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
    color:rgb(82, 77, 77);
    font-weight: bold !important;

}
nav > a:hover {    
    color: black

}
.router-link-exact-active {
  color: rgb(49, 30, 30);
  background: #fa857d;
  padding: 20px;
  font-weight: bold;
}
</style>

