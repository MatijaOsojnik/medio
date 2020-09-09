<template>
  <div>
    <editor-menu-bar
      :editor="editor"
      v-slot="{ commands, isActive }"
      class="tiptap-vuetify-editor__toolbar"
    >
      <header
        class="v-sheet v-sheet--tile theme--light v-toolbar v-toolbar--dense v-toolbar--flat grey lighten-4"
        style="height: 48px"
      >
        <div class="v-toolbar__content" style="height: 48px;">
          <div>
            <v-btn icon :class="{ 'is-active': isActive.bold() }" @click="commands.bold" small>
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>

            <v-btn icon :class="{ 'is-active': isActive.italic() }" @click="commands.italic" small>
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>

            <v-btn icon @click="commands.bullet_list" small>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>

            <v-btn icon @click="commands.ordered_list" small>
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-btn>

            <v-btn icon @click="showImagePrompt(commands.image)" small>
              <v-icon>mdi-image</v-icon>
            </v-btn>

            <v-btn icon @click="commands.paragraph" small>
              <v-icon>mdi-format-paragraph</v-icon>
            </v-btn>

            <v-btn
              icon
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
              small
            >
              <h3>H1</h3>
            </v-btn>

            <v-btn
              icon
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
              small
            >
              <h3>H2</h3>
            </v-btn>

            <v-btn
              icon
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
              small
            >
              <h3>H3</h3>
            </v-btn>

            <v-btn icon @click="commands.redo" small>
              <v-icon>mdi-redo</v-icon>
            </v-btn>

            <v-btn icon @click="commands.undo" small>
              <v-icon>mdi-undo</v-icon>
            </v-btn>
          </div>
        </div>
      </header>
    </editor-menu-bar>

    <editor-content class="tiptap-vuetify-editor__content" :editor="editor" />
  </div>
</template>

<script>
import { EditorContent, EditorMenuBar } from "tiptap";
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data: () => ({}),
  props: {
    editor: Object
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style>
</style>