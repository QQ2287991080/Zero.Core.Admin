<template>
  <div class="menu-wrapper">
    <!-- 遍历路由 -->
    <template v-for="item in routes">
      <template v-if="!item.hidden&&item.children">
        <!-- 只有一个children 并且改子集下面没有子集  简而言之菜单只有一级 -->
        <router-link
          v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow"
          :to="item.path+item.children[0].path"
          :key="item.children[0].name"
        >
          <!-- 渲染菜单 -->
          <el-menu-item
            :index="item.path+item.children[0].path"
            :class="{'submenu-title-noDropdown':!isNest}"
          >
            <svg-icon :icon-class="item.children[0].meta.icon" />
            <span
              v-if="item.children[0].meta&&item.children[0].meta.title"
            >{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>
        <!-- 生成二级菜单 -->
        <el-submenu v-else :index="item.name||item.path" :key="item.name">
          <template slot="title">
            <span v-if="item.meta&&item.meta.title">
              <svg-icon :icon-class="item.meta.icon" />
              <!-- <i :class="iconClass(item.meta.icon)" /> -->
              {{item.meta.title}}
            </span>
          </template>
          <!-- 遍历子集 -->
          <template v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item
                :is-nest="true"
                class="nest-menu"
                v-if="child.children&&child.children.length>0"
                :routes="[child]"
                :key="child.path"
              ></sidebar-item>
              <router-link v-else :to="child.path" :key="child.name">
                <el-menu-item :index="child.path">
                  <svg-icon :icon-class="child.meta.icon" />
                  <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-submenu>
      </template>
    </template>
  </div>
</template>

<script>
export default {
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
      console.log(icon);
      return icon;
    },
  },
};
</script>
<style>
</style
