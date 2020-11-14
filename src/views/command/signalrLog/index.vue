<template>
  <div class="home">
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
  </div>
</template>

<script>
// 引入signalR
import * as signalR from "@aspnet/signalr";
import { sendToClient } from "@/api/chat";
import { open, close } from "@/utils/loading";
export default {
  data() {
    return {
      message: "", //消息
      connection: "", //signalr连接
      messages: [], //返回消息
      tableData: [],
    };
  },
  methods: {
    //获取日志信息
    getdatalist: function () {
      sendToClient()
        .then((res) => {})
        .catch((err) => {});
    },
  },
  computed: {},
  mounted: function () {
    let thisVue = this;
    let url = process.env.VUE_APP_BASE_API + "/chathub";
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.start();
    //连接日志发送事件
    this.connection.on("ReceiveLog", function (message) {
      thisVue.tableData = message;
    });
  },
  created() {
    //初始化表格数据
    open();
    this.getdatalist();
    close();
  },
};
</script>
<style scoped>
.table {
  margin: 20px;
}
</style>