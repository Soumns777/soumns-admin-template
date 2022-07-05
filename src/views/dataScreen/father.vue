<script lang="ts" setup>
import Son from './son.vue';

const props = defineProps(['modelValue']);

console.log(props.modelValue, '💛💙 props bgColor');
</script>

<template>
  <div class="container">
    father
    <Son></Son>
  </div>
</template>

<style scoped lang="scss"></style>
