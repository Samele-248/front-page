<template>
    <el-menu
      class="nav-menu"
      default-active="/"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-setting"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/imagin">
        <i class="iconfont iconimg"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont iconpublish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-menu"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="el-icon-setting"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>
<script>
// import 代称 from '地址'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return { }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
  },
  watch: {}
}
</script>
<style lang="less" scoped>
// .el-menu {
//     border-right: none;
// }
.nav-menu{
    .iconfont{
        width: 18px;
        height: 18px;
        margin-right: 10px;
        padding-left: 5px;
    }
}
</style>
