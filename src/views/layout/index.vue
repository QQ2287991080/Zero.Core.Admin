
<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <img :src="menuImg" @click="ChangeCollapse" /> -->
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div class="fixed-header">
        <main-header />
        <tags />
      </div>
      <app-main />
    </div>
    <!-- 头像下拉菜单 -->
    <ul class="contextmenu" v-show="avatarMenuVisible">
      <li href="javascript:;" @click="personCenter">个人中心</li>
      <li href="javascript:;">退出</li>
    </ul>
  </div>
</template>

<script>
import appMain from "@/views/layout/components/AppMain"; //页面布局的右侧区域
// import sidebar from "@/views/layout/components/sidebar"; //页面布局的左侧菜单
import sidebar from "../layout/components/mySidebar/index";
import mainHeader from "../layout/components/header/mainHeader"; //头部
import mainTags from "../layout/components/header/mainTags"; //标签
import tags from "../layout/components/tags";

import store from "@/store/index";
import { close } from "../../utils/loading";
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
      visible: false,
    };
  },
  methods: {
    //改变菜单伸缩
    ChangeCollapse: function name(params) {
      var collapse = store.getters.isCollapse;
      store.dispatch("collapse", !collapse);
    },
    //个人中心
    personCenter() {
      console.log("go center");
      this.$router.push({ path: "/personCenter" });
    },
  },

  computed: {
    classObj() {
      return {
        hideSidebar: store.getters.isCollapse,
        openSidebar: !store.getters.isCollapse,
        withoutAnimation: false,
        mobile: "mobile",
      };
    },
    avatarMenuVisible: {
      get() {
        return store.getters.avatarMenuVisible;
      },
      set(val) {
        store.dispatch("avatarMenuVisible", false);
      },
    },
  },
  watch: {
    // avatarMenuVisible(value) {
    //   window.addEventListener("click", (e) => {
    //     const target = e.target;
    //     if (this.visible) {
    //       console.log("--------------");
    //       store.dispatch("avatarMenuVisible", true);
    //     }
    //   });
    // },

    avatarMenuVisible() {
      if (this.avatarMenuVisible) {
        window.addEventListener("click", (e) => {
          const target = e.target;
          store.dispatch("avatarMenuVisible", false);
        });
      }
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

.contextmenu {
  width: 100px;
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
  right: 35px;
  top: 70px;
  text-align: center;
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
