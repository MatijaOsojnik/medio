<template>
  <div>
    <Header />
    <!-- <v-toolbar
      dense
      elevation="0"
      style="width: 100%"
      color="#ffffff"
      class="mb-3"
    >
      <v-slide-group show-arrows class="pa-0 ma-0">
        <v-slide-item v-for="n in 25" :key="n">
          <v-btn class="mx-2" color="white" depressed>Publication</v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-toolbar> -->
    <div
      class="d-flex justify-center align-center flex-column fill-height"
      style="height: 70vh"
      v-if="!stories && !loading"
    >
      <span class="display-1 d-block"
        >There are no stories in this category yet.</span
      >
      <v-btn class="ma-4" :to="{ name: 'stories' }">Browse All Stories</v-btn>
    </div>
    <div
      class="d-flex justify-center align-center flex-column fill-height"
      height="70vh"
      v-if="loading"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        class="d-block ma-5"
      ></v-progress-circular>
    </div>
    <v-container fluid v-if="stories && !loading">
      <span
        class="title d-block my-6"
        v-if="$router.history.current['name'] === 'stories'"
        ><v-icon>{{ "mdi-bullseye-arrow" }}</v-icon> Editor's Choice</span
      >
      <span
        class="title"
        v-else-if="
          $router.history.current['name'] === 'stories-categories' && stories"
        >{{ stories[0].Category.name }}</span>
      <v-row style="z-index: 100" class="flex-sm-fill">
        <v-col
          class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
          v-for="story in storiesFeatured"
          :key="story.id"
        >
          <StoryCardComponent :story="story" />
        </v-col>
      </v-row>
      <v-divider class="my-12" />
      <span
        class="title d-block my-6"
        v-if="$router.history.current['name'] === 'stories'"
        ><v-icon>{{ "mdi-chevron-up-box-outline" }}</v-icon> Top Trending</span
      >

      <v-row class="flex-sm-fill">
        <v-col
          v-for="story in stories"
          :key="story.id"
          class="col-xl-4 col-lg-4 col-md-3 col-sm-6 col-12"
          style="margin: 0"
        >
          <StoryCardTrendingComponent :story="story" />
        </v-col>
      </v-row>
      <v-divider class="my-12" />

      <span
        class="title d-block my-6"
        v-if="$router.history.current['name'] === 'stories'"
        ><v-icon>{{ "mdi-book-open-page-variant" }}</v-icon> Based On Your
        Recent Reading</span
      >

      <v-row class="flex-sm-fill">
        <v-col
          style="margin: 0"
          class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12d-block justify-center justify-sm-center pa-0"
        >
          <v-col v-for="story in stories" :key="story.id">
            <StoryCardSmallComponent :story="story" />
          </v-col>
        </v-col>
        <v-col
          class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-block justify-center justify-sm-center pa-0"
        >
          <v-col v-for="story in storyLimit" :key="story.id">
            <StoryCardSmallComponent :story="story" />
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import StoryService from "@/services/StoryService.js";
import StoryCardComponent from "@/components/Card-Story";
import StoryCardSmallComponent from "@/components/Card-Story-Small";
import StoryCardTrendingComponent from "@/components/Card-Story-Trending";
import GeneralService from "@/services/GeneralService";
// import Metadata from "@/views/Stories/Metadata";
import Header from "@/components/Header/Header.vue";
export default {
  components: {
    StoryCardComponent,
    StoryCardSmallComponent,
    StoryCardTrendingComponent,
    // Metadata,
    Header,
  },
  data: () => ({
    card: {
      imageUrl:
        "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      url: "/stories/create/",
    },
    stories: null,
    storiesFeatured: null,
    userStories: null,
    loading: false,
    priviliges: false,
    limit: 10,
    length: 15,
    tab: null,
    offsetTop: 0,
  }),
  computed: {
    storyLimit() {
      if (this.stories) {
        if (this.limit) {
          const splitStoriesFeatured = this.stories.slice(0, 3);
          return splitStoriesFeatured;
        } else {
          return this.stories;
        }
      } else {
        return this.stories;
      }
    },
    // storyFeatured() {
    //   if(this.stories) {
    //     const featuredStories = this.stories.map(story => {
    //       if(story.featured) {
    //         return story
    //       } else {
    //         return null
    //       }
    //     })
    //       return featuredStories
    //   } else {
    //       return null
    //     }
    // }
  },
  created() {
    this.getStories();
    this.getBookmarks();
    this.getHistory();
    this.checkRoles();
  },
  watch: {
    // call again the method if the route changes
    $route: "getStories",
  },
  methods: {
    async getStories() {
      this.loading = true;
      let response = null;
      if (this.$route.params.categoryId) {
        const categoryId = this.$route.params.categoryId;
        response = await StoryService.categories(categoryId);
        if (response) {
          this.loading = false;

          if (response.data.length > 0) {
            this.stories = response.data;
          } else {
            this.stories = null;
          }
        } else {
          this.loading = false;
        }
      } else {
        response = await StoryService.index();
        if (response) {
          this.loading = false;
        }
        this.stories = response.data.stories;
        this.storiesFeatured = response.data.storiesFeatured
      }
    },
    async getBookmarks() {
      const userId = this.$store.state.user.id;
      const response = await GeneralService.getBookmarks(userId);
      this.$store.dispatch("setBookmarks", response.data.bookmarks);
    },
    async getHistory() {
      try {
        const userId = this.$store.state.user.id;
        const response = await GeneralService.getHistory(userId);
        this.userStories = response.data;
      } catch (err) {
        console.log(err);
      }
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
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
  },
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