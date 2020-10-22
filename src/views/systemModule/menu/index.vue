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
            node-key="name"
            default-expand-all
            :expand-on-click-node="false"
            ref="tree"
            :filter-node-method="filterNode"
            :props="defaultProps"
            icon-class="el-icon-menu"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-add-location"
                  @click="() => append(data)"
                >
                </el-button>
                <el-button type="text" icon="el-icon-edit" circle></el-button>
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-delete"
                  @click="() => remove(node, data)"
                >
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
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input
            v-model.trim="form.name"
            autocomplete="off"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由" prop="url" :label-width="formLabelWidth">
          <el-input
            v-model.trim="form.url"
            autocomplete="off"
            placeholder="请输入路由例如：/views/test"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort" :label-width="formLabelWidth">
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
        <el-form-item
          label="父级id"
          style="display: none"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.idParent"
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
import { open, close } from "@/utils/loading";
import {
  getMenuTree,
  isExistsName,
  details,
  deleteMenu,
  addMenu,
  updateMenu,
} from "@/api/menu";
let id = 1000;
export default {
  data() {
    //验证菜单名称
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名称"));
      } else {
        var id = this.form.id;
        //调取接口
        var validateData = { name: value, id: id };
        isExistsName(validateData).then((res) => {
          let any = res.data.data;
          if (any) {
            callback(new Error("名称已存在，请重新输入"));
          }
        });
        callback();
      }
    };
    var validUrl = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入路由"));
      }
      callback();
    };
    return {
      filterText: "",
      data: [],
      form: {
        id: 0,
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
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        url: [{ required: true, validator: validUrl, trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
      defaultProps: {
        children: "childrens",
        label: "name",
      },
      dialogFormVisible: false,
      dialogVisible: false,
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
    //树--关键字搜索
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    //初始化树
    this.getTree();
  },
  methods: {
    //加载菜单树
    getTree() {
      open();
      getMenuTree()
        .then((res) => {
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      close();
    },
    //点击提交表单
    submit(form) {
      open();
      //关闭弹窗\
      this.$refs[form].validate((vaild) => {
        if (vaild) {
          this.dialogFormVisible = false;
          alert("success");
        } else {
          alert("err");
        }
      });
      close();
    },
    //清空表单
    closeForm(form) {
      this.$refs[form].resetFields();
    },
    //过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //新增节点
    append(data) {
      this.form.idParent = data.idParent;
      this.dialogFormVisible = true;
    },
    //删除节点
    remove(node, data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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