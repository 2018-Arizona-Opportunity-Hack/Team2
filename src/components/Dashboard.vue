<template>
  <div class="dashboard">
    <nav
      class="navbar is-fixed-top is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <MenuButton
        name="Hi there"
        v-bind:list="settingsList"
      />
    </nav>

    <div>
      <CreateForm />
      <FormsList :data="formItems" />
    </div>

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
      settingsList: [{name: 'Log Out', onClick: this.loggingOut}]
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
