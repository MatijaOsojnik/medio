<template>

  <v-container>
    <router-link :to="{name: 'stories'}" class="back-link" style="margin-top: 20px;">
      <!-- <v-icon dense>mdi-chevron-left</v-icon>Back to all stories -->
    </router-link>
    <slot name="story">
      <span class="heading ma-4 d-block">Loading..</span>
    </slot>
    <div>
      <span class="title ma-4 d-block">More from Medio</span>
      <v-divider></v-divider>
      <slot name="similar">
        <span class="heading ma-4 d-block">Nothing similar found..</span>
      </slot>
    </div>
    <v-spacer />
    <!-- <div>
      <span class="title ma-4 d-block">Other stories</span>
      <v-divider></v-divider>
      <slot name="other">
        <span class="heading ma-4 d-block">No other stories found</span>
      </slot>
    </div> -->
  </v-container>
</template>

<script>
export default {
  data: () => ({
  }),
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