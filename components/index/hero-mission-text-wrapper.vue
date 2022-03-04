<template>
  <div class="block">
    <div class="block is-hidden-desktop">
      <div class="columns is-centered is-mobile is-multiline">
        <div class="column is-full">
          <HeroMissionText
            image-name="united-kingdom.png"
            image-alt="united kingdom flag"
            :text="missionText.en"
          />
        </div>
        <div class="column is-full">
          <HeroMissionText
            image-name="spain.png"
            image-alt="span flag"
            :text="missionText.es"
          />
        </div>
        <div class="column is-full">
          <HeroMissionText
            image-name="germany.png"
            image-alt="germany flag"
            :text="missionText.de"
          />
        </div>
        <div class="column is-full">
          <HeroMissionText
            image-name="france.png"
            image-alt="france flag"
            :text="missionText.fr"
          />
        </div>
        <div class="column is-full">
          <HeroMissionText
            image-name="ukraine.png"
            image-alt="ukraine flag"
            :text="missionText.ua"
          />
        </div>
        <div class="column is-full">
          <HeroMissionText
            image-name="russia.png"
            image-alt="russian flag"
            :text="missionText.ru"
          />
        </div>
        <div class="column is-full">
          <HeroMissionText
            image-name="poland.png"
            image-alt="polish flag"
            :text="missionText.pl"
          />
        </div>
      </div>
    </div>

    <div class="block is-hidden-mobile">
      <div class="columns is-centered is-mobile">
        <div class="column is-one-fifth">
          <HeroMissionText
            image-name="united-kingdom.png"
            image-alt="united kingdom flag"
            :text="missionText.en"
          />
        </div>
        <div class="column is-one-fifth">
          <HeroMissionText
            image-name="spain.png"
            image-alt="span flag"
            :text="missionText.es"
          />
        </div>
        <div class="column is-one-fifth">
          <HeroMissionText
            image-name="germany.png"
            image-alt="germany flag"
            :text="missionText.de"
          />
        </div>
        <div class="column is-one-fifth">
          <HeroMissionText
            image-name="france.png"
            image-alt="france flag"
            :text="missionText.fr"
          />
        </div>
      </div>

      <div class="columns is-centered is-mobile">
        <div class="column is-one-fifth">
          <HeroMissionText
            image-name="ukraine.png"
            image-alt="ukraine flag"
            :text="missionText.ua"
          />
        </div>
        <div class="column is-one-fifth">
          <HeroMissionText
            image-name="russia.png"
            image-alt="russian flag"
            :text="missionText.ru"
          />
        </div>
        <div class="column is-one-fifth">
          <HeroMissionText
            image-name="poland.png"
            image-alt="polish flag"
            :text="missionText.pl"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroMissionText from './hero-mission-text'

export default {
  name: 'HeroMissionTextWrapper',
  components: { HeroMissionText },
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
