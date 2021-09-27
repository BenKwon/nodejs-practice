<template>
  <table id="comment-list">
    <thead>
    <tr>
      <th>아이디</th>
      <th>작성자</th>
      <th>댓글</th>
      <th>수정</th>
      <th>삭제</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(comment) in comments">
      <td>{{ comment.id }}</td>
      <td>{{ comment.name}}</td>
      <td>{{ comment.comment}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "CommentList",
  props:{
    comments: Array,
  }
}
</script>

<style scoped>

</style>