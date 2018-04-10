<script src="./DummyBlockA.js"></script>

<template>
  <div :class="['panel',`panel-${data.theme}`]">
    <div class="panel-heading">
      <h3 class="panel-title">DummyComponentA</h3>
    </div>
    <div class="panel-body">
      <div v-html="data.copy"></div>
      <DummyButton
        ref="DummyButton"
        :theme="data.theme"
        v-if="data.cta"
        type="button-type-link"
        :label="data.cta.label"
        :title="data.cta.title"
        :link="{type: data.cta.type, target: data.cta.target}"
      />
    </div>
  </div>
</template>
