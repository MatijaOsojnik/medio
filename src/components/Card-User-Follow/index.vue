<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :to="{
                    path: `/users/${user.display_name.toLowerCase()
              .replace(/\s/g, '')}/${
                      user.id
                    }/profile`,
                  }" raised :elevation="hover ? 8 : 2">
      <v-row>
        <v-col class="col-10 d-flex align-center">
          <div class="d-flex flex-column justify-space-between" style="width: 100%; height: 100%;">
                        <div>
              <v-list-item class="pb-4 pl-0 ml-0">
                <router-link
                  v-if="user"
                  :to="{
                    path: `/users/${user.display_name.toLowerCase()
              .replace(/\s/g, '')}/${
                      user.id
                    }/profile`,
                  }"
                  style="z-index: 999"
                  class="pb-2"
                >
                  <v-list-item-avatar size="36px" color="grey darken-3">
                    <v-img
                      v-if="user.icon_url"
                      :src="user.icon_url"
                    ></v-img>
                    <v-img
                      v-else
                      src="@/assets/blue-error-background.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                </router-link>

                <div class="">
                  <router-link
                    v-if="user"
                    :to="{
                      path: `/users/${user.display_name.toLowerCase()
              .replace(/\s/g, '')}/${
                        user.id
                      }/profile`,
                    }"
                    style="z-index: 999"
                  >
                    <span class="font-weight-bold d-block">{{
                      user.display_name
                    }}</span>
                  </router-link>

                  <!-- <v-icon class="mr-3">mdi-share-variant</v-icon> -->
                </div>
                <div class="d-flex align-center justify-center ml-5">
                  <!-- <v-btn
                    small
                    white
                    outlined
                    class="inline-block"
                    v-if="isOwner"
                    :to="{
                      name: 'story-edit',
                      params: { id: story.id },
                    }"
                  >
                    EDIT
                  </v-btn> -->
                </div>
                <v-spacer />
              </v-list-item>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    
  </v-hover>
</template>

<script>
export default {
  props: {
    user: Object
  },
  mounted() {
    console.log(this.user)
  }
}
</script>

<style>

</style>