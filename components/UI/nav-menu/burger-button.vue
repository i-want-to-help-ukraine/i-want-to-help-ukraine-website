<template>
  <div :class="`hamburger ${isActive ? 'is-active' : ''}`" @click="handleClick">
    <span class="line bg-lemon"></span>
    <span class="line bg-lemon"></span>
    <span class="line bg-lemon"></span>
  </div>
</template>

<script>
export default {
  name: 'BurgerButton',
  data: () => ({
    isActive: false,
  }),
  methods: {
    isActiveToggle() {
      this.isActive = !this.isActive
    },
    handleClick() {
      this.isActiveToggle()
      this.$emit('onClick')
    },
  },
}
</script>

<style scoped>
.hamburger {
  width: 40px;
  height: 40px;
}

/* prettier-ignore */
.hamburger .line {
  width: 40px;
  height: 5px;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

.hamburger.is-active .line:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active .line:nth-child(1) {
  transform: translateY(13px) rotate(45deg);
  transform: translateY(13px) rotate(45deg);
  transform: translateY(13px) rotate(45deg);
  transform: translateY(13px) rotate(45deg);
}

.hamburger.is-active .line:nth-child(3) {
  transform: translateY(-13px) rotate(-45deg);
  transform: translateY(-13px) rotate(-45deg);
  transform: translateY(-13px) rotate(-45deg);
  transform: translateY(-13px) rotate(-45deg);
}
</style>
