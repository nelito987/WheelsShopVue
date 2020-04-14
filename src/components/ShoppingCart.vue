<template>
  <div>
    <span>
      <button id="cardBtn" class="k-button" @click="toggleDialog">Cart ({{ numInCart }})</button>
    </span>
    <k-dialog v-if="visibleDialog" :title="'Shopping Cart'" @close="toggleDialog">
      <!-- <p :style="{ margin: '25px', textAlign: 'center' }"> -->
      <table class="table">
        <tbody>
          <tr v-for="(item, index) in cart" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.brand }}</td>
            <td>{{ item.price | dollars }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">&times;</button>
            </td>
          </tr>
          <tr>
            <th></th>
            <th>{{ total | dollars }}</th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
      <!-- </p> -->
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
      console.log(this.visibleDialog);
      this.visibleDialog = !this.visibleDialog;
    },
     removeFromCart(index) {
      this.$store.dispatch('removeFromCart', index);
    }
  },
  computed: {
    inCart() {
      return this.$store.getters.inCart;
    },
    total() {
      return this.cart.reduce((acc, cur) => acc + cur.price, 0);
    },
    cart() {
      return this.$store.getters.inCart.map(cartItem => {
        return this.$store.getters.wheelsData.find(forSaleItem => {
          return cartItem === forSaleItem.id;
        });
      });
    },
    numInCart() {
      return this.inCart.length;
    }
  }
};
</script>