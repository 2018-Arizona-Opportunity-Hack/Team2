<template>
  <main>
    <Login v-if="!loggedIn" />
    <Dashboard v-if="loggedIn" />
  </main>
</template>

<script>
import {mapState} from 'vuex';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import 'bulma/css/bulma.css';

var dicarr = {2018:100,2017:1000,2016:1000,2015:1}
export default{
  name: 'app',
  data: () => ({
    dicarr
  }),
  components: {
    Dashboard,
    Login
  },
  computed: {
    ...mapState(['loggedIn'])
  }
}
</script>
