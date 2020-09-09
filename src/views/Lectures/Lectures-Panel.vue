<template>
  <div>
    <div>
      <Header />
    </div>
    <div>
      <template v-slot:lectures-panel>
        <div v-if="$store.state.isUserLoggedIn">
          <span class="greeting-title">
            Welcome
            <span
              class="greeting-name pa-1"
              v-if="$store.state.isUserLoggedIn"
            >{{$store.state.user.display_name}}</span>! Start Your First Class :)
          </span>
        </div>
        <v-container fluid>
          <span class="title" v-if="$router.history.current['name'] === 'lectures'">All Lectures</span>
          <span
            class="title"
            v-else-if="$router.history.current['name'] === 'lectures-categories' && lectures"
          >{{lectures[0].Category.name}}</span>
          <v-row style="z-index: 100" class="flex-sm-fill">
            <v-col
              v-if="priviliges"
              class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 d-sm-flex justify-sm-center"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  max-width="300px"
                  height="320px"
                  :to="{path: `/lectures/create/${$store.state.user.id}`}"
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
              v-for="lecture in lectures"
              :key="lecture.id"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :to="{path: `/lectures/${lecture.id}`}"
                  width="300px"
                  height="320px"
                  raised
                  :elevation="hover ? 8 : 2"
                >
                  <div>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img
                          v-if="lecture.Users.length > 0 && lecture.Users[0].icon_url"
                          :src="lecture.Users[0].icon_url"
                        ></v-img>
                        <v-icon v-else dark large color="indigo">mdi-account-circle</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="title">{{lecture.title}}</v-list-item-title>
                        <!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
                      </v-list-item-content>
                    </v-list-item>

                    <v-img
                      :src="lecture.thumbnail_url"
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
                      <span style="display: block;">{{lecture.short_description}}</span>
                      <!-- <span>{{lecture.Category.name}}</span> -->
                    </v-card-text>
                  </div>
                </v-card>
              </v-hover>
            </v-col>
            <v-btn @click="limit = null" v-if="lectures > 10">Show More</v-btn>
          </v-row>
        </v-container>
      </template>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import LectureService from "@/services/LectureService.js";
export default {
  components: {
    Header
  },
  data: () => ({
    lectures: null,
    priviliges: false,
    limit: 10
  }),
  computed: {
    lectureLimit: async () => {
      if (this.lectures) {
        return (await this.limit)
          ? this.lectures.slice(0, this.limit)
          : this.lectures;
      }
    }
  },
  mounted() {
    this.getLectures();
    this.checkRoles();
  },
  watch: {
    // call again the method if the route changes
    $route: "getLectures"
  },
  methods: {
    async getLectures() {
      let response = null;
      if (this.$route.params.categoryId) {
        const categoryId = this.$route.params.categoryId;
        response = await LectureService.categories(categoryId);
      } else {
        response = await LectureService.index();
      }
      this.lectures = response.data;
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