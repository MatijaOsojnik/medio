<template>
  <div>
    <slot name="completed-articles">
      <span class="heading ma-4 d-block">Looks like this list is empty..</span>
    </slot>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: () => ({})
};
</script>