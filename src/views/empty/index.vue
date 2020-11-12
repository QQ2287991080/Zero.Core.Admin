<template>
  <p>
    this is the news page.the transform param is
    {{ this.$route.params.redirect }}
  </p>
</template>

<script>
export default {
  created() {
    console.log(this.$route);
  },
  // watch: {
  //   $route: {
  //     handler: function (route) {
  //       console.log(route);
  //       if (route.params.redirect === undefined) {
  //         console.log(0);
  //         this.$router.go(-1);
  //       }
  //     },
  //   },
  // },
};
</script>

<style>
</style>