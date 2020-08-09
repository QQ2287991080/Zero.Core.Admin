<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
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
      <sidebar-item :menus="permission_menus"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItem from "./sidebarItem";

export default {
  data() {
    return {
      menus: [],
    };
  },
  components: { sidebarItem },
  computed: {
    ...mapGetters(["permission_menus", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    path() {
      return "/" + this.$route.path.split("/")[1];
    },
  },
};
</script>
<style lang="">
</style>