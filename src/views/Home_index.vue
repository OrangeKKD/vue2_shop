<template>
  <div class="home_container">
    home组件
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home_index',
  methods: {
    logout() {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style></style>
