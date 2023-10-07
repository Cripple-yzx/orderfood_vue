<template>
  <div class="navbar">
    <el-menu
      :default-active="route.fullPath"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/menu">食堂美食</el-menu-item>
      <el-menu-item index="/notice">公告资讯</el-menu-item>
      <el-menu-item index="/shopping">购物车</el-menu-item>
    </el-menu>
    <div class="right">校园食堂订餐官网</div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style scoped lang="scss">
.navbar {
  position: sticky;
  top: 0px;
  z-index: 1000;
}

.right {
  position: fixed;
  top: 0;
  right: 20px;
  widows: 100px;
  height: 59px;
  line-height: 59px;
  text-align: center;
}
</style>
