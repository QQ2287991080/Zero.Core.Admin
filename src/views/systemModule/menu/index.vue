<template>
  <div class="menu">
    <div class="menu-left">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        :highlight-current="true"
        :default-expand-all="false"
        :filter-node-method="filterNode"
        ref="tree"
      >
      </el-tree>
    </div>
    <div class="menu-right">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },

  data() {
    return {
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-right {
  width: 48%;
  position: absolute;
  left: 50%;
}
.menu-left {
  position: absolute;
  height: 100%;
  width: 48%;
  border-right: 1px solid #dcdfe6;
  .el-input {
    width: 50%;
  }
}
</style>>