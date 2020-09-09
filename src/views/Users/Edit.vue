<template>
  <div>
    <!-- <v-row>
    <v-col class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">-->
    <v-card height="830px" max-height="1000px" max-width="1000px" class="mx-auto my-6">
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
          <v-icon left>mdi-shield-lock</v-icon>Password
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
                <v-btn solo :disabled="waitBeforeClick" @click="updateInfo">SUBMIT</v-btn>
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

                <v-btn solo :disabled="waitBeforeClick" @click="updateSocial">SUBMIT</v-btn>
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

                <v-btn solo :disabled="waitBeforeClick" @click="submitAvatar">SUBMIT</v-btn>
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
                <v-btn solo :disabled="waitBeforeClick" @click="updateEmail">SUBMIT</v-btn>
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
                <label for="password">Password</label>
                <v-text-field
                  id="password"
                  class="mt-2"
                  type="password"
                  placeholder="Enter New Password Here"
                  prepend-icon="mdi-lock-outline"
                  solo
                  v-model="newPassword"
                  autocomplete="off"
                ></v-text-field>
                <label for="repeatPassword">Repeat Password</label>
                <v-text-field
                  id="repeatPassword"
                  class="mt-2"
                  solo
                  placeholder="Re-enter New Password"
                  type="password"
                  prepend-icon="mdi-lock-outline"
                  v-model="repeatPassword"
                  autocomplete="off"
                ></v-text-field>
                <v-scroll-x-transition>
                  <v-alert type="success" mode="out-in" v-if="successfulPasswordUpdate">
                    <span>You successfuly changed your password.</span>
                  </v-alert>
                </v-scroll-x-transition>
                <v-btn solo :disabled="waitBeforeClick" @click="updatePassword">SUBMIT</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";
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
    TiptapVuetify
  },
  data: () => ({
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
    modal: false,
    newPassword: ``,
    repeatPassword: ``,
    uploadedFile: null,
    uploading: false,
    successfulInfoUpdate: false,
    successfulSocialUpdate: false,
    successfulEmailUpdate: false,
    successfulPasswordUpdate: false,
    waitBeforeClick: false,
    errors: []
  }),
  created() {
    this.getUser();
  },
  methods: {
    async submitAvatar() {
      this.uploading = true;
      const userId = this.user.id;
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        const res = await FileService.index(userId, formData);
        this.uploadedFile = res.data.file;
        this.uploading = false;
        setTimeout(() => (this.uploadedFile = null), 5000);
        this.getUser();
      } catch (err) {
        this.uploading = false;
        this.errors.push(err.response.data.error);
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
        }
        this.getUser();
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.errors = []), 5000);
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
          }, 4000);
        }
        this.getUser();
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.errors = []), 5000);
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
          }, 4000);
        }
        this.getUser();
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async updatePassword() {
      try {
        this.waitBeforeClick = true;
        const userId = this.user.id;
        const response = await UserService.put(userId, {
          password: this.newPassword,
          repeat_password: this.repeatPassword
        });
        if (response) {
          this.successfulPasswordUpdate = true;
          setTimeout(() => {
            this.successfulPasswordUpdate = false;
            this.waitBeforeClick = false;
          }, 4000);
        }
        this.newPassword = "";
        this.repeatPassword = "";
        this.getUser();
      } catch (err) {
        this.errors = err.response.data;
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async getUser() {
      try {
        const userId = this.$route.params.id;
        if (userId == this.$store.state.user.id) {
          const response = await UserService.show(userId);
          if (response.data.birth_date) {
            this.date = response.data.birth_date.substr(0, 10);
          }
          this.user = response.data;
          this.$store.dispatch("setUser", this.user);
        } else {
          this.$router.push({
            name: "lectures"
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>