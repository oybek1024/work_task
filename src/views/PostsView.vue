<template>
  <div class="row">
    <div class="col-3">
      <AddPost class="mb-3"/>
    </div>
    <div class="col-9">
      <PostSearchBox class="mb-4"/>
      <PostsList/>
    </div>
  </div>
</template>
<script>

import AddPost from "@/components/AddPost.vue";
import PostsList from "@/components/PostsList.vue";
import PostSearchBox from "@/components/PostSearchBox.vue";
export default {
  name: 'PostsView',
  components: {
    AddPost,
    PostsList,
    PostSearchBox
  },
  data() {
    return {}
  }
}
</script>