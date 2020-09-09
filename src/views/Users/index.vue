<template>
  <v-container>
    <v-list v-for="user in users" :key="user.id">
      User {{user.id}}
      <v-list-item>{{user.display_name}}</v-list-item>
      <v-list-item>{{user.email}}</v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import UserService from "@/services/UserService";
export default {
  data: () => ({
    users: null
  }),
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserService.index();
        this.users = response.data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>