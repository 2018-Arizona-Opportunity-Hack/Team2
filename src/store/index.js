import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../api';

Vue.use(Vuex);

const state = {
  loggedIn: !!window.sessionStorage.getItem('loggedIn'),
  loading: false,
  error: null,
  formsList: []
};

// export `mutations` as a named export
export const mutations = {
  error(state, error) {
    Object.assign(state, {error});
  },
  formsList(state, formsList) {
    Object.assign(state, {formsList});
  },
  loggingInOut(state, bool) {
    Object.assign(state, {
      loggedIn: bool,
      loading: false,
      error: null,
      formsList: []
    });
  },
  loading(state, bool) {
    Object.assign(state, {
      error: null,
      loading: bool
    });
  }
};

export const actions = {
  dashboardLoadData(context) {
    return new Promise((resolve) => {
      api.getFormList()
        .then(({formsList}) => {
          context.commit('formsList', formsList);
          resolve('done');
        })
        .catch(() => {
          context.commit('error', 'form list failed');
          resolve('fail');
        });
    });
  },
  loggingOut(context) {
    window.sessionStorage.removeItem('loggedIn');
    context.commit('loggingInOut', false);
    api.logout()
      .then(() => console.log('logged out success'))
      .catch(() => console.log('logged out fail'));
  },
  loggingIn(context, data) {
    context.commit('loading', true);

    return new Promise((resolve) => {
      (data.register ? api.createUser : api.login)(data)
        .then(({userId}) => {
          window.sessionStorage.setItem('loggedIn', userId);

          context.commit('loading', false);
          context.commit('loggingInOut', true);

          context.dispatch('dashboardLoadData');

          resolve('done');
        })
        .catch(() => {
          context.commit('loading', false);
          context.commit('error', 'login failed');

          resolve('fail');
        });
    });
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

if (store.state.loggedIn) {
  store.dispatch('dashboardLoadData');
}

export default store;