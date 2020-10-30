<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.userName"
        placeholder="请输入用户"
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
      <el-table-column label="是否被锁定" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.isLocked === true ? "是" : "否" }}</span>
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
        min-width="350"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-share"
            @click="handlePermission(row)"
          >
            分配角色
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
      :title="textMap[dialogText]"
      :visible.sync="dialogFormVisible"
      width="450px"
      @close="closeForm"
    >
      <el-form ref="dataForm" :rules="rules" :model="form">
        <el-form-item label="角色名" prop="name" label-width="80px">
          <el-input :disabled="isDisabled" v-model="form.name" />
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
  </div>
</template>

<script>
import { open, close } from "@/utils/loading";
import {
  getData,
  addUser,
  updateUser,
  infoUser,
  deleteUser,
  setRole,
  removeRole,
  getUserRole,
} from "@/api/user";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
  },
  data() {
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
      rules: [],
      form: {
        id: 0,
        userNmae: "", //用户名
        realName: "", //真实名称
        email: "", //邮箱
        phone: "", //手机号
        password: "", //密码
        sex: false, //性别
      }, //form表单
      isDisabled: false,
    };
  },
  created() {
    this.getList();
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
    //创建用户
    handleCreate() {},
    //表单关闭事件
    closeForm() {},
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
</style>