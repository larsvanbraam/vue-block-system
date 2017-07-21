<style src="./{{name_pc}}.scss" module lang="scss"></style>
<script src="./{{name_pc}}.js"></script>

<template>
	<div>
		<component
			v-for="(block, index) in blocks"
			@isReady="handleBlockComponentReady"
			:scrollId="block.scrollId"
			:data="block.data"
			:debugLabel="true"
			:is="block.id"
			:componentId="block.id + '.' + block.blockIndex"
			:key="index"></component>
	</div>
</template>
