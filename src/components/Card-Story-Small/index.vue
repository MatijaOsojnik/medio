<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :to="{path: `/stories/${story.id}`}" raised :elevation="hover ? 8 : 2">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="headline" v-text="story.title"></v-card-title>

          <v-card-subtitle v-text="story.short_description"></v-card-subtitle>
        </div>

        <v-avatar class="ma-3" size="150" tile>
          <v-img
            :src="imageError ? require('@/assets/blue-error-background.jpg') : story.thumbnail_url"
            class="darker-img"
            @error="imageLoadError"
          ></v-img>
        </v-avatar>
      </div>
    </v-card>
  </v-hover>
</template>


<script>
export default {
  data: () => ({
    imageError: false,
  }),
  props: {
    story: Object,
  },
  methods: {
    async imageLoadError() {
      this.imageError = true;
    },
  },
};
</script>

<style>
</style>