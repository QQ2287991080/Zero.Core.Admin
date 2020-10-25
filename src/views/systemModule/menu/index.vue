<template>
  <div class="menu">
    <div class="menu-left">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <div class="custom-tree-container">
        <div class="block">
          <el-tree
            :data="data"
            :show-checkbox="false"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            ref="tree"
            :filter-node-method="filterNode"
            :props="defaultProps"
            icon-class="el-icon-menu"
            @node-click="handkeNodeClikc"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="新增子菜单"
                  placement="top-start"
                >
                  <el-button
                    type="text"
                    icon="el-icon-bottom"
                    @click="() => appendChildren(data)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="新增平级菜单"
                  placement="top-start"
                >
                  <el-button
                    type="text"
                    size="mini"
                    icon="el-icon-add-location"
                    @click="() => append(data)"
                  >
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="修改"
                  placement="top-start"
                >
                  <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="() => updateTree(data)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除"
                  placement="top-start"
                >
                  <el-button
                    type="text"
                    size="mini"
                    icon="el-icon-delete"
                    @click="() => remove(node, data)"
                  >
                  </el-button>
                </el-tooltip>
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
      :title="formTitle"
      @close="closeForm('form')"
      :destroy-on-close="true"
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
      if (value === "" || value === null) {
        callback(new Error("请输入名称"));
      } else {
        var id = this.form.id;
        //调取接口
        var validateData = { name: value, id: id };
        isExistsName(validateData).then((res) => {
          let any = res.data.data;
          if (any) {
            callback(new Error("名称已存在，请重新输入"));
          } else {
            callback();
          }
        });
      }
    };
    var validUrl = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("请输入路由"));
      } else {
        callback();
      }
    };
    return {
      filterText: "",
      formTitle: "", //表单标题
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
          return false;
        });
      close();
    },
    //点击提交表单
    submit(form) {
      //关闭弹窗
      this.$refs[form].validate((vaild) => {
        let submitForm = this.form;
        if (vaild) {
          open();
          //提交表单
          if (submitForm.id === 0) {
            //新增菜单
            addMenu(submitForm)
              .then((res) => {
                this.$message({
                  type: "success",
                  message: res.data.errMsg,
                });
                this.dialogFormVisible = false;
                this.getTree();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            //修改表单
            updateMenu(submitForm)
              .then((res) => {
                this.$message({
                  type: "success",
                  message: res.data.errMsg,
                });
                this.dialogFormVisible = false;
                this.getTree();
              })
              .catch((err) => {
                console.log(err);
              });
          }
          close();
          console.log("😘");
        } else {
          console.log("😘");
        }
      });
    },
    //清空表单
    closeForm(form) {
      this.$refs[form].resetFields();
      this.form = {
        id: 0,
        name: "", //菜单名称
        url: "", //对应router
        icon: "", //菜单的图标
        iconType: "", //图标的类型
        className: "", //样式名称
        sort: 0, //菜单排序
        isAllow: true, //是否启用
        idParent: "", //父级id
      };
    },
    //过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //点击树节点
    handkeNodeClikc(data) {
      console.log(data);
    },
    //#region 新增子菜单
    //新增子菜单
    appendChildren(data) {
      this.dialogFormVisible = true;
      this.formTitle = "新增子菜单";
      this.form.idParent = data.id;
    },
    //#endregion
    //#region  新增平级菜单
    //新增节点
    append(data) {
      this.form.idParent = data.idParent;
      this.formTitle = "新增平级菜单";
      this.dialogFormVisible = true;
    },
    //#endregion

    //#region  修改树节点
    updateTree(data) {
      //详情
      this.dialogFormVisible = true;
      this.menuDetails(data.id);
    },
    //#endregion
    //获取菜单的详情
    menuDetails(id) {
      details({ id: id })
        .then((res) => {
          this.form = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除节点
    remove(node, data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let parameter = { id: data.id };
          deleteMenu(parameter)
            .then((res) => {
              if (res.data.errCode == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新菜单
                this.getTree();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
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