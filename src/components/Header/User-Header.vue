<template>
  <div v-if="$store.state.isUserLoggedIn">
    <v-app-bar
      flat
      color="white"
      :hide-on-scroll="
        $router.history.current['name'] === 'story-create' ||
        $router.history.current['name'] === 'story-update'
          ? false
          : true"
    >
      <v-toolbar-title class="d-xl-block d-lg-block d-md-block d-none">
        <router-link :to="{ name: 'stories' }" class="brand-black pa-4"
          >Medio</router-link
        >
      </v-toolbar-title>
      <v-toolbar-title class="d-xl-none d-lg-none d-md-none d-block">
        <router-link :to="{ name: 'stories' }" class="mobile-logo ma-3">
          M
          <!-- <v-img src="@/assets/logo.png" style="border-radius: 7px;" max-width="50px"></v-img> -->
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        offset-y
        v-if="
          currentRouteName !== 'story-create' &&
          currentRouteName !== 'story-edit'"
        transition="scroll-y-transition"
        :close-on-content-click="false"
        v-model="showMenu"
      >
        <template v-slot:activator="{ attrs }">
          <v-text-field
            class="d-xl-flex d-lg-flex d-md-flex d-none"
            color="#8d93ab"
            hide-details
            outlined
            dense
            prepend-icon="mdi-magnify"
            style="max-width: 250px"
            single-line
            v-model="keyword"
            v-bind="attrs"
          ></v-text-field>
        </template>
        <v-card>
          <v-list>
            <div v-if="profiles.length > 0">
              <span class="subtitle d-block pa-4 font-weight-bold">PEOPLE</span>
              <v-divider />
              <v-list-item
                v-for="profile in profiles"
                :key="profile.id"
                :to="{
                  path: `/users/${profile.display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${profile.id}/profile`,
                }"
              >
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <v-avatar v-if="!profile.icon_url" size="40px">
                      <v-icon>mdi-account-circle-outline</v-icon>
                    </v-avatar>
                    <v-avatar v-else size="40px">
                      <v-img :src="profile.icon_url" />
                    </v-avatar>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <span class="d-block font-weight-bold align-center pa-4">{{
                      profile.display_name
                    }}</span>
                  </div>
                </div>
              </v-list-item>
            </div>
            <div v-if="stories.length > 0">
              <span class="subtitle d-block pa-4 font-weight-bold"
                >STORIES</span
              >
              <v-divider />
              <v-list-item
                v-for="story in stories"
                :key="story.id"
                :to="{ path: `/stories/${story.id}` }"
              >
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <v-avatar v-if="!story.thumbnail_url" tile size="40px">
                      <v-icon>mdi-image</v-icon>
                    </v-avatar>
                    <v-avatar v-else tile size="40px">
                      <v-img :src="story.thumbnail_url" />
                    </v-avatar>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <span class="d-block font-weight-bold align-center pa-4">{{
                      story.title
                    }}</span>
                  </div>
                </div>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
      </v-menu>

      <v-btn
        v-if="currentRouteName === 'story-create'"
        :disabled="$store.state.currentStory.JSON.content.length <= 2"
        small
        white
        outlined
        class="inline-block"
        :to="{ path: `/stories/publish/${$store.state.user.id}` }"
      >
        PUBLISH
      </v-btn>

      <v-btn
        v-if="currentRouteName === 'story-edit'"
        small
        white
        outlined
        class="inline-block"
        :to="{ path: `/stories/${$route.params.id}/edit/publish` }"
      >
        PUBLISH
      </v-btn>

      <v-btn color="#1b262c" icon style="margin-right: 0.3em" class="ma-4">
        <router-link
          :to="{
            path: `/users/${$store.state.user.display_name
              .toLowerCase()
              .replace(/\s/g, '')}/${$store.state.user.id}/bookmarks`,
          }"
        >
          <v-avatar size="40px">
            <v-icon>mdi-bookmark-multiple-outline</v-icon>
          </v-avatar>
        </router-link>
      </v-btn>

      <v-menu
        bottom
        offset-y
        transition="scroll-y-transition"
        :close-on-content-click="false"
        v-if="$store.state.isUserLoggedIn"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="#1b262c" v-on="on" icon style="margin-right: 0.3em">
            <v-avatar v-if="!$store.state.user.icon_url" size="40px">
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-avatar>
            <v-avatar v-else size="40px">
              <v-img :src="$store.state.user.icon_url" />
            </v-avatar>
          </v-btn>
        </template>

        <v-card max-width="200px">
          <v-container fluid>
            <div class="d-flex justify-center align-center flex-column ma-3">
              <router-link
                :to="{
                  path: `/users/${$store.state.user.display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${$store.state.user.id}/profile`,
                }"
              >
                <v-avatar v-if="!$store.state.user.icon_url">
                  <v-icon large>mdi-account-circle</v-icon>
                </v-avatar>
                <v-avatar v-else>
                  <v-img :src="$store.state.user.icon_url" />
                </v-avatar>
              </router-link>
              <router-link
                class="d-block ma-2 bold"
                style="font-size: 16px"
                :to="{
                  path: `/users/${$store.state.user.display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${$store.state.user.id}/profile`,
                }"
              >
                <span>{{ $store.state.user.display_name }}</span>
              </router-link>
              <v-btn
                depressed
                small
                block
                text
                :to="{
                  path: `/users/${$store.state.user.display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${$store.state.user.id}/profile`,
                }"
                >View profile</v-btn
              >
            </div>
            <v-divider />
            <v-btn
              v-if="adminPermissions"
              class="my-3"
              depressed
              small
              text
              block
              :to="{ name: 'admin-main' }"
              >Admin Panel</v-btn
            >
            <v-divider v-if="adminPermissions" />
            <div class="d-flex justify-center align-center flex-column ma-3">
              <v-btn
                class="ma-1"
                depressed
                small
                text
                block
                :to="{ path: `/stories/create/${$store.state.user.id}` }"
                >New Story</v-btn
              >
              <v-btn
                class="ma-1"
                depressed
                small
                text
                block
                :to="{
                  path: `/users/${$store.state.user.display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${$store.state.user.id}/stories`,
                }"
                >My stories</v-btn
              >
              <v-btn
                class="ma-1"
                depressed
                small
                text
                block
                :to="{
                  path: `/users/${$store.state.user.display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${$store.state.user.id}/edit`,
                }"
                >Edit account</v-btn
              >

              <v-btn class="ma-1" depressed small text block @click="logout"
                >Log out</v-btn
              >
            </div>
            <!-- <v-list-item @click="toPath">My stories</v-list-item>
                <v-list-item @click="toPath">Settings</v-list-item>
                <v-list-item @click="logout">Log out</v-list-item>
            </v-list>-->
          </v-container>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import CategoryService from "@/services/CategoryService";
import GeneralService from "@/services/GeneralService";
// import { debounce } from "lodash"
export default {
  components: {},
  data: () => ({
    categories: null,
    permissions: false,
    adminPermissions: false,
    isChecking: true,
    isContent: false,
    keyword: "",
    profiles: [],
    stories: [],
    showMenu: false,
    x: 0,
    y: 0,
  }),

  watch: {
    $route: "checkRoles",
    keyword(oldKeyword) {
      this.contentSearch();
      if (oldKeyword !== "") {
        this.showMenu = true;
      } else {
        this.showMenu = false;
      }
    },
  },

  created() {
    this.checkRoles();
    this.getCategories();
    // this.debounceName = debounce(this.contentSearch, 1000)
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    // isContent: () => {
    //   return this.$store.state.currentStory.HTML
    //   // if ($store.state.currentStory.JSON.length < 10) {
    //   //   return false;
    //   // } else {
    //   //   return true;
    //   // }
    // },
  },
  methods: {
    async contentSearch() {
      if (this.keyword !== "") {
        const response = await GeneralService.search(
          this.keyword.toLowerCase()
        );
        if (response.data.stories.length > 0) {
          this.stories = response.data.stories;
        }
        if (response.data.users.length > 0) {
          this.profiles = response.data.users;
        }
      }
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setAuthorities", null);
      this.$store.dispatch("setCurrentStoryHTML", ``);
      this.$store.dispatch("setCurrentStoryJSON", null);
      this.permissions = false;
      this.adminPermissions = false;
      this.$router.push({
        name: "login",
      });
      if (window.gapi) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2) {
          auth2.signOut().then(function () {
            console.log("User signed out.");
          });
        }
      }
      if (window.FB) {
        if (window.ujwts) window.FB.logout();
      }
    },
    // async publish(data) {

    // },
    async getCategories() {
      try {
        const response = await CategoryService.index();
        this.categories = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    checkRoles() {
      const userAuthorities = this.$store.state.authorities;
      if (userAuthorities) {
        for (let i = 0; i < userAuthorities.length; i++) {
          if (
            userAuthorities[i] === "ROLE_storyR" ||
            userAuthorities[i] === "ROLE_MODERATOR" ||
            userAuthorities[i] === "ROLE_ADMIN"
          ) {
            this.permissions = true;
          } else {
            this.permissions = false;
          }
        }
        for (let i = 0; i < userAuthorities.length; i++) {
          if (userAuthorities[i] === "ROLE_ADMIN") {
            this.adminPermissions = true;
          } else {
            this.adminPermissions = false;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.brand-black {
  font-family: "Julius Sans One", sans-serif;
  color: #1b262c !important;
  opacity: 0.9;
  font-weight: 400 !important;
  font-size: 33px !important;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mobile-logo {
  font-family: "Julius Sans One", sans-serif;
  color: #1b262c !important;
  opacity: 0.9;
  font-weight: 400 !important;
  font-size: 33px !important;
  padding: 3px;
  border: 2px solid;
}
.brand {
  font-family: "Julius Sans One", sans-serif;
  color: white !important;
  font-weight: 400 !important;
  font-size: 33px !important;
}
.cta-btn-active {
  background-color: #3f72af !important;
  color: white !important;
  transition: 0.2s;
}
.cta-btn-hover {
  background-color: white !important;
  color: black !important;
  transition: 0.2s;
}
</style>