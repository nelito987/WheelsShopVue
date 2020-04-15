<template>
  <div>
    <span>
      <button id="cardBtn" class="k-button" @click="toggleDialog">Cart ({{ numInCart }})</button>
    </span>
    <k-dialog v-if="visibleDialog" :title="'Shopping Cart'" @close="toggleDialog">
      <div v-if="numInCart > 0">
        <table class="table">
          <tbody>
            <tr v-for="(item, index) in cart" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.brand }}</td>
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
          brand: current.brand,
          price: current.price,
          name: current.name,
          totalPerPurchase: element.count * current.price
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