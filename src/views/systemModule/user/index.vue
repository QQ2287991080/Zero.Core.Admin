<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.userName"
        placeholder="请输入用户名"
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
      <el-table-column
        fixed
        type="index"
        width="50"
        align="center"
        label="序号"
      >
        <template slot-scope="{ $index }">
          <span>{{
            $index + 1 + (listQuery.pageIndex - 1) * listQuery.pageSize
          }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed label="用户名" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="角色" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.roleStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.realName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="50px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.sex === 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="签名" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span class="userStatus" :class="{ lock: row.isLock }">{{
            row.isLock === true ? "锁定" : "正常"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <!-- 数据操作 -->
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        min-width="420"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-share"
            @click="handleRole(row)"
          >
            分配角色
          </el-button>
          <el-button
            v-if="row.isLock"
            type="primary"
            size="mini"
            icon="el-icon-unlock"
            @click="handleChangeLock(row, false)"
          >
            解锁
          </el-button>
          <el-button
            v-else
            type="danger"
            size="mini"
            icon="el-icon-lock"
            @click="handleChangeLock(row, true)"
          >
            锁定
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
    <!-- 新增表单弹窗 -->
    <el-dialog
      :title="textMap[dialogText]"
      :visible.sync="dialogFormVisible"
      width="460px"
      @close="closeForm"
    >
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item label="用户名" prop="userName" label-width="80px">
          <el-input
            :disabled="isDisabled"
            v-model="form.userName"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone" label-width="80px">
          <el-input
            :disabled="isDisabled"
            v-model="form.phone"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="80px">
          <el-input
            :disabled="isDisabled"
            v-model="form.email"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item label="性别" prop="sex" label-width="80px">
          <el-radio-group v-model="form.sex">
            <el-radio v-model="form.sex" :label="1">男</el-radio>
            <el-radio v-model="form.sex" :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="签名" prop="remark" label-width="80px">
          <el-input
            type="textarea"
            :disabled="isDisabled"
            v-model="form.remark"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 关闭 </el-button>
        <el-button
          :class="{ 'button-display': isDisabled }"
          type="primary"
          @click="dialogText === 'create' ? createData() : updateData()"
        >
          提交
        </el-button>
      </div>
    </el-dialog>
    <!--表单详情 -->
    <el-dialog
      title="详情"
      :visible.sync="dialogInfoFormVisible"
      width="460px"
      @close="closeForm"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="用户名" prop="userName" label-width="80px">
          <el-input :disabled="true" v-model="form.userName" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName" label-width="80px">
          <el-input :disabled="true" v-model="form.userName" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone" label-width="80px">
          <el-input :disabled="true" v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="80px">
          <el-input :disabled="true" v-model="form.email" />
        </el-form-item>
        <el-form-item label="性别" prop="sex" label-width="80px">
          <span>{{ form.sex === 1 ? "男" : "女" }}</span>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <span class="userStatus" :class="{ lock: form.isLock }">{{
            form.isLock === true ? "锁定" : "正常"
          }}</span>
        </el-form-item>
        <el-form-item
          :disabled="true"
          label="签名"
          prop="remark"
          label-width="80px"
        >
          <el-input :disabled="true" type="textarea" v-model="form.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInfoFormVisible = false"> 关闭 </el-button>
      </div>
    </el-dialog>
    <!-- 分配角色弹窗 -->
    <el-dialog
      :visible.sync="dialogRoleVisible"
      width="460px"
      @close="closeRoleForm"
      :destroy-on-close="true"
      title="分配角色"
    >
      <div>
        <div v-for="item in allRoles" :key="item.id">
          <el-checkbox
            @change="checkChange($event, item)"
            :checked="item.checked"
            >{{ item.name }}</el-checkbox
          >
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false"> 关闭 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { open, close } from "@/utils/loading";
import {
  getData,
  IsUserNameExists,
  addUser,
  updateUser,
  infoUser,
  deleteUser,
  setRole,
  removeRole,
  getUserRole,
  changeLock,
} from "@/api/user";
import { getShortDataList } from "@/api/role";
import Pagination from "@/components/Pagination";

export default {
  components: {
    Pagination,
  },
  data() {
    //验证用户名
    var validName = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("用户名不能为空"));
      } else {
        var data = { userName: this.form.userName, id: this.form.id };
        IsUserNameExists(data).then((res) => {
          if (res.data.data) {
            callback(new Error("用户名已存在"));
          } else {
            callback();
          }
        });
      }
    };
    //验证邮箱
    var validEmail = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback();
      } else {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
          callback(new Error("请输入有效的邮箱"));
        } else {
          callback();
        }
      }
    };
    //验证手机号码
    var validPhone = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback();
      } else {
        var reg = /^1[3456789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请填写正确的手机号码"));
        } else {
          callback();
        }
      }
    };
    return {
      tableKey: 0,
      listLoading: false, //列表加载
      count: 0, //数量
      listQuery: {
        pageIndex: 1,
        pageSize: 20,
        userName: undefined,
      },
      list: [], //列表数据
      //表单
      dialogFormVisible: false,
      dialogText: "",
      textMap: {
        create: "新增",
        update: "修改",
        info: "详情",
      }, //弹窗文本显示
      rules: {
        userName: [{ required: true, validator: validName, trigger: "blur" }],
        email: [{ validator: validEmail, trigger: "blur" }],
        phone: [{ validator: validPhone, trigger: "blur" }],
      },
      form: {
        id: 0,
        userName: "", //用户名
        realName: "", //真实名称
        email: "", //邮箱
        phone: "", //手机号
        password: "", //密码
        sex: 1, //性别
        isLock: false,
      }, //form表单
      isDisabled: false,
      //详情显示弹窗
      dialogInfoFormVisible: false,
      //分配角色弹窗
      dialogRoleVisible: false,
      //所有角色
      allRole: [],
      //已绑定角色
      checkedRole: [],
      //绑定用户的用户id
      bindUserId: 0,
    };
  },
  created() {
    //加载列表
    this.getList();
  },
  computed: {
    allRoles() {
      let data = [];
      this.allRole.forEach((item) => {
        var index = this.checkedRole.indexOf(item.id);
        console.log(index);
        if (index >= 0) {
          item.checked = true;
        }
        data.push(item);
      });
      console.log(data);
      return data;
    },
  },

  methods: {
    //查询
    handleFilter() {
      this.getList();
    },
    //列表数据
    getList() {
      this.listLoading = true;
      getData(this.listQuery)
        .then((res) => {
          this.list = res.data.data.data;
          this.count = res.data.data.count;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch((err) => {
          console.log(err);
          this.listLoading = false;
        });
    },
    //分配角色
    handleRole(row) {
      this.getUserBindRole(row.id);
      this.getRoles();
      this.bindUserId = row.id;
      this.dialogRoleVisible = true;
      // this.$nextTick(() => {
      //   this.dialogRoleVisible = true;
      // });
    },
    openRole() {
      console.log("open event");
    },
    //关闭分配角色弹窗
    closeRoleForm() {
      this.bindUserId = 0;
      this.checkedRole = [];
      this.allRole = [];
      this.getList();
    },
    //获取角色的信息
    getRoles() {
      open();
      getShortDataList().then((res) => {
        this.allRole = res.data.data ?? [];
      });
      close();
    },
    //获取用户绑定的role
    getUserBindRole(id) {
      open();
      getUserRole(id).then((res) => {
        this.checkedRole = res.data.data ?? [];
      });
      close();
    },
    //改变绑定的时候
    checkChange(e, row) {
      console.log(e);
      console.log(row);
      if (this.bindUserId != 0) {
        var data = { userId: this.bindUserId, roleId: row.id };
        open();
        if (e) {
          //绑定角色
          setRole(data).then((res) => {
            this.$message({
              type: "success",
              message: res.data.errMsg,
            });
          });
        } else {
          //解除绑定
          removeRole(data).then((res) => {
            this.$message({
              type: "success",
              message: res.data.errMsg,
            });
          });
        }
        close();
      }
    },
    //判断角色是否被绑定
    isCheckedRole(id) {
      var index = this.checkedRole.indexOf(id);
      var ok = index >= 0 ? true : false;
      return ok;
    },

    //改变用户状态
    handleChangeLock(row, isLock) {
      var data = { userId: row.id, isLock: isLock };
      if (isLock) {
        this.$confirm("此操作将导致用户无法登录系统, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            changeLock(data).then((res) => {
              this.$message({
                type: "success",
                message: res.data.errMsg,
              });
              this.getList();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        changeLock(data).then((res) => {
          this.$message({
            type: "success",
            message: res.data.errMsg,
          });
          this.getList();
        });
      }
    },
    //创建用户
    handleCreate() {
      //显示弹窗
      this.dialogFormVisible = true;
      this.dialogText = "create";
    },
    //新增
    createData() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          open();
          addUser(this.form).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: res.data.errMsg,
            });
            this.dialogFormVisible = false;
            this.getList();
          });
          //this.dialogFormVisible = false;
          close();
        }
      });
    },
    //修改操作
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.dialogText = "update";
        this.form.id = row.id;
        this.form.userName = row.userName;
        this.form.phone = row.phone;
        this.form.email = row.email;
        this.form.sex = row.sex;
      });
    },
    //修改
    updateData() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          open();
          updateUser(this.form).then((res) => {
            this.$message({
              type: "success",
              message: res.data.errMsg,
            });
            this.dialogFormVisible = false;
            this.getList();
          });
          close();
        }
      });
    },
    //详情
    handleInfo(row) {
      this.dialogInfoFormVisible = true;
      this.getInfo(row.id);
    },
    //删除
    handleDelete(row, index) {
      this.$confirm("此操作将永久删除改数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser(row.id).then((res) => {
            this.$message({
              type: "success",
              message: res.data.errMsg,
            });
            this.getList();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取接口详情数据
    getInfo(id) {
      infoUser(id)
        .then((res) => {
          this.form = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //表单关闭事件
    closeForm() {
      console.log("close");
      this.$refs["form"].resetFields();
    },
  },
};
</script>

<style lang="scss" scope>
.table-action {
  position: absolute;
  right: 100px;
  bottom: 10px;
}
.button-display {
  display: none;
}
//状态字体显示
.userStatus {
  &.lock {
    color: red;
  }
  color: green;
}
</style>