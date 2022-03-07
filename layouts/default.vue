<template>
  <div class="font-sans default">
    <div class="block mb-5 mx-auto">
      <nav-bar class="mb-5" />
    </div>

    <Nuxt />

    <footer class="footer mt-6">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h6 class="title is-size-6">Contact</h6>
            <ul class="is-size-6">
              <li>
                Email:
                <a href="mailto:i.want.to.help.ukraine@gmail.com"
                  >i.want.to.help.ukraine@gmail.com</a
                >
              </li>
              <li>
                GitHub:
                <a
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  href="https://github.com/i-want-to-help-ukraine"
                >
                  https://github.com/i-want-to-help-ukraine
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from '../components/index/nav-bar.vue'

export default {
  name: 'DefaultLayout',
  components: { NavBar },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

.default {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
