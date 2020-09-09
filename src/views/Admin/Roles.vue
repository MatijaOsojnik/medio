<template>
  <v-app>
    <AdminHeader />
    <v-container fluid>
      <span class="d-block title pa-2">ROLES</span>

      <v-card>
        <v-card-title>
          All Roles
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
                      <v-toolbar-title>Edit Role</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text v-if="role">
                      <v-form lazy-validation>
                        <label for="name">Name</label>
                        <v-text-field
                          id="name"
                          label="Enter a role name"
                          maxlength="20"
                          counter
                          solo
                          aria-autocomplete="false"
                          v-model="role.name"
                        />

                        <label for="description">Description</label>
                        <v-textarea
                          id="description"
                          solo
                          label="Enter description"
                          v-model="role.description"
                        ></v-textarea>
                      </v-form>
                      <v-scroll-x-transition>
                        <v-alert type="success" mode="out-in" v-if="successfulRoleUpdate">
                          <span>You successfuly updated a role</span>
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
                        @click="updateRole"
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
            <v-icon small class="mr-2" @click="editRole(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteRole(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import RoleService from "@/services/RoleService";
import AdminHeader from "@/components/Header/Admin-Header.vue";

export default {
  components: {
    AdminHeader
  },
  data: () => ({
    statistics: null,
    loading: true,
    dialog: false,
    role: null,
    error: null,
    successfulRoleUpdate: false,
    waitBeforeClick: false,
    search: "",
    headers: [
      {
        text: "ID",
        value: "id"
      },
      {
        text: "Name",
        value: "name"
      },
      { text: "Description", value: "description" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  created() {
    this.getRoles();
  },
  methods: {
    async getRoles() {
      try {
        const response = await RoleService.index();
        this.statistics = response.data;
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async updateRole() {
      this.waitBeforeClick = true;
      const areAllFieldsFilledIn = Object.keys(this.role).every(
        key => !!this.role[key]
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
        const response = await RoleService.put(this.role);
        if (response) {
          this.successfulRoleUpdate = true;
          setTimeout(() => {
            this.successfulRoleUpdate = false;
            this.waitBeforeClick = false;
            this.dialog = false;
            this.getRoles();
          }, 3000);
        }
      } catch (err) {
        this.error = err.response.data.error;
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.error = null), 5000);
      }
    },
    editRole(role) {
      this.role = role;
      this.dialog = true;
    },
    async deleteRole(role) {
      const roleId = role.id;
      confirm("Are you sure you want to delete this role?") &&
        (await RoleService.delete(roleId));
        this.getRoles()
    }
  }
};
</script>

<style>
</style>