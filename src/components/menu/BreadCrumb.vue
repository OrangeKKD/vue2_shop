<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <!-- //注意写for循环时 让其自动生成而保证不有错 -->
      <el-breadcrumb-item v-for="(item, index) in itemTitle" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  props: {
    itemTitle: {
      type: Array
    }
  }
}
</script>

<style></style>
