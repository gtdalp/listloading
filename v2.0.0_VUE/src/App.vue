<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,
#app {
  width:100%;
  height:100%;
  overflow:hidden;
  margin:0;
  background: #efeff4;
  font-family:'Microsoft YaHei',"Arial";
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  -webkit-tap-highlight-color:transparent;
  -webkit-text-size-adjust:none;
  -webkit-touch-callout:behavior;
}
</style>
