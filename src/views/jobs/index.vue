<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="请输入任务名称"
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
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="success"
          icon="el-icon-open"
          @click="handleStart"
        >
          启动任务调度
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

      <el-table-column label="任务名称" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务描述" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次执行时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.lastTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务执行次数" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.executeCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务唯一值" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.jobKey }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组别" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.jobGroup }}</span>
        </template>
      </el-table-column>
      <el-table-column label="触发器标识" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.triggerKey }}</span>
        </template>
      </el-table-column>
      <el-table-column label="程序集名称" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.assemblyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务类名称" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column label="触发器类型" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.triggerType == 1 ? "simple" : "cron" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Cron表达式" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.cronExpression }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间间隔类型" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.triggerInterval == 1
              ? "秒"
              : row.triggerInterval == 2
              ? "分"
              : "时"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="间隔数值" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.intervals }}</span>
        </template>
      </el-table-column>
      <!-- 隐藏状态字段，暂时想不到能够做什么 -->
      <!-- <el-table-column label="状态" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.status == 1
              ? "未启动"
              : row.status == 2
              ? "运行中"
              : row.status == 3
              ? "暂停"
              : "异常"
          }}</span>
        </template>
      </el-table-column> -->

      <!-- 数据操作 -->
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        min-width="450"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-open"
            @click="handleRun(row)"
          >
            启动
          </el-button>
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="handleUpdate(row)"
          >
            修改
          </el-button>
          <el-button
            type="warning"
            icon="el-icon-turn-off"
            size="mini"
            @click="handlePause(row)"
          >
            暂停
          </el-button>
          <el-button
            icon="el-icon-refresh"
            type="success"
            size="mini"
            @click="handleResume(row)"
          >
            恢复
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
      width="999px"
      @close="closeForm"
    >
      <el-form ref="form" :rules="rules" :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务名称" prop="name" label-width="100px">
              <el-input
                :disabled="isDisabled"
                v-model="form.name"
                placeholder="请输入任务名称"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12"
            ><el-form-item
              label="程序集名称"
              prop="assemblyName"
              label-width="100px"
            >
              <el-input
                :disabled="isDisabled"
                v-model="form.assemblyName"
                placeholder="请输入程序集名称"
              /> </el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item
              label="任务类名称"
              prop="className"
              label-width="100px"
            >
              <el-input
                :disabled="isDisabled"
                v-model="form.className"
                placeholder="请输入任务类名称"
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="触发器类型"
              prop="triggerType"
              label-width="100px"
            >
              <el-select v-model="form.triggerType" placeholder="请选择">
                <el-option
                  v-for="item in triggerTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select></el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="Cron表达式" label-width="100px">
              <el-input
                :disabled="isDisabled"
                v-model="form.cronExpression"
                placeholder="0**1*？ note：每月1号凌晨都会被执行"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="时间间隔" label-width="100px">
              <el-select v-model="form.triggerInterval" placeholder="请选择">
                <el-option
                  v-for="item in triggerIntervalOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="间隔值" label-width="100px">
              <el-input
                :disabled="isDisabled"
                onkeyup="value=value.replace(/[^\d]/g,'')"
                v-model="form.intervals"
                placeholder="请输入间隔值"
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime" label-width="100px">
              <el-date-picker
                v-model="form.startTime"
                :picker-options="pickerOptions"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择开始日期"
              >
              </el-date-picker></el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item label="结束时间" prop="endTime" label-width="100px">
              <el-date-picker
                v-model="form.endTime"
                type="date"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                placeholder="选择结束日期"
              >
              </el-date-picker></el-form-item
          ></el-col>
        </el-row>
        <el-form-item label="描述" prop="remark" label-width="100px">
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
  </div>
</template>

<script>
import {
  getDataList,
  sameName,
  add,
  update,
  details,
  remove,
  startQuartz,
  runJob,
  pauseJob,
  resumeJob,
} from "@/api/jobs";
import { open, close } from "@/utils/loading";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    //名称
    var validName = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("名称不能为空"));
      } else {
        sameName(this.form.name, this.form.id).then((res) => {
          if (res.data.data) {
            callback(new Error("名称已存在"));
          } else {
            callback();
          }
        });
      }
    };

    return {
      tableKey: 0,
      listLoading: false, //列表加载
      count: 0, //数量
      listQuery: {
        pageIndex: 1, //页码
        pageSize: 20, //页数
        name: undefined,
      },
      list: [], //列表数据
      dialogFormVisible: false,
      dialogText: "",
      textMap: {
        create: "新增",
        update: "修改",
        info: "详情",
      }, //弹窗文本显示
      rules: {
        name: [{ required: true, validator: validName, trigger: "blur" }],
        assemblyName: {
          required: true,
          message: "程序集名称不能为空",
          trigger: "blur",
        },
        className: {
          required: true,
          message: "任务类名称不能为空",
          trigger: "blur",
        },
      },
      //时间组件限制
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now(); // 选当前时间之后的时间
          //return time.getTime() > Date.now(); // 选当前时间之前的时间
        },
      },
      form: {
        id: 0,
        name: "",
        triggerType: 1, //触发器类型
        triggerInterval: 1, //触发时间类型
        startTime: "", //开始时间
        endTime: "", //结束时间
        remark: "", //描述
        intervals: "", //间隔
        className: "", //任务类名称
        assemblyName: "", //程序集名称
        cronExpression: "", //表达式
      }, //form表单
      isDisabled: false,
      //触发器类型下拉
      triggerTypeOptions: [
        {
          label: "Simple",
          value: 1,
        },
        {
          label: "Cron",
          value: 2,
        },
      ],
      //触发器时间间隔类型
      triggerIntervalOptions: [
        {
          label: "秒",
          value: 1,
        },
        {
          label: "分",
          value: 2,
        },
        {
          label: "时",
          value: 3,
        },
      ],
    };
  },
  created() {
    //加载列表
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
      getDataList(this.listQuery)
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
    //获取任务详情
    getJobInfo(id) {
      //调用详情接口
      details(id).then((res) => {
        console.log(res.data);
        this.form = res.data.data;
      });
    },
    //新增
    handleCreate() {
      this.dialogFormVisible = true;
      this.dialogText = "create";
    },
    //调用新增接口
    createData() {
      console.log(this.form);
      //验证表单
      this.$refs["form"].validate((valid) => {
        //验证通过
        if (valid) {
          open();
          //调用接口
          add(this.form)
            .then((res) => {
              //返回接口
              this.$message({
                type: "success",
                message: res.data.errMsg,
              });
              close();
              this.dialogFormVisible = false;
              this.getList();
            })
            .catch((err) => {
              close();
              console.log(err);
            });
        }
      });
      close();
    },
    //修改
    handleUpdate(row) {
      //开启弹窗
      this.dialogText = "update";
      this.dialogFormVisible = true;
      this.getJobInfo(row.id);
    },
    //提交修改
    updateData() {
      //验证表单
      this.$refs["form"].validate((valid) => {
        //验证通过
        if (valid) {
          open();
          //调用接口
          update(this.form)
            .then((res) => {
              this.$message({
                type: "success",
                message: res.data.errMsg,
              });
              close();
              this.dialogFormVisible = false;
              this.getList();
            })
            .catch((err) => {
              close();
            });
        }
      });
    },
    //删除任务
    handleDelete(row) {
      this.$confirm("此操作将永久删除改数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        remove(row.id).then((res) => {
          this.$message({
            type: "success",
            message: res.data.errMsg,
          });
          this.getList();
        });
      });
    },
    //关闭表单
    closeForm() {
      this.$refs["form"].resetFields();
    },
    /**
     * quartz任务
     */
    handleStart() {
      open();
      startQuartz().then((res) => {
        this.$message({
          type: "success",
          message: res.data.errMsg,
        });
        close();
      });
    },
    //启动任务
    handleRun(row) {
      //run
      runJob(row.id).then((res) => {
        this.$message({
          type: "success",
          message: res.data.errMsg,
        });
      });
    },
    //暂停job
    handlePause(row) {
      pauseJob(row.id).then((res) => {
        this.$message({
          type: "success",
          message: res.data.errMsg,
        });
      });
    },
    //启动job
    handleResume(row) {
      resumeJob(row.id).then((res) => {
        this.$message({
          type: "success",
          message: res.data.errMsg,
        });
      });
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
</style>