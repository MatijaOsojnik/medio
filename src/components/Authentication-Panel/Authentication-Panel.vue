<template>
<div>
    <Header />
    <div height="100vh" class="main">
      <v-row class="row-container">
        <v-col
          class="col-xl-5 col-lg-5 col-md-5 d-xl-block d-lg-block d-md-block d-sm-none d-none"
          style="padding: 0"
        >
          <div class="image-container fill-height d-flex justify-center align-center">
            <v-img src="../../assets/authentication-background.svg" class="background-image"></v-img>
          </div>
        </v-col>
        <v-col class="col-xl-7 col-lg-7 col-md-7 col-sm-12">
          <v-container class="form-container ma-3">
            <div>
              <span class="sign-in-brand">{{authenticationTypeText}}</span>
            </div>
            <v-container class="form-input-container">
              <v-container>
                <slot>No content defined.</slot>
                <div class="sign-in-container" v-if="$router.history.current['path'] === '/login' || $router.history.current['path'] === '/register'">
                  <span class="sign-in-text">
                    Already have an account?
                    <span>
                      <router-link class="sign-in-link" :to="{name: `${routeName}`}">{{linkName}}</router-link>
                    </span>
                  </span>
                </div>
              </v-container>
            </v-container>
          </v-container>
        </v-col>
      </v-row>
    </div>
</div>
</template>

<script>
import Header from "@/components/Header/Header";
export default {
  components: {
    Header
  },
  props: ["authentication-type-text", "route-name", "link-name"]
};
</script>

<style scoped>
div {
  font-family: 'Roboto';
}
ul,
li {
  text-align: left;
}
/* .image-background {
  height: 100vh;
  background: url("../assets/social-ideas.svg");
  background-size: cover;
} */
.row-container {
  height: 100vh;
}
.background-image {
  max-width: 80%;
}
/* .image-container {
  background-color: #f9f9f9;
} */
.form-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.form-input-container {
  display: flex;
  justify-content: center;
  width: 60%;
}
.brand {
  color: black;
  font-weight: 900;
  font-size: 40px;
  font-family: "Patrick Hand SC", cursive;
}
.sign-in-brand {
  font-size: 23px;
  font-weight: 600;
  color: black;
}
.submit-btn {
  color: white;
  margin: 10px 0;
}
.sign-in-container {
  margin: 1.5rem 0;
}
.sign-in-text {
  display: inline-block;
}
.sign-in-link {
  display: inline-block;
  font-weight: bold;
  text-decoration: none;
}
</style>