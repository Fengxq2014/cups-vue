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
html {
  height: 100%;
}

body {
  background: #424f63;
  font-family: "Telugu MN","Microsoft YaHei", "微软雅黑","Lantinghei SC", Helvetica, Tahoma, Arial, sans-serif,SimSun,"Hiragino Sans GB", "Hiragino Sans GB";
  color: #7a7676;
  font-size: 14px;
  overflow-x: hidden;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
