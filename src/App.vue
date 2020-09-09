<template>
  <v-app>
    <div id="app">
      <main>
        <UserHeader v-if="$router.history.current['name'] !== 'admin-login'"/>
          <router-view/>
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
/* #app {
  font-family: "Roboto", cursive;
} */

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
</style>
