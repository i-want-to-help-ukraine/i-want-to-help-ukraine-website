<template>
  <section>
    <hero-mission-text-wrapper class="my-8" />
    <h2 class="subtitle text-center">
      <a ref="noopener noreferrer nofollow" target="_blank" href="#" class="">
        #i-want-to-help-ukraine
      </a>
    </h2>
  </section>
</template>

<script>
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
}
</script>
