<template>
  <div>
    <h3>Add a Post</h3>
    <b-form @submit.prevent="addNewPost">
      <b-form-group label="Title">
        <b-form-input v-model="title" placeholder="Enter post title" required></b-form-input>
      </b-form-group>
      <b-form-group label="Content" class="mb-2">
        <b-form-textarea v-model="content" placeholder="Enter post content"></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Add Post</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    ...mapActions(['addPost']),
    addNewPost() {
      const post = { title: this.title, content: this.content, views: Math.floor(Math.random() * 1000) };
      this.addPost(post);
      this.title = '';
      this.content = '';
    }
  }
};
</script>

<style scoped>

</style>