<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened="false"
      router
      mode="vertical"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
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

    routes() {
      //   console.log(this.$router.options.routes);

      //返回菜单
      return this.$router.options.routes;
    },
  },
};
</script>
</style>
