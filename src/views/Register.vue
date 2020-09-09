<template>
  <div>
    <v-overlay v-if="showPanel" absolute z-index="999" :opacity="0.1">
      <v-progress-circular
        indeterminate
        transition="scroll-x-transition"
        color="green"
        :size="50"
        :width="5"
        v-if="!registerSuccess"
      />
      <v-scroll-x-transition>
        <v-alert
          type="success"
          transition="scroll-x-transition"
          v-if="registerSuccess"
        >Registration successful!</v-alert>
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
          <v-text-field label="E-mail" v-model="email" prepend-inner-icon="mdi-email-outline" />
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
      <v-btn color="primary" class="submit-btn" max-width="60%" @click="register">Register</v-btn>
    </AuthenticationPanel>
  </div>
</template>

<script>
import AuthenticationPanel from "@/components/Authentication-Panel/Authentication-Panel";
import AuthenticationService from "@/services/AuthenticationService";
export default {
  components: {
    AuthenticationPanel
  },
  data: () => ({
    display_name: "",
    email: "",
    password: "",
    repeat_password: "",
    registerSuccess: false,
    showPanel: false,
    // showPassword: false,
    // showRepeatPassword: false,
    errors: []
  }),
  methods: {
    async register() {
      try {
        await AuthenticationService.register({
          display_name: this.display_name,
          email: this.email,
          password: this.password,
          repeat_password: this.repeat_password
        });
        this.showPanel = true;

        setTimeout(() => {
          this.registerSuccess = true;
        }, 1500);

        setTimeout(() => {
          this.registerSuccess = false;
          this.showPanel = false;
          this.$router.push({ name: "login" });
        }, 2500);
      } catch (error) {
        this.errors = error.response.data;
        setTimeout(() => (this.errors = []), 5000);
      }
    }
  }
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