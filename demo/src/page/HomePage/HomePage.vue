<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
	<div :class="$style.wrapper">
		<header :class="$style.header">
			<h1>vue-block-system</h1>
			<Actions :actions="headerActions"/>
		</header>
		<component
			v-for="(block, index) in blocks"
			@isReady="handleBlockComponentReady"
			:scrollId="block.scrollId"
			:data="block.data"
			:debugLabel="$config.getVariable(VariableNames.DEBUG_LABEL_ENABLED)"
			:is="block.id"
			:componentId="block.id + '.' + block.blockIndex"
			:key="index"/>

		<div :class="$style.note">
			<p>This demo contains two pages with dummy blocks and basic fade animations</p>
			<Actions :actions="noteActions"/>
		</div>
	</div>
</template>

