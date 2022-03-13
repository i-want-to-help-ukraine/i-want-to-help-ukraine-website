<template>
  <div class="flex flex-col items-center">
    <div class="grid md:grid-cols-2 gap-4 overflow-auto mx-auto xl:w-auto">
      <hero-mission-text
        v-for="{ name, alt, text } in missionTexts"
        :key="name"
        :image-name="name"
        :image-alt="alt"
        :text="text"
      />
    </div>
  </div>
</template>

<script>
import HeroMissionText from './hero-mission-text.vue'

export default {
  name: 'HeroMissionTextWrapper',
  components: { HeroMissionText },
  data: () => ({
    currentIndex: 0,
    missionTexts: [
      {
        name: 'us',
        alt: 'united states flag',
        text: 'Our mission is to help local volunteers in Ukraine receive money support from people across the globe.',
      },
      {
        name: 'ru',
        alt: 'russia flag',
        text: 'Наша миссия - помочь волонтёрам в Украине получать финансовую помощь от людей со всего мира.',
      },
      {
        name: 'ua',
        alt: 'ukraine flag',
        text: 'Наша місія - допомогти волонтерам в Україні отримувати фінансову допомогу від людей з усього світу.',
      },
      {
        name: 'sp',
        alt: 'spain flag',
        text: 'Nuestra misión es ayudar a los  voluntarios locales en Ucrania a recibir apoyo económico de personas de todo el mundo.',
      },
      {
        name: 'gr',
        alt: 'germany flag',
        text: 'Unsere Mission ist es, lokalen Freiwilligen in der Ukraine zu helfen, finanzielle Unterstützung aus der ganzen Welt zu erhalten.',
      },
      {
        name: 'fr',
        alt: 'france flag',
        text: "Notre mission est d'aider les volontaires locaux en Ukraine à recevoir un soutien financier de la part des personnes du monde entier.",
      },
    ],
  }),
}
</script>
