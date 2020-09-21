<template>
  <StoryMetadata>
    <template v-slot:yourStories>
    <span class="title my-4 d-block">Your stories</span>
      <v-row style="z-index: 100" class="flex-sm-fill">
        <v-col
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
        >
          <StoryCardCreateComponent :card="card" />
        </v-col>
        <v-col
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
          v-for="story in stories"
          :key="story.id"
        >
          <StoryCardComponent :story="story" />
        </v-col>
      </v-row>
    </template>
  </StoryMetadata>
</template>

<script>
import StoryCardCreateComponent from "@/components/Card-Story-Create";
import StoryCardComponent from "@/components/Card-Story";
import StoryService from "@/services/StoryService";
import StoryMetadata from "@/views/Users/StoryMetadata";

export default {
  components: {
    StoryCardCreateComponent,
    StoryCardComponent,
    StoryMetadata
  },
  data: () => ({
    card: {
      imageUrl:
        "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      url: "/stories/create/"
    },
    stories: null
  }),
  created() {
    this.getUserStories();
  },
  methods: {
    async getUserStories() {
      const response = await StoryService.user(this.$store.state.user.id);
      this.stories = response.data;
    }
  }
};
</script>

<style>
</style>