<template>
  <v-app>
    <div class="header">
      <Header />
      <v-container class="text-center" fill-height fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h1 class="header-title">Dive deeper on topics that matter to you.</h1>
          </v-col>
          <v-col cols="12">
            <v-hover v-slot:default="{ hover }">
              <router-link :to="{name: 'register'}">
                <v-btn large :class="`${hover ? 'cta-btn-hover' : 'cta-btn-active'}`">
                  <span style="font-weight: 900;">Get Started</span>
                </v-btn>
              </router-link>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="content-container">
      <v-container fluid class="pa-12">
        <v-container class="header-container">
          <v-row class="pa-6 align-center justify-center">
            <v-col class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="content-container">
                <div>
                  <span class="content-title">READ</span>
                </div>
                <div>
                  <span
                    class="content-text"
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                </div>
              </div>
            </v-col>
            <v-col
              class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 justify-xl-end justify-lg-end justify-md-end justify-sm-center justify-center d-xl-flex d-lg-flex d-md-flex d-sm-none d-none"
            >
              <img class="content-image" src="../assets/inspiration.svg" />
              <!-- <div class="content-image-container"></div> -->
            </v-col>
          </v-row>
          <v-row
            class="pa-6 align-center justify-center d-lg-flex d-xl-flex d-md-flex d-sm-none d-none"
          >
            <v-col
              class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 justify-xl-start justify-lg-start justify-md-start justify-sm-center justify-center d-xl-flex d-lg-flex d-md-flex d-sm-none d-none"
            >
              <img class="content-image" src="../assets/forming-ideas.svg" />
            </v-col>
            <v-col class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="content-container">
                <div>
                  <span class="content-title">LEARN</span>
                </div>
                <div>
                  <span
                    class="content-text"
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row
            class="pa-6 align-center d-lg-none d-xl-none d-md-none d-sm-flex d-flex justify-center"
          >
            <v-col class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="content-container">
                <div>
                  <span class="content-title">LEARN</span>
                </div>
                <div>
                  <span
                    class="content-text"
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                </div>
              </div>
            </v-col>
            <v-col
              class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 justify-xl-start justify-lg-start justify-md-start justify-sm-center justify-center d-xl-flex d-lg-flex d-md-flex d-sm-none d-none"
            >
              <img class="content-image" src="../assets/excitement.svg" />
            </v-col>
          </v-row>
          <v-row class="pa-6 align-center justify-center">
            <v-col class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="content-container">
                <div>
                  <span class="content-title">PUBLISH</span>
                </div>
                <div>
                  <span
                    class="content-text"
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                </div>
              </div>
            </v-col>
            <v-col
              class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 justify-xl-end justify-lg-end justify-md-end justify-sm-center justify-center d-xl-flex d-lg-flex d-md-flex d-sm-none d-none"
            >
              <img class="content-image" src="../assets/excitement.svg" />
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </div>
      <v-container class="recommended-container" fill-height fluid>
        <v-row align="center" justify="center">
          <h1 class="header-title text-center " style="font-size: 40px;">
            <span class="d-block">Expand your reading.</span>
            <span class="d-block">Expand your mind.</span>
          </h1>
        </v-row>
      </v-container>
    <div class="cta-container pa-12">
      <v-container fluid fill-height>
        <v-row>
          <v-col class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="content-container">
              <div>
                <span class="content-title">START YOUR JOURNEY</span>
              </div>
              <div>
                <span
                  class="content-text"
                  style="margin: 7px 0;"
                >Acquiring new knowledge has never been as easy as it is today. Join us on the journey and become a part of a forever knowledge-seeking community.</span>
              </div>
              <div>
                <v-hover v-slot:default="{ hover }">
                  <router-link :to="{name: 'register'}">
                    <v-btn
                      large
                      :class="`${hover ? 'cta-btn-hover' : 'cta-btn-active'}`"
                      style="margin-top: 2rem;"
                    >Get Started</v-btn>
                  </router-link>
                </v-hover>
              </div>
            </div>
          </v-col>
          <v-col
            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 d-xl-block d-lg-block d-md-block d-sm-none d-none"
          >
            <v-img class="cta-image" src="../assets/publish-ideas.svg" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header/Header";
import LectureService from "@/services/LectureService.js";
import Footer from "@/components/Footer/Footer";
export default {
  components: {
    Header,
    Footer,
  },
  data: () => ({
    lectures: null,
  }),
  created() {
    this.getLectures();
  },
  methods: {
    async getLectures() {
      const response = await LectureService.index();
      this.lectures = response.data;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.header {
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("../assets/header-image.jpg") no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
  position: relative;
}
.brand {
  font-family: "Julius Sans One", sans-serif;
  color: white;
  font-weight: 900;
  font-size: 40px;
}
.cta-btn-active {
  background-color: #d6e0f0 !important;
  color: black !important;
  transition: 0.2s;
}
.cta-btn-hover {
  background-color: white !important;
  color: black !important;
  transition: 0.2s;
}
.header-container {
  /* background-color: #65587f; */
  border-radius: 10px;
  margin: 1rem auto;
  width: 80%;
}
.header-title {
  font-family: "Forum", cursive;
  font-size: 60px;
  font-weight: 400;
  color: white;
}
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* .content-image-container {
  position: relative;
  right: 40px;
  bottom: 40px;
  height: 100px;
  width: 150px;
  background-color: aquamarine;
} */
.content-image {
  width: 75%;
}
.content-title {
  font-family: "Forum", cursive;
  font-size: 35px;
}
.content-text {
  font-family: "Roboto";
  font-weight: 300;
  letter-spacing: 1.4px;
  display: block;
}
.content-container {
  position: relative;
}
.tab {
  margin: 0 2px;
  background-color: #ffffff;
}

.cta-image {
  width: 60%;
  margin: 0 auto;
}

.recommended-container {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("../assets/wall-notes.jpg") no-repeat center center fixed;
  /* background-color: #ffffff; */
  height: 80vh;
  background-size: cover;
  overflow: hidden;
  position: relative;
}
.cta-container {
  /* background-color: #ededed; */
  height: 80vh;
}
</style>