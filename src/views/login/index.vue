
<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="login-form"
    >
      <!-- @keyup.native="clearTrim('userName')"  禁用空格键-->
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="loginForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { open, close } from "../../utils/loading";
export default {
  data() {
    //验证用户名
    const validateName = (rule, value, callback) => {
      if (value.replace(/\s/gi, "").length === 0) {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    //验证密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不能小于六位字符"));
      } else {
        //通过验证则走回调不走的话会一直验证
        callback();
      }
    };
    return {
      loginForm: {
        password: "123456",
        userName: "admin",
      },
      redirect: undefined,
      otherQuery: {},
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        userName: [{ validator: validateName, trigger: "blur" }],
      },
    };
  },
  watch: {
    /*
     *监听$route对象的变化，改变浏览器搜索框中的值
     *https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96
     */
    // $route: {
    //   handler: function (route) {
    //     const query = route.query;
    //     if (query) {
    //       this.redirect = query.redirect;
    //       this.otherQuery = this.getOtherQuery(query);
    //     }
    //   },
    //   immediate: true,
    // },
  },
  methods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //验证表达是否通过
        if (valid) {
          // this.$loading({
          //   lock: true,
          //   text: "Loading",
          //   spinner: "el-icon-loading",
          //   background: "rgba(0, 0, 0, 0.7)",
          // });

          open();
          console.log(this.loginForm);
          var result = this.$store
            .dispatch("login", this.loginForm)
            .then((res) => {
              console.log(res);
              if (res.data.statusCode === 200) {
                this.$router.push("/");
              }
            });
          setTimeout(() => {
            console.log("hidden loading");
            close();
          }, 2000);
          // this.$router.push({
          //   path: this.redirect || "/",
          //   query: this.otherQuery,
          // });
          //this.$router.push("/");
        } else {
          return false;
        }
      });
    },
    //重置表单内容
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //清除空格
    clearTrim(userName) {
      this.loginForm[userName] = this.loginForm[userName].replace(/\s/gi, "");
    },
    /*
     *query:路由的重定向值
     */
    getOtherQuery(query) {
      /**
       * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
       * reduce函数
       * acc 累计器
       * cur 当前值
       * idx 索引值
       * src 源数据
       */
      return Object.keys(query).reduce((acc, cur) => {
        //如果当前值（对象）不等于redirect
        if (cur !== "redirect") {
          //路由中满足条件的对象给累计器
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh; //vh vm视窗大小，根据浏览器窗口大小计算位置
  width: 100%;
  overflow: hidden;
  background-image: url("../../assets/login-bgp.jpg");
  background-size: cover; //图片自适应
  background-color: transparent; //如果图片没加载出来就默认背景颜色
  position: relative;
  .login-form {
    position: relative; //相对定位
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>