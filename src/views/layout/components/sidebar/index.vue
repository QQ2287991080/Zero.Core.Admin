<template>
  <el-menu
    :show-timeout="200"
    :collapse="isCollapse"
    :collapse-transition="true"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    :default-active="active"
    :unique-opened="false"
    router
    mode="vertical"
  >
    <sidebar-item :routes="routes"></sidebar-item>
  </el-menu>
</template>

<script>
import sidebarItem from "./sidebarItem";
import store from "@/store/index";
import variables from "@/styles/variables.scss";
export default {
  components: { sidebarItem },
  data() {
    return {};
  },

  computed: {
    isCollapse() {
      return store.getters.isCollapse;
    },
    active() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    routes() {
      //返回菜单
      return this.$router.options.routes;
    },
  },
};
</script>
</style>
