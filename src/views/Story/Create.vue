<template>
  <div>
    <v-flex xs12 justify="center" align="center">
      
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