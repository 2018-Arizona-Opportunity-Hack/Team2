<template>
  <div class="forms-list">
    forms list
    <div
      v-if="data && data.length"
      v-for="item in data"
      v-bind:key="item.formId"
    >
      {{item.name}}
    </div>

    <div v-if="!data || !data.length">
      empty list
    </div>
  </div>
</template>

<script>
export default {
  name: 'formslist',
  props: ['data']
};
</script>