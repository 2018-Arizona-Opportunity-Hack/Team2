import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../api';

Vue.use(Vuex);

const state = {
  loggedIn: !!window.sessionStorage.getItem('loggedIn'),
  loading: false,
  error: null
};

// export `mutations` as a named export
export const mutations = {
  error(state, error) {
    Object.assign(state, {error});
  },
  loggingInOut(state, bool) {
    state.error = false;
    state.loggedIn = bool;
  },
  loading(state, bool) {
    state.error = false;
    state.loading = bool;
  }
};

export const actions = {
  loggingOut(context) {
    window.sessionStorage.removeItem('loggedIn');
    return context.commit('loggingInOut', false);
  },
  loggingIn(context, data) {
    context.commit('loading', true);
    return new Promise((resolve) => {
      api.login(data)
        .then(() => {
          window.sessionStorage.setItem('loggedIn', 'true');
          context.commit('loading', false);
          context.commit('loggingInOut', true);
          resolve('done');
        })
        .catch(() => {
          context.commit('loading', false);
          context.commit('error', 'login failed')
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

export default store;