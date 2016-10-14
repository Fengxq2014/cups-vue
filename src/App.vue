<template>
  <div id="app">
    <router-view></router-view>
    <div v-loading.fullscreen="loading"></div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    loading: 'getLoading'
  }),
  components: {
    Hello
  }
}
</script>

<style>
html {
  height:100%
}
body {
  background: #424f63;
  font-family: "Telugu MN","Microsoft YaHei", "微软雅黑","Lantinghei SC", Helvetica, Tahoma, Arial, sans-serif,SimSun,"Hiragino Sans GB", "Hiragino Sans GB";
  color: #7a7676;
  font-size: 14px;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 20px;
  min-width: 1024px;
  height:100%
}
#app {
  height: 100%;
    background-color: white;
}
</style>
