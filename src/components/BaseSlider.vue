<template>
  <div class="base-slider">
    <div class="title"><span class="name">{{ props.name }}:</span> <span class="price">{{ formatValue(props.modelValue) }}</span></div>
    <input
        ref="slider"
        :value="sliderValue"
        @input="({ target }) => (sliderValue = parseFloat(target.value))"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="slider"
        :style="{ '--value': sliderValue, '--maxValue': max }"
    />
  </div>
</template>

<script setup>
import {ref, watchEffect} from "vue";
import {toPlural, toPrice} from "@/utils/common";

const props = defineProps({
  min: Number,
  max: Number,
  step: Number,
  modelValue: Number,
  name: String,
  type: String,
});

// define emits for the slider component
const emit = defineEmits(["update:modelValue"]);

const sliderValue = ref(props.modelValue);
const slider = ref(null);

const getProgress = (value, min, max) => {
  return ((value - min) / (max - min)) * 100;
};

const setCSSProgress = (progress) => {
  slider.value.style.setProperty("--ProgressPercent", `${progress}%`);
};

watchEffect(() => {
  if (slider.value) {
    emit("update:modelValue", sliderValue.value);

    const progress = getProgress(
        sliderValue.value,
        slider.value.min,
        slider.value.max
    );

    let extraWidth = (100 - progress) / 20;

    setCSSProgress(progress + extraWidth);
  }
});

const formatValue = (value) => {
  if (props.type === 'price') return toPrice.format(value);
  if (props.type === 'period') return `${value} ${toPlural(value)}`;
  if (props.type === 'percent') return `${value}%`
  return value;
}
</script>
<style lang="scss" scoped>
.title {
  .name {
    font-size: 14px;
  }
  .price {
    font-weight: 500;
  }
}

.base-slider {
  --trackHeight: 0.5rem;
  --thumbRadius: 1rem;
}

.base-slider input[type="range"] {
  position: relative;
  appearance: none;
  border-radius: 999px;
  z-index: 0;
  width: 100%;
}

.base-slider input[type="range"]::before {
  content: "";
  position: absolute;
  width: var(--ProgressPercent, 100%);
  height: 100%;
  background: #AF89FF;
  /* z-index: -1; */
  pointer-events: none;
  border-radius: 999px;
}

.base-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background: #FFFFFF;
  height: var(--trackHeight);
  border-radius: 999px;
}

.base-slider input[type="range"]::-moz-range-track {
  appearance: none;
  background: #FFFFFF;
  height: var(--trackHeight);
  border-radius: 999px;
}

.base-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  /* top: 50%; 
  transform: translate(0, -50%);
  */
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background: #FFFFFF;
  border: 4px solid #8C56FF;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
}
</style>