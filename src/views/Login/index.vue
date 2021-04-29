<template>
  <div class="login-container">
    <el-form :model="user" :rules="fromRules" ref="ruleForm" class="demo-ruleForm">
      <h1 class="login-title">某某后台管理系统</h1>
      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input placeholder="请输入验证码" v-model="user.code"></el-input>
      </el-form-item>
      <el-form-item class="login-clause" prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login_bat" :loading="loginLoading" type="primary" @click="onLogin()">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { loginUser } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: true
      },
      loginLoading: false,
      fromRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              console.log('判断规则', rule)
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选同意用户协议'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    // 被调用函数
    login () {
      this.loginLoading = true// 按钮防抖动--请求期间禁用
      loginUser(this.user).then(res => {
        console.log('点击登陆的结果', res)
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.loginLoading = false // 登陆禁用关闭
        this.$router.push('/') // 登陆成功，跳转首页
        // this.$router.push({
        //   name: 'home'
        // })
      }).catch(err => {
        this.$message.error('登陆失败，手机号或者验证码错误')
        console.log('登陆失败', err)
        this.loginLoading = false
      })
    },
    // 点击登陆
    onLogin () {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    }
  }
}
</script>
<style scoped  lang="less">
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
      /deep/ .el-form-item__error {
        top: 70%;
      }
    }
  }
}
</style>
