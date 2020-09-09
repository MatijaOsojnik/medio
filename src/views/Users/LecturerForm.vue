<template>
  <v-app>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="ma-12 mx-auto" max-width="1000px">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>Become A Lecturer</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-scroll-x-transition>
              <v-alert elevation="2" type="warning" v-if="errors.length">
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </v-alert>
            </v-scroll-x-transition>
            <v-form lazy-validation @submit.prevent="sendEmail">
              <label for="firstName">First Name</label>
              <v-text-field
                id="firstName"
                label="Enter your first name"
                maxlength="20"
                :rules="[rules.min]"
                counter
                solo
                aria-autocomplete="false"
                v-model="user.name"
              />

              <label for="lastName">Last name</label>
              <v-text-field
                id="lastName"
                :rules="[rules.short_description]"
                label="Write your surname here"
                solo
                counter
                maxlength="20"
                aria-autocomplete="false"
                v-model="user.surname"
              />
              <label for="email">Email</label>
              <v-text-field
                id="email"
                type="email"
                label="Enter your email"
                solo
                aria-autocomplete="false"
                v-model="user.email"
              />

              <label for="message">Comment or Message</label>
              <v-text-area
                id="message"
                label="Enter a comment/message"
                solo
                aria-autocomplete="false"
                v-model="user.comment"
              />
            </v-form>
            <!-- <v-scroll-x-transition>
              <v-alert type="success" mode="out-in" v-if="successfulLecturerSubmit">
                <span>You successfuly sent an email</span>
              </v-alert>
            </v-scroll-x-transition>-->
          </v-card-text>
          <v-card-actions>
            <v-btn color="#f0f0f0" block large @click="createLecture">Contact</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>

export default {
  components: {},

  data: () => ({
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
    waitBeforeClick: false,
    successfulLecturePost: false,
    errors: [],
    categories: []
  }),
  mounted() {},
  methods: {
    sendEmail: e => {
        .sendForm(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          e.target,
          "YOUR_USER_ID"
        )
        .then(
          result => {
            console.log("SUCCESS!", result.status, result.text);
          },
          error => {
            console.log("FAILED...", error);
          }
        );
    }
  }
};
</script>

<style>
</style>