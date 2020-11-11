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
                ><i class="el-icon-folder" style="margin-right: 10px" />{{
                  data.name
                }}</span
              >
              <span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="新增子节点"
                  placement="top-start"
                >
                  <el-button
                    v-auth="'dic_addchild'"
                    type="text"
                    icon="el-icon-bottom"
                    @click="() => appendChildren(data)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="新增平级节点"
                  placement="top-start"
                >
                  <el-button
                    v-auth="'dic_add'"
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
                    v-auth="'dic_update'"
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
                    v-auth="'dic_delete'"
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

    <!-- 新增 form  -->
    <el-dialog
      :title="text[title]"
      @close="closeForm('form')"
      :destroy-on-close="true"
      width="450px"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input
            v-model.trim="form.name"
            autocomplete="off"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="sort" :label-width="formLabelWidth">
          <el-input
            v-model.trim="form.sort"
            maxlength="2"
            autocomplete="off"
            placeholder="请输入排序0-99"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="memo" :label-width="formLabelWidth">
          <el-input
            v-model.trim="form.memo"
            autocomplete="off"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="父级id"
          style="display: none"
          :label-width="formLabelWidth"
          prop="idParent"
        >
          <el-input v-model="form.idParent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getTree,
  dicAdd,
  dicUpdate,
  dicInfo,
  dicDelete,
  isContains,
} from "@/api/diction";
import { open, close } from "@/utils/loading";
export default {
  data() {
    //验证名称
    var validateName = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("请输入名称"));
      } else {
        if (this.form.parentName === value) {
          callback(new Error("不能和父级名称相同"));
        }
        var id = this.form.id;
        var idParent = this.form.idParent;
        //调取接口
        var validateData = { name: value, id, idParent };
        isContains(validateData).then((res) => {
          let any = res.data.data;
          if (any) {
            callback(new Error("名称已存在，请重新输入"));
          } else {
            callback();
          }
        });
      }
    };

    return {
      filterText: "",
      title: "",
      text: {
        child: "新增子节点",
        create: "新增同级节点",
        update: "修改",
      },
      dialogFormVisible: false,
      //表单验证
      rules: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
      form: {
        id: 0,
        name: "", //名称
        memo: "", //备注
        sort: 0, //排序
        idParent: "", //父级id
        parentName: "", //父级名称
      },
      data: [],
      formLabelWidth: "80px",
      defaultProps: {
        children: "childrens",
        label: "name",
      },
      ClickKey: 0, //单击菜单

      // allow: false,
    };
  },
  watch: {
    //树--关键字搜索
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    //加载树
    this.getDicTree();
  },
  methods: {
    getDicTree() {
      open();
      getTree()
        .then((res) => {
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      close();
    },
    //过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //点击树节点
    handkeNodeClikc(data) {
      this.ClickKey = data.id;
    },
    //节点样式
    clickKeyClass(data) {
      if (this.ClickKey === data.id) {
        return true;
      } else {
        return false;
      }
    },
    //窗体关闭
    closeForm(form) {
      console.log("close");
      this.$refs[form].resetFields();
    },
    //新增子节点
    appendChildren(data) {
      this.dialogFormVisible = true;
      this.form.idParent = data.id;
      this.form.parentName = data.name;
      this.title = "child";
    },
    //新增节点
    append(data) {
      this.dialogFormVisible = true;
      this.title = "create";
    },
    //新增
    createData() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          open();
          dicAdd(this.form)
            .then((res) => {
              console.log(res);
              this.dialogFormVisible = false;
              this.getDicTree();
            })
            .catch((err) => {
              console.log(err);
            });
          close();
        }
      });
    },
    //修改节点
    updateTree(data) {
      this.dialogFormVisible = true;
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.idParent = data.idParent;
      this.form.memo = data.memo;
      this.form.sort = data.sort;
      // if (data.idParent != null) {
      //   this.form.parentName = data.name;
      // }
      this.title = "update";
    },
    updateData() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          open();
          dicUpdate(this.form)
            .then((res) => {
              console.log(res);
              this.dialogFormVisible = false;
              this.getDicTree();
            })
            .catch((err) => {
              console.log(err);
            });
          close();
        }
      });
    },
    submit() {
      let title = this.title;
      if (title === "create" || title === "child") {
        this.createData();
      } else {
        this.updateData();
      }
    },
    //删除节点
    remove(node, data) {
      this.$confirm(
        "此操作将永久删除该数据，并且可能导致页面数据显示异常, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          dicDelete(data.id)
            .then((res) => {
              if (res.data.errCode == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新菜单
                this.getDicTree();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scope>
.menu-left {
  position: absolute;
  height: 500px;
  width: 40%;
  // border-right: 1px solid #dcdfe6;
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
</style>

