<template>
  <startComponent />

</template>



<script>

import startComponent from './components/startComponent.vue'


export default {
  name: 'App',
  data(){
    return{
      search: "",
    }
  },

  components:{
    startComponent,
  },

  methods:{
    getUserSearch(search){
   
    console.log(search)
    }
  },
 
  
}
</script>


