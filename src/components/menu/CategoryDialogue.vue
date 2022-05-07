<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <slot name="content"></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CategoryDialogue',
  data() {
    return {
      dialogFormVisible: this.visible
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  },
  watch: {
    visible(news) {
      this.dialogFormVisible = news
    },
    dialogFormVisible(news) {
      if (!news) {
        this.$emit('close')
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submitForm')
    }
  }
}
</script>

<style></style>
