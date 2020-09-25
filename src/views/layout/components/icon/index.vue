<template>
  <svg-icon v-if="iconType === 'svg'" :icon-class="iconName" />
  <i v-else :class="'el-icon-' + iconName" />
</template>
<script>
export default {
  name: "chooseIcon",
  props: {
    iconType: {
      type: String,
    },
    iconName: {
      type: String,
    },
  },
};
</script>
<style>
</style>