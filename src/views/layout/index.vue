<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <main-header />
      <hr class="line" />
      <main-tags />
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import appMain from "@/views/layout/components/AppMain"; //页面布局的右侧区域
import sidebar from "@/views/layout/components/sidebar"; //页面布局的左侧菜单
//import sidebar from "../layout/components/mySidebar/index";
import mainHeader from "../layout/components/header/mainHeader"; //头部
import mainTags from "../layout/components/header/mainTags"; //标签
export default {
  name: "layout",
  components: {
    sidebar,
    appMain,
    mainHeader,
    mainTags,
  },
};
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.line {
  width: 100%;
  height: auto;
  border-color: #e7e7e7;
}
</style>
