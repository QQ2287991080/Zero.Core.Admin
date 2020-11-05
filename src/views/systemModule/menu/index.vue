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
            @node-click="handkeNodeClikc"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span :class="{ 'tree-span': clickKeyClass(data) }"
                ><chooseIcon
                  :iconType="data.iconType === 1 ? 'el' : 'svg'"
                  :iconName="data.icon"
                />{{ data.name }}</span
              >
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
    <!-- 右边权限部分 -->
    <div class="menu-right">
      <el-row>
        <el-button type="primary" size="mini" @click="addPermission">
          新增
        </el-button>
      </el-row>
      <el-table
        header-align="center"
        :data="tableData"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column
          label="操作"
          align="center"
          min-width="150"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row, $index }">
            <el-button
              type="primary"
              size="mini"
              @click="updatePermission(row, $index)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deletePermission(row, $index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="name" label="权限名称" align="center">
        </el-table-column>
        <el-table-column prop="code" label="权限编码" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="memo" label="备注" align="center">
        </el-table-column>
        <!-- <el-table-column prop="isAllow" align="center" label="启用">
          <template slot-scope="scope">
            <span>{{ scope.row.isAllow == true ? "是" : 否 }}</span>
          </template>
        </el-table-column> -->
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
          <el-input
            v-model="form.sort"
            maxlength="2"
            autocomplete="off"
            placeholder="请输入排序0-99"
          ></el-input>
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

    <!-- 权限的弹窗 -->
    <el-dialog
      :title="permissionFormTitle"
      @close="closePermissionForm('permissionForm')"
      :destroy-on-close="true"
      width="450px"
      :visible.sync="dialogPermissionFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="permissionForm"
        ref="permissionForm"
        :rules="permissionRules"
      >
        <el-form-item
          label="权限名称"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.trim="permissionForm.name"
            autocomplete="off"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="权限编码"
          prop="code"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.trim="permissionForm.code"
            autocomplete="off"
            placeholder="请输入编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="memo" :label-width="formLabelWidth">
          <el-input
            v-model.trim="permissionForm.memo"
            autocomplete="off"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item
          style="display: none"
          label="菜单id"
          prop="menuId"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.trim="permissionForm.menuId"
            autocomplete="off"
            placeholder=""
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPermissionFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="submitPermission('permissionForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { open, close } from "@/utils/loading";
import chooseIcon from "../../layout/components/icon/index";
//菜单
import {
  getMenuTree,
  isExistsName,
  details,
  deleteMenu,
  addMenu,
  updateMenu,
} from "@/api/menu";
//权限
import {
  getMenuPermission,
  isExistsCode,
  addPermission,
  updatePermission,
  removePermission,
  detailsPermission,
} from "@/api/permission";
let id = 1000;
export default {
  components: {
    chooseIcon,
  },
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
    //验证权限的code
    var validPermissionCode = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback("请输入编码");
      } else {
        var data = { code: value, id: this.permissionForm.id };
        isExistsCode(data).then((res) => {
          if (res.data.data) {
            callback("编码已存在");
          } else {
            callback();
          }
        });
      }
    };
    return {
      filterText: "",
      formTitle: "", //菜单表单标题
      dialogFormVisible: false, //菜单表单显示隐藏
      //表单验证
      rules: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        // url: [{ required: true, validator: validUrl, trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
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
      permissionFormTitle: "", //权限表单的标题
      dialogPermissionFormVisible: false, //权限表单显示隐藏
      permissionForm: {
        id: 0,
        name: "",
        code: "",
        menuId: 0,
        memo: "",
      },
      permissionRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [
          { required: true, validator: validPermissionCode, trigger: "blur" },
        ],
      },
      data: [],
      formLabelWidth: "80px",
      defaultProps: {
        children: "childrens",
        label: "name",
      },
      ClickKey: 0, //单击菜单
      dialogVisible: false,
      tableData: [],
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
      this.ClickKey = data.id;
      this.getPermissionData();
    },
    getPermissionData() {
      var data = { menuId: this.ClickKey };
      getMenuPermission(data)
        .then((res) => {
          this.tableData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clickKeyClass(data) {
      if (this.ClickKey === data.id) {
        return true;
      } else {
        return false;
      }
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
    //#region  权限管理
    /*
     * 关闭权限弹窗时间
     */
    closePermissionForm(permissionForm) {
      this.$nextTick(() => {
        this.$refs[permissionForm].resetFields();
      });
    },
    /**
     * 提交权限表单（新增修改）
     */
    submitPermission(permissionForm) {
      console.log(this.permissionForm);
      this.$refs[permissionForm].validate((vaild) => {
        let form = this.permissionForm;
        if (vaild) {
          open();
          if (form.id === 0) {
            //新增
            console.log(this.permissionForm);
            addPermission(this.permissionForm)
              .then((res) => {
                this.$message({
                  type: "success",
                  message: res.data.errMsg,
                });
                this.dialogPermissionFormVisible = false;
                this.getPermissionData();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            //更新
            updatePermission(form)
              .then((res) => {
                this.$message({
                  type: "success",
                  message: res.data.errMsg,
                });
                this.dialogPermissionFormVisible = false;
                this.getPermissionData();
              })
              .catch((err) => {
                console.log("update permission err" + err);
              });
          }
          //关闭
          close();
        }
      });
    },
    /**
     * 新增权限
     */
    addPermission() {
      if (this.ClickKey === 0) {
        this.$message({
          type: "success",
          message: "请先选中一个菜单！",
        });
      } else {
        this.$nextTick(() => {
          // this.$refs["permissionForm"].resetFields();
          this.permissionFormTitle = "新增权限";
          this.dialogPermissionFormVisible = true;
          this.permissionForm.menuId = this.ClickKey;
          this.permissionForm.id = 0;
        });
      }
    },
    /**
     * 修改权限
     */
    updatePermission(row, index) {
      this.permissionFormTitle = "修改权限";
      this.dialogPermissionFormVisible = true;
      this.permissionForm.menuId = this.ClickKey;
      this.$nextTick(() => {
        this.$refs["permissionForm"].resetFields();
        this.permissionForm.menuId = this.ClickKey;
        this.permissionForm.memo = row.memo;
        this.permissionForm.code = row.code;
        this.permissionForm.name = row.name;
        this.permissionForm.id = row.id;
      });
    },
    /**
     * 删除权限
     */
    deletePermission(row, index) {
      this.$confirm(
        "此操作将永久删除该数据，可能会导致权限操作出现问题, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          //删除权限
          console.log(row.id);
          removePermission(row.id)
            .then((res) => {
              if (res.data.errCode == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新权限列表
                this.getPermissionData();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //#endregion
  },
};
</script>

<style lang="scss" scoped>
.menu-right {
  width: 48%;
  position: absolute;
  left: 43%;
}
.menu-left {
  position: absolute;
  height: 500px;
  width: 40%;
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
.tree-span {
  color: #409eff;
}
//输入框宽度
.el-input__inner {
  width: 100px;
}
.el-input {
  width: 300px;
}
</style>>