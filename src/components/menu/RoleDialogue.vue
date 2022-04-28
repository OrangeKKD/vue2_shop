<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" @closed="diaClosed">
    <!-- status-icon 为验证后的图标 -->
    <el-form :model="form" status-icon :rules="roleInfoRules" ref="roleRef" v-if="method === 'add'">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off" required></el-input>
      </el-form-item>
      <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc">
        <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="form" :rules="roleInfoRules" ref="roleRef" v-else>
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" :label-width="formLabelWidth">
        <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitRoleForm($refs.roleRef, form)">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRoleAPI, getRolesByIdAPI, editRoleAPI } from '@/api'
export default {
  name: 'RoleDialogue',
  data() {
    return {
      form: {
        roleName: '',
        roleDesc: ''
      },
      roleInfoRules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2到 8 个字符', trigger: 'blur' }
        ],
        roleDesc: [{ min: 5, max: 50, message: '长度在 5到 50个字符', trigger: 'blur' }]
      },
      dialogFormVisible: this.visible,
      formLabelWidth: '120px'
    }
  },
  props: {
    method: {
      default: 'add'
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    id: {
      type: Number
    }
  },
  methods: {
    submitRoleForm(ref, form) {
      const callback = () => {
        this.dialogFormVisible = false
        this.$emit('reload')
      }
      if (this.method === 'add') {
        this.$submitForm(ref, addRoleAPI, { params: form }, 201, callback)
      } else {
        this.$submitForm(ref, editRoleAPI, { id: this.id, params: form }, 200, callback)
      }
    },
    diaClosed() {
      // 重置表单（有默认值）
      this.$refs.roleRef.resetFields()
      this.$emit('close')
    },
    getRoleInfoById(id) {}
  },
  watch: {
    visible(news, old) {
      this.dialogFormVisible = news
    },
    async id(news, old) {
      if (news !== undefined) {
        const { data: res } = await getRolesByIdAPI(news)
        console.log(res)
        if (res.meta.status === 200) {
          this.form.roleName = res.data.roleName
          this.form.roleDesc = res.data.roleDesc
        }
      }
    }
  }
}
</script>

<style></style>
