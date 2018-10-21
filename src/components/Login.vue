<template>
  <section class="section login">
    <div v-if="error"
        class="notification is-danger">
      <span aria-live="assertive">
        {{error}}
      </span>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label" for="emailInput">
          Email
        </label>

        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            required
            type="email"
            id="emailInput"
            v-model="email"
            v-bind:disabled="loading"
          />

          <span class="icon is-small is-left">
            <i class="fas fa-at"></i>
          </span>

          <span class="icon is-small is-right">
            <i v-if="email.length > 0 && validEmail" class="fas fa-check"></i>

            <i v-if="!validEmail" class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label" for="passwordInput">
          Password
        </label>

        <div class="control has-icons-right">
          <input
            class="input"
            required
            type="password"
            id="passwordInput"
            v-model="password"
            v-bind:disabled="loading"
          />

          <span class="icon is-small is-right">
            <i v-if="password.length > 0 && validPassword" class="fas fa-check"></i>

            <i v-if="!validPassword" class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <button
          class="button"
          type="submit"
          v-bind:disabled="disableSubmit"
          v-bind:class="{
            'is-success': !disableSubmit,
            'is-loading': loading
          }"
        >
          Submit
        </button>
        <button
          class="button"
          style="margin-left: 10px;"
          type="button"
          @click="onRegister"
          v-bind:disabled="disableSubmit"
          v-bind:class="{
            'is-loading': loading
          }"
        >
          Register
        </button>

      </div>
    </form>
  </section>
</template>

<style scoped>
  input:focus ~ .icon.is-right > .fa-check,
  input:hover ~ .icon.is-right > .fa-check {
    color: green;
  }

  .icon > .fa-exclamation-triangle,
  .icon > .fa-exclamation-triangle {
    color: red;
  }
</style>


<script>
import {mapActions, mapState} from 'vuex';
import SHA256 from 'crypto-js/sha256';

const emailRegEx = /^\w+[\w-.]*@([\w-]+\.)+[\w-]+$/;

export default {
  name: 'Login',
  data: () => ({email: '', password: ''}),
  computed: {
    ...mapState(['error', 'loading']),

    disableSubmit() {
      return !this.validEmail || !this.validPassword;
    },
    validEmail() {
      return this.email.length === 0 || emailRegEx.test(this.email);
    },
    validPassword() {
      return this.password.length === 0 || this.password.length >= 6;
    }
  },
  methods: {
    ...mapActions(['loggingIn']),
    onSubmit() {
      const {email, password} = this;
      const data = {email, password: SHA256(password).toString()};

      this.loggingIn(data)
        .then(() =>
          Object.assign(this, {password: ''})
        );
    },
    onRegister() {
      const {email, password} = this;
      const data = {register: true, email, password: SHA256(password).toString()};
      this.loggingIn(data)
        .then(() =>
          Object.assign(this, {password: ''})
        );
    }
  }
}
</script>
