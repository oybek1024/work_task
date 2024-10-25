<template>
  <b-list-group>
    <b-list-group-item v-for="post in postsData" :key="post.id"
                       class="d-flex justify-content-between align-items-center p-4">
      <div>
        <b-badge class="bg-primary position-absolute view">
          <b-icon icon="eye" class="text-white"/>
          {{ post.views }}
        </b-badge>
        <h4>{{ post.title }}</h4>
        <p>{{ post.content }}</p>
      </div>
      <b-button variant="danger" @click="removePost(post.id)">Delete</b-button>

    </b-list-group-item>

  </b-list-group>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters(['postsData']),
  },
  methods: {
    ...mapActions(['fetchPosts', 'removePost'])
  },
  async mounted() {
    await this.fetchPosts();
  }
}

</script>


<style scoped>
.view {
  top: 5px;
  left: -10px;
}
</style>