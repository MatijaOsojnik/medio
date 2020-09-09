<template>
  <v-container>
    <router-link :to="{name: 'lectures'}" class="back-link" style="margin-top: 20px;">
      <v-icon dense>mdi-chevron-left</v-icon>Back to all lectures
    </router-link>
    <slot name="lecture">
      <span class="heading ma-4 d-block">Loading..</span>
    </slot>
    <div>
      <span class="title ma-4 d-block">Similar lectures</span>
      <v-divider></v-divider>
      <slot name="similar">
        <span class="heading ma-4 d-block">No similar lectures found</span>
      </slot>
    </div>
    <v-spacer />
    <div>
      <span class="title ma-4 d-block">Other lectures</span>
      <v-divider></v-divider>
      <slot name="other">
        <span class="heading ma-4 d-block">No other lectures found</span>
      </slot>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
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