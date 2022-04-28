<template>
  <div>
    <!-- 面包屑 -->
    <bread-crumb :itemTitle="breadName"></bread-crumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-button type="primary" @click="visibleAdd = true">添加角色</el-button>
      <!-- 权限列表 -->
      <el-table :data="roleList" border striple style="width: 100%">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row :class="['bd-bottom', i === 0 ? 'bd-bdtop' : '', 'vcencer']" v-for="(item1, i) in scope.row.children" :key="item1.id">
              <!-- 一级权限区域 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级、三级权限区域 -->
              <el-col :span="19">
                <!-- 二级权限又再次分成左右两列 -->
                <el-row v-for="(item2, i2) in item1.children" :class="[i2 === 0 ? '' : 'bd-bdtop', 'vcencer']" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-row :span="18">
                    <el-tag type="warning" closable v-for="item3 in item2.children" :key="item3.id" @close="removeRightById(scope.row, item3.id)">{{ item3.authName }}</el-tag>
                  </el-row>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 序号列固定写法 -->
        <el-table-column type="index" label="#"> </el-table-column>

        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row)"></el-button>
            <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色 -->
    <role-dialogue :visible="visibleAdd" :title="'添加角色'" :method="'add'" @close="visibleAdd = false" @reload="getRolesList"></role-dialogue>
    <!-- 编辑角色 -->
    <role-dialogue :visible="visibleEdit" :title="'编辑角色'" :id="roleId" :method="'edit'" @close="visibleEdit = false" @reload="getRolesList"></role-dialogue>

    <!-- 树形对话框 -->
    <el-dialog title="分配权限" :visible.sync="visibleAuthoize" width="50%">
      <el-tree :data="rightList" show-checkbox default-expand-all node-key="id" ref="tree" :default-checked-keys="defKeys" highlight-current :props="treeProps"> </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleAuthoize = false">取 消</el-button>
        <el-button type="primary" @click="AuthoizForRole">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/menu/BreadCrumb.vue'
import { getRolesAPI, delRoleAPI, delRightsforRolesAPI, getAllRightsAPI, authorizeRolesAPI } from '@/api'
import RoleDialogue from '@/components/menu/RoleDialogue.vue'
export default {
  components: { BreadCrumb, RoleDialogue },
  created() {
    this.getRolesList()
  },
  data() {
    return {
      breadName: ['权限管理', '角色列表'],
      roleList: [],
      visibleAdd: false,
      visibleEdit: false,
      visibleAuthoize: false,
      roleId: null,
      // 所有权限的数据
      rightList: [],
      // 树形控件绑定的属性(label指定展示的名称，children层级关系属性)
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点项
      defKeys: []
      // 即将分配权限的id
    }
  },
  methods: {
    async getRolesList() {
      const { data: res } = await getRolesAPI()
      if (res.meta.status === 200) {
        console.log('获取成功')
        this.roleList = res.data
      }
    },

    edit(roleInfo) {
      this.visibleEdit = true
      this.roleId = roleInfo.id
    },
    del(roleInfo) {
      this.$confirm(`您确定要删除${roleInfo.roleName}吗？`).then(() => {
        this.$delById([roleInfo.id], delRoleAPI, this.getRolesList)
      })
    },
    removeRightById(role, rightId) {
      const callback = (res) => {
        role.children = res
      }
      this.$confirm('您确定要删除吗？').then(() => {
        this.$delById([role.id, rightId], delRightsforRolesAPI, callback)
      })
    },
    // 打开权限分配对话框
    showSetRightDialog(curNode) {
      this.roleId = curNode.id
      this.visibleAuthoize = true
      const callback = (res) => {
        console.log(res)
        this.rightList = res
      }
      this.$getList(getAllRightsAPI, 'tree', callback)
      // 每次调用前先清空一下
      this.defKeys = []
      this.getLeafNode(curNode, this.defKeys)
    },
    // 递归获取第三级节点的id
    getLeafNode(curNode, arr) {
      // 如果已经是叶子结点了，就用数组保存它的id
      if (!curNode.children) {
        return arr.push(curNode.id)
      }
      curNode.children.forEach((item) => {
        this.getLeafNode(item, arr)
      })
    },
    // 给角色授权
    AuthoizForRole() {
      let arr = []
      // 得到所有选中和半选中的key
      const arr1 = this.$refs.tree.getCheckedKeys()
      const arr2 = this.$refs.tree.getHalfCheckedKeys()
      arr = [...arr1, ...arr2]
      // console.log(arr)
      const rids = arr.join(',')
      // console.log(rids)
      this.$submitInfo(authorizeRolesAPI, { id: this.roleId, params: { rids } }, 200, this.getRolesList)
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 3px;
}
.bd-bottom {
  border-bottom: 1px solid #eee;
}
.bd-bdtop {
  border-top: 1px solid #eee;
}
// .el-col {
//   text-align: center;
// }
.vcencer {
  display: flex;
  // 纵向居中
  align-items: center;
}
</style>
