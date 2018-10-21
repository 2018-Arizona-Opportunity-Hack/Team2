<template>
  <main>
    <Dashboard v-if="loggedIn" />
    <Login v-if="!loggedIn" />
  </main>
</template>

<script>
import {mapState} from 'vuex';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import 'bulma/css/bulma.css';

export default {
  name: 'app',
  components: {
    Dashboard,
    Login
  },
  computed: {
    ...mapState(['loggedIn'])
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
