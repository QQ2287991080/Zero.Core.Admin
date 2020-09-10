<template>
  <el-menu
    mode="vertical"
    :show-timeout="200"
    :collapse="isCollapse"
    :collapse-transition="false"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    :unique-opened="true"
    router
  >
    <sidebar-item :routes="routes"></sidebar-item>
  </el-menu>
</template>

<script>
import sidebarItem from "./sidebarItem";

export default {
  components: { sidebarItem },
  data() {
    return {
      isCollapse: true,
    };
  },

  computed: {
    routes() {
      //   console.log(this.$router.options.routes);

      //返回菜单
      return this.$router.options.routes;
    },
  },
};
</script>
</style>
