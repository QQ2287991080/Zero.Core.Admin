<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- https://element.eleme.cn/#/zh-CN/component/pagination -->
</template>

<script>
// import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "Pagination",
  props: {
    // 数据总数
    total: {
      required: true,
      type: Number,
    },
    //当前页
    pageIndex: {
      type: Number,
      default: 1,
    },
    //当前页数量
    pageSize: {
      type: Number,
      default: 20,
    },
    //20,50,100数量选择
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    //是否为分页按钮添加背景色
    background: {
      type: Boolean,
      default: true,
    },
    //分页是否回滚
    autoScroll: {
      type: Boolean,
      default: true,
    },
    //是否隐藏分页
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.pageIndex;
      },
      set(val) {
        this.$emit("update:pageIndex", val);
      },
    },
    pageSize: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("update:pageSize", val);
      },
    },
  },
  methods: {
    //改变页数
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        // scrollTo(0, 800);
      }
    },
    //改变页码
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        // scrollTo(0, 800);
      }
    },
  },
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
