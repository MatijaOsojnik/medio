<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :to="{path: `/stories/${story.id}`}" raised :elevation="hover ? 8 : 2">
      <v-row>
        <v-col class="col-9 d-flex align-center">
          <div class="d-flex flex-column justify-space-between" style="width: 100%; height: 100%;">
            <div>
              <v-card-title class="headline" v-text="story.title"></v-card-title>
              <v-card-subtitle v-text="story.short_description"></v-card-subtitle>
            </div>
            <div class="pb-3">
              <span class="subtitle-1 px-4 d-block">{{story.Users[0].display_name}}</span>
              <div class="d-flex justify-space-between">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span
                    class="subtitle-2 px-4 mb-2 d-inline-block"
                    v-bind="attrs"
                    v-on="on"
                  >{{story.createdAt | formatDate}}</span>
                </template>
                <span>Updated at {{story.updatedAt | formatDate}}</span>
              </v-tooltip>
              <!-- Router link to current page -->
              <router-link :to="$router.currentRoute">
                <v-icon class="mr-3" style="z-index: 999;" @click="addBookmark(story.id)">{{bookmarkIcon}}</v-icon>
              </router-link>
              </div>
              <!-- <v-icon class="mr-3">mdi-share-variant</v-icon> -->
            </div>
          </div>
        </v-col>
        <v-col class="col-3 py-6">
          <v-avatar size="150" tile>
            <v-img
              :src="imageError ? require('@/assets/blue-error-background.jpg') : story.thumbnail_url"
              class="darker-img"
              @error="imageLoadError"
            ></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>


<script>
import GeneralService from "@/services/GeneralService";
export default {
  data: () => ({
    imageError: false,
    bookmarkIcon: "mdi-bookmark-outline",
    // formatedDate: formatDate(this.story.createdAt)
  }),
  props: {
    story: Object,
  },
  mounted() {
    this.checkBookmark();
  },
  methods: {
    async imageLoadError() {
      this.imageError = true;
    },
    async checkBookmark() {
      const response = await GeneralService.getBookmarks(
        this.$store.state.user.id
      );
      console.log(response.data.bookmarks);
      response.data.bookmarks.map((bookmark) => {
        if (bookmark.story_id === this.story.id) {
          this.bookmarkIcon = "mdi-bookmark";
        }
      });
    },
    async addBookmark(storyId) {
      // If no bookmark, add a new bookmark
      if (this.bookmarkIcon === "mdi-bookmark-outline") {
        try {
          const response = await GeneralService.postBookmark(
            this.$store.state.user.id,
            storyId
          );
          if (response) {
            this.bookmarkIcon = "mdi-bookmark";
          }
        } catch (err) {
          console.log(err);
        }
        // If bookmark, remove bookmark
      } else {
        try {
          const response = await GeneralService.deleteBookmark(
            this.$store.state.user.id,
            storyId
          );
          if (response) {
            this.bookmarkIcon = "mdi-bookmark-outline";
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<style>
</style>