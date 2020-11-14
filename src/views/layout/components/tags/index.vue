<template>
  <!-- <div id="tags-view-container" class="tags-view-container"> -->
  <div>
    <!-- scroll-pane -->
    <router-link :to="activeIndex">
      <el-tabs
        v-model="activeIndex"
        type="card"
        closable
        @tab-click="tabClick"
        v-if="options.length"
        @tab-remove="tabRemove"
        @contextmenu.native.prevent="handleClickContextMenu($event)"
      >
        <el-tab-pane
          :key="index"
          v-for="(item, index) in options"
          :label="item.name"
          :name="item.path"
        >
        </el-tab-pane>
      </el-tabs>
    </router-link>
    <ul
      class="contextmenu"
      :style="{ left: menuLeft, top: menuTop }"
      v-show="contextMenuVisible"
    >
      <li href="javascript:;" @click="refresh" v-if="activeIndex === tagIndex">
        刷新
      </li>
      <li href="javascript:;" @click="close">关闭</li>
      <li href="javascript:;" @click="closeOther">关闭其它</li>
      <li href="javascript:;" @click="closeAll">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import store from "@/store";
import { open, close } from "@/utils/loading";
export default {
  name: "tags",
  data() {
    return {
      contextMenuVisible: false, //控制右键菜单是否显示
      menuLeft: "", //右键菜单距离左边的距离
      menuTop: "", //右键菜单距离顶部的距离
      tagIndex: "", //当前页面的路由
      tag: {}, //当前点击的tag对象
    };
  },
  methods: {
    //

    //tag右键事件

    handleClickContextMenu(e) {
      if (e.srcElement.id) {
        //截取右键tab的路由
        let currentContextTabId = e.srcElement.id.substring(4);
        this.tagIndex = currentContextTabId;
        this.contextMenuVisible = true;
        //this.$store.commit("saveCurContextTabId", currentContextTabId);
        this.menuLeft = e.clientX - 200 + "px";
        this.menuTop = e.layerY + 100 + "px";
      }
    },
    // tab切换时，动态的切换路由
    tabClick(tab) {
      let path = this.activeIndex;
      //this.$router.push({ path: path, replace: true });
    },
    //删除tab
    tabRemove(targetName) {
      // 首页不可删除
      if (targetName == "/dashboard") {
        return;
      }
      // this.$store.commit("delete_tabs", targetName);
      store.dispatch("deleteTab", targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit(
            "set_active_index",
            this.options[this.options.length - 1].path
          );
          this.$router.push({ path: this.activeIndex });
        } else {
          this.$router.push({ path: "/dashboard" });
        }
      }
    },
    //右键菜单
    //刷新
    refresh() {
      //this.$store.dispatch("deleteTab", this.tagIndex);
      const fullPath = this.tagIndex;
      this.redirectFun(fullPath);
      // this.$nextTick(() => {
      //   this.$router.replace({
      //     path: "/redirect" + fullPath,
      //   });
      // });
    },
    redirectFun(fullPath) {
      this.$nextTick(() => {
        this.$router.replace({
          path: "/redirect" + fullPath,
        });
      });
    },
    //关闭
    close() {
      let all = this.options;
      store.dispatch("deleteTab", this.tagIndex);
      //var last = all.pop();
    },
    //关闭其他
    closeOther() {
      let all = this.options;
      //循环删除
      all
        .filter((f) => f.path != this.tagIndex)
        .forEach((element) => {
          store.dispatch("deleteTab", element.path);
        });
      //this.$router.push({ path: "/dashboard" });
    },
    //关闭所有
    closeAll() {
      var all = this.options;
      store.dispatch("close_all_tab");
      this.$router.push({ path: "/dashboard" });
    },
  },
  mounted() {
    //获取 sessionStorage 中的标签数据，用于更新vuex中的标签对象
    if (sessionStorage.getItem("tabs")) {
      let tabs = JSON.parse(sessionStorage.getItem("tabs"));
      //更新标签数组
      this.$store.state.tag.options = tabs;
      let activeIndex = sessionStorage.getItem("activeIndex");
      //更新当前页
      this.$store.state.tag.activeIndex = activeIndex;
    }
  },
  computed: {
    options() {
      let urls = store.getters.menuUrls;
      var result = store.getters.options.filter((item) => {
        var index = urls.indexOf(item.path);
        if (index >= 0) {
          return item;
        } else {
          //store.dispatch("deleteTab", item.path);
        }
      });
      // return result;
      return store.getters.options;
    },
    activeIndex: {
      get() {
        return store.getters.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
        //store.dispatch("setActiveIndex", val);
      },
    },
  },

  watch: {
    contextMenuVisible(value) {
      window.addEventListener("click", (e) => {
        const target = e.target;
        this.contextMenuVisible = false;
      });
    },
  },
};
</script>

</style>
<style lang="scss" scoped>
// .template-tabs {
//   position: relative;
// }
.el-tabs {
  //border: 1px solid red;
  height: 41px;
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
}
.contextmenu li {
  margin: 0;
  padding: 7px 16px;
}
.contextmenu li:hover {
  background: #f2f2f2;
  cursor: pointer;
}

.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
}
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
