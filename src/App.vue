<template>
  <div id="app">
  <weather></weather>
  </div>
</template>

<script>
import weather from './components/weather'
export default {
  name: 'App',
  components:{
    weather
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 640px;
}
</style>
