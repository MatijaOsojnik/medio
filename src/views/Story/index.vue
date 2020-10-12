<template>
  <StoryMetadata>
    <template v-slot:story>
      <div class="content-container" v-if="story">
        <span class="display-1 d-block pb-2">{{ story.title }}</span>
        <span class="d-block font-weight-bold" style="color: #8d93ab">{{
          story.short_description
        }}</span>
        <div>
          <v-list-item class="py-6 pl-0 ml-0">
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
            <div class="d-flex align-center justify-center ml-5">
              <v-btn
                small
                white
                outlined
                class="inline-block"
                v-if="isOwner"
                :to="{
                  name: 'story-edit',
                  params: { id: story.id },
                }"
              >
                EDIT
              </v-btn>
            </div>
            <v-spacer />
            <span class="d-block">
              <router-link :to="$router.currentRoute">
                <v-icon
                  size="24px"
                  @click="addBookmark(story.id)"
                  >{{ bookmarkIcon }}</v-icon
                >
              </router-link>
            </span>
          </v-list-item>
        </div>
        <div>
          <v-img
            :src="
              imageError
                ? require('@/assets/blue-error-background.jpg')
                : story.thumbnail_url"
            class="darker-img px-4"
            @error="imageLoadError"
            max-height="600px"
          ></v-img>
          <div v-html="story.description" class="py-6"></div>
        </div>

        <div>
          <v-list-item class="py-6 pl-0 ml-0">
            <div class="d-flex justify-space-between"></div>
            <!-- <v-icon class="mr-3">mdi-share-variant</v-icon> -->

            <div class="d-flex align-center justify-center">
              <router-link :to="$router.currentRoute">
                <v-icon
                  :disabled="story.Users[0].id == $store.state.user.id"
                  size="24px"
                  color="red"
                  style="z-index: 999"
                  @click="addLike(story.id)"
                  >{{ likeIcon }}</v-icon
                >
              </router-link>
              <span class="d-inline-block pa-2 font-weight-bold">{{
                likesCount
              }}</span>
            </div>
            <v-spacer />
            <span class="d-block">
              <router-link :to="$router.currentRoute">
                <v-icon
                  size="24px"
                  @click="addBookmark(story.id)"
                  >{{ bookmarkIcon }}</v-icon
                >
              </router-link>
            </span>
          </v-list-item>
        </div>
        <v-divider></v-divider>
        <div>
          <v-list-item class="py-6 pl-0 ml-0">
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
              <v-list-item-avatar size="80px" color="grey darken-3">
                <v-img
                  v-if="story.Users.length > 0 && story.Users[0].icon_url"
                  :src="story.Users[0].icon_url"
                ></v-img>
                <v-img v-else src="@/assets/blue-error-background.jpg"></v-img>
              </v-list-item-avatar>
            </router-link>

            <div class="">
              <span
                class="d-block font-weight-light"
                style="color: #393b44; font-size: 12px"
                >WRITTEN BY</span
              >
              <router-link
                v-if="story.Users[0]"
                :to="{
                  path: `/users/${story.Users[0].display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${story.Users[0].id}/profile`,
                }"
                style="z-index: 999"
              >
                <span class="font-weight-bold title d-block">{{
                  story.Users[0].display_name
                }}</span>
              </router-link>

              <div class="d-flex justify-space-between">
                <span
                  class="subtitle-2 mb-2 d-inline-block font-weight-light"
                  v-html="story.Users[0].description"
                >
                </span>
              </div>
              <!-- <v-icon class="mr-3">mdi-share-variant</v-icon> -->
            </div>
          </v-list-item>
        </div>
      </div>
    </template>
    <template v-slot:similar>
      <v-row
        style="z-index: 100"
        class="flex-sm-fill"
        v-if="categoryStories.length"
      >
        <v-col
          class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
          v-for="story in categoryStories"
          :key="story.id"
        >
          <CardStory :story="story" />
        </v-col>
      </v-row>
    </template>
    <!-- <template v-slot:other>
<v-row style="z-index: 100" class="flex-sm-fill" v-if="differentStories.length">
        <v-col
          class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
          v-for="story in differentStories"
          :key="story.id"
        >
          <CardStory :story="story" />
        </v-col>
      </v-row>
    </template> -->
  </StoryMetadata>
</template>

<script>
import StoryService from "@/services/StoryService";
import GeneralService from "@/services/GeneralService";
import StoryMetadata from "@/views/Story/Metadata.vue";
import CardStory from "@/components/Card-Story";
export default {
  components: {
    StoryMetadata,
    CardStory,
  },
  data: () => ({
    story: null,
    permissions: false,
    isOwner: false,
    adminPermissions: false,
    bookmarkIcon: "mdi-bookmark-outline",
    likeIcon: "mdi-heart-outline",
    imageError: false,
    categoryStories: [],
    differentStories: [],
    readingTime: 0,
    likesCount: 0,
  }),
  created() {
    this.getStory();
    this.checkRoles();
  },
  mounted() {},
  watch: {
    // call again the method if the route changes
    $route: "getStory",
  },
  methods: {
    async getStory() {
      try {
        const storyId = this.$route.params.id;
        this.$store.dispatch("setCurrentStoryId", this.$route.params.id)
        const responseStory = await StoryService.show(storyId);

        const responseSimilarStories = await StoryService.showSimilar(
          responseStory.data.category_id,
          storyId
        );
        const responseDifferentStories = await StoryService.showDifferent(
          responseStory.data.category_id,
          storyId
        );
        if (this.$store.state.user) {
          if (responseStory.data.Users[0]) {
            if (responseStory.data.Users[0].id === this.$store.state.user.id) {
              this.isOwner = true;
            } else {
              this.isOwner = false;
            }
          }
        }
        this.story = responseStory.data;
        this.categoryStories = responseSimilarStories.data;
        this.differentStories = responseDifferentStories.data;

        this.checkLike(this.story.id);
        this.checkBookmark(this.story.id);
        this.totalReadingTime(this.story.description);
        this.imageError = false;
      } catch (err) {
        console.log(err);
        this.$router.push({
          path: `/stories`,
        });
      }
    },
    async deleteStory() {
      try {
        const storyId = this.$route.params.id;
        if (this.isOwner || this.adminPermissions) {
          await StoryService.delete(storyId);
        }
      } catch (err) {
        console.log(err);
      }
    },
    checkRoles() {
      const userAuthorities = this.$store.state.authorities;
      if (userAuthorities) {
        for (let i = 0; i < userAuthorities.length; i++) {
          if (
            userAuthorities[i] === "ROLE_LECTURER" ||
            userAuthorities[i] === "ROLE_MODERATOR" ||
            userAuthorities[i] === "ROLE_ADMIN"
          ) {
            this.permissions = true;
          } else {
            this.permissions = false;
          }
        }
        for (let i = 0; i < userAuthorities.length; i++) {
          if (
            userAuthorities[i] === "ROLE_ADMIN" ||
            userAuthorities[i] === "ROLE_MODERATOR"
          ) {
            this.adminPermissions = true;
          } else {
            this.adminPermissions = false;
          }
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
    async checkBookmark(storyId) {
      const response = await GeneralService.getBookmarks(
        this.$store.state.user.id
      );
      response.data.bookmarks.map((bookmark) => {
        if (bookmark.story_id === storyId) {
          this.bookmarkIcon = "mdi-bookmark";
        } else {
          this.bookmarkIcon = "mdi-bookmark-outline"
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
            this.checkLike()
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
            this.checkLike()
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    async imageLoadError() {
      this.imageError = true;
    },
  },
};
</script>

<style >
img {
    max-width: 680px;
  border-radius: 3px;
}
.back-link {
  font-size: 15px;
  color: #52616b;
  margin-top: 20px;
}
.back-link:hover {
  color: #303841;
}
.story-count {
  color: black;
  font-size: 20px;
}
.content-container {
  max-width: 740px;
  padding-left: 20px;
  padding-right: 20px;
  margin: auto;
}
</style>