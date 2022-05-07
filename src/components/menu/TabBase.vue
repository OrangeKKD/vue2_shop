<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="item.label" :name="item.name" v-for="(item, index) in primarySetting" :key="index">
      <el-button type="primary" size="mini" :disabled="!btnStatus" @click="$emit('openDialogue')">添加参数</el-button>
      <el-table :data="paramsList" border striple style="width: 100%">
        <el-table-column type="expand" v-if="activeName === 'many'">
          <template v-slot="scope">
            <el-tag type="success" v-for="(item, index) in scope.row.attr_vals" :key="index" closable @close="closeItem(index, scope.row)">{{ item }}</el-tag>
            <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model.trim="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)"> </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>

        <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { editParamsAPI, delParamsAPI } from '@/api'
export default {
  name: 'TabBase',
  props: {
    primarySetting: {
      type: Array,
      default: () => {}
    },
    paramsList: {
      type: Array
    },
    btnStatus: {
      type: Boolean
    }
  },
  data() {
    return {
      activeName: this.primarySetting[0].name
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.name)
      this.$emit('tabName', this.activeName)
    },
    showInput(row) {
      row.inputVisible = true
      this.$nextTick(() => {
        // this.$refs.saveTagInput.$refs.input.focus()
        console.log(this.$refs.saveTagInput.$refs.input.focus())
      })
    },
    handleInputConfirm(row) {
      if (row.inputValue !== '') {
        // 把增加的值加入到数组中

        row.attr_vals.push(row.inputValue)
        this.saveParams(row)
      }
      row.inputVisible = false
      row.inputValue = ''
    },
    async saveParams(row) {
      const { data: res } = await editParamsAPI(row.catid, row.attr_id, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(' ')
      })
      if (res.meta.status === 200) {
        return this.$message.success(res.meta.msg)
      }
    },
    closeItem(index, row) {
      row.attr_vals.splice(index, 1)
      this.saveParams(row)
    },
    del(row) {
      this.$delById([row.catid, row.attr_id], delParamsAPI)
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin-right: 7px;
}
.input-new-tag {
  width: 120px;
}
</style>
