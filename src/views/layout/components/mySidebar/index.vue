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
import sidebarItem from "./menuSidebar";

export default {
  data() {
    return {
      menus: [],
    };
  },
  components: { sidebarItem },
  computed: {
    ...mapGetters(["menu", "sidebar"]),
    isCollapse() {
      // return !this.sidebar.opened;
      return false;
    },
    path() {
      return "/" + this.$route.path.split("/")[1];
    },
  },
};
</script>
<style lang="">
</style>