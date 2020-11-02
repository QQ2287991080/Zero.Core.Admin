<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="请输入角色名"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <div class="table-action">
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          搜索
        </el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >
          新增
        </el-button>
      </div>
    </div>
    <!-- 数据表格 -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      max-height="350"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" align="center" label="序号">
        <template slot-scope="{ $index }">
          <span>{{
            $index + 1 + (listQuery.pageIndex - 1) * listQuery.pageSize
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.memo }}</span>
        </template>
      </el-table-column>
      <!-- 数据操作 -->
      <el-table-column
        label="操作"
        align="center"
        min-width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-share"
            @click="handlePermission(row)"
          >
            分配权限
          </el-button>
          <el-button type="success" size="mini" @click="handleInfo(row)">
            查看
          </el-button>
          <el-button type="warning" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      v-show="count > 0"
      :total="count"
      :pageIndex.sync="listQuery.pageIndex"
      :pageSize.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <!-- 表单弹窗 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="450px"
      @close="closeForm"
    >
      <el-form ref="dataForm" :rules="rules" :model="temp">
        <el-form-item label="角色名" prop="name" label-width="80px">
          <el-input :disabled="isDisabled" v-model="temp.name" />
        </el-form-item>
        <el-form-item
          label="id"
          style="display: none"
          prop="id"
          label-width="80px"
        >
          <el-input :disabled="isDisabled" v-model="temp.id" />
        </el-form-item>
        <el-form-item label="备注" prop="memo" label-width="80px">
          <el-input
            :disabled="isDisabled"
            v-model="temp.memo"
            type="textarea"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 关闭 </el-button>
        <el-button
          :class="{ 'button-display': isDisabled }"
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          提交
        </el-button>
      </div>
    </el-dialog>
    <!-- 分配权限 -->

    <el-dialog
      :visible.sync="dialogPermission"
      @close="closePermission"
      :destroy-on-close="true"
      width="500px"
      title="分配权限"
    >
      <div class="dialog-permission-style">
        <!-- 菜单 -->
        <div v-for="item in menus" :key="item.id">
          <el-checkbox
            @change="checkChangeMenu(item)"
            :checked="isCheckedMenuFun(item.id)"
            >{{ item.name }}</el-checkbox
          >
          <!-- <span>{{ item.name }}</span> -->
          <div class="checkbox" :if="item.children.length > 0">
            <el-checkbox
              v-for="child in item.children"
              @change="checkChangePermission(child)"
              :checked="isCheckedPermissionFun(child.id)"
              :key="child.id"
              >{{ child.name }}</el-checkbox
            >
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPermission = false"> 关闭 </el-button>
        <el-button @click="submitPermission" type="primary"> 提交 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDataList,
  isExistsName,
  addRole,
  updateRole,
  infoRole,
  deleteRole,
  getMenuPermission,
  getRoleExistsPermission,
  setPermission,
} from "@/api/role";
import { open, close } from "@/utils/loading";
// import waves from "@/directive/waves"; // waves directive
// import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  name: "ComplexTable",
  components: { Pagination },
  data() {
    //验证角色名
    var validName = (rule, value, callback) => {
      if (value === "") {
        callback("角色名不能为空");
      } else {
        var data = { name: this.temp.name, id: this.temp.id };
        //验证角色名重复
        isExistsName(data)
          .then((res) => {
            if (res.data.data) {
              callback("角色名已存在");
            } else {
              callback();
            }
          })
          .catch((err) => {
            console.log(err);
            callback();
          });
      }
    };
    return {
      tableKey: 0,
      list: null,
      count: 0,
      listLoading: true,
      listQuery: {
        pageIndex: 1,
        pageSize: 20,
        name: undefined,
      },
      //角色表单
      temp: {
        id: 0,
        name: "",
        memo: "",
      },
      //弹窗显示
      dialogFormVisible: false,
      //弹窗标题
      dialogStatus: "",
      textMap: {
        update: "修改",
        create: "新增",
        details: "查看",
      },
      //表单验证规则
      rules: {
        name: [{ required: true, validator: validName, trigger: "blur" }],
      },
      //控制提交按钮显示
      isDisabled: false,
      //分配权限
      dialogPermission: false,
      roleId: 0, //选中角色id
      //菜单
      menus: [],
      //已选中菜单
      checkedMenu: [],
      //已选中得权限
      checkedPermission: [],
      //已存在的权限id
      menuids: [],
      permissionIds: [],
    };
  },
  created() {
    //加载列表
    this.getList();
  },
  watch: {
    // checkedMenu() {
    //   return this.checkedMenu;
    // },
    // checkedPermission() {
    //   return this.checkedPermission;
    // },
  },
  methods: {
    //获取列表数据
    getList() {
      //表格加载
      this.listLoading = true;
      //请求角色分页结构
      getDataList(this.listQuery)
        .then((response) => {
          //列表数据
          this.list = response.data.data.data;
          //数据数量
          this.count = response.data.data.count;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch((err) => {
          this.listLoading = false;
        });
    },
    //搜索
    handleFilter() {
      this.getList();
    },
    /**
     * 新增
     */
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      //清除表单验证
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    /**
     * 提交新增表单
     */
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        //验证通过
        if (valid) {
          open();
          //提交表单
          addRole(this.temp)
            .then((res) => {
              this.$message({
                type: "success",
                message: res.data.errMsg,
              });
              this.dialogFormVisible = false;
              this.getList();
            })
            .catch((err) => {
              console.log(err);
              this.dialogFormVisible = false;
            });
        } else {
          console.log("not validate");
        }
        close();
      });
    },
    handleUpdate(row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      //清除验证
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
        this.temp.id = row.id;
        this.temp.name = row.name;
        this.temp.memo = row.memo;
      });
    },
    /**
     * 提交修改表单
     */
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        //验证通过
        if (valid) {
          open();
          //提交表单
          updateRole(this.temp)
            .then((res) => {
              this.$message({
                type: "success",
                message: res.data.errMsg,
              });
              this.dialogFormVisible = false;
              this.getList();
            })
            .catch((err) => {
              console.log(err);
              this.dialogFormVisible = false;
            });
        } else {
          console.log("not validate");
        }
        close();
      });
    },
    /**
     * 查看
     */
    handleInfo(row) {
      this.dialogStatus = "details";
      this.dialogFormVisible = true;
      this.isDisabled = true;
      this.$nextTick(() => {
        this.temp.id = row.id;
        this.temp.name = row.name;
        this.temp.memo = row.memo;
      });
    },
    /**
     * 关闭表单事件
     */
    closeForm() {
      this.isDisabled = false;
      //重置字段
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
    },
    /**
     * 删除角色
     */
    handleDelete(row, index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRole(row.id)
            .then((res) => {
              if (res.data.errCode == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新角色列表
                this.getList();
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
    /**
     * 分配权限 获取能分配的菜单和权限
     */
    handlePermission(row, index) {
      this.getRoleExistsPermissionData(row.id);
      //请求接口
      getMenuPermission()
        .then((res) => {
          this.menus = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });

      // setTimeout(() => {

      // }, 0.5 * 1000);

      this.roleId = row.id;
      this.dialogPermission = true;
    },
    /**
     * 获取角色已经存在的角色权限
     */
    getRoleExistsPermissionData(id) {
      open();
      //调用接口
      getRoleExistsPermission(id)
        .then((res) => {
          //将已存在的菜单id赋值给数组，避免选中的时候判断错误
          this.$nextTick(() => {
            this.checkedMenu = res.data.data.menuIds ?? [];
            this.checkedPermission = res.data.data.permissions ?? [];
          });
        })
        .catch((err) => {
          console.log(err);
        });
      close();
    },
    /**
     * 判断菜单是否已选中
     */
    isCheckedMenuFun(id) {
      var index = this.checkedMenu.indexOf(id);
      let ok = index >= 0 ? true : false;
      console.log(ok);
      return ok;
    },
    /**
     * 判断权限是否选中
     */
    isCheckedPermissionFun(id) {
      var index = this.checkedPermission.indexOf(id);
      let ok = index >= 0 ? true : false;
      return ok;
    },
    /**
     * 点击权限change事件
     */
    checkChangePermission(value) {
      let check = this.checkedPermission;
      let permissionId = value.id;
      const index = check.indexOf(permissionId);
      if (index < 0) {
        this.checkedPermission.push(permissionId);
      } else {
        this.checkedPermission.splice(index);
      }
    },
    /**
     * 点击菜单change事件
     */
    checkChangeMenu(value) {
      let check = this.checkedMenu;
      let menuId = value.id;
      console.log(check);
      const index = check.indexOf(menuId);
      if (index < 0) {
        this.checkedMenu.push(menuId);
      } else {
        this.checkedMenu.splice(index);
      }
    },

    /**
     * 提交权限分配
     */
    submitPermission() {
      //拼接请求对象
      var data = {
        roleId: this.roleId,
        menus: this.checkedMenu,
        permissions: this.checkedPermission,
      };
      console.log(data);
      if (data.roleId === 0) {
        console.log("roleid connot zero");
      } else {
        //保存
        open();
        setPermission(data)
          .then((res) => {
            console.log(res);
            if (res.data.errCode === 200) {
              this.$message({
                type: "success",
                message: res.data.errMsg,
              });
              //关闭弹窗
              this.dialogPermission = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
        close();
      }
    },
    /**
     * 关闭分配权限弹窗
     */
    closePermission() {
      //已选中菜单
      this.checkedMenu = [];
      //已选中得权限
      this.checkedPermission = [];
      //选中角色id
      this.roleId = 0;
      //菜单
      this.menus = [];
      //已存在的权限id
      this.menuids = [];
      this.permissionIds = [];
    },
  },
};
</script>
<style lang="scss" scoped>
.table-action {
  position: absolute;
  right: 100px;
  bottom: 10px;
}
.button-display {
  display: none;
}
.dialog-permission-style {
  .checkbox {
    margin: 10px 0 10px 20px;
  }
  height: 400px;
}
</style>
