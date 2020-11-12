<template>
  <div class="menu-wrapper">
    <!-- <template v-for="(item,index) in menus">
            <el-submenu :index="index+''" :key='index'>
                <template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
                <el-submenu v-for="(child,a) in item.menuItems" :index="index+'-'+a" :key="index+'-'+a">
                    <template slot="title"><i></i>{{child.name}}</template>
                    <el-menu-item v-for="(child,b) in child.menuItems" :index="child.url" :key="b"><i></i>{{child.name}}</el-menu-item>
                </el-submenu>
            </el-submenu>
    </template>-->
    <template v-for="item in menus">
      <!--没有子级的列表-->
      <!-- <router-link v-if="!(item.menuItems.length!=0)" :to="item.url"
      :key="item.name">-->
      <el-menu-item
        v-if="!(item.childrens.length != 0)"
        :index="item.url"
        :key="item.url"
        @click="addTags(item.url, item.name)"
      >
        <!-- <i :class="item.icon"></i> -->
        <chooseIcon
          :iconType="item.iconType === 1 ? 'el' : 'svg'"
          :iconName="item.icon"
        />
        <template slot="title">
          <span class="el-first-menu-span" slot="title">{{ item.name }}</span>
        </template>
      </el-menu-item>
      <!-- </router-link> -->
      <!--有子级的列表-->
      <el-submenu v-else :index="item.name || item.id" :key="item.name">
        <template slot="title">
          <!-- <i :class="item.icon"></i> -->
          <chooseIcon
            :iconType="item.iconType === 1 ? 'el' : 'svg'"
            :iconName="item.icon"
          />
          <span class="222" slot="title">{{ item.name }}</span>
        </template>

        <template v-for="child in item.childrens">
          <!--下面再有子级时进行递归调用-->
          <sidebar-item
            class="nest-menu"
            v-if="child.childrens && child.childrens.length > 0"
            :menus="[child]"
            :key="child.id"
          ></sidebar-item>
          <!--下面没有子级时进行展示-->
          <!-- <router-link v-else :to="item.id" :key="child.name"> -->
          <el-menu-item
            @click="addTags(child.url, child.name)"
            :index="child.url"
            :key="child.url"
          >
            <!-- <i :class="child.icon"></i> -->
            <chooseIcon
              :iconType="child.iconType === 1 ? 'el' : 'svg'"
              :iconName="child.icon"
            />
            <span class="333" slot="title">{{ child.name }}</span>
          </el-menu-item>
          <!-- </router-link> -->
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import chooseIcon from "../icon";
import store from "@/store";
export default {
  components: {
    chooseIcon,
  },
  name: "sidebarItem",
  props: ["menus"],
  methods: {},
  created() {
    //  console.log(this.menus);
  },
  hasOneShowingmenuItems(menuItems) {
    const showingmenuItems = menuItems.filter((item) => {
      return !item.hidden;
    });
    if (showingmenuItems.length === 1) {
      return true;
    }
    return false;
  },
  methods: {
    //将当前路由的路由信息添加到 tabs集合中
    addTags(path, title) {
      //单个对象
      let option = { path: path, name: title };
      //store中是否存在
      var flag = true;
      //循环判断路由是否存在，存在的话更改activeIndex，跳转到对应页面
      this.options.forEach((element) => {
        //如果path 存在
        if (element.path === path) {
          flag = false;
        }
      });
      if (flag) {
        //添加
        store.dispatch("addTab", option);
      }
    },
  },
  computed: {
    options() {
      return store.getters.options;
    },
  },
  watch: {
    //监听路由变化，更新tab的activeIndex
    $route: {
      handler: function (route) {
        console.log(store.getters.menuUrls);
        let index = store.getters.menuUrls.indexOf(route.path);
        var white = ["/dashboard", "/"];
        if (index < 0 && white.indexOf(route.path) < 0) {
          console.log(index);
          this.$router.push({ path: "/401", replace: true });
        }
        //console.log(route.path);
        store.dispatch("setActiveIndex", route.path);
      },
      immediate: true,
    },
  },
};
</script>
<style>
</style>
