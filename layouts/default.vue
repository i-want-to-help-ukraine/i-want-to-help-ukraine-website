<template>
  <div>
    <div class="block mt-6 mb-5">
      <HeroIndex />
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
import HeroIndex from '../components/index/hero-index'

export default {
  name: 'DefaultLayout',
  components: { HeroIndex },
}
</script>
