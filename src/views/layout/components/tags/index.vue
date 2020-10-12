<template>
  <div class="template-tabs">
    <el-tabs
      v-model="activeIndex"
      type="border-card"
      closable
      @tab-click="tabClick"
      v-if="options.length"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        :key="index"
        v-for="(item, index) in options"
        :label="item.name"
        :name="item.route"
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
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      if (this.activeIndex === "/userInfo") {
        path = this.activeIndex + "/" + this.$store.state.userInfo.name;
      }
      this.$router.push({ path: path });
    },
    tabRemove(targetName) {
      // 首页不可删除
      if (targetName == "/") {
        return;
      }
      this.$store.commit("delete_tabs", targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit(
            "set_active_index",
            this.options[this.options.length - 1].route
          );
          this.$router.push({ path: this.activeIndex });
        } else {
          this.$router.push({ path: "/" });
        }
      }
    },
  },
  computed: {
    options() {
      console.log(store.getters.options);
      return store.getters.options;
    },
    activeIndex: {
      get() {
        //  console.log(store.getters.activeIndex);
        return store.getters.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
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

<style>
</style>