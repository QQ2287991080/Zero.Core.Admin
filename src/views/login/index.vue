
<template>
  <div class="login-container">
    <div class="login-form">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            @keyup.enter.native="submitForm('loginForm')"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-button"
            type="primary"
            @click="submitForm('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <p>管理员：admin 密码：123456</p>
        <p>游 客：test001 密码：123456</p>
      </div>
    </div>
    <vue-particles
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
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
          open();
          var result = this.$store
            .dispatch("login", this.loginForm)
            .then((res) => {
              if (res.data.errCode === 200) {
                this.$router.push({ path: "/dashboard" });
              }
            });
          setTimeout(() => {
            close();
          }, 2000);
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
  background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  /*background-image: url("../images/bg_login.png");*/
  background-repeat: no-repeat;
  height: 100%; //vh vm视窗大小，根据浏览器窗口大小计算位置
  width: 100%;
  overflow: hidden;
  // background-image: url("../../assets/login-bgp.jpg");
  background-size: cover; //图片自适应
  //background-color: transparent; //如果图片没加载出来就默认背景颜色
  // position: relative;
  .login-form {
    // background-color: white;
    position: absolute; //相对定位
    border: 1px solid gray;
    width: 380px;
    height: 300px;
    // top: 25%;
    left: 40%;
    //padding: 160px 35px 0;
    margin: 0 auto;
    box-shadow: 0px 0px 10px Violet;
    overflow: hidden;
    margin-top: 180px;
    .el-input {
      width: 200px;
    }
    .el-form {
      margin-top: 60px;
    }
  }
}
.login-button {
  width: 200px;
}
</style>