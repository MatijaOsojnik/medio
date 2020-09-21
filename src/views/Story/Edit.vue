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
            <v-form lazy-validation>
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
              <label for="description">Description</label>
              <div style="margin: 0.5rem 0 2rem">
                <tiptap-vuetify
                  id="description"
                  v-model="story.description"
                  :rules="[rules.description]"
                  placeholder="Write your description here."
                  maxlength="300"
                  :extensions="extensions"
                />
              </div>

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
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  HardBreak,
  History
} from "tiptap-vuetify";

export default {
  components: {
    TiptapVuetify
  },

  data: () => ({
    rules: {
      short_description: text => text.length <= 80 || "Max 80 characters",
      file: value =>
        !value ||
        value.size < 2000000 ||
        "Thumbnail size should be less than 2 MB!",
      required: value => !!value || "Required.",
            min: v => v.length >= 8 || "Min 8 characters"
    },
    story: {
      title: ``,
      short_description: ``,
      description: `<p>Write your description here.</p>`,
      thumbnail_url: ``,
      category_id: ``,
      user_id: null
    },
    successfulStoryUpdate: false,
    waitBeforeClick: false,
    isOwner: false,
    errors: [],
    categories: [],
    extensions: [
      History,
      Bold,
      Italic,
      Link,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      Paragraph,
      HardBreak
    ]
  }),
  created() {
    this.getStory();
    this.getCategories();
    this.story.user_id = this.$route.params.id;
  },
  methods: {
    async updateStory() {
      this.waitBeforeClick = true;
      const areAllFieldsFilledIn = Object.keys(this.story).every(
        key => !!this.story[key]
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
        const storyId = this.$route.params.id;
        const response = await StoryService.put(this.story);
        if (response) {
          this.successfulStoryUpdate = true;
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
      } catch (err) {
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