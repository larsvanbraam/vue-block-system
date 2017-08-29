<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
	<div :class="$style.wrapper">
		<header :class="$style.header">
			<ul>
				<li v-for="(action, index) in actions">
					<ButtonMain
						v-if="action.type === ButtonType.LINK"
						:componentId="`ButtonMain-${index}`"
						:label="action.label"
						:title="action.title"
						:type="action.type"
						:link="action.link"
					/>
					<ButtonMain
						v-if="action.type === ButtonType.ACTION"
						@click="action.click"
						:componentId="`ButtonMain-${index}`"
						:label="action.label"
						:title="action.title"
						:type="action.type"
					/>
				</li>
			</ul>
		</header>
		<component
			v-for="(block, index) in blocks"
			@isReady="handleBlockComponentReady"
			:scrollId="block.scrollId"
			:data="block.data"
			:debugLabel="true"
			:is="block.id"
			:componentId="block.id + '.' + block.blockIndex"
			:key="index"/>
	</div>
</template>

