<template>
    <div class="article-container">
      <!-- 筛选 -->
      <el-card class="fiter-card">
        <div slot="header" class="clearfix">
          <span>面包屑</span>
        </div>
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item label="状态：">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道：">
            <el-select v-model="channelId" placeholder="请选择频道">
              <el-option
              label="全部"
              :value="null"></el-option>
              <el-option
              v-for="(channel, index) in channels"
              :key="index"
              :label="channel.name"
              :value="channel.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="loading" @click="loadArticles(1)">筛选</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 内容 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>根据查询得到{{ totalCount }}条数据</span>
        </div>
        <el-table
          :data="articles"
          size="small"
          stripe
          v-loading="loading"
          class="list-table"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="封面"
            align="center">
            <template slot-scope="picture">
              <el-image
                tyle="width: 100px; height: 100px"
                :src="picture.row.cover.images[0]"
                lazy
                fit="cover">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                </el-image>
              <!-- 自己写的图片显示 -->
              <!-- <img class="article-cover" v-if="picture.row.cover.images[0]" :src="picture.row.cover.images[0]"> -->
              <!-- <img class="article-cover" v-else src="./wutu.jpg"> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            align="center"
            label="标题">
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            min-width="100">
            <template slot-scope="state">
              <!-- 方法一 -->
              <el-tag size="small" :type="articleStatus[state.row.status].type">{{articleStatus[state.row.status].text}}</el-tag>
              <!-- 方法二 -->
              <!-- <el-tag v-if="state.row.status === 0" type="warning">草稿</el-tag> -->
              <!-- <el-tag v-if="state.row.status === 1" >待审核</el-tag> -->
              <!-- <el-tag v-if="state.row.status === 2" type="success">审核通过</el-tag> -->
              <!-- <el-tag v-if="state.row.status === 3" type="danger">审核失败</el-tag> -->
              <!-- <el-tag v-if="state.row.status === 4" type="info">已删除</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="日期"
            align="center"
            min-width="160">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                circle
                type="primary" icon="el-icon-edit"
                @click="$router.push('/publish?id='+ scope.row.id)"></el-button>
              <el-button
                size="mini"
                type="danger" icon="el-icon-delete"
                circle
                @click="onDeleteArticle(scope.row.id)"></el-button>
      </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          @current-change="onCurrentChange"
          :disabled="loading"
          :current-page.sync="page"
          />
      </el-card>
    </div>
</template>
<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'
// import 代称 from '地址'form
export default {
  name: 'Article',
  components: {},
  props: {},
  data () {
    return {
      form: {}, // 表单数据项，删除会报错，或者更改
      articles: [],
      articleStatus: [
        { text: '草稿', type: 'warning' },
        { text: '待审核', type: '' },
        { text: '审核通过', type: 'success' },
        { text: '审核失败', type: 'danger' },
        { text: '已删除', type: 'info' }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 20, // 每页显示数
      status: null,
      channels: [],
      channelId: null,
      loading: true,
      rangeDate: null, // 日期筛选
      page: 1
    }
  },
  computed: {},
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        // console.log('文章内容块', res)
        const { results, total_count: totalCount } = res.data.data
        this.totalCount = totalCount
        this.articles = results
        // 关闭页面加载
        this.loading = false
      })
    },
    // 初始化页面
    onCurrentChange (page) {
      // console.log('页码', page)
      this.loadArticles(page)
    },
    // 初始化页面
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log('频道', res)
        this.channels = res.data.data.channels
      })
    },
    // 删除
    onDeleteArticle (articleId) {
      this.$confirm('确定删除嘛?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          // 点击删除返回的数据
          // console.log(res)
          // 删除成功后更新页面--当前页
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消取消删除'
        })
      })
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.fiter-card{
  margin-bottom: 10px;
}
.list-table{
  margin-bottom: 18px;
}
.article-cover{
  height: 60px;
  background-size: cover;
}
</style>
