<template>
  <div>
    <Header />
    <v-app-bar dense >
      <v-slide-group show-arrows>
        <v-slide-item v-for="n in 25" :key="n">
          <v-btn class="mx-2" depressed>Publication</v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-app-bar>
    <div
      class="d-flex justify-center align-center flex-column fill-height"
      style="height: 70vh;"
      v-if="!articles && !loading"
    >
      <span class="display-1 d-block">There are no articles in this category yet.</span>
      <v-btn class="ma-4" :to="{name: 'articles'}">Browse All Articles</v-btn>
    </div>
    <div
      class="d-flex justify-center align-center flex-column fill-height"
      height="70vh"
      v-if="loading"
    >
      <v-progress-circular indeterminate color="primary" class="d-block ma-5"></v-progress-circular>
    </div>
    <v-container fluid v-if="articles && !loading">
      <v-container fluid>
        <Metadata>
          <template v-slot:completed-articles>
            <span class="title" v-if="userArticles.length > 0">Completed Articles</span>
            <v-row style="z-index: 100" v-if="userArticles" class="flex-sm-fill">
              <v-col
                class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
                v-for="article in userArticles"
                :key="article.Article.id"
              >
                <ArticleCardComponent :article="article.Article" />
              </v-col>
            </v-row>
          </template>
        </Metadata>
        <span class="title" v-if="$router.history.current['name'] === 'articles'">All Articles</span>
        <span
          class="title"
          v-else-if="$router.history.current['name'] === 'articles-categories' && articles"
        >{{articles[0].Category.name}}</span>
        <v-row style="z-index: 100" class="flex-sm-fill">
          <v-col
            class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
            v-if="priviliges"
          >
            <ArticleCardCreateComponent :card="card" />
          </v-col>
          <v-col
            class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
            v-for="article in articleLimit"
            :key="article.id"
          >
            <ArticleCardComponent :article="article" />
          </v-col>
          <v-col class="col-12 text-center">
            <v-btn @click="limit = null" v-if="limit && articles.length > 10">Show More</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import ArticleService from "@/services/ArticleService.js";
import ArticleCardComponent from "@/components/Card-Article";
import GeneralService from "@/services/GeneralService";
import Metadata from "@/views/Articles/Metadata";
import ArticleCardCreateComponent from "@/components/Card-Article-Create";
import Header from "@/components/Header/Header.vue";
export default {
  components: {
    ArticleCardComponent,
    ArticleCardCreateComponent,
    Metadata,
    Header,
  },
  data: () => ({
    card: {
      imageUrl:
        "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      url: "/articles/create/",
    },
    articles: null,
    userArticles: null,
    loading: false,
    priviliges: false,
    limit: 10,
    length: 15,
    tab: null,
  }),
  computed: {
    articleLimit() {
      if (this.articles) {
        if (this.limit) {
          const splitArticles = this.articles.slice(0, 11);
          return splitArticles;
        } else {
          return this.articles;
        }
      } else {
        return this.articles;
      }
    },
  },
  created() {
    this.getArticles();
    this.getHistory();
    this.checkRoles();
  },
  watch: {
    // call again the method if the route changes
    $route: "getArticles",
  },
  methods: {
    async getArticles() {
      this.loading = true;
      let response = null;
      if (this.$route.params.categoryId) {
        const categoryId = this.$route.params.categoryId;
        response = await ArticleService.categories(categoryId);
        if (response) {
          this.loading = false;
          if (response.data.length > 0) {
            this.articles = response.data;
          } else {
            this.articles = null;
          }
        } else {
          this.loading = false;
        }
      } else {
        response = await ArticleService.index();
        if (response) {
          this.loading = false;
        }
        this.articles = response.data;
      }
    },
    async getHistory() {
      try {
        const userId = this.$store.state.user.id;
        const response = await GeneralService.getHistory(userId);
        this.userArticles = response.data;
      } catch (err) {
        console.log(err);
      }
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
    },
  },
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