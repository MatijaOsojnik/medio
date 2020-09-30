<template>
  <v-app>
    <div id="app">
      <main>
        <UserHeader :class="$store.state.user ? 'container page-container' : ''" v-if="$router.history.current['name'] !== 'admin-login' && $router.history.current['name'] !== 'story-create'"/>
          <router-view :class="$store.state.user ? 'container page-container' : ''"/>
        <Footer />
      </main>
    </div>
  </v-app>
</template>
<script>
import UserHeader from "@/components/Header/User-Header";
import Footer from "@/components/Footer/Footer";
export default {
  name: "App",

  components: { UserHeader, Footer },

  data: () => ({
    //
  })
};
</script>

<style>
#app {
  /* max-width: 1px;
  min-width: 1200px;
  margin: 0 auto; */
}

.page-container {
  max-width: 1150px;
}

a {
  text-decoration: none;
}

.v-application a {
  color: black !important;
}

.main {
  font-family: 'Roboto', sans-serif;
  padding: 0;
  margin: 0;
}

.cta-btn-active {
  background-color: #3f72af !important;
  color: white !important;
  transition: 0.2s;
}
.cta-btn-hover {
  background-color: white !important;
  color: black !important;
  transition: 0.2s;
}
.abcRioButtonBlue {
  margin: 0 auto !important;
}
.abcRioButton {
  margin: 0 auto !important;
}
</style>
