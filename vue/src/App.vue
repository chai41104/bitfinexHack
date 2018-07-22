<template>
  <div id="main" class="container">

    <h1>Crypto Trade Risk Analyser</h1>
    <div class="nav">
      <ul>
        <li><router-link to="/">Trades</router-link></li>
        <li><router-link to="/margin">Margins</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
