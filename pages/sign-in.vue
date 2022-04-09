<template>
  <div id="firebaseui-auth-container" class="h-full flex items-center" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SignIn',
  methods: {
    signInSuccess() {
      this.$router.push('/edit-profile')
    },
  },
  mounted() {
    // eslint-disable-next-line global-require
    const firebaseui = require('firebaseui')
    // eslint-disable-next-line global-require
    require('firebaseui/dist/firebaseui.css')
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)

    const config = {
      signInOptions: [
        {
          provider: this.$fireModule.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
        this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/edit-profile',
      callbacks: {
        signInSuccessWithAuthResult: this.signInSuccess,
      },
    }
    ui.start('#firebaseui-auth-container', config)
  },
  computed: {
    ...mapState({
      auth: ({ auth }) => auth,
    }),
  },
}
</script>

<style>
.firebaseui-idp-button {
  background-color: #fff !important;
  border-radius: 5px !important;
}

.firebaseui-idp-text {
  color: #757575 !important;
}
</style>
