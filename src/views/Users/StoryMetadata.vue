<template>
  <div>
    <slot>
        <span class="title ma-4 d-block">My Stories</span>
        <span class="heading ma-4 d-block"
          >Seems like you haven't written any stories yet..</span
        >
    </slot>
  </div>
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
.story-count {
  display: inline-block;
  font-size: 16px;
}
</style>