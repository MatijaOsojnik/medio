<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item class="ma-2">
        <v-list-item-avatar>
          <v-icon large v-if="!$store.state.user.icon_url">mdi-account-circle</v-icon>
          <v-img v-else :src="$store.state.user.icon_url" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{$store.state.user.display_name}}</v-list-item-title>
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
            <v-icon>{{item.iconName}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.linkName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{path: '/lectures'}"
          class="ma-2"
        >
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
      <v-toolbar-title>THINQ</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        bottom
        left
        transition="slide-x-reverse-transition"
        :close-on-content-click="false"
        v-if="$store.state.isUserLoggedIn"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="white" v-on="on" icon style="margin-right: 0.3em">
            <v-avatar v-if="!$store.state.user.icon_url">
              <v-icon large>mdi-account-circle</v-icon>
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
            <div class="d-flex justify-center align-center flex-column ma-3">
              <v-btn
                class="ma-1"
                depressed
                small
                text
                block
                :to="{path: `/users/${($store.state.user.display_name).toLowerCase()}/${$store.state.user.id}/lectures`}"
              >My lectures</v-btn>
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
    drawerItems: [
      { iconName: "mdi-home", linkName: "Home", path: "/admin/main" },
      {
        iconName: "mdi-account-supervisor-circle",
        linkName: "Users",
        path: "/admin/users"
      },
      {
        iconName: "mdi-animation-play",
        linkName: "Lectures",
        path: "/admin/lectures"
      },
      {
        iconName: "mdi-format-list-text",
        linkName: "Categories",
        path: "/admin/categories"
      },
      {
        iconName: "mdi-card-account-details",
        linkName: "Roles",
        path: "/admin/roles"
      }
    ]
  }),
  methods: {
    async logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setAuthorities", null);
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style>
</style>