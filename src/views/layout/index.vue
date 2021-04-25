<template>
    <div class="loyout-container">
        <el-container class="layout-container">
          <el-aside width="200px" class="aside">
              <App-aside class="aside-menu"></App-aside>
          </el-aside>
          <el-container>
              <el-header class="header">
                  <div>
                      <i class="el-icon-s-fold"></i>
                      <span>源曦语观天有限公司</span>
                  </div>
                  <el-dropdown>
                    <div class="avatar-wrap">
                        <img class="avatar" :src="user.photo" />
                        <span>{{user.name}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>设置</el-dropdown-item>
                      <el-dropdown-item>退出</el-dropdown-item>
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
      user: ''
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
    .main{
        background:khaki;
    }
}
</style>
