<template>
  <div>
    <Header />
    <div
      class="d-flex justify-center align-center flex-column fill-height"
      style="height: 70vh;"
      v-if="!lectures && !loading"
    >
      <span class="display-1 d-block">There are no lectures in this category yet.</span>
      <v-btn class="ma-4" :to="{name: 'lectures'}">Browse All Lectures</v-btn>
    </div>
    <div
      class="d-flex justify-center align-center flex-column fill-height"
      height="70vh"
      v-if="loading"
    >
      <v-progress-circular indeterminate color="primary" class="d-block ma-5"></v-progress-circular>
    </div>
    <v-container fluid v-if="lectures && !loading">
      <div v-if="$store.state.isUserLoggedIn && !userLectures">
        <span class="greeting-title" v-if="$store.state.isUserLoggedIn && lectures">
          Welcome
          <span class="greeting-name pa-1">{{$store.state.user.display_name}}</span>! Start Your First Class :)
        </span>
      </div>
      <div v-else-if="$store.state.isUserLoggedIn && userLectures.length > 0">
        <span class="greeting-title">
          Welcome back
          <span class="greeting-name pa-1">{{$store.state.user.display_name}}</span>!
        </span>
      </div>
      <v-container fluid>
        <Metadata>
          <template v-slot:completed-lectures>
            <span class="title" v-if="userLectures.length > 0">Completed Lectures</span>
            <v-row style="z-index: 100" v-if="userLectures" class="flex-sm-fill">
              <v-col
                class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
                v-for="lecture in userLectures"
                :key="lecture.Lecture.id"
              >
                <LectureCardComponent :lecture="lecture.Lecture" />
              </v-col>
            </v-row>
          </template>
        </Metadata>
        <span class="title" v-if="$router.history.current['name'] === 'lectures'">All Lectures</span>
        <span
          class="title"
          v-else-if="$router.history.current['name'] === 'lectures-categories' && lectures"
        >{{lectures[0].Category.name}}</span>
        <v-row style="z-index: 100" class="flex-sm-fill">
          <v-col
            class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
            v-if="priviliges"
          >
            <LectureCardCreateComponent :card="card" />
          </v-col>
          <v-col
            class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
            v-for="lecture in lectureLimit"
            :key="lecture.id"
          >
            <LectureCardComponent :lecture="lecture" />
          </v-col>
          <v-col class="col-12 text-center">
            <v-btn @click="limit = null" v-if="limit && lectures.length > 10">Show More</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import LectureService from "@/services/LectureService.js";
import LectureCardComponent from "@/components/Card-Lecture";
import GeneralService from "@/services/GeneralService";
import Metadata from "@/views/Lectures/Metadata";
import LectureCardCreateComponent from "@/components/Card-Lecture-Create";
import Header from "@/components/Header/Header.vue";
export default {
  components: {
    LectureCardComponent,
    LectureCardCreateComponent,
    Metadata,
    Header
  },
  data: () => ({
    card: {
      imageUrl:
        "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      url: "/lectures/create/"
    },
    lectures: null,
    userLectures: null,
    loading: false,
    priviliges: false,
    limit: 10
  }),
  computed: {
    lectureLimit() {
      if (this.lectures) {
        if (this.limit) {
          const splitLectures = this.lectures.slice(0, 11);
          return splitLectures;
        } else {
          return this.lectures;
        }
      } else {
        return this.lectures;
      }
    }
  },
  created() {
    this.getLectures();
    this.getHistory();
    this.checkRoles();
  },
  watch: {
    // call again the method if the route changes
    $route: "getLectures"
  },
  methods: {
    async getLectures() {
      this.loading = true;
      let response = null;
      if (this.$route.params.categoryId) {
        const categoryId = this.$route.params.categoryId;
        response = await LectureService.categories(categoryId);
        if (response) {
          this.loading = false;
          if (response.data.length > 0) {
            this.lectures = response.data;
          } else {
            this.lectures = null;
          }
        } else {
          this.loading = false;
        }
      } else {
        response = await LectureService.index();
        if (response) {
          this.loading = false;
        }
        this.lectures = response.data;
      }
    },
    async getHistory() {
      try {
        const userId = this.$store.state.user.id;
        const response = await GeneralService.getHistory(userId);
        this.userLectures = response.data;
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