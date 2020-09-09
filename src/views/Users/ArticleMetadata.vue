<template>
  <v-container>
    <router-link :to="{name: 'articles'}" class="back-link" style="margin-top: 20px;">
      <v-icon dense>mdi-chevron-left</v-icon>Back to all articles
    </router-link>
    <div>
      <slot name="yourArticles">
        <span class="title ma-4 d-block">Your articles</span>
        <span class="heading ma-4 d-block">Looks like you haven't made any articles yet..</span>
      </slot>
    </div>
    <div></div>
  </v-container>
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