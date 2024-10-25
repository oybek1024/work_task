<template>
  <div>
    <b-form-input v-model="text" @input="handleSearch" placeholder="Search ..."/>
<!--    <div class="mt-2">Value: {{ text }}</div>-->
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    ...mapActions(['fetchPosts']),
    handleSearch() {
      this.fetchPosts({ title : this.text });
    }
  }
}

</script>