<template>
  <div>
  
    <v-flex xs12 justify="center" align="center">
      <div class="text-editor-container">
        <TextEditor />
      </div>
    </v-flex>

  </div>
</template>

<script>
import TextEditor from "@/components/Text-Editor/Text-Editor-Update";

export default {
  components: {
    TextEditor,
  },
  created() {
    
  }
};
</script>

<style>
.text-editor-container {
  max-width: 740px;
  padding-left: 20px;
  padding-right: 20px;
  margin: auto;
}
</style>