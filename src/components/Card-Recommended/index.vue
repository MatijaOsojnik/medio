<template>
  <v-hover v-slot:default="{ hover }">
    <router-link :to="{path: `/lectures/${lecture.id}`}" style="text-decoration:none;">
      <v-card width="220px" height="270px" class="ma-4" raised :elevation="hover ? 8 : 2">
        <v-list-item>
            <v-list-item-avatar>
              <v-img
                v-if="lecture.Users.length > 0 && lecture.Users[0].icon_url"
                :src="lecture.Users[0].icon_url"
              ></v-img>
              <v-img v-else src="@/assets/blue-error-background.jpg"></v-img>
            </v-list-item-avatar>
          <!-- <v-list-item-avatar v-else :img="$store.state.user.icon_url"></v-list-item-avatar> -->
          <v-list-item-content>
            <v-list-item-title class="title">{{lecture.title}}</v-list-item-title>
            <!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>

        <v-img
          :src="imageError ? require('@/assets/blue-error-background.jpg') : lecture.thumbnail_url"
          height="120"
          class="darker-img"
          @error="imageLoadError"
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
        </v-card-text>
      </v-card>
    </router-link>
  </v-hover>
</template>

<script>
export default {
  data: () => ({
    imageError: false
  }),
  props: {
    lecture: Object
  },
  methods: {
    async imageLoadError() {
      this.imageError = true;
    }
  }
};
</script>

<style>
</style>