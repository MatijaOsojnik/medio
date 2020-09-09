<template>
    <div>
      <slot name="userArticles">
        <span class="title ma-4 d-block">My articles</span>
        <span class="heading ma-4 d-block">Looks like I haven't made any articles yet..</span>
      </slot>
    </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style scoped>
.back-link {
  font-size: 15px;
  color: #52616b;
  margin-top: 20px;
}
.back-link:hover {
  color: #303841;
}
.article-count {
  display: inline-block;
  font-size: 16px;
}
</style>