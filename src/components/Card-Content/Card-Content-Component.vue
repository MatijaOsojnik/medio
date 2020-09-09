<template>
  <v-container fluid>
    <v-row justify="center" align="center" style="z-index: 100">
      <v-col
        class="col-3 col-md-3 col-sm-6 cols-6"
        align="center"
        v-for="(card,key) in cardContent"
        :key="key"
      >
        <v-hover v-slot:default="{ hover }">
          <router-link :to="{path: 'login'}" style="text-decoration:none;">
            <v-card max-width="250" :elevation="hover ? 12 : 2">
              <v-img height="170" :src="require(`../../assets/${card.imageUrl}`)">
                <v-row class="fill-height flex-column justify-center">
                  <div class="align-self-center">
                    <v-btn :class="{ 'show-btns': hover }" class="invisible" icon>
                      <v-icon
                        :class="{ 'show-btns': hover }"
                        class="invisible"
                        large
                      >{{"mdi-play-circle-outline"}}</v-icon>
                    </v-btn>
                  </div>
                </v-row>
              </v-img>
              <span class="card-title pa-3">{{card.title}}</span>
            </v-card>
          </router-link>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    cardContent: Array
  }
};
</script>

<style scoped>
.card-title {
  display: block;
  font-weight: 600;
  font-size: 19px;
  text-align: center;
  padding: 8px;
}
.invisible {
  color: rgb(63, 114, 175, 0) !important;
}
.show-btns {
  color: rgb(255, 255, 255, 1) !important;
}
</style>