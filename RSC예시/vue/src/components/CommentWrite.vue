<template>
  <div>
    <form id="comment-form">
      <fieldset>
        <legend>댓글 등록</legend>
        <div><input v-model="userId" id="userid" type="text" placeholder="사용자 아이디"></div>
        <div><input v-model="comment" id="comment" type="text" placeholder="댓글"></div>
      </fieldset>
    </form>
    <button @click="registerComment" type="submit">등록</button>
  </div>
</template>

<script>
export default {
  name: "CommentWrite",
  data(){
    return{
      userId: 0,
      comment: ""
    }
  },
  methods :{
    registerComment(){
      const comment = {
        commenter : this.userId,
        comment : this.comment
      }
      this.$emit('register-comment',comment);
    }
  }

}
</script>

<style scoped>

</style>