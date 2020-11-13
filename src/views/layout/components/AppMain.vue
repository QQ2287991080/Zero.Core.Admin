<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive> -->
      <keep-alive v-if="keepAlive">
        <router-view :key="key"></router-view>
      </keep-alive>
      <router-view v-else :key="key"></router-view>
      <!-- <router-view :key="key" v-if="!keepAlive"></router-view> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    keepAlive() {
      return this.$route.meta.keepAlive;
    },

    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    option() {
      return this.$store.state.tag.option;
    },
    key() {
      var key = this.$route.path !== undefined ? this.$route.path : "";
      // let index = this.$store.getters.options.indexOf((f) => f.path === key);
      // console.log(index);
      // var white = ["/dashboard", "/"];
      // //&& white.indexOf(key) < 0
      // if (index < 0) {
      //   this.$nextTick(() => {
      //     this.$router.replace({
      //       path: "/401",
      //     });
      //   });
      // }

      return key;
    },
  },
};
</script>
<style lang="scss" scoped>
//注释这两段去掉滚动条
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  width: 100%;
  // position: relative;
  overflow: hidden;
}

// .hasTagsView {
//   .app-main {
//     /* 84 = navbar + tags-view = 50 + 34 */
//     min-height: calc(100vh - 84px);
//   }

//   // .fixed-header + .app-main {
//   //   //padding-top: 84px;
//   // }
// }
.fixed-header + .app-main {
  padding-top: 20px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
