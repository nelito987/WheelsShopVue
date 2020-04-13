<template>
    <div>  {{details.name}} </div>    
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data(){
        return{
            id: this.$route.query.id, 
        }
    },
    
    computed: {        
        details(){            
            return this.$store.getters.getWheelDetails;
        },
        ...mapGetters(["getWheelDetails"])
    }
}
</script>