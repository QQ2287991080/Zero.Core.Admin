<template>
  <div class="menu-wrapper">
    <!-- 遍历路由 -->
    <template v-for="item in routes">
      <template v-if="!item.hidden && item.children">
        <!-- 只有一个children 并且改子集下面没有子集  简而言之菜单只有一级 -->
        <router-link
          v-if="
            item.children.length === 1 &&
            !item.children[0].children &&
            !item.alwaysShow
          "
          :to="item.path + item.children[0].path"
          :key="item.children[0].name"
        >
          <!-- 生成一级菜单 -->
          <el-menu-item
            @click="
              addTags(
                item.path + item.children[0].path,
                item.children[0].meta.title
              )
            "
            :index="item.path + item.children[0].path"
            :class="{ 'submenu-title-noDropdown': isNest }"
          >
            <chooseIcon
              :iconType="item.children[0].meta.iconType"
              :iconName="item.children[0].meta.icon"
            />
            <!-- <svg-icon
              v-if="item.children[0].meta.iconType === 'svg'"
              :icon-class="item.children[0].meta.icon"
            />
            <i v-else :class="'el-icon-' + item.children[0].meta.icon" /> -->
            <template slot="title">
              <span
                class="el-first-menu-span"
                v-if="item.children[0].meta && item.children[0].meta.title"
                >{{ item.children[0].meta.title }}</span
              >
            </template>
          </el-menu-item>
          <!-- 生成一级菜单 -->
        </router-link>
        <!-- 生成二级菜单 -->
        <el-submenu v-else :index="item.name || item.path" :key="item.name">
          <template slot="title">
            <!-- <svg-icon :icon-class="item.meta.icon" /> -->
            <chooseIcon
              :iconType="item.meta.iconType"
              :iconName="item.meta.icon"
            />
            <span v-if="item.meta && item.meta.title">
              <!-- <i :class="iconClass(item.meta.icon)" /> -->
              {{ item.meta.title }}
            </span>
          </template>
          <!-- 遍历子集 -->
          <template v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item
                :is-nest="true"
                class="nest-menu"
                v-if="child.children && child.children.length > 0"
                :routes="[child]"
                :key="child.path"
              ></sidebar-item>
              <router-link v-else :to="child.path" :key="child.name">
                <el-menu-item
                  @click="addTags(child.path, child.meta.title)"
                  :index="child.path"
                >
                  <!-- <svg-icon :icon-class="child.meta.icon" /> -->
                  <chooseIcon
                    :iconType="child.meta.iconType"
                    :iconName="child.meta.icon"
                  />
                  <span v-if="child.meta && child.meta.title">{{
                    child.meta.title
                  }}</span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
          <!-- 遍历自己 -->
        </el-submenu>
        <!-- 生成二级菜单 -->
      </template>
    </template>
  </div>
</template>

<script>
import store from "@/store";
import chooseIcon from "../icon";
export default {
  components: {
    chooseIcon,
  },
  name: "sidebarItem",
  props: {
    routes: {
      type: Array,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    iconClass(icon) {
      return icon;
    },
    addTags(path, title) {
      console.log(path);
      var route = this.route;
      var option = { route: path, name: title };

      //store中是否存在
      var flag = true;
      this.options.forEach((element) => {
        if (element.route === path) {
          flag = false;
        }
      });
      if (flag) {
        store.commit("add_tabs", option);
      }
      store.commit("set_active_index", path);
      // // 刷新时以当前路由做为tab加入tabs
      // if (
      //   this.$route.path !== "/" &&
      //   this.$route.path.indexOf("userInfo") == -1
      // ) {
      //   store.commit("add_tabs", { route: "/", name: "首页" });
      //   store.commit("add_tabs", {
      //     route: path,
      //     name: title,
      //   });
      //   store.commit("set_active_index", this.$route.path);
      // } else {
      //   store.commit("add_tabs", { route: "/", name: "首页" });
      //   store.commit("set_active_index", "/");
      //   this.$router.push("/");
      // }
    },
  },
  computed: {
    options() {
      return store.getters.options;
    },
  },
  mounted() {
    //  if (
    //     this.$route.path !== "/" &&
    //     this.$route.path.indexOf("userInfo") == -1
    //   ) {
    //     store.commit("add_tabs", { route: "/", name: "首页" });
    //     store.commit("add_tabs", {
    //       route: this.$route.path,
    //       name: this.$route.name,
    //     });
    //     store.commit("set_active_index", this.$route.path);
    //   } else {
    //     store.commit("add_tabs", { route: "/", name: "首页" });
    //     store.commit("set_active_index", "/");
    //     this.$router.push("/");
    //   }
  },
};
</script>
<style>
.el-first-menu-span {
  margin-left: 5px;
}
</style>
