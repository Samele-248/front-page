<template>
    <div class="settings-container">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>面包屑</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form ref="form" :model="user" label-width="100px">
                <el-form-item label="编号：">
                  {{ user.id }}
                </el-form-item>
                <el-form-item label="手机：">
                  {{ user.mobile }}
                </el-form-item>
                <el-form-item label="媒体名称：">
                  <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="媒体介绍：">
                  <el-input type="textarea" v-model="user.intro"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：">
                  <el-input v-model="user.email"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>
             </el-col>
              <el-col :span="6" :offset="2">
                <label for="file">
                  <el-avatar
                    shape="square"
                    :size="160"
                    fit="cover"
                    :src="user.photo"/>
                    <p>点击修改头像</p>
                </label>
                <input id="file" type="file" hidden ref="file" @change="onFileChange"/>
              </el-col>
          </el-row>
        </el-card>
        <el-dialog
          title="修改头像"
          :visible.sync="dialogVisible"
          append-to-body>
          <img width="150" :src="previewImage" alt="">
          <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'Settings',
  components: {},
  props: {},
  data () {
    return {
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      dialogVisible: false, // 控制上传图片预览显示状态
      previewImage: '' // 预览的图片
    }
  },
  computed: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
        console.log('当前用户信息', res)
      })
    },
    onFileChange () {
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      this.dialogVisible = true
      this.$refs.file.value = ''
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
</style>
