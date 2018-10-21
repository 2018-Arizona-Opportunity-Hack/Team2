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
