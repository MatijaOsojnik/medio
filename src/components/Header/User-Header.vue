<template>
  <div class="container" v-if="$store.state.isUserLoggedIn">
    <v-app-bar flat color="white" hide-on-scroll>
      <v-toolbar-title class="d-xl-block d-lg-block d-md-block d-none">
        <router-link :to="{name: 'articles'}" class="brand-black">Medio</router-link>
      </v-toolbar-title>
      <v-toolbar-title class="d-xl-none d-lg-none d-md-none d-block">
        <router-link :to="{name: 'articles'}" class="mobile-logo">
          M
          <!-- <v-img src="@/assets/logo.png" style="border-radius: 7px;" max-width="50px"></v-img> -->
        </router-link>
      </v-toolbar-title>

      <!-- <v-menu
        bottom
        transition="scale-transition"
        :close-on-content-click="false"
        v-if="$store.state.isUserLoggedIn"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="#ededed" v-on="on" style="margin-left: 30px;">
            Browse
            <v-icon small>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-card max-width="200px">
          <v-container fluid>
            <span class="subtitle ma-2 d-block font-weight-bold text-center">Featured</span>
            <div class="d-flex justify-center align-center flex-column ma-3">
              <v-btn depressed small text block :to="{name: `articles`}">All articles</v-btn>
            </div>
            <v-divider />
            <span class="subtitle ma-2 d-block font-weight-bold text-center">Categories</span>
            <div
              class="d-flex justify-center align-center flex-column ma-1"
              v-for="category in categories"
              :key="category.id"
            >
              <v-btn
                depressed
                small
                text
                block
                :to="{path: `/articles/categories/${category.id}`}"
              >{{category.name}}</v-btn>
            </div>
          </v-container>
        </v-card>
      </v-menu>-->

      <v-spacer></v-spacer>

      <v-text-field
      class="d-xl-flex d-lg-flex d-md-flex d-none"
        color="#A2D5F2"
        hide-details
        outlined
        dense
        prepend-icon="mdi-magnify"
        style="max-width: 250px;"
        single-line
      ></v-text-field>

      <v-btn color="#1b262c" v-on="on" icon style="margin-right: 0.3em" class="ma-4">
        <router-link
          :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/bookmarks`}"
        >
          <v-avatar v-if="!$store.state.user.icon_url">
            <v-icon size="33px">mdi-bookmark-multiple-outline</v-icon>
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
            <v-avatar v-if="!$store.state.user.icon_url">
              <v-icon size="33px">mdi-account-circle-outline</v-icon>
            </v-avatar>
            <v-avatar v-else>
              <v-img :src="$store.state.user.icon_url" />
            </v-avatar>
          </v-btn>
        </template>

        <v-card max-width="200px">
          <v-container fluid>
            <div class="d-flex justify-center align-center flex-column ma-3">
              <router-link
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/profile`}"
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
                style="font-size: 16px;"
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/profile`}"
              >
                <span>{{$store.state.user.display_name}}</span>
              </router-link>
              <v-btn
                depressed
                small
                block
                text
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/profile`}"
              >View profile</v-btn>
            </div>
            <v-divider />
            <v-btn
              v-if="adminPermissions"
              class="my-3"
              depressed
              small
              text
              block
              :to="{name: 'admin-main'}"
            >Admin Panel</v-btn>
            <v-divider v-if="adminPermissions" />
            <div class="d-flex justify-center align-center flex-column ma-3">
              <v-btn
                v-if="permissions"
                class="ma-1"
                depressed
                small
                text
                block
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/articles`}"
              >New Story</v-btn>
              <v-btn
                v-if="permissions"
                class="ma-1"
                depressed
                small
                text
                block
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/articles`}"
              >My stories</v-btn>
              <v-btn
                class="ma-1"
                depressed
                small
                text
                block
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/edit`}"
              >Edit account</v-btn>

              <v-btn class="ma-1" depressed small text block @click="logout">Log out</v-btn>
            </div>
            <!-- <v-list-item @click="toPath">My articles</v-list-item>
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
export default {
  data: () => ({
    categories: null,
    permissions: false,
    adminPermissions: false,
    isChecking: true,
  }),
  watch: {
    $route: "checkRoles",
  },
  created() {
    this.checkRoles();
    this.getCategories();
  },
  methods: {
    async logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setAuthorities", null);
      this.permissions = false;
      this.adminPermissions = false;
      this.$router.push({
        name: "login",
      });
    },
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
            userAuthorities[i] === "ROLE_articleR" ||
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
  padding: 2px;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mobile-logo {
    font-family: "Julius Sans One", sans-serif;
  color: #1b262c !important;
  opacity: 0.9;
  font-weight: 400 !important;
  font-size: 33px !important;
  padding: 2px;
  border: 2px solid
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