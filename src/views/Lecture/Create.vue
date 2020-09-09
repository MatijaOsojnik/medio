<template>
  <v-app>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-stepper v-model="stepper">
          <v-stepper-header>
            <v-stepper-step :complete="stepper> 1" editable step="1">Tips</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="stepper > 2" editable step="2">Exercises</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" editable>General Information</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="ma-12 mx-auto" max-width="1000px">
                <v-toolbar flat color="#617BE3" dark>
                  <v-toolbar-title>Tips</v-toolbar-title>
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
                      label="Enter the title of your tip"
                      maxlength="50"
                      counter
                      solo
                      aria-autocomplete="false"
                      v-model="tip.title"
                    />

                    <label for="description">Description</label>
                    <div style="margin: 0.5rem 0 2rem">
                      <tiptap-vuetify
                        id="description"
                        v-model="tip.content"
                        :rules="[rules.description]"
                        placeholder="Enter the content of your tip"
                        maxlength="300"
                        :extensions="extensions"
                      />
                    </div>
                  </v-form>
                  <div>
                    <v-expansion-panels class="my-5" v-if="lecture.Tips.length">
                      <v-expansion-panel
                        v-for="(tip, index) in lecture.Tips"
                        :key="index"
                        class="my-3"
                      >
                        <v-expansion-panel-header>{{tip.title}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <span class="d-block subtitle">Tip Content:</span>
                          <span v-html="tip.content"></span>
                        </v-expansion-panel-content>
                        <v-btn
                          color="red"
                          @click="removeTip(index)"
                          x-small
                          fab
                          absolute
                          dark
                          bottom
                          left
                        >
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </div>
                  <v-btn color="primary" @click="addTip">ADD ANOTHER TIP</v-btn>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block large @click="stepper = 2">CONTINUE</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="ma-12 mx-auto" max-width="1000px">
                <v-toolbar flat color="#617BE3" dark>
                  <v-toolbar-title>Exercises</v-toolbar-title>
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
                    <label for="englishSentence">English sentence</label>
                    <v-text-field
                      id="englishSentence"
                      label="Type the english sentence"
                      maxlength="120"
                      counter
                      solo
                      aria-autocomplete="false"
                      v-model="sentence.english_sentence"
                    />

                    <label for="sloveneSentence">Slovene sentence</label>
                    <v-text-field
                      id="sloveneSentence"
                      label="Type the slovene sentence"
                      maxlength="120"
                      counter
                      solo
                      aria-autocomplete="false"
                      v-model="sentence.slovene_sentence"
                    />

                    <label for="pronounciationUrl">Slovene Sentence Pronounciation URL</label>
                    <v-text-field
                      id="pronounciationUrl"
                      v-model="sentence.pronounciation_url"
                      placeholder="Type the link here"
                      solo
                    />
                  </v-form>
                  <div>
                    <v-expansion-panels class="my-3" v-if="lecture.Sentences.length">
                      <v-expansion-panel
                        v-for="(sentence, index) in lecture.Sentences"
                        :key="index"
                        class="mb-3"
                      >
                        <v-expansion-panel-header
                          class="font-weight-bold"
                        >{{sentence.english_sentence}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <span class="d-block subtitle font-weight-bold">Slovenian sentence:</span>
                          <span class="d-block pa-2">{{sentence.slovene_sentence}}</span>
                          <span class="d-block subtitle font-weight-bold">pronounciation_url:</span>
                          <span class="d-block pa-2">{{sentence.pronounciation_url}}</span>
                        </v-expansion-panel-content>
                        <v-btn
                          color="red"
                          @click="removeSentence(index)"
                          x-small
                          fab
                          absolute
                          dark
                          bottom
                          left
                        >
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </div>
                  <v-btn color="primary" @click="addSentence">ADD ANOTHER EXERCISE</v-btn>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block large @click="stepper = 3">CONTINUE</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="ma-12 mx-auto" max-width="1000px">
                <v-toolbar flat color="#617BE3" dark>
                  <v-toolbar-title>General Information</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form lazy-validation>
                    <label for="title">Title</label>
                    <v-text-field
                      id="title"
                      label="Enter a title for your lecture"
                      maxlength="30"
                      :rules="[rules.min]"
                      counter
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
                    <v-alert elevation="2" type="warning" v-if="errors.length">
                      <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                      </ul>
                    </v-alert>
                  </v-scroll-x-transition>
                  <v-scroll-x-transition>
                    <v-alert type="success" mode="out-in" v-if="successfulLecturePost">
                      <span>You successfuly posted a lecture</span>
                    </v-alert>
                  </v-scroll-x-transition>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    :disabled="waitBeforeClick"
                    block
                    large
                    @click="createLecture"
                  >COMPLETE</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
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
  HardBreak,
  History,
  Link
} from "tiptap-vuetify";

export default {
  components: {
    TiptapVuetify
  },

  data: () => ({
    stepper: 1,
    steps: 3,
    rules: {
      short_description: text => text.length <= 60 || "Max 60 characters",
      description: text => text.length <= 300 || "Max 300 characters",
      file: value =>
        !value ||
        value.size < 2000000 ||
        "Thumbnail size should be less than 2 MB!",
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    },
    tip: {
      title: ``,
      content: ``
    },
    sentence: {
      english_sentence: ``,
      slovene_sentence: ``,
      pronounciation_url: ``,
      is_sentence: true
    },
    lecture: {
      title: ``,
      short_description: ``,
      description: ``,
      thumbnail_url: ``,
      category_id: ``,
      Sentences: [],
      Tips: []
    },
    waitBeforeClick: false,
    successfulLecturePost: false,
    errors: [],
    categories: [],
    extensions: [
      History,
      Bold,
      Italic,
      ListItem,
      Link,
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
  mounted() {
    this.findCategories();
    this.checkUser();
  },
  methods: {
    addTip() {
      const areAllFieldsFilledIn = Object.keys(this.tip).every(
        key => !!this.tip[key]
      );
      if (!areAllFieldsFilledIn) {
        this.errors.push("Please fill in all the fields.");
        setTimeout(() => {
          this.errors = [];
          this.waitBeforeClick = false;
        }, 3000);
        return;
      }
      this.lecture.Tips.push(this.tip);
      this.tip = {
        title: ``,
        content: ``
      };
    },
    removeTip(index) {
      this.lecture.Tips.splice(index, 1);
    },
    addSentence() {
      const areAllFieldsFilledIn = Object.keys(this.sentence).every(
        key => !!this.sentence[key]
      );
      if (!areAllFieldsFilledIn) {
        this.errors.push("Please fill in all the fields.");
        setTimeout(() => {
          this.errors = [];
          this.waitBeforeClick = false;
        }, 3000);
        return;
      }
      this.lecture.Sentences.push(this.sentence);
      this.sentence = {
        slovene_sentence: ``,
        english_sentence: ``,
        pronounciation_url: ``
      };
    },
    removeSentence(index) {
      this.lecture.Sentences.splice(index, 1);
    },
    async createLecture() {
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
        const userId = this.$route.params.id;
        const response = await LectureService.post(this.lecture, userId);
        if (response) {
          this.successfulLecturePost = true;
          setTimeout(() => {
            this.successfulLecturePost = false;
            this.waitBeforeClick = false;
            this.$router.push({
              name: "lectures"
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

      response.data.map(category => {
        this.categories.push({ name: category.name, id: category.id });
      });
    },
    checkUser() {
      if (this.$store.state.user) {
        if (this.$route.params.id != this.$store.state.user.id) {
          this.$router.push({
            name: "lectures"
          });
        }
      }
    }
  }
};
</script>

<style>
</style>