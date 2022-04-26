<template>
  <el-menu unique-opened class="el-menu-vertical-demo" background-color="#d3dce6" text-color="#fff" active-text-color="black" :collapse="collapse" :collapse-transition="false" router :default-active="$route.path">
    <!-- 一级菜单 -->
    <el-submenu :index="id + ''">
      <template slot="title">
        <i :class="iconList[id]"></i>
        <span>{{ name }}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item :index="'/home/' + item.path" v-for="item in sub" :key="item.id">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>{{ item.authName }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'AsideMenu',
  data() {
    return {
      iconList: {
        125: 'el-icon-user-solid',
        103: 'el-icon-star-on',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing'
      }
    }
  },
  props: {
    id: {
      type: Number
    },
    name: {
      type: String
    },
    // path: {
    //   type: String
    // },
    sub: {
      type: Array
    },
    icons: {
      type: Object
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.el-menu-item {
  padding: 0px 20px;
}
</style>
