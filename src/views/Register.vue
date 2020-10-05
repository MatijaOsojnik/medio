<template>
  <div>
    <v-overlay v-if="showPanel" absolute z-index="999" :opacity="0.1">
      <v-progress-circular
        indeterminate
        color="green"
        :size="50"
        :width="5"
        v-if="!loginSuccess"
      />
      <v-scroll-x-transition>
        <v-alert type="success" v-if="loginSuccess"
          >Registration successful!</v-alert
        >
      </v-scroll-x-transition>
    </v-overlay>
    <AuthenticationPanel
      authenticationTypeText="Sign up to Medio"
      route-name="login"
      link-name="Sign in"
    >
      <v-scroll-x-transition>
        <v-alert elevation="2" type="warning" v-if="errors.length">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </v-alert>
      </v-scroll-x-transition>
      <form @submit.prevent="handleSubmit" autocomplete="off">
        <div>
          <v-text-field
            label="Display Name"
            v-model="display_name"
            prepend-inner-icon="mdi-account-outline"
          />
        </div>
        <div>
          <v-text-field
            label="E-mail"
            v-model="email"
            prepend-inner-icon="mdi-email-outline"
          />
        </div>
        <div>
          <v-text-field
            type="password"
            autocomplete="new-password"
            label="Password"
            v-model="password"
            prepend-inner-icon="mdi-lock-outline"
          />
        </div>
        <div>
          <v-text-field
            type="password"
            label="Repeat Password"
            v-model="repeat_password"
            prepend-inner-icon="mdi-lock-outline"
          />
        </div>
      </form>
      <v-btn
        color="primary"
        class="submit-btn"
        max-width="60%"
        @click="register"
        >Register</v-btn
      >
      <span class="d-block ma-3 mb-4 align-center">Or sign up with</span>
      <div class="flex align-center justify-center mx-4">
        <div class="align-center">
          <GoogleLogin
            :params="params"
            :renderParams="renderParams"
            :onSuccess="googleAuth"
            :onFailure="onFailure"
          />
          <v-btn @click="facebookAuth" color="#5890FF" dark width="240px" height="50px" class="my-3"><v-icon class="pa-3">{{'mdi-facebook'}}</v-icon> FACEBOOK LOGIN </v-btn>
        </div>
      </div>
    </AuthenticationPanel>
  </div>
</template>

<script>
import AuthenticationPanel from "@/components/Authentication-Panel/Authentication-Panel";
import AuthenticationService from "@/services/AuthenticationService";
import GoogleLogin from "vue-google-login";
export default {
  components: {
    AuthenticationPanel,
    GoogleLogin,
  },
  data: () => ({
    display_name: "",
    email: "",
    password: "",
    repeat_password: "",
    registerSuccess: false,
    showPanel: false,
    params: {
      client_id: process.env.VUE_APP_GOOGLE_API_KEY,
    },
    renderParams: {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
    },
    // showPassword: false,
    // showRepeatPassword: false,
    errors: [],
  }),
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          display_name: this.display_name,
          email: this.email,
          password: this.password,
          repeat_password: this.repeat_password,
        });
        this.showPanel = true;

        setTimeout(() => {
          this.loginSuccess = true;
        }, 1500);

        if (response) {
          setTimeout(() => {
            this.$store.dispatch("setToken", response.data.token);
            this.$store.dispatch("setUser", response.data.user);
            this.$store.dispatch("setAuthorities", response.data.authorities);
            this.loginSuccess = false;
            this.showPanel = false;
            this.$router.push({ name: "stories" });
          }, 2500);
        }
      } catch (error) {
        this.errors = error.response.data;
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async googleAuth(googleUser) {
      try {
        const response = await AuthenticationService.googleAuth(
          googleUser.getBasicProfile()
        );

        this.showPanel = true;

        setTimeout(() => {
          this.loginSuccess = true;
        }, 1500);

        if (response) {
          setTimeout(() => {
            this.$store.dispatch("setToken", response.data.token);
            this.$store.dispatch("setUser", response.data.user);
            this.$store.dispatch("setAuthorities", response.data.authorities);
            this.loginSuccess = false;
            this.showPanel = false;
            this.$router.push({ name: "stories" });
          }, 2500);
        }
      } catch (error) {
        this.error = error.response.data.error;
        setTimeout(() => (this.error = null), 5000);
      }
    },
    async facebookAuth() {
      try {
        window.FB.login((response) => {
          window.ujwts = response.authResponse.accessToken;
        });
        const access_token = window.ujwts;
        const response = await AuthenticationService.facebookAuth(access_token);
        this.showPanel = true;

        setTimeout(() => {
          this.loginSuccess = true;
        }, 1500);

        if (response) {
          setTimeout(() => {
            this.$store.dispatch("setToken", response.data.token);
            this.$store.dispatch("setUser", response.data.user);
            this.$store.dispatch("setAuthorities", response.data.authorities);
            this.loginSuccess = false;
            this.showPanel = false;
            this.$router.push({ name: "stories" });
          }, 2500);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onFailure() {
      this.error = `Google Authentication failed.`;
      setTimeout(() => (this.error = null), 2000);
    },
  },
};
</script>

<style scoped>
div {
  font-family: "Roboto";
}
ul,
li {
  text-align: left;
}
/* .image-background {
  height: 100vh;
  background: url("../assets/social-ideas.svg");
  background-size: cover;
} */
.row-container {
  height: 100vh;
}
.background-image {
  max-width: 80%;
}
.image-container {
  background-color: #f9f9f9;
}
.form-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.form-input-container {
  display: flex;
  justify-content: center;
  width: 60%;
}
.brand {
  color: black;
  font-weight: 900;
  font-size: 40px;
  font-family: "Patrick Hand SC", cursive;
}
.sign-in-brand {
  font-size: 23px;
  font-weight: 600;
  color: black;
}
.submit-btn {
  color: white;
  margin: 10px 0;
}
.sign-in-container {
  margin: 1.5rem 0;
}
.sign-in-text {
  display: inline-block;
}
.sign-in-link {
  display: inline-block;
  font-weight: bold;
  text-decoration: none;
}
</style>