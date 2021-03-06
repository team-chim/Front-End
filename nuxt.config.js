module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'db-proj',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Team Chim DB Proj' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },
    module: [{ src: 'bootstrap-vue/nuxt', ssr: false }],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** Run ESLint on save
         */
    }
}