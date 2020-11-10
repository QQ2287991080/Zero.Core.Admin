<template>
  <!-- https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png -->
  <div>
    <div class="center">
      <div class="user-body">
        <el-row>
          <div class="row-style">
            <label> 头像：</label>
            <el-avatar v-if="showAvatar(info.avatar)" size="large">
              <!-- :src="info.avatar" -->
              <el-image
                :src="info.avatar"
                :preview-src-list="[info.avatar]"
              ></el-image>
            </el-avatar>
            <el-avatar size="large" v-else>{{ info.userName }}</el-avatar>
            <!-- element 上传图片按钮 -->
            <el-upload
              class="upload-demo"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="changeUpload"
            >
              <i class="el-icon-edit-outline" />
            </el-upload>
          </div>
        </el-row>
        <el-row>
          <label> 用户名： </label>
          <span>{{ info.userName }}</span>
        </el-row>
        <el-row>
          <label> 密码： </label>
          <span>******</span>
          <i
            class="el-icon-edit-outline"
            @click="() => (dialogPasswordVisible = true)"
          />
        </el-row>
        <el-row>
          <label> 邮箱： </label>
          <span>{{ info.email }}</span>
          <i class="el-icon-edit-outline" />
        </el-row>
        <el-row>
          <label> 手机： </label>
          <span>{{ info.phone }}</span>
          <i class="el-icon-edit-outline" />
        </el-row>
        <el-row>
          <label> 性别： </label>
          <span>{{ info.sex === 1 ? "男" : "女" }}</span>
          <i class="el-icon-edit-outline" />
        </el-row>
        <el-row>
          <label> 角色： </label>
          <span>{{ info.roleStr }}</span>
        </el-row>
        <el-row>
          <label> 签名： </label>
          <span>{{
            info.remark === null ? "这个人很懒什么都没有留下~" : info.remark
          }}</span>
          <i class="el-icon-edit-outline" />
        </el-row>
      </div>
    </div>
    <!-- 上传头像 -->
    <el-dialog title="上传头像" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align: center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish" :loading="loading"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="重置密码"
      :visible.sync="dialogPasswordVisible"
      width="450px"
      @close="closePassword"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-width="80px"
      >
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="dialogPasswordVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { UserDetails, upLoadAvatar, resetPassword } from "@/api/user";
import { VueCropper } from "vue-cropper";
import { open, close } from "@/utils/loading";
export default {
  components: {
    VueCropper,
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      info: {
        avatar: "",
        userName: "",
        realName: "",
        email: "",
        phone: "",
        roleStr: "",
        sex: 0,
        remark: "",
      },
      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [5, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], //页面显示的数组
      // 防止重复提交
      loading: false,
      fileinfo: "",
      dialogPasswordVisible: false,
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  computed: {},
  created() {
    this.getUserInfo();
  },
  methods: {
    showAvatar(avatar) {
      if (avatar === null || avatar === "") {
        return false;
      }
      return true;
    },
    //获取用户详情
    getUserInfo() {
      open();
      UserDetails()
        .then((res) => {
          this.info = res.data.data;
          close();
        })
        .catch((err) => {
          console.log(err);
          close();
        });
    },
    // 上传按钮   限制图片大小
    changeUpload(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      this.fileinfo = file;
      console.log(file);
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file.raw);
        this.dialogVisible = true;
      });
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData((data) => {
        // do something
        this.loading = true;
        var info = this.dataURLtoFile(data, this.fileinfo.name);
        console.log(info);
        var params = new FormData();
        params.append("form", info);
        console.log(params);
        // 把图片上传到服务器
        setTimeout(() => {
          upLoadAvatar(params)
            .then((res) => {
              console.log(res);
              this.loading = false;
              this.dialogVisible = false;
              this.getUserInfo();
              // this.fileImg = data;
            })
            .catch((err) => console.log(err));
        }, 1000);
      });
    },
    //将base64转换为文件
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {
        type: mime,
      });
    },
    //#region  修改密码
    closePassword() {
      this.$refs["ruleForm"].clearValidate();
    },
    //提交
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          open();
          resetPassword(this.ruleForm.pass, this.ruleForm.checkPass)
            .then((res) => {
              console.log(res);
              close();
              this.dialogPasswordVisible = false;
            })
            .catch((err) => {
              close();
            });
          close();
        }
      });
    },
    //#endregion
  },
};
</script>

<style lang="scss" scope>
// 截图
.cropper-content {
  .cropper {
    width: auto;
    height: 300px;
  }
}
.center {
  border: 1px solid #eee;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 500px;
  width: 500px;
  margin-left: 2px;
  .el-avatar--large {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  i {
    cursor: pointer;
    color: #e6a23c;
  }
}

.user-body {
  position: relative;
  margin-left: 20px;
  i {
    margin-left: 10px;
  }
}

.upload-demo {
  position: absolute;
  top: 70px;
  left: 120px;
}
.row-style {
  margin: 10px 50px 0px 0px;
  //line-height: 200px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>