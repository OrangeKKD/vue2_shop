<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="user_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <!-- ref可以理解为是vue操纵dom元素 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginRef" class="login_info">
        <!-- 注意 prop是与rules配套使用的验证规则 名称要与数据一致 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- show-password属性 后面会有一个小眼睛 -->
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
export default {
  name: 'Login_index',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在 6到 12位之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset() {
      // console.log(this) 可以看到vue实例的$refs属性绑定了loginRef
      this.$refs.loginRef.resetFields()
    },
    async login() {
      // const { res } = await loginAPI()
      // console.log(res)
      // 表单预验证
      this.$refs.loginRef.validate(async (value) => {
        if (!value) {
          return null
        } else {
          // 预验证成功发起请求
          const { data: res } = await loginAPI(this.loginForm)
          if (res.meta.status !== 200) this.$message.error(res.meta.msg)
          else {
            // this.$message.success(res.meta.msg)
            // 存储token到sessionStorage
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
}
.user_box {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #eee;
  // 相对父盒子
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    border: 1px solid #eee;
  }
}
.login_info {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  // 尾部对齐
  justify-content: flex-end;
}
</style>
