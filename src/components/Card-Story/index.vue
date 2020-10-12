<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :to="{ path: `/stories/${story.id}` }"
      class="mx-auto"
      raised 
      :elevation="hover ? 8 : 2"
    >
      <div>
        <v-img
          :src="
            imageError
              ? require('@/assets/blue-error-background.jpg')
              : story.thumbnail_url
          "
          height="175"
          class="darker-img"
          @error="imageLoadError"
        >
        </v-img>
        <v-card-title>{{ story.title }}</v-card-title>
        <v-card-subtitle>{{ story.short_description }}</v-card-subtitle>
        <v-card-actions>
          <v-list-item class="pl-0 ml-0">
            <router-link
              v-if="story.Users[0]"
              :to="{
                path: `/users/${story.Users[0].display_name
                  .toLowerCase()
                  .replace(/\s/g, '')}/${story.Users[0].id}/profile`,
              }"
              style="z-index: 999"
              class="pb-2"
            >
              <v-list-item-avatar size="40px" color="grey darken-3">
                <v-img
                  v-if="story.Users.length > 0 && story.Users[0].icon_url"
                  :src="story.Users[0].icon_url"
                ></v-img>
                <v-img v-else src="@/assets/blue-error-background.jpg"></v-img>
              </v-list-item-avatar>
            </router-link>

            <div class="">
              <router-link
                v-if="story.Users[0]"
                :to="{
                  path: `/users/${story.Users[0].display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${story.Users[0].id}/profile`,
                }"
                style="z-index: 999"
              >
                <span class="font-weight-bold d-block">{{
                  story.Users[0].display_name
                }}</span>
              </router-link>

              <div class="d-flex justify-space-between">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span
                      class="subtitle-2 mb-2 d-inline-block"
                      v-bind="attrs"
                      v-on="on"
                      >{{ story.createdAt | formatStoryDate }} ·
                      {{ readingTime }}
                      min read
                      <v-icon v-if="story.featured" size="13px">{{
                        "mdi-star"
                      }}</v-icon></span
                    >
                  </template>
                  <span
                    >Updated at {{ story.updatedAt | formatStoryDate }}</span
                  >
                </v-tooltip>
              </div>
              <!-- <v-icon class="mr-3">mdi-share-variant</v-icon> -->
            </div>
            <v-spacer />
            <span class="d-block">
              <router-link :to="$router.currentRoute">
                <v-icon :disabled="story.Users[0].id == $store.state.user.id" color="red" size="22px" @click="addLike(story.id)">{{
                  likeIcon
                }}</v-icon>
                <span class="mr-3" style="font-size: 14px;">
                  {{ likesCount }}
                </span>
              </router-link>
            </span>
            <span class="d-block">
              <router-link :to="$router.currentRoute">
                <v-icon size="22px" @click="addBookmark(story.id)">{{
                  bookmarkIcon
                }}</v-icon>
              </router-link>
            </span>
          </v-list-item>
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
    likeIcon: "mdi-heart-outline",
    likesCount: 0,
    readingTime: 0,
  }),
  props: {
    story: Object,
  },
  created() {
    this.checkBookmark();
    this.checkLike();
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
        } else {
          this.bookmarkIcon = "mdi-bookmark-outline";
        }
      });
    },

    async checkLike() {
      const response = await GeneralService.getLikes(
        this.$store.state.user.id,
        this.story.id
      );
      this.likesCount = response.data.likesCount.count;
      response.data.likes.map((like) => {
        if (like.story_id === this.story.id) {
          this.likeIcon = "mdi-heart";
        } else {
          this.likeIcon = "mdi-heart-outline";
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
    async addLike(storyId) {
      // If no like, add new like
      if (this.likeIcon === "mdi-heart-outline") {
        try {
          const response = await GeneralService.postLike(
            this.$store.state.user.id,
            storyId
          );
          if (response) {
            this.likeIcon = "mdi-heart";
            this.likesCount++;
          }
        } catch (err) {
          console.log(err);
        }
        // If like, remove bookmark
      } else {
        try {
          const response = await GeneralService.deleteLike(
            this.$store.state.user.id,
            storyId
          );
          if (response) {
            this.likeIcon = "mdi-heart-outline";
            this.likesCount--;
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