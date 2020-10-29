<template>
  <div class="main-header-container">
    <div class="menu-collapse">
      <!-- <img :src="menuImg" @click="ChangeCollapse" /> -->

      <i class="el-icon-s-unfold" @click="ChangeCollapse" v-show="isCollapse" />
      <i class="el-icon-s-fold" @click="ChangeCollapse" v-show="!isCollapse" />
    </div>
    <div class="box"></div>
    <div class="avater">
      <el-avatar
        v-if="avater"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <el-avatar v-else>{{ userName }}</el-avatar>
    </div>
    <!-- <hr class="line"/> -->
  </div>
</template>
<script>
import store from "@/store/index";
export default {
  name: "mainHeader",
  props: [],
  data() {
    return {
      avater: false,
      userName: "",
      menuImg: require("../../../../assets/menu.png"),
    };
  },
  created() {
    if (store.getters.avater) {
      this.avater = true;
    } else {
      this.userName = !store.getters.userName ? "Zero" : store.getters.userName;
    }
  },
  computed: {
    isCollapse() {
      return store.getters.isCollapse;
    },
  },
  methods: {
    //改变菜单伸缩
    ChangeCollapse: function name(params) {
      var collapse = store.getters.isCollapse;
      store.dispatch("collapse", !collapse);
    },
  },
};
</script>


<style lang="scss" scoped>
.main-header-container {
  overflow: hidden;
  position: relative;
  height: 80px;
  /* background-color: rgb(48, 65, 86); */
  background-color: #ffffff;
  //box-shadow:2px 0px 15px 0px rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
  margin: 0px 0px 5px 0px;
  // .box {
  //   width: 80%;
  // }
  // .menu-collapse {
  //   width: 200px;
  // }
  // .avater {
  //   width: 200px;
  // }
}
.menu-collapse {
  position: absolute;
  left: 10px;
  font-size: 30px;
}
.avater {
  position: absolute;
  right: 50px;
  width: 50px;
  height: 50px;
}
.line {
  width: 100px;
  height: auto;
  border-color: #e7e7e7;
}
</style>