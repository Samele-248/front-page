<template>
    <div class="loyout-container">
        <el-container class="layout-container">
          <el-aside width="auto" class="aside">
              <App-aside :is-collapse1="isCollapse11" class="aside-menu"></App-aside>
          </el-aside>
          <el-container>
              <el-header class="header">
                  <div>
                      <i :class="{
                        'el-icon-s-unfold': isCollapse11,
                        'el-icon-s-fold': !isCollapse11
                      }"
                      @click="isCollapse11 = !isCollapse11"
                      ></i>
                      <span class="aside-title" >源曦语观天有限公司</span>
                  </div>
                  <el-dropdown>
                    <div class="avatar-wrap">
                        <img class="avatar" :src="user.photo" />
                        <span>{{user.name}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>设置</el-dropdown-item>
                      <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
              </el-header>
              <el-main class="main">
                  <router-view></router-view>
              </el-main>
          </el-container>
        </el-container>
    </div>
</template>
<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: '',
      isCollapse11: true
    }
  },
  computed: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log('请求用户数据-填取用户信息', res)
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确定要退出嘛?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')// 删除本地保存的用户信息
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    }
  },
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
        .aside-menu{
            height: 100%;
        }
    }
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid black;
        .el-dropdown-link {
          cursor: pointer;
        }
        .aside-title{
          margin-left: 8px;
        }
        .avatar-wrap{
            display: flex;
            align-items: center;
            .avatar{
                width: 36px;
                height: 36px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
    }
    .main{}
}
</style>
