<template>
    <div class="settings-container">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>面包屑</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form ref="form" :model="user" :rules="rules" label-width="100px">
                <el-form-item label="编号：">
                  {{ user.id }}
                </el-form-item>
                <el-form-item label="手机：">
                  {{ user.mobile }}
                </el-form-item>
                <el-form-item label="媒体名称：" prop="name">
                  <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="媒体介绍：" prop="textarea">
                  <el-input type="textarea" v-model="user.intro"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                  <el-input v-model="user.email"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :loading="updateProfileLoading" @click="onUpdateUser">保存</el-button>
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
        <!-- 弹窗修改用户信息 -->
        <el-dialog
          title="修改头像"
          :visible.sync="dialogVisible"
          @opened="onDialogOpened"
          @closed="onDialogClosed"
          append-to-body>
          <div class="preview-imge-wrap">
            <img class="preview-img" ref="preview-img" :src="previewImage" alt="">
          </div>
          <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" :loading="updatePhotoLoading" @click="onUpdatephoto">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus'
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
      previewImage: '', // 预览的图片
      cropper: null,
      updatePhotoLoading: false, // 保存图片，禁用按钮
      updateProfileLoading: false,
      // 表单验证
      rules: {
        name: [

        ],
        textarea: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        email: [

        ]
      }
    }
  },
  computed: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    // 保存
    onUpdateUser () {
      this.updateProfileLoading = true
      const { name, intro, email } = this.user
      updateUserProfile(name, intro, email).then(res => {
        console.log(res)
        this.updateProfileLoading = false
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        globalBus.$emit('update-user', this.user)
      })
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
    },
    onDialogOpened () {
      const image = this.$refs['preview-img']
      // 剪切器-初始化
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1,
        cropBoxResizable: false,
        background: false,
        movable: true
      })
    },
    onDialogClosed () { // 配置剪切器
      // 销毁选择的图片
      // this.cropper.destroy()
    },
    onUpdatephoto () { // 修改图片
      this.updatePhotoLoading = true
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updateUserPhoto(fd).then(res => {
          this.user.photo = window.URL.createObjectURL(file)
          this.dialogVisible = false
          // this.user.photo = res.data.data.photo // 发请求后获得数据，反应较慢
          this.updatePhotoLoading = false
          globalBus.$emit('update-user', this.user)

          console.log(res)
        })
      })
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.preview-imge-wrap{
  .preview-img{
    display: block;
    max-width: 100%;
    height: 230px;
  }
}
</style>
