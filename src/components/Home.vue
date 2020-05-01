<template>
  <div class="content col-md-12">    
    <router-link to="/wheelslist" tag="button" class="product-home col-md-5 col-sm-12">
      <div class="product">
        <h2>Wheels</h2>
        <img col-md="12" src="../images/ultraleggera.png" class="product-image" alt />
      </div>
    </router-link>

    <router-link to="/tyreslist" tag="button" class="product-home col-md-5 col-sm-12">
      <div class="product">
        <h2>Tyres</h2>
        <img col-md="12" src="../images/michelintyre.webp" class="product-image" alt />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {  
  
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
}
.product-home {
  border: 5px solid salmon;
  border-radius: 5%;
  padding: 50px;
  min-width: 300px;
  position: relative;
  margin-left: 20px;
  background-color: white;
}
.product-image {  
  max-width: 200px;
  max-height: 200px;
  margin: 50px;
}
img {
  background: white;
}
</style>
