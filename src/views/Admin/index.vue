<template>
  <v-app>
    <AdminHeader />
    <v-container fluid>
      <span class="d-block title pa-2">DASHBOARD</span>
      <v-row align="center" justify="center">
        <v-col
          class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-center justify-sm-center"
          v-for="(card, index) in cards" :key="index"
        >
          <AdminCard :card="card"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import AdminHeader from "@/components/Header/Admin-Header";
import AdminCard from "@/components/Card-Admin";
export default {
  components: {
    AdminHeader,
    AdminCard
  },
  data: () => ({
    cards: [
      {
        link: "admin-users",
        icon: "mdi-account-supervisor-circle",
        title: "USERS"
      },
      {
        link: "admin-lectures",
        icon: "mdi-animation-play",
        title: "LECTURES"
      },
      {
        link: "admin-categories",
        icon: "mdi-format-list-text",
        title: "CATEGORIES"
      },
      {
        link: "admin-roles",
        icon: "mdi-card-account-details",
        title: "ROLES"
      }
    ]
  }),
  created() {
  },
  methods: {
    async logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setAuthorities", null);
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style>
</style>