<template>
  <UserRegister @register-user="registerUser"/>
  <UserList v-bind:users="users"/>
</template>

<script>
import UserList from "../components/UserList";
import UserRegister from "../components/UserRegister";
import axios from "axios";

export default {
  name: "Comment",
  data(){
    return{
      users: [{
        id : 1,
        name: "ben",
        age: 13,
        married: false
      }],
    }
  },
  components:{
    UserList:UserList,
    UserRegister:UserRegister
  },
  methods: {
    registerUser(user) {
      this.insertUser(user);
    },
    insertUser(user){
      axios
          .post("http://localhost:3001/user", user)
          .then(res => {
            console.log(res);
            this.users.push(res.data);
          }).catch(err => console.log(err));
    },
    fetchData(pageNum) {
      axios
          .get("http://localhost:3001/user")
          .then(res => {
            this.users = res.data;
            return res.data;
          })
          .catch(err => {
            console.log(err);
          });
    }
  },
  created() {
    this.fetchData();
  }

}
</script>

<style scoped>

</style>