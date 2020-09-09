<template>
  <div>
    <AuthenticationPanel authenticationTypeText="Admin Login">

      <v-scroll-x-transition>
        <v-alert type="warning" elevation="2" v-if="error">
          <ul>
            <li :error="error">{{ error }}</li>
          </ul>
        </v-alert>
      </v-scroll-x-transition>

      <form @submit.prevent="login">
        <div>
          <v-text-field label="E-mail" v-model="email" prepend-inner-icon="mdi-email-outline" />
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
      <v-btn color="primary" class="submit-btn" max-width="60%" @click="login">Login</v-btn>
    </AuthenticationPanel>
  </div>
</template>

<script>
import AuthenticationPanel from "@/components/Authentication-Panel/Authentication-Panel.vue";
import AuthenticationService from "@/services/AuthenticationService";

export default {
  components: {
    AuthenticationPanel
  },
  data: () => ({
    email: "",
    password: "",
    loginSuccess: false,
    showPanel: false,
    showPassword: false,
    error: null
  }),
  mounted() {
    this.checkIfAdminLoggedIn();
  },
  methods: {
    checkIfAdminLoggedIn() {
      if (this.$store.state.authorities) {
        let isAdmin = false;
        const roles = this.$store.state.authorities;
        for (let i = 0; i < roles.length; i++) {
          if (roles[i] === "ROLE_ADMIN") {
            isAdmin = true;
          } else {
            isAdmin = false;
          }
        }
        if (isAdmin) {
          this.$router.push({ name: "admin-main" });
        }
      }
    },
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });

        const userAdmin = response.data.authorities;
        let hasPriviliges = false;
        if (userAdmin) {
          for (let i = 0; i < userAdmin.length; i++) {
            if (userAdmin[i] === "ROLE_ADMIN") {
              hasPriviliges = true;
            } else {
              hasPriviliges = false;
            }
          }
        }
        if (hasPriviliges) {
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
            this.$router.push({ name: "admin-main" });
          }, 2500);
        } else {
          this.error = `The login information was incorrect`;
          setTimeout(() => (this.error = null), 5000);
        }
      } catch (error) {
        this.error = error.response.data.error;
        setTimeout(() => (this.error = null), 5000);
      }
    }
  }
};
</script>

<style>
</style>