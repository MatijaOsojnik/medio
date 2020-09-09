<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      width="250px"
      height="270px"
      raised
      :to="{name: `${card.link}`}"
      :elevation="hover ? 8 : 2"
    >
      <v-img height="270px">
        <v-row class="fill-height flex-column justify-center">
          <v-icon x-large>{{card.icon}}</v-icon>
          <span class="d-block text-center subtitle-2 pa-2">{{card.title}}</span>
        </v-row>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script>
export default {
    props: {
        card: Object
    }
};
</script>

<style>
</style>