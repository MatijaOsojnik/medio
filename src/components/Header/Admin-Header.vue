<template>
  <div class="container">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item class="ma-2">
        <v-list-item-avatar>
          <v-icon large v-if="!$store.state.user.icon_url"
            >mdi-account-circle</v-icon
          >
          <v-img v-else :src="$store.state.user.icon_url" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{
            $store.state.user.display_name
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense>
        <v-list-item
          :to="`${item.path}`"
          class="ma-2"
          v-for="(item, index) in drawerItems"
          :key="index"
        >
          <v-list-item-action>
            <v-icon>{{ item.iconName }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.linkName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/stories' }" class="ma-2">
          <v-list-item-action>
            <v-icon>mdi-apps-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>User Panel</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="ma-2">
          <v-btn block @click="logout">Log out</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="#617BE3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>MEDIO</v-toolbar-title>
      <v-spacer></v-spacer>
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
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase().replace(/\s/g,'')}/${$store.state.user.id}/profile`}"
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
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase().replace(/\s/g,'')}/${$store.state.user.id}/profile`}"
              >
                <span>{{$store.state.user.display_name}}</span>
              </router-link>
              <v-btn
                depressed
                small
                block
                text
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase().replace(/\s/g,'')}/${$store.state.user.id}/profile`}"
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
                class="ma-1"
                depressed
                small
                text
                block
                :to="{path: `/stories/create/${$store.state.user.id}`}"
              >New Story</v-btn>
              <v-btn
                class="ma-1"
                depressed
                small
                text
                block
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase().replace(/\s/g,'')}/${$store.state.user.id}/stories`}"
              >My stories</v-btn>
              <v-btn
                class="ma-1"
                depressed
                small
                text
                block
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase().replace(/\s/g,'')}/${$store.state.user.id}/edit`}"
              >Edit account</v-btn>

              <v-btn class="ma-1" depressed small text block @click="logout">Log out</v-btn>
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
export default {
  data: () => ({
    drawer: null,
        permissions: false,
    adminPermissions: false,
    isChecking: true,
    drawerItems: [
      { iconName: "mdi-home", linkName: "Home", path: "/admin/main" },
      {
        iconName: "mdi-account-supervisor-circle",
        linkName: "Users",
        path: "/admin/users",
      },
      {
        iconName: "mdi-animation-play",
        linkName: "stories",
        path: "/admin/stories",
      },
      {
        iconName: "mdi-format-list-text",
        linkName: "Categories",
        path: "/admin/categories",
      },
      {
        iconName: "mdi-card-account-details",
        linkName: "Roles",
        path: "/admin/roles",
      },
    ],
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
      this.adminPermissions = false;
            this.$router.push({
        name: "login",
      });
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log("User signed out.");
      });
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

<style>
</style>