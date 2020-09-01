<template>
  <div class="main-header-container">
    <div class="menu-collapse">
      <i class="el-icon-s-fold" />
      <i class="el-icon-s-unfold" />
    </div>
    <div class="box"></div>
    <div class="avater">
     <el-avatar v-if="avater" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
     <el-avatar v-else>{{userName}}</el-avatar>
    </div>
    <!-- <hr class="line"/> -->
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


<style lang="scss" scoped>
.main-header-container{
   height: 80px;
   width: 100%;
   /* background-color: rgb(48, 65, 86); */
   background-color:#ffffff;
   //box-shadow:2px 0px 15px 0px rgba(0,0,0,0.3);
   display: flex;
   justify-content: center;
    align-items: center;
   .box{
     width: 80%;
   }
   .menu-collapse{
     width: 200px;
   }
   .avater{
     width:200px;
   }
   
}
.line{
     width: 100px;
     height: auto;
     border-color: #e7e7e7;
   }

</style>