<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">前端</span>
      <el-image :src="vueSrc" :preview-src-list="vueSrcList"></el-image>
    </div>
    <div class="block">
      <span class="demonstration">后端</span>
      <el-image :src="serverSrc" :preview-src-list="serverSrcList">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var vue = require("../../../../docs/Command/Zero.Core.Admin.png");
    var server = require("../../../../docs/Server/Zero.Core.Technology.png");
    return {
      vueSrc: vue,
      serverSrc: server,
      vueSrcList: [vue],
      serverSrcList: [server],
    };
  },
};
</script>

<style lang="scss" scope>
.demo-image__placeholder {
  .block {
    width: 49%;
    padding: 30px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
    vertical-align: top;
  }
}
</style>