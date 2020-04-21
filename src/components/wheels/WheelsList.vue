<template>
  <div class="content">
    <h2>Wheels List</h2>

    <Grid
      :data-items="wheels"
      :filterable="true"
      :filter="filter"
      :height="1500"
      @filterchange="filterChange"
      :columns="columns"
    >
      <template v-slot:imgTemplate="{props}">
        <td>
          <img class="image" :src="getNestedValue(props.field, props.dataItem)" alt />
        </td>
      </template>
      <template v-slot:buyBtnTemplate="{props}">
        <kendo-button @click="buyWheel(props.dataItem.id)">Buy</kendo-button>
      </template>
    </Grid>
  </div>
</template>

<script>
//import { Grid, GridToolbar, GridNoRecords } from "@progress/kendo-vue-grid";
import { filterBy } from "@progress/kendo-data-query";
import { mapActions, mapGetters } from "vuex";

function getNestedValue(fieldName, dataItem) {
  const path = fieldName.split(".");
  let data = dataItem;
  path.forEach(p => {
    data = data ? data[p] : undefined;
  });
  return data;
}

export default {
  data() {
    return {
      filter: {
        logic: "and",
        filters: []
      }
    };
  },
  mounted() {
    return this.loadAllWheels();
  },
  methods: {
    ...mapActions({ loadAllWheels: "getWheels" }),
    filterChange: function(ev) {
      this.filter = ev.filter;
    },
    getNestedValue,
    buyWheel: function(id) {    
      this.$router.push({
        path: "/wheelDetails",
        name: "wheelDetail",
        params: { id: id }
      });
    }
  },
  computed: {
    ...mapGetters(["wheelsData"]),
    wheels: function() {
      return filterBy(this.wheelsData, this.filter);
    },
    columns: function() {
      return [
        {
          field: "Image",
          title: "",
          cell: "imgTemplate",
          filterable: false
        },
        { field: "Brand", title: "Brand" },
        { field: "Name", title: "Name" },
        { field: "PCD", title: "PCD" },
        { field: "Holes", title: "Holes" },
        { field: "Offset", title: "Offset" },
        { field: "Price", title: "Price" },
        { field: "", title: "", filterable: false, cell: "buyBtnTemplate" }
      ];
    }
  }
};
</script>

<style scoped>
.image {
  max-width: 150px;
}
.k-grid {
  height: 100% !important;
  width: 100% !important;
}

.k-filtercell-operator {
  display: none !important;
}

.k-button {
  background: #f7dc6f;
  padding: 25px 50px;
  margin: 30%;
}

td {
  justify-content: center;
}
</style>