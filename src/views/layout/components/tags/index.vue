<template>
  <div class="template-tabs">
    <el-tabs
      v-model="activeIndex"
      type="card"
      closable
      @tab-click="tabClick"
      v-if="options.length"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        :key="index"
        v-for="(item, index) in options"
        :label="item.name"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "tags",
  methods: {
    // tab切换时，动态的切换路由
    tabClick(tab) {
      let path = this.activeIndex;
      this.$router.push({ path: path });
    },
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
          this.$router.push({ path: "/" });
        }
      }
    },
  },
  mounted() {
    if (sessionStorage.getItem("tabs")) {
      let tabs = JSON.parse(sessionStorage.getItem("tabs"));
      console.log(store.getters.options);
      this.$store.state.tag.options = tabs;
      console.log(store.getters.options);

      let activeIndex = sessionStorage.getItem("activeIndex");
      this.$store.state.tag.activeIndex = activeIndex;
    }
  },
  computed: {
    options() {
      return store.getters.options;
    },
    activeIndex: {
      get() {
        // return store.getters.activeIndex;
        return store.getters.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
        //store.dispatch("setActiveIndex", val);
      },
    },
  },
  watch: {
    // $route(to) {
    //   let flag = false;
    //   for (let option of this.options) {
    //     if (option.name === to.name) {
    //       flag = true;
    //       this.$store.commit("set_active_index", "/" + to.path.split("/")[1]);
    //       break;
    //     }
    //   }
    //   if (!flag) {
    //     this.$store.commit("add_tabs", {
    //       route: "/" + to.path.split("/")[1],
    //       name: to.name,
    //     });
    //     this.$store.commit("set_active_index", "/" + to.path.split("/")[1]);
    //   }
    // },
  },
};
</script>

</style>
<style lang="scss" scoped>
.el-tabs {
  //border: 1px solid red;
  height: 41px;
}
</style>
