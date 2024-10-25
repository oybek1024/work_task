<template>
  <div>
    <b-container class="pt-3">
      <b-nav class="mb-3" pills>
        <b-nav-item :key="item.title" v-for="item in navItems" :active="item.route_name === $route.name"
                    @click="$router.push({ name: item.route_name })">
          {{ item.title }}
        </b-nav-item>
      </b-nav>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {title: 'Posts', route_name: 'posts'},
        {title: 'Kanban', route_name: 'kanban'},
        {title: 'Calendar', route_name: 'calendar'}
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;

}
</style>
