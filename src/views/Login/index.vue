<template>
  <div class="login-container">
    <el-form :model="user" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <h1 class="login-title">某某后台管理系统</h1>
      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input placeholder="请输入验证码" v-model="user.code"></el-input>
      </el-form-item>
      <el-form-item class="login-clause">
        <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login_bat" :loading="loginLoading" type="primary" @click="onLogin('ruleForm')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from '@/utils/axios'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      checked: false,
      loginLoading: false,
      rules: {
        mobile: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 10, max: 11, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      this.loginLoading = true// 按钮防抖动--请求期间禁用
      const user = this.user
      console.log('输出用户信息', user)
      axios({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then(res => {
        console.log(res)
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.loginLoading = false
      }).catch(err => {
        this.$message.error('登陆失败，手机号或者验证码错误')
        console.log('登陆失败', err)
        this.loginLoading = false
      })
    }
  }
}
</script>
<style  lang="less">
.login-container{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./login_1.jpg") no-repeat;
  background-size: cover;
  .demo-ruleForm{
    background: rgb(255, 255, 255);
    padding: 50px;
    min-width: 300px;
    .login-title{
      margin-top: 0;
      text-align: center;
    }
    .login_bat{
      width: 100%;
    }
    .login-clause{
      margin-top: -10px;
      margin-bottom: 10px;
    }
  }
}
</style>
