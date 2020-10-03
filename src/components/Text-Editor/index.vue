<template>
  <div class="editor">
    <editor-floating-menu :editor="editor" v-slot="{ commands, menu }">
      <div
        class="editor__floating-menu"
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top}px`"
      >
        <v-btn
          icon
          color="black"
          tile
          class="menububble__button"
          @click="showImagePrompt(commands.image)"
          :ripple="false"
        >
          <v-icon>{{ "mdi-image" }}</v-icon>
        </v-btn>
      </div>
    </editor-floating-menu>
    <editor-menu-bubble
      :editor="editor"
      :keep-in-bounds="keepInBounds"
      @hide="hideLinkMenu"
      v-slot="{ commands, isActive, getMarkAttrs, menu }"
    >
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <v-btn
          icon
          small
          tile
          color="white"
          class="menububble__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
          :ripple="false"
        >
          <v-icon>{{ "mdi-format-bold" }}</v-icon>
        </v-btn>

        <v-btn
          icon
          color="white"
          small
          tile
          class="menububble__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
          :ripple="false"
        >
          <v-icon>{{ "mdi-format-italic" }}</v-icon>
        </v-btn>

        <form
          class="menububble__form"
          v-if="linkMenuIsActive"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)"
        >
          <input
            class="menububble__input"
            type="text"
            v-model="linkUrl"
            placeholder="https://"
            ref="linkInput"
            @keydown.esc="hideLinkMenu"
          />
          <v-btn
            icon
            small
            color="white"
            tile
            class="menububble__button"
            @click="setLinkUrl(commands.link, null)"
            :class="{ 'is-active': isActive.link() }"
            :ripple="false"
          >
            <v-icon>{{ "mdi-close-circle-outline" }}</v-icon>
          </v-btn>
        </form>

        <template v-else>
          <v-btn
            icon
            small
            color="white"
            tile
            class="menububble__button"
            @click="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
            :ripple="false"
          >
            <!-- <span>{{ isActive.link() ? "Update Link" : "Add Link" }}</span> -->
            <v-icon>{{ "mdi-link-variant" }}</v-icon>
          </v-btn>
        </template>

        <span class="d-inline-block white--text px-2" style="font-size: 18px"
          >|</span
        >

        <v-btn
          icon
          small
          color="white"
          tile
          class="menububble__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
          :ripple="false"
        >
          <v-icon>{{ "mdi-format-title" }}</v-icon>
        </v-btn>
        <v-btn
          icon
          small
          color="white"
          tile
          class="menububble__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
          :ripple="false"
        >
          <v-icon small>{{ "mdi-format-title" }}</v-icon>
        </v-btn>
        <v-btn
          icon
          small
          color="white"
          tile
          class="menububble__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
          :ripple="false"
        >
          <v-icon>{{ "mdi-format-quote-open" }}</v-icon>
        </v-btn>
      </div>
    </editor-menu-bubble>

    <editor-content
      class="editor__content"
      :editor="editor"
      v-model="story_content"
    />
  </div>
</template>

<script>
import {
  Editor,
  EditorContent,
  EditorMenuBubble,
  EditorFloatingMenu,
} from "tiptap";
import Doc from "./Doc";
import Title from "./Title";
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Image,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
} from "tiptap-extensions";
export default {
  components: {
    EditorContent,
    EditorMenuBubble,
    EditorFloatingMenu,
  },
  data() {
    return {
      story_content: ``,
      title: ``,
      short_description: ``,
      description: ``,
      thumbnail_url: ``,
      category_id: ``,
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new Image(),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Doc(),
          new Title(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: (node) => {
              if (node.type.name === "title") {
                return "Title";
              }
              return "Tell your story...";
            },
          }),
        ],
        onUpdate: ({ getJSON, getHTML, }) => {
          this.$store.dispatch("setCurrentStoryJSON", getJSON());
          this.$store.dispatch("setCurrentStoryHTML", getHTML());
        },
        content:  this.$store.state.currentStory.HTML,
        autoFocus: true,
      }),
      linkUrl: null,
      linkMenuIsActive: false,
    };
  },
  // props: {
  //   story: Object,
  // },
  created() {
    this.checkContent();
  },
  methods: {
    async checkContent() {},
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    },
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.editor *.is-empty:nth-child(1)::before,
.editor *.is-empty:nth-child(2)::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
.editor {
  position: relative;
  &__floating-menu {
    position: absolute;
    z-index: 1;
    margin-top: -0.25rem;
    margin-left: 0.5em;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
    &.is-active {
      opacity: 1;
      visibility: visible;
    }
  }
}
.menubar {
  margin-bottom: 1rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba(black, 0.05);
    }

    &.is-active {
      background-color: rgba(black, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}
.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: rgba(0, 0, 0, 0.877);
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background: transparent;
    border: 0;
    color: white;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba(white, 0.1);
    }

    &.is-active {
      background-color: rgba(white, 0.2);
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: white;
  }
}
h1,
h2,
h3,
p,
ul,
ol,
pre,
blockquote {
  margin: 1.5rem 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

h1,
h2,
h3 {
  line-height: 1.3;
}
.editor__content blockquote {
  border-left: 3px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
  padding-left: 0.8rem;
  font-style: italic;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;

  &:focus {
    outline: none;
  }
}
.editor__content img {
  max-width: 100%;
  border-radius: 3px;
}

.tiptap-vuetify-editor__content {
  padding: 2em;
}
</style>