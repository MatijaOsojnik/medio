<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="mx-auto">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>Post Story</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form lazy-validation>
              <!-- <label>Description</label>
                        <p v-html="$store.state.currentStory.HTML"></p>
                        <label>Title</label>
                        <p>{{$store.state.currentStory.JSON.content[0].content[0].text}}</p> -->
              <label for="title">Title</label>
              <v-text-field
                id="title"
                label="Enter a title for your story"
                maxlength="30"
                counter
                :rules="[rules.min]"
                solo
                aria-autocomplete="false"
                v-model="story.title"
              />

              <label for="shortDescription">Short Description</label>
              <v-text-field
                id="shortDescription"
                :rules="[rules.short_description]"
                label="Write your short description here"
                solo
                clearable
                counter
                maxlength="60"
                hint="This description will be used on the Story card before the user clicks on it."
                aria-autocomplete="false"
                v-model="story.short_description"
              />

              <label for="thumbnailURL">Thumbnail URL</label>
              <v-text-field
                id="thumbnailURL"
                label="Enter Thumbnail URL"
                solo
                aria-autocomplete="false"
                v-model="story.thumbnail_url"
              />

              <label for="category">Category</label>
              <v-select
                id="category"
                :items="categories"
                label="Select Category"
                v-model="story.category_id"
                item-text="name"
                item-value="id"
                solo
              ></v-select>
            </v-form>
            <v-scroll-x-transition>
              <v-alert
                type="success"
                mode="out-in"
                v-if="successfulStoryPost"
              >
                <span>You successfuly posted a story</span>
              </v-alert>
            </v-scroll-x-transition>
            <v-scroll-x-transition>
              <v-alert elevation="2" type="warning" v-if="errors.length">
                <ul>
                  <li v-for="error in errors" :key="error">
                    {{ error }}
                  </li>
                </ul>
              </v-alert>
            </v-scroll-x-transition>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn
              color="#f4f6ff"
              :disabled="waitBeforeClick"
              large
              @click="createStory"
              >SUBMIT</v-btn
            >

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import StoryService from "@/services/StoryService";
import CategoryService from "@/services/CategoryService";

export default {
  components: {},

  data: () => ({
    story: {
      title: ``,
      short_description: ``,
      description: ``,
      thumbnail_url: ``,
      category_id: ``,
    },
    rules: {
      short_description: (text) => text.length <= 60 || "Max 60 characters",
      description: (text) => text.length <= 300 || "Max 300 characters",
      file: (value) =>
        !value ||
        value.size < 2000000 ||
        "Thumbnail size should be less than 2 MB!",
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    waitBeforeClick: false,
    successfulStoryPost: false,
    errors: [],
    categories: [],
  }),
  mounted() {
    this.findCategories();
    this.checkUser();
    this.fillStoryData();
  },
  methods: {
    fillStoryData() {
      this.story.title = this.$store.state.currentStory.JSON.content[0].content[0].text;
      if(this.$store.state.currentStory.JSON.content[1].content[0].text){
        this.story.short_description = this.$store.state.currentStory.JSON.content[1].content[0].text
      } else {
        this.story.short_description = 'This is just a short description'
      }
      // console.log(this.$store.state.currentStory.HTML)
      this.story.description = this.$store.state.currentStory.HTML;
    },
    async createStory() {
      this.waitBeforeClick = true;
      // const areAllFieldsFilledIn = Object.keys(this.story).every(
      //   (key) => !!this.story[key]
      // );
      // if (!areAllFieldsFilledIn) {
      //   this.errors.push("Please fill in all the fields.");
      //   setTimeout(() => {
      //     this.errors = [];
      //     this.waitBeforeClick = false;
      //   }, 3000);
      //   return;
      // }
      try {
        const userId = this.$store.state.user.id;
        const response = await StoryService.post(this.story, userId);
        if (response) {
                this.$store.dispatch("setCurrentStoryHTML", ``);
      this.$store.dispatch("setCurrentStoryJSON", null);
          this.successfulStoryPost = true;
          setTimeout(() => {
            this.successfulStoryPost = false;
            this.waitBeforeClick = false;
            this.$router.push({
              name: "stories",
            });
          }, 3000);
        }
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async findCategories() {
      const response = await CategoryService.index();

      response.data.map((category) => {
        this.categories.push({ name: category.name, id: category.id });
      });
    },
    checkUser() {
      if (this.$store.state.user) {
        if (this.$route.params.id != this.$store.state.user.id) {
          this.$router.push({
            name: "stories",
          });
        }
      }
    if(this.$store.state.currentStory.JSON.content.length <= 2) {
          this.$router.push({
            name: "stories",
          });
    }

    },
  },
};
</script>

<style>
.text-editor-container {
  max-width: 740px;
  padding-left: 20px;
  padding-right: 20px;
  margin: auto;
}
</style>