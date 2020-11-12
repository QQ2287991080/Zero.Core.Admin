<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
      <!-- <router-view :key="key" v-if="!keepAlive"></router-view> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    keepAlive() {
      // console.log(this.$route);
      // if (this.$route.name === "empty") {
      //   console.log(this.$route.params.redirect);
      //   this.$router.push({ paht: this.$route.params.redirect });
      // }
      return this.$route.meta.keepAlive;
    },

    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      var key = this.$route.path !== undefined ? this.$route.path : "";
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
