<template>
  <section class="hero is-white is-small">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="block has-text-centered mb-4 pb-4">
          <h1 class="title is-size-1 title-text">I Want To Help Ukraine</h1>
          <h2 class="subtitle">
            <a
              ref="noopener noreferrer nofollow"
              target="_blank"
              href="#"
              class="has-text-link"
            >
              #i-want-to-help-ukraine
            </a>
          </h2>
        </div>

        <div class="block">
          <hero-mission-text-wrapper />
        </div>
      </div>
    </div>

    <div class="hero-foot">
      <nav class="tabs">
        <div class="container">
          <ul>
            <li>
              <b-button type="is-info" @click="onRegister"
                >Become a volunteer</b-button
              >
            </li>
            <li>
              <NuxtLink to="/how-it-works">How it works?</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/donate">How to donate?</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/supporters">Supporters</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import auth0 from '../../utils/auth0'
import HeroMissionTextWrapper from './hero-mission-text-wrapper'

export default {
  name: 'HeroIndex',
  components: { HeroMissionTextWrapper },
  data() {
    return {
      missionText: {
        en: 'Our mission is to help local volunteers in Ukraine receive money support from people across the globe.',
        ru: 'Наша миссия помочь волонтёрам в Украине получать финансовую помощь от людей со всего мира.',
        ua: 'Наша місія допомогти волонтерам в Україні отримувати фінансову допомогу від людей з усього світу.',
        de: 'Unsere Mission ist es, lokalen Freiwilligen in der Ukraine zu helfen, finanzielle Unterstützung aus der ganzen Welt zu erhalten.',
        fr: "Notre mission est d'aider les volontaires locaux en Ukraine à recevoir un soutien financier de la part des personnes du monde entier.",
        it: 'La nostra missione è quella di aiutare i volontari in loco per ricevere un aiuto economico da persone di tutto il mondo.',
        tr: "Misyonumuz, Ukrayna'daki yerel gönüllülerin dünyanın dört bir yanındaki insanlardan para desteği almalarına yardımcı olmaktır.",
        es: 'Nuestra misión es ayudar a los  voluntarios locales en Ucrania a recibir apoyo económico de personas de todo el mundo.',
        pl: 'Naszą misją jest niesienie pomocy wolontariuszom w Ukrainie dzięki wsparciu finansowemu z całego świata.',
      },
    }
  },
  methods: {
    onRegister() {
      auth0.loginWithPopup()
    },
  },
}
</script>

<style scoped>
.title-text {
  background: #005bc2;
  background: linear-gradient(to right, #005bc2 20%, #ffd400 80%);
  background: linear-gradient(to right, #005bc2 20%, #ffd400 80%);
  background: linear-gradient(to right, #005bc2 20%, #ffd400 80%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
