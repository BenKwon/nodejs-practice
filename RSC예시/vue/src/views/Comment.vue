<template>
  <CommentWrite @register-comment="registerComment"/>
  <CommentList v-bind:comments="comments"/>
</template>

<script>
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommentList";
import axios from "axios";

export default {
  name: "Comment",
  components: {
    CommentWrite: CommentWrite,
    CommentList: CommentList
  },
  data(){
    return{
      comments: []
    }
  },
  methods: {
    registerComment(comment) {
      this.insertComment(comment);
    },
    insertComment(comment){
      axios
          .post("http://localhost:3001/comment", comment)
          .then(res => {
            console.log(res);
            this.comments.push(res.data);
          }).catch(err => console.log(err));
    },
    fetchData(pageNum) {
      axios
          .get("http://localhost:3001/comment")
          .then(res => {
            this.comments = res.data;
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