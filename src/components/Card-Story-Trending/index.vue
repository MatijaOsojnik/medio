<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :to="{ path: `/stories/${story.id}` }"
      class="mx-auto"
      raised
      :elevation="hover ? 8 : 2"
    >
      <div>
        <v-card-actions style="padding-bottom: 0">
          <v-list-item>
            <router-link
              v-if="story.Users[0]"
              :to="{
                path: `/users/${story.Users[0].display_name.toLowerCase()}/${
                  story.Users[0].id
                }/profile`,
              }"
            >
              <v-list-item-avatar size="28px" color="grey darken-3">
                <v-img
                  v-if="story.Users.length > 0 && story.Users[0].icon_url"
                  :src="story.Users[0].icon_url"
                ></v-img>
                <v-img v-else src="@/assets/blue-error-background.jpg"></v-img>
              </v-list-item-avatar>
            </router-link>

            <router-link
              v-if="story.Users[0]"
              :to="{
                path: `/users/${story.Users[0].display_name.toLowerCase()}/${
                  story.Users[0].id
                }/profile`,
              }"
            >
              <v-list-item-content>
                <v-list-item-title>{{
                  story.Users[0].display_name
                }}</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-card-actions>
        <v-card-actions style="margin: 0; padding: 0 8px">
          <v-card-title>{{ story.title }}</v-card-title>
        </v-card-actions>
        <v-card-actions style="padding-top: 0px">
          <div class="d-flex justify-space-between">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span
                  class="subtitle-2 px-4 mb-2 blue-grey--text d-inline-block"
                  v-bind="attrs"
                  v-on="on"
                  >{{ story.createdAt | formatDate }} ·
                  {{ readingTime }}
                  min read</span
                >
              </template>
              <span>Updated at {{ story.updatedAt | formatDate }}</span>
            </v-tooltip>
          </div>
        </v-card-actions>
      </div>
    </v-card>
  </v-hover>
</template>


<script>
import GeneralService from "@/services/GeneralService";
export default {
  data: () => ({
    imageError: false,
    bookmarkIcon: "mdi-bookmark-outline",
    readingTime: 0,
  }),
  props: {
    story: Object,
  },
  created() {
    this.checkBookmark();
    this.totalReadingTime(this.story.description)
  },
  methods: {
    async imageLoadError() {
      this.imageError = true;
    },

    async checkBookmark() {
      const response = await GeneralService.getBookmarks(
        this.$store.state.user.id
      );
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
    totalReadingTime(content) {
      const time = content.split(" ").length / 200;
      if (time < 1) {
        this.readingTime = 1;
      } else {
        this.readingTime = Math.round(time);
      }
    },
  },
};
</script>

<style>
</style>