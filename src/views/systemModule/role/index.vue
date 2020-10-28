<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="请输入角色名"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <div class="table-action">
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
      style="width: 100%"
    >
      <el-table-column type="index" width="50" align="center" label="序号">
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
            type="success"
            size="mini"
            icon="el-icon-share"
            @click="handleUpdate(row)"
          >
            分配权限
          </el-button>
          <el-button type="success" size="mini" @click="handleUpdate(row)">
            查看
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
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
      :destroy-on-close="true"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="450px"
    >
      <el-form ref="dataForm" :rules="rules" :model="temp">
        <el-form-item label="角色名" prop="name" label-width="80px">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="备注" label-width="80px">
          <el-input
            v-model="temp.memo"
            type="textarea"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> Cancel </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDataList } from "@/api/role";
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
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      temp: {
        id: 0,
        name: "",
        memo: "",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "修改",
        create: "新增",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [{ required: true, validator: validName, trigger: "blur" }],
      },
    };
  },
  created() {
    //加载列表
    this.getList();
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
          }, 1 * 1000);
        })
        .catch((err) => {
          this.listLoading = false;
        });
    },
    //搜索
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {},
    handleUpdate(row) {},
    updateData() {},
    handleDelete(row, index) {},
  },
};
</script>
