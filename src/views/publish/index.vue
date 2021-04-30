<template>
    <div class="publish-container">
       <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>面包屑</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <el-form :model="article" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <el-tiptap v-model= "article.content" height="360" placeholder="请输入文章内容" :extensions="extensions"/>
      </el-form-item>
      <el-form-item label="封面：" prop="cover">
        <el-radio-group v-model="article.cover.type">
          <el-radio :label="-1">自动</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
              v-for="(channel, index) in channels"
              :key="index"
              :label="channel.name"
              :value="channel.id"></el-option>
            </el-select>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish()">发表</el-button>
        <el-button @click="onPublish(true)">存入草稿</el-button>
      </el-form-item>
</el-form>
</el-card>
    </div>
</template>
<script>
import { getArticleChannels, addArticle, getArticle, updataArticle } from '@/api/article'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Fullscreen,
  Preview,
  CodeBlock,
  Image,
  TextColor
} from 'element-tiptap'
// import 'element-tiptap/lib/index.css'
// import 代称 from '地址'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new Image(),
        new TextColor(),
        new BulletList(),
        new OrderedList(),
        new Fullscreen(),
        new CodeBlock(),
        new Preview()
      ],
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [],
      rules: {}
    }
  },
  computed: {},
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    loadChannels () {
      getArticleChannels().then(({ data: { data } }) => {
        console.log('频道-获取的值', data)
        this.channels = data.channels
        console.log('频道', this.channels)
      })
    },
    // 创建-发表
    onPublish (draft) {
      const articleId = this.$route.query.id
      if (articleId) { // 修改
        updataArticle(articleId, this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发表'}成功`,
            type: 'success'
          })
        })
      } else { // 创建
        addArticle(this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发表'}成功`,
            type: 'success'
          })
        })
        this.$router.push('/article')
      }
    },
    // 修改文章  -- 获取内容
    loadArticle () {
      getArticle(this.$route.query.id).then(({ data: { data } }) => {
        console.log('点击修改进来的内容', data)
        this.article = data
      })
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
</style>
