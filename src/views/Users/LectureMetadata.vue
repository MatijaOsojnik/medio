<template>
  <v-container>
    <router-link :to="{name: 'lectures'}" class="back-link" style="margin-top: 20px;">
      <v-icon dense>mdi-chevron-left</v-icon>Back to all lectures
    </router-link>
    <div>
      <slot name="yourLectures">
        <span class="title ma-4 d-block">Your lectures</span>
        <span class="heading ma-4 d-block">Looks like you haven't made any lectures yet..</span>
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
.lecture-count {
  display: inline-block;
  font-size: 16px;
}
</style>