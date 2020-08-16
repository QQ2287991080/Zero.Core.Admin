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
      <el-menu-item v-if="!(item.children.length!=0)" :index="item.url" :key="item.url">
        <!-- <i :class="item.icon"></i> -->
        <svg-icon :icon-class="item.icon" />
        <span class="111" slot="title">{{item.name}}</span>
      </el-menu-item>
      <!-- </router-link> -->
      <!--有子级的列表-->
      <el-submenu v-else :index="item.name||item.id" :key="item.name">
        <template slot="title">
          <!-- <i :class="item.icon"></i> -->
          <svg-icon :icon-class="item.icon" />
          <span class="222" slot="title">{{item.name}}</span>
        </template>

        <template v-for="child in item.children">
          <!--下面再有子级时进行递归调用-->
          <sidebar-item
            class="nest-menu"
            v-if="child.children&&child.children.length>0"
            :menus="[child]"
            :key="child.id"
          ></sidebar-item>
          <!--下面没有子级时进行展示-->
          <!-- <router-link v-else :to="item.id" :key="child.name"> -->
          <el-menu-item :index="child.url" :key="child.url">
            <!-- <i :class="child.icon"></i> -->
            <svg-icon :icon-class="child.icon" />
            <span class="333" slot="title">{{child.name}}</span>
          </el-menu-item>
          <!-- </router-link> -->
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: "sidebarItem",
  props: ["menus"],
  methods: {
    hasOneShowingmenuItems(menuItems) {
      const showingmenuItems = menuItems.filter((item) => {
        return !item.hidden;
      });
      if (showingmenuItems.length === 1) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style>
</style>
