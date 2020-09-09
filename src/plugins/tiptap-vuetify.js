import vuetify from './vuetify'
import Vue from 'vue'
import {
    TiptapVuetifyPlugin
} from 'tiptap-vuetify'
// don't forget to import styles
import 'tiptap-vuetify/dist/main.css'

Vue.use(TiptapVuetifyPlugin, {
    vuetify,
    // "md" (default), "fa", "mdi"
    iconsGroup: 'mdi' // same as "iconsGroup: iconsGroup"
})