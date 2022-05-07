<template>
  <div>
    <bread-crumb :itemTitle="breadText"></bread-crumb>
    <el-card>
      <el-alert title="只允许指定三级分类的参数" type="warning" show-icon> </el-alert>
      <!-- <el-button type="primary" size="small">添加参数</el-button> -->
      <el-row class="elRow">
        <el-col>
          <span>请选择分类：</span>
          <el-cascader v-model="selected" :options="allCategoryList" :props="cascaderProps" @change="handleChange" :clearable="true"> </el-cascader>
        </el-col>
      </el-row>

      <!-- tab面板 -->
      <tab-base :primarySetting="tabPageInfo" :btnStatus="btnStatus" :paramsList="paramsList" @tabName="toggleTab" @openDialogue="openAddDia"></tab-base>

      <category-dialogue :title="'添加参数'" :visible="addVisible" @submitForm="submitAddParams" @close="addVisible = false">
        <template #content>
          <el-form :model="form" label-width="80px" :rules="paramsRules" ref="paramsRef">
            <el-form-item label="参数名" prop="attr_name">
              <el-input v-model="form.attr_name"></el-input>
            </el-form-item>
            <el-form-item label="选项" v-if="paramsType === 'many'">
              <el-input v-model="form.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </category-dialogue>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/menu/BreadCrumb.vue'
import { getCategoryListAPI, getParamsListAPI, addParamsAPI } from '@/api'
import TabBase from '@/components/menu/TabBase.vue'
import CategoryDialogue from '@/components/menu/CategoryDialogue.vue'
export default {
  components: { BreadCrumb, TabBase, CategoryDialogue },
  data() {
    return {
      breadText: ['商品管理', '分类参数'],
      allCategoryList: [],
      cascaderProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        expandTrigger: 'hover'
      },
      selected: [],
      // tab页的信息
      tabPageInfo: [
        {
          label: '动态参数',
          name: 'many'
        },
        {
          label: '静态参数',
          name: 'only'
        }
      ],
      paramsType: 'many',
      paramsList: [],
      // 添加参数的对话框
      addVisible: false,
      form: {
        attr_name: '',
        attr_sel: 'many',
        attr_vals: ''
      },
      paramsRules: {
        attr_name: [
          {
            required: true,
            message: '请输入参数名',
            trigger: 'blur'
          },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAllCategotyList()
  },
  methods: {
    handleChange(val) {
      this.selected = val
      return this.selected.length === 3 ? this.getParamsListByType() : (this.selected = [])
    },
    getAllCategotyList() {
      this.$getList(getCategoryListAPI, {}, (res) => {
        this.allCategoryList = res
      })
    },
    async getParamsListByType() {
      const { data: res } = await getParamsListAPI(this.selected[2], { sel: this.paramsType })
      res.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        item.inputVisible = false
        item.inputValue = ''
        item.catid = this.selected[2]
      })
      console.log(res.data)
      if (res.meta.status === 200) {
        this.paramsList = res.data
      }
    },
    // 监听到了切换面板，重新发起请求
    toggleTab(val) {
      this.paramsType = val
      this.getParamsListByType()
    },
    openAddDia() {
      this.addVisible = true
    },
    // 提交添加参数的表单
    submitAddParams() {
      this.$submitForm(this.$refs.paramsRef, addParamsAPI, { id: this.selected[2], params: this.form }, 201, (res) => {
        this.getParamsListByType()
        this.addVisible = false
      })
    }
  },
  computed: {
    btnStatus() {
      return this.selected.length === 3
    }
  },
  watch: {
    paramsType(news) {
      this.form.attr_sel = news
    }
  }
}
</script>

<style lang="less" scoped>
.elRow {
  margin: 15px 0px;
}
</style>
