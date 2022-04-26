<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- clearable属性在输入框后面加了x按钮可快速清除内容 -->
          <el-input v-model="pageInfo.query" placeholder="请输入内容" clearable @clear="getUserList"> <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary" @click="visibleAdd = true">添加</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表 -->

      <el-table :data="userList" border striple style="width: 100%">
        <!-- 序号列固定写法 -->
        <el-table-column type="index" label="#"> </el-table-column>

        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="scope">
            <!-- {{ scope.row }}scope.row得到当前行数据(数据库) -->
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="getNewStatus(scope.row)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row)"></el-button>
            <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页控件 -->
      <pagination-index :pageSize="pageInfo.pagesize" :total="totalPage" :currentPage="pageInfo.pagenum" @sizeChange="getNewSize" @currentChange="getCurrentPage"> </pagination-index>
    </el-card>
    <!-- 添加用户按钮的对话弹窗 -->
    <user-dialogue :visible="visibleAdd" :title="'添加用户'" :methods="'add'" @close="closeDlg" @reload="getUserList"></user-dialogue>

    <!-- 编辑用户按钮的对话弹窗 -->
    <user-dialogue :visible="visibleEdit" :title="'编辑用户'" :editForm="userInfo" :methods="'edit'" @close="closeDlg" @reload="getUserList"></user-dialogue>
  </div>
</template>

<script>
import { userListAPI, changeStatusAPI, deleteUserAPI } from '@/api'
import PaginationIndex from '@/components/menu/PaginationIndex.vue'
import UserDialogue from '@/components/menu/UserDialogue.vue'
export default {
  components: { PaginationIndex, UserDialogue },
  name: 'UserManange',
  data() {
    return {
      userList: [],
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 5,
        query: ''
      },
      totalPage: 0,
      visibleAdd: false,
      visibleEdit: false,
      // 编辑的用户信息 默认是空 可用来判断打开的是添加还是编辑
      userInfo: null,
      // 打开对话框的方式（添加用户还是编辑用户 add/edit）
      methods: null
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await userListAPI(this.pageInfo)
      // console.log(res)
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      this.userList = res.data.users
      this.totalPage = res.data.total
    },
    // 收到分页子组件传来的新值
    getNewSize(val) {
      this.pageInfo.pagesize = val
      this.getUserList()
    },
    getCurrentPage(val) {
      this.pageInfo.pagenum = val
      this.getUserList()
    },
    // 更改用户的状态
    async getNewStatus(userInfo) {
      const { data: res } = await changeStatusAPI(userInfo.id, userInfo.mg_state)
      if (res.meta.status !== 200) {
        //  更改状态失败
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error(res.meta.msg)
      } else {
        return this.$message.success(res.meta.msg)
      }
    },
    // 点击编辑按钮 编辑用户信息
    edit(row) {
      console.log('编辑用户信息' + row.id)
      this.visibleEdit = true
      this.userInfo = {
        id: row.id,
        username: row.username,
        mobile: row.mobile,
        email: row.email
      }
    },
    closeDlg() {
      // console.log('触发了父组件的关闭功能')
      this.visibleAdd = false
      this.visibleEdit = false
      // this.userInfo = null
    },
    // 点击删除按钮
    del(row) {
      // 弹出确认框
      this.$confirm(`确认删除用户【 ${row.username}】吗？`).then(async () => {
        const { data: res } = await deleteUserAPI(row.id)
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getUserList()
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
