<template>
  <div>
    <div class="block">
      <HeroIndex />
    </div>

    <Nuxt />

    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h6 class="title is-size-6">Contact</h6>
            <ul class="is-size-6">
              <li>Email: i.want.to.help.ukraine@gmail.com</li>
              <li>
                Source code:
                <a href="https://github.com/i-want-to-help-ukraine"
                  >Source Code</a
                >
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
