<script src="./DummyButton.js"></script>

<template>
  <a @click="handleClick" :class="['btn', `btn-${theme}`]" v-html="label"></a>
</template>
