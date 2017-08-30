<style src="./Actions.scss" module lang="scss"></style>
<script src="./Actions.js"></script>

<template>
	<ul :class="$style.actions">
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
</template>

