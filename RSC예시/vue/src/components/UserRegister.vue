<template>
  <div>
    <form id="user-form">
      <span v-if="notice">나이와 이름 모두 기입해주세요</span>
      <fieldset>
        <legend>사용자 등록</legend>
        <div><input v-model="name" id="username" type="text" placeholder="이름"></div>
        <div><input v-model="age" id="age" type="number" placeholder="나이"></div>
        <div><input v-model="married" id="married" type="checkbox"><label for="married">결혼 여부</label></div>
      </fieldset>

    </form>
    <button @click="onSubmit">등록</button>

  </div>
</template>

<script>
export default {
  name: "UserRegister",
  data() {
    return {
      notice: false,
      name: "",
      age: 0,
      married: false
    }
  },
  methods: {
    onSubmit() {
      const user = {
        name: this.name,
        age: this.age,
        married: this.married
      }
      this.notice = false;
      this.$emit('register-user', user);
    }
  }
}
</script>

<style scoped>
span {
  color: red;
}
</style>