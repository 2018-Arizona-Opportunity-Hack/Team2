<template>
  <div>
    <button
      aria-haspopup="true"
      v-bind:aria-expanded="toggle"
      @click="toggle=!toggle"
      @keydown.down="toggle=true"
    >
      {{name}}
    </button>

    <div
      role="menu"
      v-bind:hidden="!toggle"
    >
      <button
        v-for="item in list"
        v-bind:key="item.name"
        role="menuitem"
        @click="item.onClick"
      >
        {{item.name}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuButton',
  props: ['name', 'list'],
  data: () => ({toggle: false})
}
</script>