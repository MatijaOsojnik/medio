<template>
  <v-app>
    <AdminHeader />
    <v-container fluid>
      <span class="d-block title pa-2">LECTURES</span>

      <v-card>
        <v-card-title>
          All Lectures
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-if="!loading"
          :loading="loading"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="statistics"
          :search="search"
          class="elevation-1"
          item-key="id"
          sort-by="id"
          single-expand
          show-expand
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="700px">
              <v-layout>
                <v-flex xs12 justify="center" align="center">
                  <v-card class="mx-auto">
                    <v-toolbar flat color="#617BE3" dark>
                      <v-toolbar-title>Edit Lecture</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text v-if="lecture">
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
                      <v-scroll-x-transition>
                        <v-alert elevation="2" type="warning" v-if="errors.length">
                          <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                          </ul>
                        </v-alert>
                      </v-scroll-x-transition>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                      <v-btn
                        color="#f4f6ff"
                        :disabled="waitBeforeClick"
                        large
                        @click="updateLecture"
                      >SUBMIT</v-btn>
                      <v-btn
                        color="#ff6363"
                        large
                        :disabled="waitBeforeClick"
                        @click="dialog = false"
                      >CLOSE</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-dialog>
            <v-dialog v-model="deleteDialog" max-width="200px">
             <v-layout>
                <v-flex xs12 justify="center" align="center">
                  <v-card class="mx-auto">
                    <v-card-text v-if="lecture">
                      <span class="font-weight-bold">Are you sure you want to delete this lecture?</span>
                      <v-scroll-x-transition>
                        <v-alert type="success" mode="out-in" v-if="successfulLectureDelete">
                          <span>Lecture deleted</span>
                        </v-alert>
                      </v-scroll-x-transition>
                      <v-scroll-x-transition>
                        <v-alert elevation="2" type="warning" v-if="errors.length">
                          <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                          </ul>
                        </v-alert>
                      </v-scroll-x-transition>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                      <v-btn
                        color="#ff6363"
                        :disabled="waitBeforeClick"
                        @click="deleteLecture"
                      >DELETE</v-btn>
                      <v-spacer/>
                      <v-btn
                        color="#f4f6ff"
                        :disabled="waitBeforeClick"
                        @click="deleteDialog = false"
                      >CLOSE</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-dialog>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editLecture(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteLectureDialog(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td class="pa-6" :colspan="headers.length">
              <div>
                <span class="subtitle-2 d-block">Short Description:</span>
                <span v-html="item.short_description"></span>
              </div>
              <div class="my-2">
                <span class="subtitle-2 d-block">Description:</span>
                <span v-html="item.description"></span>
              </div>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
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
import AdminHeader from "@/components/Header/Admin-Header.vue";

export default {
  components: {
    AdminHeader,
    TiptapVuetify
  },
  data: () => ({
    statistics: null,
    loading: true,
    dialog: false,
    deleteDialog: false,
    lecture: null,
    categories: [],
    errors: [],
    rules: {
      short_description: text => text.length <= 80 || "Max 80 characters",
      file: value =>
        !value ||
        value.size < 2000000 ||
        "Thumbnail size should be less than 2 MB!",
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    },
    successfulLectureUpdate: false,
    successfulLectureDelete: false,
    waitBeforeClick: false,
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
    ],
    search: "",
    headers: [
      {
        text: "ID",
        value: "id"
      },
      {
        text: "Title",
        align: "start",
        value: "title"
      },
      { text: "Creator ID", value: "Users[0].id" },
      { text: "Category", value: "Category.name" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  created() {
    this.getLectures();
    this.getCategories();
  },
  methods: {
    async getLectures() {
      try {
        const response = await LectureService.index();
        this.statistics = response.data;
        this.loading = false;
      } catch (err) {
        console.log(err);
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
        const response = await LectureService.put(this.lecture);
        if (response) {
          this.successfulLectureUpdate = true;
          setTimeout(() => {
            this.successfulLectureUpdate = false;
            this.waitBeforeClick = false;
            this.dialog = false;
            this.getLectures();
          }, 3000);
        }
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    editLecture(lecture) {
      this.lecture = lecture;
      this.dialog = true;
    },
    deleteLectureDialog(lecture) {
      this.lecture = lecture;
      this.deleteDialog = true
      // await LectureService.delete(lectureId), this.$router.go();       
    },
    async deleteLecture() {
      this.waitBeforeClick = true;
      try {
        await LectureService.delete(this.lecture.id)
        .then(() => {
          this.successfulLectureDelete = true;
          setTimeout(() => {
            this.successfulLectureDelete = false;
            this.waitBeforeClick = false;
            this.deleteDialog = false;
            this.getLectures();
          }, 3000);
        })
        .catch((err) => console.log(err))
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.errors = []), 5000);
      }
    }
  }
};
</script>

<style>
</style>