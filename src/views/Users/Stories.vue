<template>

    <v-card class="mx-auto my-10" tile flat max-width="680px">
      <StoryMetadata>
        <template slot-scope="{}">
          <span v-if="stories.length" class="d-block title"
            >My Stories</span
          >
          <div v-for="story in stories" :key="story.id">
            <UserStory :story="story" />
          </div>
        </template>
      </StoryMetadata>
    </v-card>
</template>

<script>
import UserStory from "@/components/Card-Recommended";
import StoryService from "@/services/StoryService";
import StoryMetadata from "@/views/Users/StoryMetadata";

export default {
  components: {
    StoryMetadata,
    UserStory,
  },
  data: () => ({
    stories: [],
  }),
  mounted() {
    this.getUserStories();
  },
  methods: {
    async getUserStories() {
      const response = await StoryService.user(this.$store.state.user.id);
      this.stories = response.data;
    },
  },
};
</script>

<style>
</style>