<template>
  <div class="home">
    <div class="filter-container">
      <el-date-picker
        v-model="date"
        @change="changeDate"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-button
        style="margin-left: 10px"
        type="danger"
        @click="dialogFormVisible = true"
      >
        设置错误
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        header-align="center"
        max-height="500"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="日期"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="level"
          label="级别"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="summary"
          label="描述"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="用户"
          width="200"
        ></el-table-column>
      </el-table>
    </div>
    <!-- 提交错误 -->
    <el-dialog
      title="设置错误"
      width="460px"
      @close="closeDialog"
      :destroy-on-close="true"
      :visible.sync="dialogFormVisible"
    >
      <div style="position: relative">
        <el-input v-model="errorMessage" placeholder="请输入内容"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setErrorMessage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入signalR
import * as signalR from "@aspnet/signalr";
import { sendToClient, setError } from "@/api/chat";
import { open, close } from "@/utils/loading";
import { dateNow } from "@/utils/date";
export default {
  data() {
    return {
      message: "", //消息
      connection: "", //signalr连接
      messages: [], //返回消息
      tableData: [],
      date: "", //时间查询条件
      dialogFormVisible: false, //设置错误提示框
      errorMessage: "",
    };
  },
  methods: {
    //获取日志信息
    getdatalist: function () {
      open();
      console.log(this.date);
      setTimeout(() => {
        sendToClient(this.date)
          .then((res) => {
            console.log(err);
            close();
          })
          .catch((err) => {
            close();
          });
      }, 1500);
    },
    //提交一个错误
    handleSetErr: function () {},
    //改变值就调用接口
    changeDate() {
      this.getdatalist();
    },
    //关闭弹窗
    closeDialog() {
      this.errorMessage = "";
    },
    //设置错误
    setErrorMessage() {
      if (this.errorMessage === "") {
        alert("别为空hxd!");
      } else {
        setError(this.errorMessage)
          .then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: res.data.errMsg,
            });
            this.dialogFormVisible = false;
          })
          .catch(err);
        {
          this.dialogFormVisible = false;
          console(err);
        }
      }
    },
  },
  computed: {},
  mounted: function () {
    let thisVue = this;
    let url = process.env.VUE_APP_BASE_API + "/chathub";
    //let url = "http://localhost:1201/chathub";
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // this.connection = new signalR.HubConnectionBuilder()
    //   .withUrl(url, {
    //     skipNegotiation: true,
    //     transport: signalR.HttpTransportType.WebSockets,
    //   })
    //   .configureLogging(signalR.LogLevel.Information)
    //   .build();
    if (this.connection === "") {
      console.log("this connection is null");
    }

    this.connection.start();
    console.log("connected ok");
    //连接日志发送事件
    this.connection.on("ReceiveLog", function (message) {
      console.log(message);
      thisVue.tableData = message;
    });

    // try {

    // } catch {
    //   console.log(err);
    // }
  },
  created() {
    //初始化表格数据
    this.date = dateNow();
    this.getdatalist();
  },
};
</script>
<style lang="scss"  scoped>
.filter-container {
  margin-left: 20px;
}
.table {
  margin: 20px;
}
</style>