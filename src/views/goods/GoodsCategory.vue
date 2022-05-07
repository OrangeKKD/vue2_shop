<template>
  <div>
    <bread-crumb :itemTitle="breadName"></bread-crumb>

    <el-card>
      <!-- 按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="openAddCateDialogue">添加</el-button>
        </el-col>
      </el-row>
      <tree-table class="TreeTable" :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="#" border :show-row-hover="false">
        <!-- 该分类是否有效 -->
        <template v-slot:isAvailable="scope">
          <i class="el-icon-success" style="color: lightgreen" v-if="scope.row.cat_deleted === false"></i>
          <i class="el-icon-error" style="color: lightgreen" v-else></i>
        </template>
        <!-- 排序 -->
        <template v-slot:order="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template v-slot:opt>
          <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </tree-table>
      <pagination-index :currentPage="cateInfo.pagenum" :pageSize="cateInfo.pagesize" :total="total" @sizeChange="changePageSize" @currentChange="changeCurrentPage"></pagination-index>
    </el-card>

    <!-- 对话框区域 -->
    <category-dialogue :title="'添加分类'" :visible="addCateVisible" @submitForm="addCate">
      <template #content>
        <el-form :model="form" :rules="categoryInfoRules" ref="catRef">
          <el-form-item label="分类名称" :label-width="'120px'" prop="cat_name">
            <el-input v-model="form.cat_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父级分类" :label-width="'120px'">
            <el-cascader v-model="selected" :options="parentCateList" :props="cascaderProps" @change="handleChange" :clearable="true"> </el-cascader>
          </el-form-item>
        </el-form>
      </template>
    </category-dialogue>
  </div>
</template>

<script>
import BreadCrumb from '@/components/menu/BreadCrumb.vue'
import { getCategoryListAPI, addCategoryAPI } from '@/api'
import PaginationIndex from '@/components/menu/PaginationIndex.vue'
import CategoryDialogue from '@/components/menu/CategoryDialogue.vue'
export default {
  components: { BreadCrumb, PaginationIndex, CategoryDialogue },
  data() {
    return {
      breadName: ['商品管理', '商品分类'],
      cateInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 总数
      total: 0,
      cateList: [],
      // 一级二级分类的列表(父节点)
      parentCateList: [],
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用的模板名称
          template: 'isAvailable'
        },
        {
          label: '排序',
          // 将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用的模板名称
          template: 'order'
        },
        {
          label: '操作',
          // 将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用的模板名称
          template: 'opt'
        }
      ],
      addCateVisible: false,
      form: {
        cat_name: '',
        cat_level: '',
        cat_pid: 0
      },
      categoryInfoRules: {
        cat_name: [
          {
            required: true,
            message: '请输入分类名',
            trigger: 'blur'
          },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ]
      },
      cascaderProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true
      },
      // 级联样式选择的值
      selected: []
    }
  },
  created() {
    this.getCategoriesList()
  },
  methods: {
    changePageSize(val) {
      this.cateInfo.pagesize = val
      this.getCategoriesList()
    },
    changeCurrentPage(val) {
      this.cateInfo.pagenum = val
      this.getCategoriesList()
    },
    // 获取商品分类数据
    getCategoriesList() {
      this.$getList(getCategoryListAPI, this.cateInfo, (res) => {
        this.cateList = res.result
        this.total = res.total
      })
    },
    getParentCateList() {
      this.$getList(getCategoryListAPI, { type: 2 }, (res) => {
        this.parentCateList = res
      })
    },
    openAddCateDialogue() {
      this.getParentCateList()
      this.addCateVisible = true
    },
    handleChange(val) {
      console.log(val)
      this.selected = val
      if (this.selected.length > 0) {
        // 若数组长度大于0则一定选了父级节点 因此父节点就是数组的最后一个值
        this.form.cat_pid = this.selected[this.selected.length - 1]
      }
      // 新添加的分类的层级（从0开始的，最高为2）
      this.form.cat_level = this.selected.length
    },
    addCate() {
      // console.log('...111')
      this.$submitForm(this.$refs.catRef, addCategoryAPI, { params: this.form }, 201, (res) => {
        this.addCateVisible = false
        this.getCategoriesList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.TreeTable {
  margin-top: 15px;
}
</style>
