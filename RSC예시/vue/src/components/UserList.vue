<template>
  <table id="user-list">
    <thead>
    <tr>
      <th>아이디</th>
      <th>이름</th>
      <th>나이</th>
      <th>결혼여부</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(user) in users">
      <td>{{ user.id }}</td>
      <td>{{ user.name}}</td>
      <td>{{ user.age}}</td>
      <td v-if="user.married">결혼</td>
      <td v-else>미혼</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "UserList",
  props:{
    users: Array
  }
}
</script>

<style scoped>

</style>