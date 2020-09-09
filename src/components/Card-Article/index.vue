<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :to="{path: `/articles/${article.id}`}"
      width="300px"
      height="320px"
      raised
      :elevation="hover ? 8 : 2"
    >
      <div>
        <v-list-item>
          <router-link
            v-if="article.Users[0]"
            :to="{path: `/users/${article.Users[0].display_name.toLowerCase()}/${article.Users[0].id}/profile`}"
          >
            <v-list-item-avatar>
              <v-img
                v-if="article.Users.length > 0 && article.Users[0].icon_url"
                :src="article.Users[0].icon_url"
              ></v-img>
              <v-img v-else src="@/assets/blue-error-background.jpg"></v-img>
            </v-list-item-avatar>
          </router-link>
          <v-list-item-avatar v-else>
            <v-img src="@/assets/blue-error-background.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">{{article.title}}</v-list-item-title>
            <v-list-item-subtitle v-if="article.Users[0]">
              By
              <router-link
                v-if="article.Users[0]"
                :to="{path: `/users/${article.Users[0].display_name.toLowerCase()}/${article.Users[0].id}/profile`}"
              >
                <span class="font-weight-bold">{{article.Users[0].display_name}}</span>
              </router-link>
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else>
              <span>By</span><span class="font-weight-bold"> Unknown</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img
          :src="imageError ? require('@/assets/blue-error-background.jpg') : article.thumbnail_url"
          height="175"
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
          <span style="display: block;">{{article.short_description}}</span>
          <div v-if="$router.history.current['name'] === 'user-articles'">
            <v-btn
              absolute
              dark
              fab
              small
              bottom
              left
              color="white"
              :to="{path: `/articles/${article.id}/edit`}"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div>
        </v-card-text>
      </div>
    </v-card>
  </v-hover>
</template>


<script>
export default {
  data: () => ({
    imageError: false
  }),
  props: {
    article: Object
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