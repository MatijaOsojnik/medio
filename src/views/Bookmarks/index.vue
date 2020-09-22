<template>
  <BookmarkMetadata>
    <template v-slot:yourBookmarks>
      <span class="title my-4 d-block">Your Bookmarks</span>
      <v-row class="ma-0">
        <v-col
          class="col-12 d-block justify-center pa-0"
        >
          <v-col v-for="story in stories" :key="story.id" class="px-0">
            <StoryCardSmallComponent :story="story.Story"/>
          </v-col>
        </v-col>
      </v-row>
    </template> 
  </BookmarkMetadata>
</template>

<script>
import StoryCardSmallComponent from "@/components/Card-Story-Small";
import GeneralService from "@/services/GeneralService";
import BookmarkMetadata from "@/views/Bookmarks/BookmarkMetadata";

export default {
  components: {
    StoryCardSmallComponent,
    BookmarkMetadata,
  },
  data: () => ({
    // card: {
    //   imageUrl:
    //     "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    //   url: "/stories/create/"
    // },
    stories: null,
  }),
  created() {
    this.getUserBookmarks();
  },
  methods: {
    async getUserBookmarks() {
      const response = await GeneralService.getBookmarks(this.$store.state.user.id);
      this.stories = response.data.bookmarks
    },
  },
};
</script>

<style>
</style>