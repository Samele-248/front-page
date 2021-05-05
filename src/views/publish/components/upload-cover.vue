<template>
  <div class="upload-cove">
    <div class="cover-wrap" @click="showCoverSelect">
      <!-- <img height="120" ref="cover-img" :src="coverImage"> -->
      <img height="120" ref="cover-img" :src="value">
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <image-list :is-show-add="false" :is-show-action="false" is-show-selected ref="image-list"/>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
            <input type="file" ref="file" @change="onFileChange">
            <img width="100" ref="preview-image">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import imageList from '@/components/image-list'
import { uploadImage } from '@/api/image'
// import 代称 from '地址'
export default {
  name: 'uploadCove',
  components: {
    imageList
  },
  // props: ['cover-image'], // 优化前
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
      // this.$refs.file.value = '' // 防止用户选择同一个图片，不触发
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择图片')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          console.log('上传图片返回', res)
          this.$refs['cover-img'].src = res.data.data.url // 显示上传的图片
          // this.$emit('update-cover', res.data.data.url) // 优化前
          this.$emit('input', res.data.data.url)
          this.dialogVisible = false // 关闭弹出层
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message('请选择封面图片')
          return
        }
        this.dialogVisible = false // 关闭弹出层
        console.log(selected)
        this.$emit('input', imageList.image[selected].url)
      }
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.upload-cove{
  .cover-wrap{
      width: 150px;
      height: 120px;
      border: 1px solid #000;
  }
}
</style>
