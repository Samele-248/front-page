<template>
    <div class="fans-container">
        <p>共享数据一：{{ $store.state.count }}</p>
        {{ahow}}
        <p>数据二：{{ count }}</p>
        <p><button @click="onAdd">+1</button></p>
        <p><button @click="onSubtraction">-1</button></p>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'Fans',
  components: {},
  props: {},
  data () {
    return { }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['ahow'])
  },
  created () {},
  mounted () {},
  methods: {
    ...mapMutations(['add', 'subtraction']),
    ...mapActions(['addAc']),
    onAdd () {
      console.log('对他加一')
      // this.$store.commit('add', 8)
      // this.subtraction(2)
      // this.$store.dispatch('addAc', 8)
      this.addAc(2)
    },
    onSubtraction () {
      console.log('对他减一')
      this.$store.commit('subtraction', 9)
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
</style>
