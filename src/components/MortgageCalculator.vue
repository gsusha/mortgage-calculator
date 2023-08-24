<template>
  <div class="calc">
    <div class="title">Калькулятор ипотеки</div>
    <div class="body">
      <BaseSlider v-model="cost" name="Стоимость жилья" :min="500000" :max="10000000" :step="100000" type="price"/>
      <BaseSlider v-model="downPayment" name="Первый взнос" :min="100000" :max="2000000" :step="50000" type="price"/>
      <BaseSlider v-model="period" name="Срок ипотеки" :min="4" :max="20" :step="2" type="period"/>
      <BaseSlider v-model="percent" name="Процентная ставка" :min="1" :max="15" :step="1" type="percent"/>
      <div class="total">
        <div class="name">Платёж в месяц:</div>
        <div class="value">{{ toPrice.format(monthlyPayment) }}</div>
      </div>
      <div class="total">
        <div class="name">Переплата:</div>
        <div class="value">{{  toPrice.format(overpayment) }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseSlider from "@/components/BaseSlider.vue";
import {computed, ref} from "vue";
import {toPrice} from "@/utils/common";

const cost = ref(2000000);
const downPayment = ref(250000);
const period = ref(20);
const percent = ref(12);

const remainingValue = computed(() => {
  return cost.value - downPayment.value;
});
const monthlyMortgageRate = computed(() => {
  return percent.value / 12 / 100;
})
const totalMortgageRate = computed(() => {
  return Math.pow(1 + monthlyMortgageRate.value, period.value * 12)
});
const monthlyPayment = computed(() => {
  return Math.round(remainingValue.value * monthlyMortgageRate.value * totalMortgageRate.value / (totalMortgageRate.value - 1))
});

const overpayment = computed(() => {
  return Math.round(monthlyPayment.value * period.value * 12 - remainingValue.value)
});
</script>
<style lang="scss" scoped>
.calc {
  padding: 40px;
  background: #EDEEF6;
  outline: 20px solid #FFFFFF;
  border-radius: 10px;

  .title {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 40px 0;
  }

  .body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 40px;

    @media(max-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }

    @media(max-width: 475px) {
      grid-template-columns: 1fr;
    }
  }

  .total {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    .name {
      font-size: 14px;
    }
    .value {
      font-size: 24px;
      font-weight: 600;
    }
  }
}
</style>