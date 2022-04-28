<template>
  <el-select v-model="value" :placeholder="placeholder">
    <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SelectBase',
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    options: {
      type: Array
    }
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value(news, olds) {
      this.$emit('selected', news)
    }
  }
}
</script>

<style></style>
