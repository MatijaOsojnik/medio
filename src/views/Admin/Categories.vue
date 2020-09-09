<template>
  <v-app>
    <AdminHeader />
    <v-container fluid>
      <span class="d-block title pa-2">CATEGORIES</span>

      <v-card>
        <v-card-title>
          All Categories
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
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="700px">
              <v-layout>
                <v-flex xs12 justify="center" align="center">
                  <v-card class="mx-auto">
                    <v-toolbar flat color="#617BE3" dark>
                      <v-toolbar-title>Edit Category</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text v-if="category">
                      <v-form lazy-validation>
                        <label for="name">Name</label>
                        <v-text-field
                          id="name"
                          label="Enter a category name"
                          maxlength="20"
                          counter
                          solo
                          aria-autocomplete="false"
                          v-model="category.name"
                        />

                        <label for="description">Description</label>
                          <v-textarea
                            id="description"
                            solo
                            label="Enter description"
                            v-model="category.description"
                          ></v-textarea>
                      </v-form>
                      <v-scroll-x-transition>
                        <v-alert type="success" mode="out-in" v-if="successfulCategoryUpdate">
                          <span>You successfuly updated a category</span>
                        </v-alert>
                      </v-scroll-x-transition>
                      <v-scroll-x-transition>
                        <v-alert elevation="2" type="warning" v-if="error">
                          <ul>
                            <li>{{ error }}</li>
                          </ul>
                        </v-alert>
                      </v-scroll-x-transition>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                      <v-btn
                        color="#f4f6ff"
                        :disabled="waitBeforeClick"
                        large
                        @click="updateCategory"
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
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editCategory(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteCategory(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import CategoryService from "@/services/CategoryService";
import AdminHeader from "@/components/Header/Admin-Header.vue";

export default {
  components: {
    AdminHeader
  },
  data: () => ({
    statistics: null,
    loading: true,
    dialog: false,
    category: null,
    error: null,
    successfulCategoryUpdate: false,
    waitBeforeClick: false,
    search: "",
    headers: [
      {
        text: "ID",
        value: "id",
      },
      {
        text: "Name",
        value: "name",
      },
      { text: "Description", value: "description" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  created() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      try {
        const response = await CategoryService.index();
        this.statistics = response.data;
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async updateCategory() {
      this.waitBeforeClick = true;
      const areAllFieldsFilledIn = Object.keys(this.category).every(
        key => !!this.category[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the fields.";
        setTimeout(() => {
          this.error = null;
          this.waitBeforeClick = false;
        }, 3000);
        return;
      }
      try {
        const response = await CategoryService.put(this.category);
        if (response) {
          this.successfulCategoryUpdate = true;
          setTimeout(() => {
            this.successfulCategoryUpdate = false;
            this.waitBeforeClick = false;
            this.dialog = false;
            this.getCategories();
          }, 3000);
        }
      } catch (err) {
        this.error = err.response.data.error;
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.error = null), 5000);
      }
    },
    editCategory(category) {
      this.category = category;
      this.dialog = true;
    },
    async deleteCategory(category) {
      const categoryId = category.id;
      confirm("Are you sure you want to delete this category?") &&
        (await CategoryService.delete(categoryId));
      this.getCategories()
    }
  }
};
</script>

<style>
</style>