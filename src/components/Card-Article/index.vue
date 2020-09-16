<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :to="{path: `/articles/${article.id}`}"
      class="mx-auto"
      raised
      :elevation="hover ? 8 : 2"
    >
      <div>
        <!-- <v-list-item>
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
        </v-list-item>-->

        <v-img
          :src="imageError ? require('@/assets/blue-error-background.jpg') : article.thumbnail_url"
          height="175"
          class="darker-img"
          @error="imageLoadError"
        >
          <!-- <v-row class="fill-height flex-column justify-center">
            <div class="align-self-center">
              <v-btn :class="{ 'show-btns': hover }" class="invisible" icon>
                <v-icon
                  :class="{ 'show-btns': hover }"
                  class="invisible"
                  large
                >{{"mdi-play-circle-outline"}}</v-icon>
              </v-btn>
            </div>
          </v-row>-->
        </v-img>
        <v-card-title>{{article.title}}</v-card-title>
        <v-card-subtitle>{{article.short_description}}</v-card-subtitle>
        <v-card-actions>
          <v-list-item>
            <router-link
              v-if="article.Users[0]"
              :to="{path: `/users/${article.Users[0].display_name.toLowerCase()}/${article.Users[0].id}/profile`}"
            >
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  v-if="article.Users.length > 0 && article.Users[0].icon_url"
                  :src="article.Users[0].icon_url"
                ></v-img>
                <v-img v-else src="@/assets/blue-error-background.jpg"></v-img>
              </v-list-item-avatar>
            </router-link>

            <router-link
              v-if="article.Users[0]"
              :to="{path: `/users/${article.Users[0].display_name.toLowerCase()}/${article.Users[0].id}/profile`}"
            >
              <v-list-item-content>
                <v-list-item-title>{{article.Users[0].display_name}}</v-list-item-title>
              </v-list-item-content>
            </router-link>

            <v-row align="center" justify="end">
              <v-icon class="mr-3" @click="addBookmark(article.id)">{{bookmarkIcon}}</v-icon>
              <v-icon class="mr-3">mdi-share-variant</v-icon>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </div>
    </v-card>
  </v-hover>
</template>


<script>
import GeneralService from '@/services/GeneralService'
export default {
  data: () => ({
    imageError: false,
    bookmarkIcon: 'mdi-bookmark-outline'
  }),
  props: {
    article: Object,
  },
  methods: {
    async imageLoadError() {
      this.imageError = true;
    },
    async addBookmark(articleId) {
      try {
            const response = await GeneralService.postBookmark(
              this.$store.state.user.id,
              articleId
            );
            if (response)
            this.bookmarkIcon = 'mdi-bookmark'
              setTimeout(() => {
                this.$router.push({
                  path: `/articles/${this.$route.params.id}`
                });
              }, 6000);
          } catch (err) {console.log(err)}
    }
  },
};
</script>

<style>
</style>