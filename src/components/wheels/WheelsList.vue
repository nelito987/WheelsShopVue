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
      <template v-slot:myTemplate="{props}">
        <td>          
          <img class="image" :src="getNestedValue(props.field, props.dataItem)" alt />
        </td>
      </template>
    </Grid>
  </div>
</template>

<script>
//import { Grid, GridToolbar, GridNoRecords } from "@progress/kendo-vue-grid";

import { filterBy } from "@progress/kendo-data-query";

function getNestedValue(fieldName, dataItem) {
  const path = fieldName.split(".");
  let data = dataItem;
  path.forEach(p => {
    data = data ? data[p] : undefined;
  });
  console.log(data);
  return data;
}

export default {
  data() {
    return {
      wheelsData: [
        {
          id: 1,
          brand: "OZ",
          name: "Ultraleggera",
          holes: 5,
          PCD: 115,
          offset: 35,
          imageUrl:
            "https://www.baanvelgen.com/media/catalog/product/cache/1/image/85e4522595efc69f496374d01ef2bf13/o/z/oz-hyper-gt-wheels-star-graphite.jpg"
        },
        {
          id: 2,
          brand: "Fondmetal",
          name: "7600",
          holes: 5,
          PCD: 114.3,
          offset: 40,
          imageUrl:
            "https://www.felgenoutlet.com/rims-images/151/347/popup/oz_leggera_hlt_gloss_black.jpg?1475782616"
        },
        {
          id: 3,
          brand: "OZ",
          name: "Superturismo",
          holes: 4,
          PCD: 100,
          offset: 35,
          imageUrl:
            "https://www.felgenoutlet.com/rims-images/151/347/popup/oz_leggera_hlt_gloss_black.jpg?1475782616"
        },
        {
          id: 4,
          brand: "OZ",
          name: "Allegerita",
          holes: 5,
          PCD: 108,
          offset: 45,
          imageUrl:
            "https://www.felgenoutlet.com/rims-images/151/347/popup/oz_leggera_hlt_gloss_black.jpg?1475782616"
        }
      ],
      filter: {
        logic: "and",
        filters: []
      }
    };
  },
  computed: {
    wheels: function() {
      return filterBy(this.wheelsData, this.filter);
    },
    columns: function() {
      return [
        { field: "brand", title: "Brand" },
        { field: "name", title: "Name" },
        { field: "PCD", title: "PCD" },
        { field: "holes", title: "Holes" },
        { field: "offset", title: "Offset" },
        { field: "imageUrl", title: "", cell: "myTemplate", filterable: false }
      ];
    }
  },
  methods: {
    filterChange: function(ev) {
      this.filter = ev.filter;
    },
    getNestedValue: getNestedValue
  }
};
</script>

<style scoped>
.image {
  max-width: 150px;
}
.k-grid{
   height: 100% !important;
   width: 100% !important;
}
</style>