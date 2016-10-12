<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  components: {
    Hello
  }
}
</script>

<style>

body {
  background: #424f63;
  font-family: "Telugu MN","Microsoft YaHei", "微软雅黑","Lantinghei SC", Helvetica, Tahoma, Arial, sans-serif,SimSun,"Hiragino Sans GB", "Hiragino Sans GB";
  color: #7a7676;
  font-size: 14px;
  overflow-x: hidden;
  line-height: 20px;
}
</style>
