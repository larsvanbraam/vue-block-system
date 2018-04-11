<script src="./ContentPage.js">
</script>

<template>
  <div>
    <div class="jumbotron">
      <h1>vue-block-system</h1>
      <p>The vue block system uses server side generated data to dynamically generate components in the client. This makes it possible to have a fully customizable frontend build.</p>
    </div>
    <h2>Page blocks:</h2>
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
