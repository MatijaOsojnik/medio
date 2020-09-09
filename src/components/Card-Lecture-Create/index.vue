<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      max-width="300px"
      height="320px"
      :to="{path: `/lectures/create/${$store.state.user.id}`}"
      raised
      :elevation="hover ? 8 : 2"
    >
      <div>
        <v-img
          :src="card.imageUrl"
          height="320px"
          class="darker-img"
        >
          <v-row class="fill-height flex-column justify-center">
            <div class="align-self-center">
              <v-btn icon :class="{ 'show-btns': hover }" class="invisible">
                <v-icon
                  x-large
                  :class="{ 'show-btns': hover }"
                  class="invisible"
                >{{"mdi-plus-circle-outline"}}</v-icon>
              </v-btn>
            </div>
          </v-row>
        </v-img>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
    props: {
        card: Object
    },
};
</script>

<style>
</style>