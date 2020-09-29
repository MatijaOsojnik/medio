<template>
  <v-container>
    <router-link :to="{name: 'stories'}" class="back-link" style="margin-top: 20px;">
      <v-icon dense>mdi-chevron-left</v-icon>Back to all stories
    </router-link>
    <div>
      <slot name="yourStories">
        <span class="title ma-4 d-block">Latest</span>
        <span class="heading ma-4 d-block">Seems like you haven't written any stories yet..</span>
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
.story-count {
  display: inline-block;
  font-size: 16px;
}
</style>