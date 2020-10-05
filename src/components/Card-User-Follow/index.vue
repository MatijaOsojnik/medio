<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :to="{
        path: `/users/${user.display_name.toLowerCase().replace(/\s/g, '')}/${
          user.id
        }/profile`,
      }"
      raised
      :elevation="hover ? 8 : 2"
      class="mx-auto pa-1" max-width="680px"
    >
      <div class="d-flex align-center">
        <div>
          <router-link
            v-if="user"
            :to="{
              path: `/users/${user.display_name
                .toLowerCase()
                .replace(/\s/g, '')}/${user.id}/profile`,
            }"
            style="z-index: 999"
            class="pl-4 d-block"
          >
            <v-list-item-avatar size="80px" color="grey darken-3">
              <v-img v-if="user.icon_url" :src="user.icon_url"></v-img>
              <v-img v-else src="@/assets/blue-error-background.jpg"></v-img>
            </v-list-item-avatar>
          </router-link>
        </div>
        <div class="d-flex flex-column justify-lg-space-between">
          <div>
            <router-link
              v-if="user"
              :to="{
                path: `/users/${user.display_name
                  .toLowerCase()
                  .replace(/\s/g, '')}/${user.id}/profile`,
              }"
              style="z-index: 999"
            >
              <span class="font-weight-bold d-block my-4" style="font-size: 17px;">{{
                user.display_name
              }}</span>
            </router-link>
          </div>

          <div>
            <span class="font-weight-bold d-block" v-if="user.description">{{
              user.description
            }}</span>
            <span class="d-block" v-else>Hi, I'm {{user.display_name}} </span>
          </div>
          <div>
                    <v-btn
                      small
                      white
                      outlined
                      class="my-4"
                    
                      
                      @click="!isFollower ? addFollow() : deleteFollow()"
                    >
                      {{ isFollowerText }}
                    </v-btn>
                  </div>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
 import FollowService from "@/services/FollowService"
export default {
  data: () => ({
    user: null,
    isFollower: false,
    isFollowerText: "FOLLOW",
    followersCount: 0,
    followingCount: 0,
    followers: null,
    stories: [],
  }),
  props: {
    user: Object,
  },
  methods: {
        async isFollowing() {
      const followerId = this.$store.state.user.id;
      const followedId = this.user.id;
      const response = await FollowService.findFollower(followerId, followedId);

      if (response.data.isFollowing) {
        this.isFollower = true;
        this.isFollowerText = "UNFOLLOW";
      } else {
        this.isFollower = false;
        this.isFollowerText = "FOLLOW";
      }
    },
    async addFollow() {
      try {
        const followerId = this.$store.state.user.id;
        const followedId = this.user.id;
        const response = await FollowService.postFollow(followerId, followedId);
        if (response) {
          this.isFollower = true;
          this.isFollowerText = "UNFOLLOW";
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteFollow() {
      try {
        const followerId = this.$store.state.user.id;
        const followedId = this.user.id;
        const response = await FollowService.deleteFollow(
          followerId,
          followedId
        );
        if (response.data) {
          this.isFollower = false;
          this.isFollowerText = "FOLLOW";
        }
      } catch (err) {
        console.log(err);
      }
    },
  }
};
</script>

<style>
</style>