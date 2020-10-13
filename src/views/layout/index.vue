
<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <img :src="menuImg" @click="ChangeCollapse" /> -->
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div class="fixed-header">
        <main-header />
        <!-- <hr /> -->
        <!-- <main-tags /> -->
        <tags />
        <!-- <hr /> -->
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import appMain from "@/views/layout/components/AppMain"; //页面布局的右侧区域
import sidebar from "@/views/layout/components/sidebar"; //页面布局的左侧菜单
//import sidebar from "../layout/components/mySidebar/index";
import mainHeader from "../layout/components/header/mainHeader"; //头部
import mainTags from "../layout/components/header/mainTags"; //标签
import tags from "../layout/components/tags";

import store from "@/store/index";
export default {
  name: "layout",
  components: {
    sidebar,
    appMain,
    mainHeader,
    mainTags,
    tags,
  },
  data() {
    return {
      device: "mobile",
      openSidebar: false,
      fixedHeader: "",
      needTagsView: true,
      menuImg: require("../../assets/menu.png"),
    };
  },
  methods: {
    //改变菜单伸缩
    ChangeCollapse: function name(params) {
      var collapse = store.getters.isCollapse;
      store.dispatch("collapse", !collapse);
    },
  },
  computed: {
    classObj() {
      console.log(store.getters.isCollapse);
      return {
        hideSidebar: store.getters.isCollapse,
        openSidebar: !store.getters.isCollapse,
        withoutAnimation: false,
        mobile: "mobile",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

// .app-wrapper {
//   @include clearfix;
//   position: relative;
//   height: 100%;
//   width: 100%;

//   &.mobile.openSidebar {
//     position: fixed;
//     top: 0;
//   }
// }

// .drawer-bg {
//   background: #000;
//   opacity: 0.3;
//   width: 100%;
//   top: 0;
//   height: 100%;
//   position: absolute;
//   z-index: 999;
// }

// .fixed-header {
//   position: fixed;
//   top: 0;
//   right: 0;
//   z-index: 9;
//   width: calc(100% - #{$sideBarWidth});
//   transition: width 0.28s;
// }

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
// .line {
//   width: 100%;
// }
</style>
