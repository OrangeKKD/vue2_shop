<template>
  <!-- //Unexpected mutation of "dialogFormVisible" prop 这个错误提示是说子组件不可以修改props的值！！！所以需要转存一下 -->
  <el-dialog :title="title" :visible.sync="dialogFormVisible" @closed="diaClosed">
    <!-- status-icon 为验证后的图标 -->
    <el-form :model="form" status-icon :rules="userInfoRules" ref="userRef" v-if="methods === 'add'">
      <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" autocomplete="off" required></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off" required></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
        <el-input v-model="form.mobile" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="on"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="form" :rules="userInfoRules" ref="userRef" v-else-if="methods === 'edit'">
      <el-form-item label="用户名称" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
        <el-input v-model="form.mobile" autocomplete="on" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="on" clearable></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm(methods)">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { validateMobile, validateEmail } from '@/utils/validation'
import { addUserAPI, editUserAPI } from '@/api'
export default {
  name: 'UserDialogue',
  // data的数据只能运行一次 因此无法监听内容的变化，此时需要用上监听器
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户时id需保存
      id: null,
      // 转存一下即可
      dialogFormVisible: this.visible,
      formLabelWidth: '120px',

      userInfoRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在 6到 12位之间', trigger: 'blur' }
        ],
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }]
      }
    }
  },
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    },
    methods: {
      type: String,
      default: ''
    },
    editForm: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    visible(news, olds) {
      this.dialogFormVisible = news
    },
    dialogFormVisible(news, olds) {
      // 一旦关闭弹窗 向父组件传递close事件
      if (news === false) {
        this.$emit('close')
      }
    },
    editForm(news, olds) {
      this.$nextTick(() => {
        // 赋值
        if (news === undefined) return null
        this.form.email = news.email
        this.form.mobile = news.mobile
        this.form.username = news.username
        this.id = news.id
      })
    }
  },
  methods: {
    submitForm(methods) {
      // 表单提交预先验证
      console.log(this)
      this.$refs.userRef.validate(async (value) => {
        console.log(value)
        if (!value) return this.$message.error('提交失败！')
        // 预验证通过
        // 判断是添加用户还是编辑用户
        if (methods === 'add') {
          const { data: res } = await addUserAPI(this.form)
          // console.log(res)
          if (res.meta.status !== 201) this.$message.error(res.meta.msg)
          // 创建成功
          this.$message.success(res.meta.msg)
        } else {
          const { data: res } = await editUserAPI(this.id, { mobile: this.form.mobile, email: this.form.email })
          // console.log(res)
          this.$message.success(res.meta.msg)
        }
        this.dialogFormVisible = false
        // 重新调用用户列表
        this.$emit('reload')
      })
    },
    diaClosed() {
      // console.log('对话框关闭')
      console.log(this.$refs)
      this.$refs.userRef.resetFields()
    }
  }
}
</script>

<style></style>
