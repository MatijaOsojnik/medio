<template>
  <v-app-bar
    flat
    :color="$router.history.current['path'] === '/' || $router.history.current['path'] === '/login' || $router.history.current['path'] === '/register' || $router.history.current['path'] === '/admin/login' ? 'transparent' : '#eeeeee'"
    :class="{'header-bar': ($router.history.current['path'] === '/' || $router.history.current['path'] === '/login' || $router.history.current['path'] === '/register' || $router.history.current['path'] === '/admin/login')}"
    v-if="!$store.state.isUserLoggedIn"
  >
    <v-toolbar-title v-if="$router.history.current['path'] === '/'">
      <router-link :to="{name: 'landing'}" class="brand">Medio</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-else>
      <router-link :to="{name: 'landing'}" class="brand-black">Medio</router-link>
    </v-toolbar-title>
    <v-menu
      bottom
      transition="scale-transition"
      :close-on-content-click="false"
      v-if="$router.history.current['path'] === '/articles' || !$store.state.isUserLoggedIn"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          :outlined="$router.history.current['path'] === '/' ? true : false"
          :color="`${$router.history.current['path'] === '/' ? 'white' : '#ededed'}`"
          v-on="on"
          style="margin-left: 30px;"
        >
          Browse
          <v-icon small>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-card max-width="200px">
        <v-container fluid>
          <span class="subtitle ma-2 d-block font-weight-bold text-center">Featured</span>
          <div class="d-flex justify-center align-center flex-column ma-3">
            <v-btn depressed small text block :to="{name: `articles`}">All Articles</v-btn>
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
    </v-menu>
    <v-spacer></v-spacer>
    <router-link :to="{name: 'login'}">
      <v-btn
        outlined
        :color="`${$router.history.current['path'] === '/' ? 'white' : '#005082'}`"
        v-if="!$store.state.isUserLoggedIn && $router.history.current['path'] !== '/login' && $router.history.current['path'] !== '/register' && $router.history.current['path'] !== '/admin/login'"
      >Sign in</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
import CategoryService from "@/services/CategoryService.js";
export default {
  data: () => ({
    menu: false,
    categories: null
  }),
  mounted() {
    this.getCategories();
  },
  methods: {
    async logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login"
      });
    },
    async getCategories() {
      const response = await CategoryService.index();
      this.categories = response.data;
    },
    async toPath() {
      this.$router.push({
        path: `/articles`
      });
    }
  }
};
</script>

<style scoped>
.header-bar {
  position: absolute;
  z-index: 999;
}

.brand-black {
  font-family: "Julius Sans One", sans-serif;
  color: #1b262c !important;
  opacity: 0.9;
  font-weight: 400 !important;
  font-size: 33px !important;
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