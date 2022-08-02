<template>
  <div class="fans-container">
    <map-demo />
    <bmap-demo />
  </div>
</template>

<script>
import MapDemo from './components/map-demo'
import BmapDemo from './components/bmap-demo'

export default {
  name: 'FansIndex',
  components: {
    MapDemo,
    BmapDemo
  },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style lang="less">
</style>
