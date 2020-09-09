<template>
  <v-app>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="ma-12 mx-auto" max-width="1000px">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>Edit Lecture</v-toolbar-title>
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
                label="Enter a title for your lecture"
                maxlength="30"
                counter
                :rules="[rules.min]"
                solo
                aria-autocomplete="false"
                v-model="lecture.title"
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
                hint="This description will be used on the Lecture card before the user clicks on it."
                aria-autocomplete="false"
                v-model="lecture.short_description"
              />
              <label for="description">Description</label>
              <div style="margin: 0.5rem 0 2rem">
                <tiptap-vuetify
                  id="description"
                  v-model="lecture.description"
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
                v-model="lecture.thumbnail_url"
              />

              <label for="category">Category</label>
              <v-select
                id="category"
                :items="categories"
                label="Select Category"
                v-model="lecture.category_id"
                item-text="name"
                item-value="id"
                solo
              ></v-select>

            </v-form>
            <v-scroll-x-transition>
              <v-alert type="success" mode="out-in" v-if="successfulLectureUpdate">
                <span>You successfuly updated a lecture</span>
              </v-alert>
            </v-scroll-x-transition>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn
              color="#f0f0f0"
              :disabled="waitBeforeClick"
              block
              large
              @click="updateLecture"
            >SUBMIT</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import LectureService from "@/services/LectureService";
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
    lecture: {
      title: ``,
      short_description: ``,
      description: `<p>Write your description here.</p>`,
      thumbnail_url: ``,
      category_id: ``,
      user_id: null
    },
    successfulLectureUpdate: false,
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
    this.getLecture();
    this.getCategories();
    this.lecture.user_id = this.$route.params.id;
  },
  methods: {
    async updateLecture() {
      this.waitBeforeClick = true;
      const areAllFieldsFilledIn = Object.keys(this.lecture).every(
        key => !!this.lecture[key]
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
        const lectureId = this.$route.params.id;
        const response = await LectureService.put(this.lecture);
        if (response) {
          this.successfulLectureUpdate = true;
          setTimeout(() => {
            this.successfulLectureUpdate = false;
            this.waitBeforeClick = false;
            this.$router.push({
              name: "lecture",
              params: {
                id: lectureId
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
    async getLecture() {
      try {
        const lectureId = this.$route.params.id;
        const response = await LectureService.show(lectureId);
        if (response.data === undefined || !response.data) {
          this.$router.push({
            name: "lectures"
          });
        } else {
          if (this.$store.state.user) {
            if (response.data.Users[0].id === this.$store.state.user.id) {
              this.isOwner = true;
              this.lecture = response.data;
            } else {
              this.$router.push({
                name: "lectures"
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