<style src="./ButtonMain.scss" module lang="scss"></style>
<script src="./ButtonMain.js"></script>

<template>
	<div :class="$style.button">
		<button @click="handleClick" :title="this.title || ''" v-if="this.type === ButtonType.ACTION">
			{{ label }}
		</button>
		<a @click="handleClick" :href="this.link.target" :title="this.title || ''" v-if="this.type === ButtonType.LINK">
			{{ label }}
		</a>
	</div>
</template>
