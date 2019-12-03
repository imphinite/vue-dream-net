import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

// Helpers
import colors from 'vuetify/es5/util/colors'

import './../styles/app.scss';
let options = {
    theme: {
        primary: colors.indigo.base, // #E53935
        secondary: colors.indigo.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
        success: colors.green.base,
        info: colors.blue.base,
        warning: colors.yellow.base,
        error: colors.red.base
    },
    options: {
        themeVariations: ['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'error'],
        extra: {
            mainToolbar: {
                color: 'primary',
            },
            sideToolbar: {
            },
            sideNav: 'primary',
            mainNav: 'primary lighten-1',
            bodyBg: '',
        }
    }
}
Vue.use(Vuetify, options);
