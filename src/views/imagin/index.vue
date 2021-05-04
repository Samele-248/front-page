<template>
    <div class="image-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>面包屑</span>
        </div>
        <div>
          <div class="action-head">
            <el-radio-group v-model="collect" @change="loadImages(1)"  size="small" >
              <el-radio-button label="false">全部</el-radio-button>
              <el-radio-button label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button size="small" @click="dialogUploadVisible=true" type="success">上传图片</el-button>
          </div>
          <el-row :gutter="20">
            <el-col v-for="(img, index) in image" :key="index" :xs="24" :sm="12" :md="8" :lg="6" :xl="3" class="image-item">
              <el-image style="height: 100px"
                :src="img.url"
                fit="cover">
              </el-image>
              <div class="image-action">
                <!-- 方法二 -->
                <el-button @click="onCollect(img)" :loading="img.loading" size="small" :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'" circle></el-button>
                <!-- 方法一 -->
                <!-- <i @click="onCollect(img)"
                  :class="{
                  'el-icon-star-off': !img.is_collected,
                  'el-icon-star-on': img.is_collected
                }"></i> -->
                <!-- 方法二 -->
                <el-button @click="onDatele(img)" :loading="img.loading" icon="el-icon-delete" size="small" circle></el-button>
                <!-- 方法一 -->
                <!-- <i class="el-icon-delete-solid"></i> -->
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 分页 -->
        <el-pagination
          background
          style="margin-top:10px"
          layout="prev, pager, next"
          :current-page.sync="page"
          @current-change="onPageChange"
          :total="totalCount"
          :page-size="pageSize">
        </el-pagination>
      </el-card>
      <!-- 上传素材 -->
      <el-dialog title="上传素材" :visible.sync="dialogUploadVisible" :append-to-body="true">
        <el-upload
          class="upload-demo"
          drag
          action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
          name="image"
          :headers = "uploadHeaders"
          :show-file-list="false"
          :on-success="onUploadSuccess"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>

    </div>
</template>
<script>
import { getImage, collectImage, deleteImage } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: 'false',
      image: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}` // 上传图片的请求头，得单独配置
      },
      totalCount: null,
      pageSize: 10,
      page: 1
    }
  },
  computed: {},
  created () {
    this.loadImages(1)
  },
  mounted () {},
  methods: {
    loadImages (page = 1) {
      this.page = page // 切换全部和收藏，重置高亮页码
      getImage({
        collect: this.collect, // 已收藏或全部
        page,
        per_page: this.pageSize
      }).then(({ data: { data } }) => {
        data.results.forEach(res => { // 向数据里边传一个数据
          res.loading = false
        })
        // console.log('获取图片数据处理后：', data)
        this.image = data.results
        this.totalCount = data.total_count
      })
    },
    onUploadSuccess () {
      this.dialogUploadVisible = false
      this.loadImages(this.page)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onPageChange (page) {
      // console.log('第', page, '页')
      this.loadImages(page, false)
    },
    onCollect (img) { // 输入图片信息，包括是否已经被收藏
      img.loading = true // 点击添加收藏，禁用按钮--显示加载中
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
        img.loading = false// 点击收藏，禁用按钮--关掉加载
      })
    },
    onDatele (img) {
      img.loading = true // 点击删除，禁用按钮--显示加载中
      deleteImage(img.id).then(res => {
        // console.log('点击删除的返回', res)
        this.loadImages(this.page) // 删除后刷新--回到当前页码 -- 页面
        img.loading = false// 点击删除，禁用按钮--关掉加载
      })
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.action-head{
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-item{
  position: relative;
}
.image-action{
  font-size: 24px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 36px;
  background-color: rgba(204, 202, 64, 0.3);
  position: absolute;
  bottom: 4px;
  left: 10px;
  right: 10px;

}
</style>
