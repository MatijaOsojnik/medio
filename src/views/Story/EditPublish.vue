<template>
  <v-app>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="ma-12 mx-auto" max-width="1000px">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>Edit Story</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-scroll-x-transition>
              <v-alert elevation="2" type="warning" v-if="errors.length">
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </v-alert>
            </v-scroll-x-transition>
            <v-form enctype="multipart/form-data" lazy-validation>
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
              <!-- <label for="description">Description</label>
              <div style="margin: 0.5rem 0 2rem">
                <tiptap-vuetify
                  id="description"
                  v-model="story.description"
                  :rules="[rules.description]"
                  placeholder="Write your description here."
                  maxlength="300"
                  :extensions="extensions"
                />
              </div> -->

              <label for="avatar">Thumbnail</label>
              <v-file-input
                :rules="rules.file"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an image"
                prepend-icon="mdi-camera"
                label="Story thumbnail"
                solo
                v-model="file"
              ></v-file-input>

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
              <v-alert type="success" mode="out-in" v-if="successfulStoryUpdate">
                <span>You successfuly updated a story</span>
              </v-alert>
            </v-scroll-x-transition>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn
              color="#f0f0f0"
              :disabled="waitBeforeClick"
              block
              large
              @click="updateStory"
            >SUBMIT</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import StoryService from "@/services/StoryService";
import CategoryService from "@/services/CategoryService";

export default {
  components: {
    
  },

  data: () => ({
    rules: {
      short_description: (text) => text.length <= 60 || "Max 60 characters",
      description: (text) => text.length <= 300 || "Max 300 characters",
      file: [
        (value) =>
          !value ||
          value.size < 5000000 ||
          "Thumbnail size should be less than 5 MB!",
      ],
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    story: {
      title: ``,
      short_description: ``,
      description: ``,
      thumbnail_url: ``,
      category_id: ``,
    },
    file: null,
    successfulStoryUpdate: false,
    waitBeforeClick: false,
    isOwner: false,
    errors: [],
    categories: [],
  }),
  created() {
    this.getStory();
    this.getCategories();
    this.fillStoryData();
  },
  methods: {
    async updateStory() {
      this.waitBeforeClick = true;
      try {
        const formData = new FormData();
        formData.append("file", this.file);
        const userId = this.$store.state.user.id;

        const uploadResponse = await StoryService.imageUpload(userId, formData)

        if(uploadResponse) {
          const storyId = this.$route.params.id;
          this.story.thumbnail_url = uploadResponse.data.file
          const response = await StoryService.put(this.story);
          if (response) {
            this.successfulStoryUpdate = true;
            this.$store.dispatch("setUpdatedStoryJSON", null);
            this.$store.dispatch("setUpdatedStoryHTML", '');
            setTimeout(() => {
              this.successfulStoryUpdate = false;
              this.waitBeforeClick = false;
              this.$router.push({
                name: "story",
                params: {
                  id: storyId
                }
              });
            }, 3000);
          }
        }

      } catch (err) {
        console.log(err)
        this.errors = err.response.data;
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async getCategories() {
      try {
        const response = await CategoryService.index();
        response.data.map(category => {
          this.categories.push({ name: category.name, id: category.id });
        });
      } catch (err) {
        this.error = err.response.data;
      }
    },
    async getStory() {
      try {
        const storyId = this.$route.params.id;
        const response = await StoryService.show(storyId);
        if (response.data === undefined || !response.data) {
          this.$router.push({
            name: "stories"
          });
        } else {
          if (this.$store.state.user) {
            if (response.data.Users[0].id === this.$store.state.user.id) {
              this.isOwner = true;
              this.story = response.data;
              this.story.description = this.$store.state.updatedStory.HTML;
            } else {
              this.$router.push({
                name: "stories"
              });
            }
          }
        }
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.errors = []), 5000);
      }
    }
  }
};
</script>

<style>
</style>