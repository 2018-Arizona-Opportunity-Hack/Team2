<template>
  <section class="section columns">
    <form class="panel column" @submit.prevent="createForm">
      <div class="panel-heading">
        <label class="label" for="formName">Form Name</label>
        <input class="input" id="formName" type="text" v-model="formName" />
      </div>

      <div class="panel-block">
        <div>
          <div
            v-for="field in fields"
            v-bind:key="field.index"
            class="field"
          >
            <input class="label" type="type" v-model="field.name"/>
            <div class="input" v-bind:disabled="!field.deletable">
              {{field.type}}
            </div>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field">
          <input class="input is-primary" type="submit" value="Create Form" />
        </div>
      </div>
    </form>

    <form class="panel column" @submit.prevent="addField">

      <div class="panel-heading">
        Add Field
      </div>
      <div class="panel-block">
        <div>
          <div class="field">
            <label class="label" for="fieldName">Field Name</label>
            <input type="text" v-model="field.name" />
          </div>

          <div class="field">
            <label class="label" for="fieldType">FieldType</label>
            <select id="fieldType" v-model="field.type">
              <option disabled value="">Please select one</option>
              <option value="text">text</option>
              <option value="decimal">decimal</option>
              <option value="option">option</option>
            </select>
          </div>

          <input type="submit" value="Add Field"/>
          <button type="button" @click="clearField">clear</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'CreateForm',
  data: () => ({
    formName: '',
    fields: [
      // {name: 'Form Name', type: 'text', deletable: false},
      {index: 0, name: 'Donor Type', type: 'text', options: ['individual', 'entity'], deletable: false},
      {index: 1, name: 'Donor Name', type: 'text', deletable: false},
      {index: 2, name: 'Amount', type: 'decimal', deletable: false},
      {index: 3, name: 'Amount Type', type: 'option', options: ['weight', 'currency'], deletable: false},
    ],
    field: {
      name: '',
      type: ''
    }
  }),
  methods: {
    addField() {
      this.fields.push({...this.field, index: this.fields.length, deletable: true});
      this.field = {name: '', type: ''};
    },
    clearField() {
      this.field = {name: '', type: ''};
    },
    createForm() {
      const data = this.fields;
      console.log('create form', {data});
    }
  }
}
</script>