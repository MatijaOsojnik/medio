<template>
  <LectureMetadata>
    <template v-slot:yourLectures>
    <span class="title my-4 d-block">Your lectures</span>
      <v-row style="z-index: 100" class="flex-sm-fill">
        <v-col
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
        >
          <LectureCardCreateComponent :card="card" />
        </v-col>
        <v-col
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 d-flex d-sm-flex d-md-block d-lg-block d-xl-block justify-center justify-sm-center"
          v-for="lecture in lectures"
          :key="lecture.id"
        >
          <LectureCardComponent :lecture="lecture" />
        </v-col>
      </v-row>
    </template>
  </LectureMetadata>
</template>

<script>
import LectureCardCreateComponent from "@/components/Card-Lecture-Create";
import LectureCardComponent from "@/components/Card-Lecture";
import LectureService from "@/services/LectureService";
import LectureMetadata from "@/views/Users/LectureMetadata";

export default {
  components: {
    LectureCardCreateComponent,
    LectureCardComponent,
    LectureMetadata
  },
  data: () => ({
    card: {
      imageUrl:
        "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      url: "/lectures/create/"
    },
    lectures: null
  }),
  created() {
    this.getUserLectures();
  },
  methods: {
    async getUserLectures() {
      const response = await LectureService.user(this.$store.state.user.id);
      this.lectures = response.data;
    }
  }
};
</script>

<style>
</style>