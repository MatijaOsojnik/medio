<template>
  <ArticleMetadata>
    <template v-slot:yourArticles>
    <span class="title my-4 d-block">Your articles</span>
      <v-row style="z-index: 100" class="flex-sm-fill">
        <v-col
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
        >
          <ArticleCardCreateComponent :card="card" />
        </v-col>
        <v-col
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
          v-for="article in articles"
          :key="article.id"
        >
          <ArticleCardComponent :article="article" />
        </v-col>
      </v-row>
    </template>
  </ArticleMetadata>
</template>

<script>
import ArticleCardCreateComponent from "@/components/Card-Article-Create";
import ArticleCardComponent from "@/components/Card-Article";
import ArticleService from "@/services/ArticleService";
import ArticleMetadata from "@/views/Users/ArticleMetadata";

export default {
  components: {
    ArticleCardCreateComponent,
    ArticleCardComponent,
    ArticleMetadata
  },
  data: () => ({
    card: {
      imageUrl:
        "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      url: "/articles/create/"
    },
    articles: null
  }),
  created() {
    this.getUserArticles();
  },
  methods: {
    async getUserArticles() {
      const response = await ArticleService.user(this.$store.state.user.id);
      this.articles = response.data;
    }
  }
};
</script>

<style>
</style>