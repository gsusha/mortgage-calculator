<template>
  <div class="wrapper">
    <MortgageCalculator />
  </div>
</template>

<script>
import MortgageCalculator from "@/components/MortgageCalculator.vue";

export default {
  name: 'App',
  components: {
    MortgageCalculator
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');

body {
  background: #EDEEF6;
  color: #20253C;
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    @media(max-width: 475px) {
      padding: 40px 20px;
    }
  }
}
</style>