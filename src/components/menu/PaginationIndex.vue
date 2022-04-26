<template>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 5, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
</template>

<script>
export default {
  name: 'PaginationIndex',
  props: ['pageSize', 'total', 'currentPage'],
  methods: {
    // 子传父
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.$emit('sizeChange', val)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.$emit('currentChange', val)
    }
  }
}
</script>

<style></style>
