<template>
    <div class="image-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>面包屑</span>
        </div>
        <image-list/>
      </el-card>
    </div>
</template>
<script>
import imageList from '@/components/image-list'
export default {
  name: 'ImageIndex',
  components: {
    imageList
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {},
  watch: {}
}
</script>
<style lang="less" scoped>
</style>
