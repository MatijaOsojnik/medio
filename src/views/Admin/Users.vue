<template>
  <v-app>
    <AdminHeader />
    <v-container fluid>
      <span class="d-block title pa-2">USERS</span>

      <v-card>
        <v-card-title>
          All Users
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
            <v-dialog v-model="dialog" max-height="500px">
              <v-card height="830px" v-if="user" class="mx-auto">
                <v-toolbar flat color="#617BE3" dark>
                  <v-toolbar-title>User Profile</v-toolbar-title>
                </v-toolbar>
                <v-tabs vertical color="#617BE3">
                  <v-tab>
                    <v-icon left>mdi-account-cog</v-icon>Personal Info
                  </v-tab>
                  <v-tab>
                    <v-icon left>mdi-tooltip-account</v-icon>Social Accounts
                  </v-tab>
                  <v-divider />
                  <v-tab>
                    <v-icon left>mdi-account-circle</v-icon>Avatar
                  </v-tab>
                  <v-divider />
                  <v-tab>
                    <v-icon left>mdi-email</v-icon>Email
                  </v-tab>
                  <v-divider />
                  <v-tab>
                    <v-icon left>mdi-card-account-details</v-icon>Roles
                  </v-tab>
                  <v-tab-item>
                    <v-card flat class="mx-4">
                      <v-card-text>
                        <v-scroll-x-transition>
                          <v-alert elevation="2" type="warning" v-if="errors.length">
                            <ul>
                              <li v-for="error in errors" :key="error">{{ error }}</li>
                            </ul>
                          </v-alert>
                        </v-scroll-x-transition>
                        <v-form lazy-validation autocomplete="off">
                          <label for="displayName">Display Name</label>
                          <v-text-field
                            id="displayName"
                            class="mt-2"
                            prepend-icon="mdi-account-outline"
                            solo
                            v-model="user.display_name"
                          ></v-text-field>
                          <label for="title">Title</label>
                          <v-text-field
                            id="title"
                            class="mt-2"
                            prepend-icon="mdi-badge-account-horizontal-outline"
                            solo
                            placeholder="Enter Your Title"
                            v-model="user.title"
                          ></v-text-field>
                          <label for="description">Description</label>
                          <div style="margin: 0.5rem 0 2rem">
                            <tiptap-vuetify
                              id="description"
                              placeholder="Write something about yourself here."
                              :extensions="extensions"
                              v-model="user.description"
                            />
                          </div>
                          <label for="phoneNum">Phone Number</label>
                          <v-text-field
                            id="phoneNum"
                            class="mt-2"
                            prepend-icon="mdi-phone"
                            solo
                            placeholder="Enter Your Phone Number"
                            v-model="user.phone_num"
                          ></v-text-field>
                          <label for="date">Birth Date</label>
                          <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="date"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                id="date"
                                solo
                                v-model="date"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                placeholder="Enter Your Birth Date"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                              <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                            </v-date-picker>
                          </v-dialog>
                          <v-scroll-x-transition>
                            <v-alert type="success" mode="out-in" v-if="successfulInfoUpdate">
                              <span>You successfuly changed your information.</span>
                            </v-alert>
                          </v-scroll-x-transition>
                          <v-card-actions class="pa-4">
                            <v-btn
                              color="#f4f6ff"
                              :disabled="waitBeforeClick"
                              large
                              @click="updateInfo"
                            >SUBMIT</v-btn>
                            <v-btn
                              color="#ff6363"
                              large
                              :disabled="waitBeforeClick"
                              @click="dialog = false"
                            >CLOSE</v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat class="mx-4">
                      <v-card-text>
                        <v-scroll-x-transition>
                          <v-alert elevation="2" type="warning" v-if="errors.length">
                            <ul>
                              <li v-for="error in errors" :key="error">{{ error }}</li>
                            </ul>
                          </v-alert>
                        </v-scroll-x-transition>
                        <v-form lazy-validation autocomplete="off">
                          <label for="facebook">Facebook</label>
                          <v-text-field
                            id="facebook"
                            class="mt-2"
                            prepend-icon="mdi-facebook"
                            solo
                            placeholder="Facebook URL"
                            v-model="user.facebook_url"
                          ></v-text-field>

                          <label for="instagram">Instagram</label>
                          <v-text-field
                            id="instagram"
                            class="mt-2"
                            prepend-icon="mdi-instagram"
                            solo
                            placeholder="Instagram URL"
                            v-model="user.instagram_url"
                          ></v-text-field>

                          <label for="linkedin">LinkedIn</label>
                          <v-text-field
                            id="linkedin"
                            class="mt-2"
                            prepend-icon="mdi-linkedin"
                            solo
                            placeholder="LinkedIn URL"
                            v-model="user.linkedin_url"
                          ></v-text-field>

                          <label for="twitter">Twitter</label>
                          <v-text-field
                            id="twitter"
                            class="mt-2"
                            prepend-icon="mdi-twitter"
                            solo
                            placeholder="Twitter URL"
                            v-model="user.twitter_url"
                          ></v-text-field>
                          <v-scroll-x-transition>
                            <v-alert type="success" mode="out-in" v-if="successfulSocialUpdate">
                              <span>You successfuly update your social links.</span>
                            </v-alert>
                          </v-scroll-x-transition>

                          <v-card-actions class="pa-4">
                            <v-btn
                              color="#f4f6ff"
                              :disabled="waitBeforeClick"
                              large
                              @click="updateSocial"
                            >SUBMIT</v-btn>
                            <v-btn
                              color="#ff6363"
                              large
                              :disabled="waitBeforeClick"
                              @click="dialog = false"
                            >CLOSE</v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat class="mx-4">
                      <v-card-text>
                        <v-scroll-x-transition>
                          <v-alert elevation="2" type="warning" v-if="errors.length">
                            <ul>
                              <li v-for="error in errors" :key="error">{{ error }}</li>
                            </ul>
                          </v-alert>
                        </v-scroll-x-transition>
                        <v-form enctype="multipart/form-data" autocomplete="off">
                          <label for="avatar">Avatar</label>
                          <v-file-input
                            :rules="rules.avatarRules"
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Pick an avatar"
                            prepend-icon="mdi-camera"
                            label="Avatar"
                            solo
                            :loading="uploading"
                            v-model="file"
                          ></v-file-input>
                          <v-scroll-x-transition>
                            <v-alert type="success" mode="out-in" v-if="uploadedFile">
                              <span>You successfuly changed your avatar.</span>
                            </v-alert>
                            <!-- <v-container fluid>
                    <img :src="'http://localhost:8082' + uploadedFile"/>
                            </v-container>-->
                          </v-scroll-x-transition>

                          <v-card-actions class="pa-4">
                            <v-btn
                              color="#f4f6ff"
                              :disabled="waitBeforeClick"
                              large
                              @click="submitAvatar"
                            >SUBMIT</v-btn>
                            <v-btn
                              color="#ff6363"
                              large
                              :disabled="waitBeforeClick"
                              @click="dialog = false"
                            >CLOSE</v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat class="mx-4">
                      <v-card-text>
                        <v-scroll-x-transition>
                          <v-alert elevation="2" type="warning" v-if="errors.length">
                            <ul>
                              <li v-for="error in errors" :key="error">{{ error }}</li>
                            </ul>
                          </v-alert>
                        </v-scroll-x-transition>
                        <v-form lazy-validation autocomplete="off">
                          <label for="email">Email</label>
                          <v-text-field
                            id="email"
                            class="mt-2"
                            prepend-icon="mdi-email"
                            solo
                            v-model="user.email"
                          ></v-text-field>
                          <v-scroll-x-transition>
                            <v-alert type="success" mode="out-in" v-if="successfulEmailUpdate">
                              <span>You successfuly changed your email.</span>
                            </v-alert>
                          </v-scroll-x-transition>
                          <v-card-actions class="pa-4">
                            <v-btn
                              color="#f4f6ff"
                              :disabled="waitBeforeClick"
                              large
                              @click="updateEmail"
                            >SUBMIT</v-btn>
                            <v-btn
                              color="#ff6363"
                              large
                              :disabled="waitBeforeClick"
                              @click="dialog = false"
                            >CLOSE</v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat class="mx-4">
                      <v-card-text>
                        <v-scroll-x-transition>
                          <v-alert elevation="2" type="warning" v-if="errors.length">
                            <ul>
                              <li v-for="error in errors" :key="error">{{ error }}</li>
                            </ul>
                          </v-alert>
                        </v-scroll-x-transition>
                        <v-form lazy-validation autocomplete="off">
                          <label for="email">Roles</label>
                          <v-checkbox v-model="selectedRoles" label="Lecturer" value="Lecturer"></v-checkbox>
                          <v-checkbox v-model="selectedRoles" label="Moderator" value="Moderator"></v-checkbox>
                          <v-checkbox v-model="selectedRoles" label="Admin" value="Admin"></v-checkbox>
                          <v-scroll-x-transition>
                            <v-alert type="success" mode="out-in" v-if="successfulRoleUpdate">
                              <span>You successfuly updated selected user roles.</span>
                            </v-alert>
                          </v-scroll-x-transition>
                          <v-card-actions class="pa-4">
                            <v-btn
                              color="#f4f6ff"
                              :disabled="waitBeforeClick"
                              large
                              @click="updateRoles"
                            >SUBMIT</v-btn>
                            <v-btn
                              color="#ff6363"
                              large
                              :disabled="waitBeforeClick"
                              @click="dialog = false"
                            >CLOSE</v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-dialog>
            <v-dialog v-model="deleteDialog" max-width="200px">
              <v-layout>
                <v-flex xs12 justify="center" align="center">
                  <v-card class="mx-auto">
                    <v-card-text v-if="user">
                      <span class="font-weight-bold">Are you sure you want to delete this user?</span>
                      <v-scroll-x-transition>
                        <v-alert type="success" mode="out-in" v-if="successfulUserDelete">
                          <span>User deleted</span>
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
                      <v-btn color="#ff6363" :disabled="waitBeforeClick" @click="deleteUser">DELETE</v-btn>
                      <v-spacer />
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
            <v-icon small class="mr-2" @click="editUser(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteUserDialog(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import UserService from "@/services/UserService";
import AdminHeader from "@/components/Header/Admin-Header.vue";
import FileService from "@/services/FileService.js";
import {
  TiptapVuetify,
  Bold,
  Italic,
  Paragraph,
  HardBreak,
  History
} from "tiptap-vuetify";

export default {
  components: {
    AdminHeader,
    TiptapVuetify
  },
  data: () => ({
    selectedRoles: [],
    rules: {
      avatarRules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      passwordRules: [],
      description: text => text.length <= 300 || "Max 300 characters"
    },
    user: {
      display_name: ``,
      email: ``,
      phone_num: ``,
      date_birth: null
    },
    extensions: [Bold, Italic, Paragraph, History, HardBreak],
    date: new Date("December 31, 2002 00:00:00").toISOString().substr(0, 10),
    file: null,
    uploadedFile: null,
    uploading: false,
    successfulInfoUpdate: false,
    successfulSocialUpdate: false,
    successfulEmailUpdate: false,
    successfulRoleUpdate: false,
    modal: false,
    errors: [],
    statistics: {
      roles: null
    },
    loading: true,
    search: "",
    dialog: false,
    deleteDialog: false,
    successfulUserUpdate: false,
    successfulUserDelete: false,
    waitBeforeClick: false,
    userRoles: null,
    headers: [
      {
        text: "ID",
        value: "id"
      },
      {
        text: "Display Name",
        align: "start",
        value: "display_name"
      },
      { text: "Email", value: "email" },
      { text: "Role", value: "Roles[0].name" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await UserService.allUserInfo();
        this.statistics = response.data;
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async submitAvatar() {
      this.uploading = true;
      this.waitBeforeClick = true;
      const userId = this.user.id;
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        const res = await FileService.index(userId, formData);
        this.uploadedFile = res.data.file;
        if (res) {
          this.uploading = false;
          this.successfulAvatarUpdate = true;
          setTimeout(() => {
            this.uploadedFile = null;
            this.waitBeforeClick = false;
            this.getUsers();
          }, 5000);
        } else {
          this.uploading = false;
          this.errors.push(`Avatar post failed`);
          setTimeout(() => {
            this.errors = [];
            this.waitBeforeClick = false;
          }, 5000);
        }
      } catch (err) {
        this.uploading = false;
        this.errors = err.response.data;
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async updateInfo() {
      try {
        this.waitBeforeClick = true;
        const userId = this.user.id;
        this.user.birth_date = this.date;
        const response = await UserService.put(userId, {
          display_name: this.user.display_name,
          title: this.user.title,
          description: this.user.description,
          phone_num: this.user.phone_num,
          birth_date: this.user.birth_date
        });
        if (response) {
          this.successfulInfoUpdate = true;
          setTimeout(() => {
            this.successfulInfoUpdate = false;
            this.waitBeforeClick = false;
          }, 4000);
          this.date = this.user.birth_date;
          this.getUsers();
        }
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => {
          this.errors = [];
          this.waitBeforeClick = false;
        }, 5000);
      }
    },
    async updateSocial() {
      try {
        this.waitBeforeClick = true;
        const userId = this.user.id;
        const response = await UserService.put(userId, {
          facebook_url: this.user.facebook_url,
          instagram_url: this.user.instagram_url,
          twitter_url: this.user.twitter_url,
          linkedin_url: this.user.linkedin_url
        });
        if (response) {
          this.successfulSocialUpdate = true;
          setTimeout(() => {
            this.successfulSocialUpdate = false;
            this.waitBeforeClick = false;
            this.getUsers();
          }, 4000);
        }
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => {
          this.errors = [];
          this.waitBeforeClick = false;
        }, 5000);
      }
    },
    async updateEmail() {
      try {
        this.waitBeforeClick = true;
        const userId = this.user.id;
        const response = await UserService.put(userId, {
          email: this.user.email
        });
        if (response) {
          this.successfulEmailUpdate = true;
          setTimeout(() => {
            this.successfulEmailUpdate = false;
            this.waitBeforeClick = false;
            this.getUsers();
          }, 4000);
        } else {
          setTimeout(() => (this.waitBeforeClick = false), 4000);
        }
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => {
          this.errors = [];
          this.waitBeforeClick = false;
        }, 5000);
      }
    },
    async updateRoles() {
      try {
        this.waitBeforeClick = true;
        const userId = this.user.id;
        const response = await UserService.put(userId, {
          roles: this.selectedRoles
        });
        if (response) {
          this.successfulRoleUpdate = true;
          setTimeout(() => {
            this.successfulRoleUpdate = false;
            this.waitBeforeClick = false;
            this.getUsers();
          }, 4000);
        }
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => {
          this.errors = [];
          this.waitBeforeClick = false;
        }, 5000);
      }
    },
    editUser(user) {
      this.user = user;
      this.selectedRoles = user.Roles.map(value => value.name);
      this.dialog = true;
    },
    deleteUserDialog(user) {
      this.user = user;
      this.deleteDialog = true;
    },
    async deleteUser() {
      this.waitBeforeClick = true;
      try {
        await UserService.delete(this.user.id)
          .then(() => {
            this.successfulUserDelete = true;
            setTimeout(() => {
              this.successfulUserDelete = false;
              this.waitBeforeClick = false;
              this.deleteDialog = false;
              this.$store.dispatch("setToken", null);
              this.$store.dispatch("setUser", null);
              this.$store.dispatch("setAuthorities", null);
              this.getUsers();
            }, 3000);
          })
          .catch(err => console.log(err));
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