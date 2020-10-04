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
        <v-alert type="success" v-if="loginSuccess">Login successful!</v-alert>
      </v-scroll-x-transition>
    </v-overlay>
    <AuthenticationPanel
      authenticationTypeText="Sign in to Medio"
      route-name="register"
      link-name="Sign up"
    >
      <v-scroll-x-transition>
        <v-alert type="warning" elevation="2" v-if="error">
          <ul>
            <li :error="error">{{ error }}</li>
          </ul>
        </v-alert>
      </v-scroll-x-transition>
      <form @submit.prevent="handleSubmit">
        <div>
          <v-text-field
            label="E-mail"
            v-model="email"
            prepend-inner-icon="mdi-email-outline"
          />
        </div>
        <div>
          <v-text-field
            label="Password"
            v-model="password"
            prepend-inner-icon="mdi-lock-outline"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
          />
        </div>
      </form>
      <v-btn color="primary" class="submit-btn" max-width="60%" @click="login"
        >Login</v-btn
      >

      <span class="d-block ma-3 mb-4 align-center">Or sign in with</span>
      <div class="flex align-center justify-center mx-4">
        <div class="align-center">
          <GoogleLogin
            :params="params"
            :renderParams="renderParams"
            :onSuccess="googleAuth"
            :onFailure="onFailure"
          />
          <v-btn @click="facebookAuth"> FACEBOOK LOGIN </v-btn>
        </div>
      </div>
      <!-- <v-btn class="mx-4" icon color="blue" :href="facebookLoginUrl">
        <v-icon size="42px">mdi-facebook</v-icon>
      </v-btn> -->
    </AuthenticationPanel>
  </div>
</template>

<script>
import AuthenticationPanel from "@/components/Authentication-Panel/Authentication-Panel";
import AuthenticationService from "@/services/AuthenticationService";
import GoogleLogin from "vue-google-login";
import axios from "axios";

export default {
  components: {
    AuthenticationPanel,
    GoogleLogin,
  },
  data: () => ({
    email: "",
    password: "",
    loginSuccess: false,
    showPanel: false,
    showPassword: false,
    error: null,
    facebookLoginUrl: "",
    facebookAppId: process.env.VUE_APP_FACEBOOK_API_KEY,
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
  }),
  mounted() {},
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });

        this.showPanel = true;

        setTimeout(() => {
          this.loginSuccess = true;
        }, 1500);

        setTimeout(() => {
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setUser", response.data.user);
          this.$store.dispatch("setAuthorities", response.data.authorities);
          this.loginSuccess = false;
          this.showPanel = false;
          this.$router.push({ name: "stories" });
        }, 2500);
      } catch (error) {
        this.error = error.response.data.error;
        setTimeout(() => (this.error = null), 5000);
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
      window.FB.login(
        function (response) {
          const token = response.authResponse.accessToken;
          async function getFacebookUserData(access_token) {
      const { data } = await axios({
        url: "https://graph.facebook.com/me",
        method: "get",
        params: {
          fields: ["id", "email", "first_name", "last_name", "picture"].join(","),
          access_token: access_token,
        },
      });
      
      try {
        const response = await AuthenticationService.facebookAuth(
          data
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
    }
    getFacebookUserData(token);
        },
        { scope: "public_profile,email" }
      );
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
.main {
  margin: 0;
  padding: 0;
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
  background-color: #ededed;
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
.error {
  color: red;
}
</style>