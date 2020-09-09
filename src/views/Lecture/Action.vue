<template>
  <v-card class="ma-12 mx-auto" max-width="1200px" v-if="lecture">
    <v-progress-linear height="31" v-model="value"></v-progress-linear>
    <v-toolbar flat color="#617BE3" dark>
      <v-toolbar-title>{{lecture.title}}</v-toolbar-title>
    </v-toolbar>
    <v-stepper v-if="content.length" v-model="stepper" vertical>
      <div v-for="(item, index) in content" :key="index">
        <v-stepper-step :complete="stepper > 1" :step="index + 1">
          <span v-if="item.slovene_sentence">Exercise</span>
          <span v-else>Tip</span>
        </v-stepper-step>
        <v-stepper-content :step="index + 1">
          <v-card class="ma-4 pb-6" tile min-height="200px">
            <v-card-text>
              <v-container>
                <div v-if="!item.slovene_sentence">
                  <span class="d-block display-1 text-center">{{item.title}}</span>
                  <span class="d-block pa-6" style="font-size: 17px;" v-html="item.content"></span>
                </div>
                <div v-else>
                  <span
                    class="d-block font-weight-bold text-center pa-4"
                    style="font-size: 22px"
                  >English: {{item.english_sentence}}</span>
                  <v-text-field
                    v-model="enteredSentence"
                    label="Please enter the slovenian translation here"
                    solo
                  ></v-text-field>
                  <v-scroll-x-transition>
                    <v-alert elevation="2" type="warning" v-if="error">
                      <ul>
                        <li>{{ error }}</li>
                      </ul>
                    </v-alert>
                  </v-scroll-x-transition>
                  <VuetifyAudio :file="file" color="success" />
                </div>
              </v-container>
            </v-card-text>
          </v-card>
          <v-btn color="primary" v-if="index+1 === content.length" @click="complete(item)">Finish</v-btn>
          <v-btn color="primary" v-else @click="nextStep(index, item)">Continue</v-btn>
          <v-bottom-sheet v-model="sheet">
            <v-sheet class="text-center" color="#eeeeee" height="200px">
              <div class="py-3 mt-6">
                <span class="d-block font-weight-bold
                pt-6 title">
                  You completed {{lecture.title}}! The future is bright!
                </span>
                </div>
              <v-btn class="mt-6" color="success" @click="goBack">Go Back</v-btn>
            </v-sheet>
          </v-bottom-sheet>
        </v-stepper-content>
      </div>
    </v-stepper>
  </v-card>
</template>

<script>
import LectureService from "@/services/LectureService.js";
import GeneralService from "@/services/GeneralService.js";
import VuetifyAudio from "vuetify-audio";
export default {
  components: {
    VuetifyAudio
  },
  data: () => ({
    value: 0,
    sheet: false,
    file: require("@/assets/testtest.mp3"),
    lecture: null,
    stepper: 1,
    enteredSentence: ``,
    error: null,
    content: [],
    imageError: false
  }),
  created() {
    this.getLecture();
  },
  watch: {
    // call again the method if the route changes
    $route: "getLecture"
  },
  methods: {
    async getLecture() {
      try {
        const lectureId = this.$route.params.id;
        const response = await LectureService.show(lectureId);
        this.lecture = response.data;
        response.data.Tips.forEach(value => this.content.push(value));
        response.data.Sentences.forEach(value => this.content.push(value));
        this.imageError = false;
      } catch (err) {
        console.log(err);
      }
    },
    async imageLoadError() {
      this.imageError = true;
    },
    nextStep(index, item) {
      if (item.slovene_sentence) {
        if (item.slovene_sentence === this.enteredSentence) {
          this.stepper = index + 2;
          const partialValue = 100 / this.content.length;
          this.value += partialValue;
        } else {
          this.error = `Uh oh, you made a typo..`;
          setTimeout(() => (this.error = null), 3000);
        }
      } else {
        this.stepper = index + 2;
        const partialValue = 100 / this.content.length;
        this.value += partialValue;
      }
      this.enteredSentence = ``;
    },
    async complete(item) {
      if (item.slovene_sentence) {
        if (item.slovene_sentence === this.enteredSentence) {
          const partialValue = 100 / this.content.length;
          this.value += partialValue;
          this.sheet = true;
          try {
            const response = await GeneralService.postHistory(
              this.$store.state.user.id,
              this.lecture.id
            );
            if (response)
              setTimeout(() => {
                this.sheet = false;
                this.$router.push({
                  path: `/lectures/${this.$route.params.id}`
                });
              }, 6000);
          } catch (err) {console.log(err)}
        } else {
          this.error = `Uh oh, you made a typo..`;
          setTimeout(() => (this.error = null), 3000);
        }
      } else {
        const partialValue = 100 / this.content.length;
        this.value += partialValue;
        this.sheet = true;
        setTimeout(() => {
          this.sheet = false;
          this.$router.push({
            path: `/lectures/${this.$route.params.id}`
          });
        }, 6000);
      }
      this.enteredSentence = ``;
    },
    goBack() {
      this.sheet = false;
      this.$router.push({
        path: `/lectures/${this.$route.params.id}`
      });
    }
  }
};
</script>

<style scoped>
.back-link {
  font-size: 15px;
  color: #52616b;
  margin-top: 20px;
}
.back-link:hover {
  color: #303841;
}
.lecture-count {
  color: black;
  font-size: 20px;
}
</style>