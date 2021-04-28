<template>
    <div class="article-container">
      <!-- 筛选 -->
      <el-card class="fiter-card">
        <div slot="header" class="clearfix">
          <span>面包屑</span>
        </div>
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item label="状态：">
            <el-radio-group v-model="form.resource">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="待审核"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核失败"></el-radio>
              <el-radio label="已删除"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道：">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              v-model="form.date1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">筛选</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 内容 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>内容</span>
        </div>
        <el-table
          :data="articles"
          size="small"
          stripe
          class="list-table"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="封面"
            align="center">
            <template slot-scope="picture">
              <img class="article-cover" v-if="picture.row.cover.images[0]" :src="picture.row.cover.images[0]">
              <img class="article-cover" v-else src="./wutu.jpg">
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
                @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button
                size="mini"
                type="danger" icon="el-icon-delete"
                circle
                @click="handleDelete(scope.$index, scope.row)"></el-button>
      </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          @current-change="onCurrentChange"
          />
      </el-card>
    </div>
</template>
<script>
import { getArticles } from '@/api/article'
// import 代称 from '地址'
export default {
  name: 'Article',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [],
      articleStatus: [
        { text: '草稿', type: 'warning' },
        { text: '待审核', type: '' },
        { text: '审核通过', type: 'success' },
        { text: '审核失败', type: 'danger' },
        { text: '已删除', type: 'info' }
      ]
    }
  },
  computed: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticles (page = 1) {
      getArticles({
        page,
        per_page: 10

      }).then(res => {
        console.log('文章内容块', res)
        this.articles = res.data.data.results
      })
    },
    onCurrentChange (page) {
      console.log('页码', page)
      this.loadArticles(page)
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
