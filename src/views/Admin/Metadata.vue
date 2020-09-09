<template>
  <v-container>
    <div>
      <slot name="lectures">
        <span class="heading ma-4 d-block">Loading...</span>
      </slot>
      <slot name="users">
        <span class="heading ma-4 d-block">Loading...</span>
      </slot>
      <slot name="categories">
        <span class="heading ma-4 d-block">Loading...</span>
      </slot>
      <slot name="roles">
        <span class="heading ma-4 d-block">Loading...</span>
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
.lecture-count {
  display: inline-block;
  font-size: 16px;
}
</style>