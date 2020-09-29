<template>
  <v-container>
    <router-link :to="{name: 'stories'}" class="back-link" style="margin-top: 20px;">
      <v-icon dense>mdi-chevron-left</v-icon>Back
    </router-link>
    <div>
      <slot name="yourBookmarks">
        <span class="title ma-4 d-block">Your Bookmarks</span>
        <span class="heading ma-4 d-block">Looks like you don't have any stories bookmarked yet..</span>
      </slot>
    </div>
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
</style>