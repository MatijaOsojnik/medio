<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :to="{path: `/stories/${story.id}`}"
      class="mx-auto"
      raised
      :elevation="hover ? 8 : 2"
    >
      <div>
        <!-- <v-list-item>
          <router-link
            v-if="story.Users[0]"
            :to="{path: `/users/${story.Users[0].display_name.toLowerCase()}/${story.Users[0].id}/profile`}"
          >
            <v-list-item-avatar>
              <v-img
                v-if="story.Users.length > 0 && story.Users[0].icon_url"
                :src="story.Users[0].icon_url"
              ></v-img>
              <v-img v-else src="@/assets/blue-error-background.jpg"></v-img>
            </v-list-item-avatar>
          </router-link>
          <v-list-item-avatar v-else>
            <v-img src="@/assets/blue-error-background.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">{{story.title}}</v-list-item-title>
            <v-list-item-subtitle v-if="story.Users[0]">
              By
              <router-link
                v-if="story.Users[0]"
                :to="{path: `/users/${story.Users[0].display_name.toLowerCase()}/${story.Users[0].id}/profile`}"
              >
                <span class="font-weight-bold">{{story.Users[0].display_name}}</span>
              </router-link>
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else>
              <span>By</span><span class="font-weight-bold"> Unknown</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>-->

        <v-img
          :src="imageError ? require('@/assets/blue-error-background.jpg') : story.thumbnail_url"
          height="175"
          class="darker-img"
          @error="imageLoadError"
        >
          <!-- <v-row class="fill-height flex-column justify-center">
            <div class="align-self-center">
              <v-btn :class="{ 'show-btns': hover }" class="invisible" icon>
                <v-icon
                  :class="{ 'show-btns': hover }"
                  class="invisible"
                  large
                >{{"mdi-play-circle-outline"}}</v-icon>
              </v-btn>
            </div>
          </v-row>-->
        </v-img>
        <v-card-title>{{story.title}}</v-card-title>
        <v-card-subtitle>{{story.short_description}}</v-card-subtitle>
        <v-card-actions>
          <v-list-item>
            <router-link
              v-if="story.Users[0]"
              :to="{path: `/users/${story.Users[0].display_name.toLowerCase()}/${story.Users[0].id}/profile`}"
            >
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  v-if="story.Users.length > 0 && story.Users[0].icon_url"
                  :src="story.Users[0].icon_url"
                ></v-img>
                <v-img v-else src="@/assets/blue-error-background.jpg"></v-img>
              </v-list-item-avatar>
            </router-link>

            <router-link
              v-if="story.Users[0]"
              :to="{path: `/users/${story.Users[0].display_name.toLowerCase()}/${story.Users[0].id}/profile`}"
            >
              <v-list-item-content>
                <v-list-item-title>{{story.Users[0].display_name}}</v-list-item-title>
              </v-list-item-content>
            </router-link>

            <v-row align="center" justify="end" style="z-index: 999;">
              <router-link to="/stories">
                <v-icon
                  class="mr-3"
                  style="z-index: 999;"
                  @click="addBookmark(story.id)"
                >{{bookmarkIcon}}</v-icon>
              </router-link>
              <v-icon class="mr-3">mdi-share-variant</v-icon>
            </v-row>
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
    isBookmarked: false,
  }),
  props: {
    story: Object,
  },
  created() {
    this.checkBookmark()
  },
  methods: {
    async imageLoadError() {
      this.imageError = true;
    },

    async checkBookmark() {
      const response = await GeneralService.getBookmarks(this.$store.state.user.id) 
      console.log(response.data.bookmarks)
      response.data.bookmarks.map((bookmark) => {
        if(bookmark.story_id === this.story.id) {
          this.bookmarkIcon = "mdi-bookmark"
        }
      })
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