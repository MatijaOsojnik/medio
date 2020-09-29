<template>
  <div class="py-12">
    <v-card class="mx-auto my-6" max-width="1000px" max-height="1500px">
      <v-container v-if="user">
        <v-row>
          <v-col
            class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-sm-flex justify-sm-center"
          >
            <v-container fluid>
              <div class="d-flex justify-center align-center flex-column ma-3">
                <v-avatar size="150" v-if="!user.icon_url">
                  <v-img src="@/assets/blue-error-background.jpg"></v-img>
                </v-avatar>
                <v-avatar v-else size="150">
                  <v-img :src="user.icon_url" />
                </v-avatar>
                <span class="d-block my-2 text-capitalize title">{{
                  user.display_name
                }}</span>
                <span v-if="user.title" class="d-block ma-1 subtitle-2">{{
                  user.title.toUpperCase()
                }}</span>
                <v-btn
                  small
                  absolute
                  bottom
                  left
                  fab
                  dark
                  color="white"
                  :to="{
                    path: `/users/${$store.state.user.display_name
                      .toLowerCase()
                      .replace(/\s/g, '')}/${$store.state.user.id}/edit`,
                  }"
                  v-if="$store.state.user.id == $route.params.id"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
              <v-divider />
              <div class="d-flex justify-center align-center">
                <v-btn
                  icon
                  v-if="user.facebook_url"
                  class="ma-4"
                  large
                  target="_blank"
                  :href="user.facebook_url"
                >
                  <v-icon color="#4267B2">mdi-facebook</v-icon>
                </v-btn>
                <v-btn
                  icon
                  large
                  v-if="user.instagram_url"
                  class="ma-4"
                  target="_blank"
                  :href="user.instagram_url"
                >
                  <v-icon color="#4267B2">mdi-instagram</v-icon>
                </v-btn>
                <v-btn
                  icon
                  large
                  v-if="user.linkedin_url"
                  class="ma-4"
                  target="_blank"
                  :href="user.linkedin_url"
                >
                  <v-icon color="#4267B2">mdi-linkedin</v-icon>
                </v-btn>
                <v-btn
                  large
                  icon
                  v-if="user.twitter_url"
                  class="ma-4"
                  target="_blank"
                  :href="user.twitter_url"
                >
                  <v-icon color="#4267B2">mdi-twitter</v-icon>
                </v-btn>
              </div>
              <div v-if="$route.params.id == $store.state.user.id">
                <v-btn
                  v-if="!user.title"
                  block
                  text
                  class="my-2"
                  :to="{
                    path: `/users/${$store.state.user.display_name
                      .toLowerCase()
                      .replace(/\s/g, '')}/${$store.state.user.id}/edit`,
                  }"
                  >Add Title</v-btn
                >
                <v-btn
                  v-if="!user.description"
                  block
                  text
                  class="mt-5"
                  :to="{
                    path: `/users/${$store.state.user.display_name
                      .toLowerCase()
                      .replace(/\s/g, '')}/${$store.state.user.id}/edit`,
                  }"
                  >Add Description</v-btn
                >
              </div>
              <div>
                            <v-btn
                block
                white
                text
                class="mt-5"
                v-if="$store.state.user.id != $route.params.id"
                @click="isFollower ? addFollow : removeFollow"
              >
                {{isFollowerText}}
              </v-btn>
              </div>

              <!-- <div class="d-flex justify-center align-center flex-column ma-3">
              </div>-->
            </v-container>
          </v-col>
          <v-col class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
            <div height="300px">
              <div>
                <span class="d-block about-title">About Me</span>
              </div>
              <span v-if="!user.description" class="d-block my-4"
                >Hi, I'm {{ user.display_name }}.</span
              >
              <span
                v-else
                class="d-block my-4"
                v-html="user.description"
              ></span>
            </div>
            <ProfileMetadata>
              <template v-slot:userStories>
                <span v-if="stories.length" class="d-block about-title"
                  >My Stories</span
                >
                <v-slide-group class="pa-4" show-arrows v-if="stories.length">
                  <v-slide-item v-for="story in stories" :key="story.id">
                    <UserStory :story="story" />
                  </v-slide-item>
                </v-slide-group>
              </template>
            </ProfileMetadata>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import UserStory from "@/components/Card-Recommended";
import ProfileMetadata from "@/views/Users/ProfileMetadata";
import FollowService from "@/services/FollowService";
import StoryService from "@/services/StoryService";
import UserService from "@/services/UserService";
export default {
  components: {
    UserStory,
    ProfileMetadata,
  },
  data: () => ({
    user: null,
    isFollower: false,
    isFollowerText: 'FOLLOW',
    stories: [],
  }),
  mounted() {
    this.getUser();
    this.getUserStories();
    this.isFollowing();
  },
  watch: {
    $route: "getAll",
  },
  methods: {
    async getAll() {
      this.getUser();
      this.getUserStories();
    },
    async getUser() {
      try {
        const userId = this.$route.params.id;
        const response = await UserService.show(userId);
        this.user = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getUserStories() {
      try {
        const response = await StoryService.user(this.$route.params.id);
        this.stories = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async isFollowing() {
      const followerId = this.$store.state.user.id;
      const followedId = this.$route.params.id;
      const response = await FollowService.findFollower(followerId, followedId)
      if(response === true) {
       this.isFollower = true;
       this.isFollowerText = 'UNFOLLOW'
      }
    },
    // async addFollow(storyId) {
    //   // If no bookmark, add a new bookmark
    //   if (this.bookmarkIcon === "mdi-bookmark-outline") {
    //     try {
    //       const response = await GeneralService.postBookmark(
    //         this.$store.state.user.id,
    //         storyId
    //       );
    //       if (response) {
    //         this.bookmarkIcon = "mdi-bookmark";
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //     // If bookmark, remove bookmark
    //   } else {
    //     try {
    //       const response = await GeneralService.deleteBookmark(
    //         this.$store.state.user.id,
    //         storyId
    //       );
    //       if (response) {
    //         this.bookmarkIcon = "mdi-bookmark-outline";
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // },
  },
};
</script>

<style scoped>
.about-title {
  font-size: 20px;
  font-weight: 600;
}
</style>