<template>
  <div class="main-header-container">
    <div class="menu-collapse">
      <i class="el-icon-s-unfold" @click="ChangeCollapse" v-show="isCollapse" />
      <i class="el-icon-s-fold" @click="ChangeCollapse" v-show="!isCollapse" />
    </div>
    <div class="box"></div>
    <div class="avater" @mouseenter="showMenu()">
      <el-avatar fit="fill" v-if="showAvatar()" :src="avatar"></el-avatar>
      <el-avatar v-else>{{ userName }}</el-avatar>
    </div>
    <ul class="contextmenu" v-show="contextMenuVisible">
      <li href="javascript:;">个人中心</li>
      <li href="javascript:;">退出</li>
    </ul>
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
      menuImg: require("../../../../assets/menu.png"),
      contextMenuVisible: false, //菜单展示
    };
  },
  created() {},
  computed: {
    isCollapse() {
      return store.getters.isCollapse;
    },
    avatar() {
      return store.getters.avatar;
    },
    userName() {
      return store.getters.userName;
    },
  },
  methods: {
    showAvatar() {
      if (this.avatar === "" || this.avatar === null) {
        return false;
      }
      return true;
    },
    //改变菜单伸缩
    ChangeCollapse: function name(params) {
      var collapse = store.getters.isCollapse;
      store.dispatch("collapse", !collapse);
    },
    showMenu() {
      // this.contextMenuVisible = true;
      store.dispatch("avatarMenuVisible", true);
    },
    //个人中心
    personCenter() {},
    //退出
    loginOut() {},
  },
};
</script>


<style lang="scss" scoped>
.main-header-container {
  overflow: hidden;
  height: 80px;
  /* background-color: rgb(48, 65, 86); */
  background-color: #ffffff;
  //box-shadow:2px 0px 15px 0px rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
  margin: 0px 0px 5px 0px;
  position: relative;
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
  cursor: pointer;
  right: 50px;
  width: 50px;
  height: 50px;
}
.line {
  width: 100px;
  height: auto;
  border-color: #e7e7e7;
}
.menu-list {
  width: 100px;
  border: 1px solid red;
  position: absolute;
}
.contextmenu {
  width: 100px;
  height: 200px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
  right: 0px;
  top: 50px;
}
.contextmenu li {
  margin: 0;
  padding: 7px 16px;
}
.contextmenu li:hover {
  background: #f2f2f2;
  cursor: pointer;
}
</style>