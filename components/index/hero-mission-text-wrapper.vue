<template>
  <div class="flex flex-col items-center">
    <div class="hidden xl:grid grid-cols-3 overflow-auto mx-auto xl:w-auto">
      <hero-mission-text
        v-for="{ name, alt, text } in missionTexts"
        :key="name"
        :image-name="name"
        :image-alt="alt"
        :text="text"
      />
    </div>
    <div class="xl:hidden flex flex-col">
      <span class="text-center text-sm sm:text-lg">{{
        missionTexts[currentIndex].text
      }}</span>
      <div class="flex mx-auto mt-5">
        <img
          v-for="({ name, alt }, index) in missionTexts"
          :key="name"
          :src="require(`@/assets/img/${name}`)"
          :alt="`${alt}`"
          class="logo mr-1 w-10"
          @click="currentIndex = index"
        />
      </div>
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
        name: 'united-kingdom.png',
        alt: 'united kingdom flag',
        text: 'Our mission is to help local volunteers in Ukraine receive money support from people across the globe.',
      },
      {
        name: 'russia.png',
        alt: 'russia flag',
        text: 'Наша миссия - помочь волонтёрам в Украине получать финансовую помощь от людей со всего мира.',
      },
      {
        name: 'ukraine.png',
        alt: 'ukraine flag',
        text: 'Наша місія - допомогти волонтерам в Україні отримувати фінансову допомогу від людей з усього світу.',
      },
      {
        name: 'spain.png',
        alt: 'spain flag',
        text: 'Nuestra misión es ayudar a los  voluntarios locales en Ucrania a recibir apoyo económico de personas de todo el mundo.',
      },
      {
        name: 'germany.png',
        alt: 'germany flag',
        text: 'Unsere Mission ist es, lokalen Freiwilligen in der Ukraine zu helfen, finanzielle Unterstützung aus der ganzen Welt zu erhalten.',
      },
      {
        name: 'france.png',
        alt: 'france flag',
        text: "Notre mission est d'aider les volontaires locaux en Ukraine à recevoir un soutien financier de la part des personnes du monde entier.",
      },
    ],
  }),
}
</script>
