<template>
  <div>
    <span>
      <button id="cardBtn" @click="toggleDialog">
        <img src="data:image/png;base64,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" alt="">
         ({{ numInCart }})
         </button>
    </span>
    <k-dialog v-if="visibleDialog" :title="'Shopping Cart'" @close="toggleDialog">
      <div v-if="numInCart > 0">
        <table class="table">
          <tbody>
            <tr v-for="(item, index) in cart" :key="item.id">
              <td>{{ item.brand }}</td>
              <td>{{ item.name }}</td>              
              <td>{{ item.count }}</td>
              <td>{{ item.price | dollars }}</td>
              <td>{{ item.totalPerPurchase | dollars }}</td>
              <td>
                <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">&times;</button>
              </td>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>TOTAL:</th>
              <th>{{ total | dollars }}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>Your cart is empty!!!</div>
      <dialog-actions-bar>
        <button class="k-button" @click="toggleDialog">Keep shopping</button>
        <button class="k-button" @click="toggleDialog">Check out</button>
      </dialog-actions-bar>
    </k-dialog>
  </div>
</template>

<script>
import { dollars } from "../filters";

export default {
  name: "shoppingCart",
  data: function() {
    return {
      visibleDialog: false     
    };
  },
  filters: {
    dollars
  },
  methods: {
    toggleDialog() {
      this.visibleDialog = !this.visibleDialog;
    },
    removeFromCart(index) {
      this.$store.dispatch("removeFromCart", index);
    }
  },
  computed: {
    inCart() {
      return this.$store.getters.inCart;
    },
    total() {
      return this.cart.reduce((acc, cur) => acc + cur.totalPerPurchase, 0);
    },
    cart() {
      let cartList = [];
      let currentList = this.$store.getters.inCart;

      currentList.forEach(element => {
        let current = this.$store.getters.getWheelDetails(element.id);
        var newObj = {
          id: element.id,
          count: element.count,
          brand: current.Brand,
          price: current.Price,
          name: current.Name,
          totalPerPurchase: element.count * current.Price
        };
        cartList.push(newObj);
      });
      return cartList;
    },
    numInCart() {
      return this.inCart.length;
    }
  }
};
</script>

<style>
#cardBtn{
  border: 2px solid #fd5a4e;
  color: #fd5a4e;
  background-color: white;  
  font-weight: bold;
  margin: 20px;
  padding: 15px 30px;
  border-radius: 7px; 
}

#cardBtn img{
  max-height: 20px;
}

#cardBtn:hover{
color: #df2e21;
border: 2.3px solid #df2e21;
}
</style>