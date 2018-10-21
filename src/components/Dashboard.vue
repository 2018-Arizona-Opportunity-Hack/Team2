<template>
  <div class="dashboard">
    <nav
      class="navbar is-fixed-top is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-item is-right">
        <button class="button" @click="loggingOut">Log out</button>
      </div>
    </nav>

    <section class="section">
      <div class="tabs">
        <ul>
          <li v-bind:class="{'is-active': tab === 0}"><a @click="tab = 0">CHART</a></li>
          <li v-bind:class="{'is-active': tab === 1}"><a @click="tab = 1">Forms</a></li>
          <li v-bind:class="{'is-active': tab === 2}"><a @click="tab = 2">other</a></li>
        </ul>
      </div>

      <div class="panel">
        <div v-if="tab === 0" class="panel-block">
          CHART
        </div>

        <div v-if="tab === 1" class="panel-block">
          <CreateForm />
          <FormsList :data="formItems" />
        </div>

        <div v-if="tab === 2" class="panel-block">
          OTHER
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import MenuButton from './utilities/MenuButton';
import FormsList from './dashboard/FormsList';
import CreateForm from './dashboard/CreateForm';

export default {
  name: 'dashboard',
  components: {
    CreateForm,
    FormsList,
    MenuButton
  },
  data: function() {
    return {
      tab: 1,
    };
  },
  computed: {
    ...mapState({
      formItems: (state) => state.formsList
    })
  },
  methods: {
    ...mapActions(['loggingOut'])
  }
};

</script>
