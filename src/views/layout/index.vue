<template>
    <div class="loyout-container">
        <el-container class="layout-container">
          <el-aside width="200px" class="aside">
              <App-aside></App-aside>
          </el-aside>
          <el-container>
              <el-header class="header">Header</el-header>
              <el-main class="main">
                  <router-view></router-view>
              </el-main>
          </el-container>
        </el-container>
    </div>
</template>
<script>
import AppAside from './components/aside'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return { }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: { },
  watch: {}
}
</script>
<style lang="less" scoped>
.layout-container{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .aside{
        background: rgb(84, 92, 100);
    }
    .header{
        background: palegreen;
    }
    .main{
        background:khaki;
    }
}
</style>
