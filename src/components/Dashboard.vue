<template>
  <div class="dashboard">
    dashboard
    <button
      class="button"
      @click="loggingOut">
      log out
    </button>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  methods: {
    ...mapActions(['loggingOut'])
  }
};
</script>
