<script src="./ContentPage.js">
</script>

<template>
  <div class="wrapper">
    <component
      v-for="(block, index) in blocks"
      @isReady="handleBlockComponentReady"
      :scrollId="block.scrollId"
      :data="block.data"
      :is="block.id"
      :ref="block.id + '.' + block.blockIndex"
      :key="index"/>
  </div>
</template>
