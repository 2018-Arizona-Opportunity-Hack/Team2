<template>
  <main>
    <Dashboard />
    <Login />
  </main>
</template>

<script>
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import 'bulma/css/bulma.css';

export default {
  name: 'app',
  components: {
    Dashboard,
    Login
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
  margin-top: 60px;
}
</style>
