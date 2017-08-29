<style src="./BlockBar.scss" module lang="scss"></style>
<script src="./BlockBar.js"></script>

<template>
	<div :class="$style.wrapper">
		<div :class="$style.content">
			<div :class="$style.innerContent">
				<h2>BlockBar</h2>
				<p>(can contain sub blocks)</p>
			</div>
		</div>
		<div :class="$style.subBlocks" v-if="data.blocks">
			<component
				v-for="(block, index) in data.blocks"
				@isReady="handleBlockComponentReady"
				:scrollId="block.scrollId"
				:data="block.data"
				:debugLabel="true"
				:is="block.id"
				:componentId="block.id + '.' + block.blockIndex"
				:key="index"></component>
		</div>
	</div>
</template>
