import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const darkTheme = {
    dark: true,
    colors: {
        background: '#171717',
        surface: '#333',
        primary: '#c0392b',
        'primary-darken-1': '#8e2b20',
        secondary: '#aaa',
        error: '#c0392b',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'darkTheme',
        themes: {
            darkTheme,
        },
    },
})