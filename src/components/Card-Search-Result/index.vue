<template>
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
</template>

<script>
export default {
    data: () => {
        
    },
}
</script>