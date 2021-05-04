<template>
    <div class="comment-container">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <el-table
            :data="articles" stripe
            style="width: 100%">
            <el-table-column
              prop="title"
              label="标题"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="total_comment_count"
              label="总评论数"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="fans_comment_count"
              align="center"
              label="粉丝评论数">
            </el-table-column>
            <el-table-column
              prop="comment_status"
              align="center"
              label="评论状态">
              <template slot-scope="scope">
                {{ scope.row.comment_status ? '正常' : '关闭' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-switch
                  style="display: block"
                  v-model="scope.row.comment_status"
                  :disabled = "scope.row.statusDisabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="onStatusChange( scope.row )">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[10, 20, 50]"
            :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            background
            :total="totalCount"/>
        </el-card>
    </div>
</template>
<script>
import { getArticles, updateCommentStatus } from '@/api/article'
export default {
  name: 'Comment',
  components: {},
  props: {},
  data () {
    return {
      articles: [], // 接收数据
      totalCount: 0, // 总数据条数
      pageSize: 10,
      page: 1
    }
  },
  computed: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    // 多少条数据每页
    handleSizeChange (val) {
      this.loadArticles(1)
      // console.log('是啊', val)
    },
    // 页码改变，加载指定页码数据
    handleCurrentChange (val) {
      this.loadArticles(val)
      // console.log(`当前页: ${val}`)
    },
    // 初始化页面
    loadArticles (page) {
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(({ data: { data } }) => {
        // console.log('评论管理', data)
        data.results.forEach(article => {
          article.statusDisabled = false
        })
        this.articles = data.results
        this.totalCount = data.total_count
      })
    },
    onStatusChange (article) {
      article.statusDisabled = true
      // console.log('评论状态', article)
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
        // console.log('评论状态的返回', res)
        article.statusDisabled = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启成功' : '关闭成功'
        })
      })
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
</style>
