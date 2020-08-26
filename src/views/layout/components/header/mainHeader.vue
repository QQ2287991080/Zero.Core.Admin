<template>
  <div class="main-header-container">
    <div >
     <el-avatar v-if="avater" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
     <el-avatar v-else>{{userName}}</el-avatar>
    </div>
  </div>
</template>
<script>
import store from '@/store/index'
export default {
  
  name: "mainHeader",
  props: [],
  data(){
    return{
      avater:false,
      userName:''
    }
  },
  created()
  {
      if(store.getters.avater)
      {
        this.avater=true
      }
      else{
        this.userName=!store.getters.userName?"Zero":store.getters.userName
      }
  }
};
</script>


<style scoped>
.main-header-container{
   height: 80px;
   width: 100%;
   /* background-color: rgb(48, 65, 86); */
   background-color:#ffffff;
   box-shadow:2px 0px 15px 0px rgba(0,0,0,0.3);
}
</style>