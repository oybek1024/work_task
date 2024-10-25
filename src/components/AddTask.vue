<template>
  <b-modal centered hide-footer title="Add a Task" v-model="visible" @hide="close">
    <b-form @submit.prevent="addNewTask">
      <b-form-group label="Title">
        <b-form-input v-model="title" placeholder="Enter task title" required></b-form-input>
      </b-form-group>
      <b-button class="mt-4" type="submit" variant="primary">Add Task</b-button>
    </b-form>
  </b-modal>
</template>


<script>
export default {
  data() {
    return {
      title: '',
      visible: false
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.title = '';
    },
    addNewTask() {
      this.$emit('created', this.title);
      this.close()
    }
  }
}
</script>
<style>
.modal-header .close{
display: none;
}
</style>