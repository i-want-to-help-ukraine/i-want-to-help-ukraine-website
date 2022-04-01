<template>
  <div class="max-w-[1500px] mx-auto py-16 px-6">
    <h2 class="text-2xl sm:text-3xl text-center">
      Створення посилання на поповнення картки Monobank за посиланням
    </h2>
    <div class="flex flex-wrap justify-center mt-12">
      <div class="flex flex-col justify-around m-3 max-w-[420px]">
        <p class="mb-4 text-xl">
          1. Зайди в застосунок Monobank та натисни “Поповнити свою картку”
        </p>
        <div class="max-w-sm">
          <img src="@/assets/img/mono/step-1.jpg" alt="" />
        </div>
      </div>
      <div class="flex flex-col justify-around m-3 max-w-[420px]">
        <p class="mb-4 text-xl">2. Обери спосіб поповнення "За посиланням"</p>
        <div class="max-w-sm">
          <img src="@/assets/img/mono/step-2.jpg" alt="" />
        </div>
      </div>
      <div class="flex flex-col justify-around m-3 max-w-[420px]">
        <p class="mb-4 text-xl">3. Натисни "Копіюваті посилання"</p>
        <div class="max-w-sm">
          <img src="@/assets/img/mono/step-3.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowToFundrise',
}
</script>
