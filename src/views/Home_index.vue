<template>
  <el-container class="home_container">
    <!-- 导航栏 -->
    <el-header>
      <div class="head">
        <img src="../assets/logo.png" style="height:60px;width=60px;border-radius:50%" alt="" />
        <span>电商后台管理系统</span>
      </div>

      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="collapse" @click="isCollapse = !isCollapse">|||</div>
        <aside-menu v-for="item in menuList" :key="item.id" :name="item.authName" :sub="item.children" :id="item.id" :collapse="isCollapse"></aside-menu>
      </el-aside>
      <el-container>
        <!-- 内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from '@/components/menu/AsideMenu.vue'
import { menuAPI } from '@/api'
export default {
  components: { AsideMenu },
  name: 'Home_index',
  data() {
    return {
      menuList: [],
      isCollapse: false
    }
  },
  created() {
    this.getMenu()
  },
  methods: {
    logout() {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    async getMenu() {
      const { data: res } = await menuAPI()
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      else {
        this.menuList = res.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #fff;
  font-size: 20px;
  display: flex;
  // 左右贴边对齐
  justify-content: space-between;
  align-items: center;
  padding-left: 0px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

// .el-main {
//   background-color: #e9eef3;
//   color: #333;
//   text-align: center;
//   line-height: 160px;
// }
.collapse {
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  letter-spacing: 2px;
  background-color: rgba(144, 147, 153, 0.3);
}
</style>
