<template>
  <div class="menu">
    <div class="menu-left">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <div class="custom-tree-container">
        <div class="block">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            ref="tree"
            :filter-node-method="filterNode"
            :props="defaultProps"
            icon-class="el-icon-menu"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">
                  新增
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                >
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
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
    <!-- 新增 form  -->
    <el-dialog
      title="新增菜单"
      @close="closeForm('form')"
      width="450px"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由" :label-width="formLabelWidth">
          <el-input
            v-model="form.url"
            autocomplete="off"
            placeholder="请输入路由例如：/views/test"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="启用" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.isAllow" autocomplete="off"></el-input> -->
          <el-radio v-model="form.isAllow" :label="true">启用</el-radio>
          <el-radio v-model="form.isAllow" :label="false">禁用</el-radio>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input
            v-model="form.icon"
            autocomplete="off"
            placeholder="例如：展示el类型的菜单图标则输入menu即可"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标类型" :label-width="formLabelWidth">
          <el-select v-model="form.iconType" placeholder="请选择图表类型">
            <el-option label="el" :value="1"></el-option>
            <el-option label="svg" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="样式名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.className"
            autocomplete="off"
            placeholder="请输入完整样式名称例如：test-class"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000;
export default {
  data() {
    const validateName = (rule, value, callback) => {
      console.log(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不能小于六位字符"));
      } else {
        //通过验证则走回调不走的话会一直验证
        callback();
      }
    };
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
      form: {
        name: "", //菜单名称
        url: "", //对应router
        icon: "", //菜单的图标
        iconType: "", //图标的类型
        className: "", //样式名称
        sort: 0, //菜单排序
        isAllow: true, //是否启用
        idParent: "", //父级id
      },
      formLabelWidth: "80px",
      //表单验证

      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        url: [{ required: true, message: "请输入路由", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
      dialogFormVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  methods: {
    //点击提交表单
    submit(form) {
      //关闭弹窗
      console.log(this.$refs[form]);
      this.$refs[form].validate((v) => {
        console.log(v);
        if (v) {
          this.dialogFormVisible = false;
          alert("successful");
        } else {
          alert("error");
        }
      });
    },
    //清空表单
    closeForm(form) {
      console.log("close dialog");
      this.$refs[form].resetFields();
    },
    //过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //新增节点
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      console.log(newChild);
      this.dialogFormVisible = true;
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },
    //删除节点
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
//输入框宽度
.el-input__inner {
  width: 100px;
}
.el-input {
  width: 300px;
}
</style>>