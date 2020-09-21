<template>
  <div>
    <div>
      <Header />
    </div>
    <v-container fluid>
      <template v-slot:stories-panel>
        <v-container fluid>
          <span class="title" v-if="$router.history.current['name'] === 'stories'">All Stories</span>
          <span
            class="title"
            v-else-if="$router.history.current['name'] === 'stories-categories' && stories"
          >{{stories[0].Category.name}}</span>
          <v-row style="z-index: 100" class="flex-sm-fill">
            <v-col
              v-if="priviliges"
              class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 d-sm-flex justify-sm-center"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  max-width="300px"
                  height="320px"
                  :to="{path: `/stories/create/${$store.state.user.id}`}"
                  raised
                  :elevation="hover ? 8 : 2"
                >
                  <div>
                    <v-img
                      src="https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      height="320px"
                      class="darker-img"
                    >
                      <v-row class="fill-height flex-column justify-center">
                        <div class="align-self-center">
                          <v-btn icon :class="{ 'show-btns': hover }" class="invisible">
                            <v-icon
                              x-large
                              :class="{ 'show-btns': hover }"
                              class="invisible"
                            >{{"mdi-plus-circle-outline"}}</v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-img>
                  </div>
                </v-card>
              </v-hover>
            </v-col>
            <v-col
              class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 d-sm-flex justify-sm-center"
              v-for="story in stories"
              :key="story.id"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :to="{path: `/stories/${story.id}`}"
                  width="300px"
                  height="320px"
                  raised
                  :elevation="hover ? 8 : 2"
                >
                  <div>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img
                          v-if="story.Users.length > 0 && story.Users[0].icon_url"
                          :src="story.Users[0].icon_url"
                        ></v-img>
                        <v-icon v-else dark large color="indigo">mdi-account-circle</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="title">{{story.title}}</v-list-item-title>
                        <!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
                      </v-list-item-content>
                    </v-list-item>

                    <v-img
                      :src="story.thumbnail_url"
                      height="194"
                      lazy-src="@/assets/blue-error-background.jpeg"
                      class="darker-img"
                    >
                      <v-row class="fill-height flex-column justify-center">
                        <div class="align-self-center">
                          <v-btn :class="{ 'show-btns': hover }" class="invisible" icon>
                            <v-icon
                              :class="{ 'show-btns': hover }"
                              class="invisible"
                              large
                            >{{"mdi-play-circle-outline"}}</v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-img>

                    <v-card-text>
                      <span style="display: block;">{{story.short_description}}</span>
                      <!-- <span>{{story.Category.name}}</span> -->
                    </v-card-text>
                  </div>
                </v-card>
              </v-hover>
            </v-col>
            <v-btn @click="limit = null" v-if="stories > 10">Show More</v-btn>
          </v-row>
        </v-container>
      </template>
    </v-container>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import StoryService from "@/services/StoryService.js";
export default {
  components: {
    Header
  },
  data: () => ({
    stories: null,
    priviliges: false,
    limit: 10
  }),
  computed: {
    storyLimit: async () => {
      if (this.stories) {
        return (await this.limit)
          ? this.stories.slice(0, this.limit)
          : this.stories;
      }
    }
  },
  mounted() {
    this.getStories();
    this.checkRoles();
  },
  watch: {
    // call again the method if the route changes
    $route: "getStories"
  },
  methods: {
    async getStories() {
      let response = null;
      if (this.$route.params.categoryId) {
        const categoryId = this.$route.params.categoryId;
        response = await StoryService.categories(categoryId);
      } else {
        response = await StoryService.index();
      }
      this.stories = response.data;
    },
    checkRoles() {
      const userAuthorities = this.$store.state.authorities;
      let hasPriviliges = false;

      if (userAuthorities) {
        for (let i = 0; i < userAuthorities.length; i++) {
          if (
            userAuthorities[i] === "ROLE_LECTURER" ||
            userAuthorities[i] === "ROLE_MODERATOR" ||
            userAuthorities[i] === "ROLE_ADMIN"
          ) {
            hasPriviliges = true;
          }
        }
      }
      if (hasPriviliges) {
        this.priviliges = true;
      }
    }
  }
};
</script>

<style>
.greeting-title {
  font-weight: 800;
  font-size: 24px;
  padding: 10px;
  display: block;
}
.greeting-name {
  background-color: #c2f0fc;
}
.invisible {
  color: rgb(63, 114, 175, 0) !important;
}
.show-btns {
  color: rgb(255, 255, 255, 1) !important;
}
</style>