<template>
  <div>
    <div>
      <Header />
    </div>
    <v-container fluid>
      <template v-slot:articles-panel>
        <v-container fluid>
          <span class="title" v-if="$router.history.current['name'] === 'articles'">All Articles</span>
          <span
            class="title"
            v-else-if="$router.history.current['name'] === 'articles-categories' && articles"
          >{{articles[0].Category.name}}</span>
          <v-row style="z-index: 100" class="flex-sm-fill">
            <v-col
              v-if="priviliges"
              class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 d-sm-flex justify-sm-center"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  max-width="300px"
                  height="320px"
                  :to="{path: `/articles/create/${$store.state.user.id}`}"
                  raised
                  :elevation="hover ? 8 : 2"
                >
                  <div>
                    <v-img
                      src="https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      height="320px"
                      class="darker-img"
                    >
                      <v-row class="fill-height flex-column justify-center">
                        <div class="align-self-center">
                          <v-btn icon :class="{ 'show-btns': hover }" class="invisible">
                            <v-icon
                              x-large
                              :class="{ 'show-btns': hover }"
                              class="invisible"
                            >{{"mdi-plus-circle-outline"}}</v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-img>
                  </div>
                </v-card>
              </v-hover>
            </v-col>
            <v-col
              class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 d-sm-flex justify-sm-center"
              v-for="article in articles"
              :key="article.id"
            >
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
                      <v-list-item-avatar>
                        <v-img
                          v-if="article.Users.length > 0 && article.Users[0].icon_url"
                          :src="article.Users[0].icon_url"
                        ></v-img>
                        <v-icon v-else dark large color="indigo">mdi-account-circle</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="title">{{article.title}}</v-list-item-title>
                        <!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
                      </v-list-item-content>
                    </v-list-item>

                    <v-img
                      :src="article.thumbnail_url"
                      height="194"
                      lazy-src="@/assets/blue-error-background.jpeg"
                      class="darker-img"
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
                      <!-- <span>{{article.Category.name}}</span> -->
                    </v-card-text>
                  </div>
                </v-card>
              </v-hover>
            </v-col>
            <v-btn @click="limit = null" v-if="articles > 10">Show More</v-btn>
          </v-row>
        </v-container>
      </template>
    </v-container>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import ArticleService from "@/services/ArticleService.js";
export default {
  components: {
    Header
  },
  data: () => ({
    articles: null,
    priviliges: false,
    limit: 10
  }),
  computed: {
    articleLimit: async () => {
      if (this.articles) {
        return (await this.limit)
          ? this.articles.slice(0, this.limit)
          : this.articles;
      }
    }
  },
  mounted() {
    this.getArticles();
    this.checkRoles();
  },
  watch: {
    // call again the method if the route changes
    $route: "getArticles"
  },
  methods: {
    async getArticles() {
      let response = null;
      if (this.$route.params.categoryId) {
        const categoryId = this.$route.params.categoryId;
        response = await ArticleService.categories(categoryId);
      } else {
        response = await ArticleService.index();
      }
      this.articles = response.data;
    },
    checkRoles() {
      const userAuthorities = this.$store.state.authorities;
      let hasPriviliges = false;

      if (userAuthorities) {
        for (let i = 0; i < userAuthorities.length; i++) {
          if (
            userAuthorities[i] === "ROLE_LECTURER" ||
            userAuthorities[i] === "ROLE_MODERATOR" ||
            userAuthorities[i] === "ROLE_ADMIN"
          ) {
            hasPriviliges = true;
          }
        }
      }
      if (hasPriviliges) {
        this.priviliges = true;
      }
    }
  }
};
</script>

<style>
.greeting-title {
  font-weight: 800;
  font-size: 24px;
  padding: 10px;
  display: block;
}
.greeting-name {
  background-color: #c2f0fc;
}
.invisible {
  color: rgb(63, 114, 175, 0) !important;
}
.show-btns {
  color: rgb(255, 255, 255, 1) !important;
}
</style>