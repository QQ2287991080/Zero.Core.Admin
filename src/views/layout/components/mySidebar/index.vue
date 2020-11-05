<template>
  <!-- <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened="true"
      router
    >
      <sidebar-item :menus="menu"></sidebar-item>
    </el-menu>
  </el-scrollbar>-->
  <el-menu
    mode="vertical"
    :show-timeout="200"
    :default-active="path"
    :collapse="isCollapse"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    :unique-opened="true"
    router
  >
    <sidebar-item :menus="menu"></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store/index";
import sidebarItem from "./menuSidebar";

export default {
  data() {
    return {
      menus: [],
    };
  },
  components: { sidebarItem },
  computed: {
    //menu
    // ...mapGetters(["menu"]),
    isCollapse() {
      // return !this.sidebar.opened;
      return false;
    },
    menu() {
      return store.getters.menu;
    },
    path() {
      // return "/" + this.$route.path.split("/")[1];
      return store.getters.activeIndex;
    },
  },
};
</script>
<style lang="">
</style>