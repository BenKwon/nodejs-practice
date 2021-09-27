<template>
  <router-link to="/user">Go to User  </router-link>
  <router-link to="/comment">Go to Comment</router-link>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app * {
  margin-top: 5px;
}

table {
  border: 1px solid black;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid black;
}
</style>
