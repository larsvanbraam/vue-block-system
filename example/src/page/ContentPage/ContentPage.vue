<script src="./ContentPage.js">
</script>

<template>
  <div>
    <component
      v-for="(block, index) in blocks"
      @isReady="handleBlockComponentReady"
      :scrollId="block.scrollId"
      :data="block.data"
      :debugLabel="true"
      :is="block.id"
      :ref="block.id + '.' + block.blockIndex"
      :key="index"/>
  </div>
</template>
