<template>
  <div>
    <v-flex xs12 justify="center" align="center">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>General Information</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form lazy-validation>
              <label for="title">Title</label>
              <v-text-field
                id="title"
                label="Enter a title for your story"
                maxlength="30"
                :rules="[rules.min]"
                counter
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
              <label for="description">Description</label>
            </v-form>
          </v-card-text>
      <div class="text-editor-container">
        <TextEditor />
      </div>


    </v-flex>
  </div>
</template>

<script>
import StoryService from "@/services/StoryService";
import CategoryService from "@/services/CategoryService";
import TextEditor from "@/components/Text-Editor";

export default {
  components: {
    TextEditor,
  },

  data: () => ({
    rules: {
      short_description: (text) => text.length <= 60 || "Max 60 characters",
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
  },
  methods: {
    async createStory() {
      this.waitBeforeClick = true;
      const areAllFieldsFilledIn = Object.keys(this.story).every(
        (key) => !!this.story[key]
      );
      if (!areAllFieldsFilledIn) {
        this.errors.push("Please fill in all the fields.");
        setTimeout(() => {
          this.errors = [];
          this.waitBeforeClick = false;
        }, 3000);
        return;
      }
      try {
        const userId = this.$route.params.id;
        console.log()
        const response = await StoryService.post(this.story, userId);
        if (response) {
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