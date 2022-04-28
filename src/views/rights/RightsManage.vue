<template>
  <div>
    <!-- 面包屑 -->
    <bread-crumb :itemTitle="breadName"></bread-crumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 权限列表 -->
      <el-table :data="rightList" border striple style="width: 100%">
        <!-- 序号列固定写法 -->
        <el-table-column type="index" label="#"> </el-table-column>

        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="权限路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot="scope">
            <!-- {{ scope.row }}scope.row得到当前行数据(数据库) -->
            <el-button type="primary" plain size="small" v-if="scope.row.level === '0'">一级</el-button>
            <el-button type="success" plain size="small" v-else-if="scope.row.level === '1'">二级</el-button>
            <el-button type="warning" plain size="small" v-else>三级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/menu/BreadCrumb.vue'
import { getAllRightsAPI } from '@/api'
export default {
  components: { BreadCrumb },
  created() {
    this.getRightsList()
  },
  data() {
    return {
      breadName: ['权限管理', '权限列表'],
      rightList: []
    }
  },
  methods: {
    async getRightsList() {
      const { data: res } = await getAllRightsAPI('list')
      if (res.meta.status === 200) {
        console.log('获取成功')
        this.rightList = res.data
      }
    }
  }
}
</script>

<style></style>
