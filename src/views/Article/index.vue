<template>
  <ArticleMetadata>
    <template v-slot:article>
      <v-row class="ma-sm-6 ma-xl-0 ma-lg-0 ma-md-0" v-if="article">
        <v-col class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
          <h1 class="display-3" style="margin-top: 1rem;">{{article.title}}</h1>
          <span class="d-block mt-2">
            By
            <router-link
              v-if="article.Users[0]"
              :to="{path: `/users/${article.Users[0].display_name.toLowerCase()}/${article.Users[0].id}/profile`}"
            >
              <span class="font-weight-bold">{{article.Users[0].display_name}}</span>
            </router-link>
            <span v-else class="font-weight-bold">Unknown</span>
          </span>
          <router-link v-if="isOwner" :to="{name: 'article-edit', params: {id: $route.params.id}}">
            <v-btn style="margin: 1.5rem 0;" icon>
              <v-icon medium color="black">mdi-pencil</v-icon>
            </v-btn>
          </router-link>
          <router-link v-if="isOwner || adminPermissions" :to="{name: 'articles'}">
            <v-btn style="margin: 1.5rem 0;" icon @click="deleteArticle">
              <v-icon medium color="black">mdi-delete-forever</v-icon>
            </v-btn>
          </router-link>
          <div style="margin: 1rem 0" class="d-flex flex-column justify-space-around">
            <div>
              <div v-html="article.description"></div>
            </div>
          </div>
        </v-col>
        <v-col
          class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-lg-start justify-md-start justify-sm-center justify-center"
        >
          <v-card max-width="350px" max-height="400px">
            <v-img
              :src="imageError ? require('@/assets/blue-error-background.jpg') : article.thumbnail_url"
              height="250px"
              width="350px"
              @error="imageLoadError"
            ></v-img>
            <v-card-text>
              <div class="d-flex justify-space-around align-center">
                <div>
                  <span class="d-block article-count font-weight-bold">{{article.Tips.length}}</span>
                  <span class="subtitle">Useful tips</span>
                </div>
                <div>
                  <span class="d-block article-count font-weight-bold">{{article.Sentences.length}}</span>
                  <span class="subtitle">Interactive exercises</span>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-hover v-slot:default="{ hover }">
                <router-link
                  :to="$store.state.isUserLoggedIn ? {name: 'article-action'} : {name: 'register'}"
                >
                  <v-btn :class="`${hover ? 'cta-btn-hover' : 'cta-btn-active'}`" class="mb-3">Get Started</v-btn>
                </router-link>
              </v-hover>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-slot:similar>
      <v-slide-group class="pa-4" show-arrows v-if="categoryArticles.length">
        <v-slide-item v-for="article in categoryArticles" :key="article.id">
          <CardRecommended :article="article" />
        </v-slide-item>
      </v-slide-group>
    </template>
    <template v-slot:other>
      <v-slide-group class="pa-4" show-arrows v-if="differentArticles.length">
        <v-slide-item v-for="article in differentArticles" :key="article.id">
          <CardRecommended :article="article" />
        </v-slide-item>
      </v-slide-group>
    </template>
  </ArticleMetadata>
</template>

<script>
import ArticleService from "@/services/ArticleService.js";
import ArticleMetadata from "@/views/Article/Metadata.vue";
import CardRecommended from "@/components/Card-Recommended";
export default {
  components: {
    ArticleMetadata,
    CardRecommended
  },
  data: () => ({
    article: null,
    permissions: false,
    isOwner: false,
    adminPermissions: false,
    imageError: false,
    categoryArticles: [],
    differentArticles: []
  }),
  created() {
    this.getArticle();
    this.checkRoles();
  },
  watch: {
    // call again the method if the route changes
    $route: "getArticle"
  },
  methods: {
    async getArticle() {
      try {
        const articleId = this.$route.params.id;
        const responseArticle = await ArticleService.show(articleId);
        const responseSimilarArticles = await ArticleService.showSimilar(
          responseArticle.data.category_id,
          articleId
        );
        const responseDifferentArticles = await ArticleService.showDifferent(
          responseArticle.data.category_id,
          articleId
        );
        if (this.$store.state.user) {
          if (responseArticle.data.Users[0]) {
            if (
              responseArticle.data.Users[0].id === this.$store.state.user.id
            ) {
              this.isOwner = true;
            } else {
              this.isOwner = false;
            }
          }
        }
        this.article = responseArticle.data;
        this.categoryArticles = responseSimilarArticles.data;
        this.differentArticles = responseDifferentArticles.data;
        this.imageError = false;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteArticle() {
      try {
        const articleId = this.$route.params.id;
        if (this.isOwner || this.adminPermissions) {
          await ArticleService.delete(articleId);
        }
      } catch (err) {
        console.log(err);
      }
    },
    checkRoles() {
      const userAuthorities = this.$store.state.authorities;
      if (userAuthorities) {
        for (let i = 0; i < userAuthorities.length; i++) {
          if (
            userAuthorities[i] === "ROLE_LECTURER" ||
            userAuthorities[i] === "ROLE_MODERATOR" ||
            userAuthorities[i] === "ROLE_ADMIN"
          ) {
            this.permissions = true;
          } else {
            this.permissions = false;
          }
        }
        for (let i = 0; i < userAuthorities.length; i++) {
          if (
            userAuthorities[i] === "ROLE_ADMIN" ||
            userAuthorities[i] === "ROLE_MODERATOR"
          ) {
            this.adminPermissions = true;
          } else {
            this.adminPermissions = false;
          }
        }
      }
    },
    async imageLoadError() {
      this.imageError = true;
    }
  }
};
</script>

<style scoped>
.back-link {
  font-size: 15px;
  color: #52616b;
  margin-top: 20px;
}
.back-link:hover {
  color: #303841;
}
.article-count {
  color: black;
  font-size: 20px;
}
</style>