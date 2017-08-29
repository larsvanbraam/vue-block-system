<style src="./ButtonMain.scss" module lang="scss"></style>
<script src="./ButtonMain.js"></script>

<template>
	<button @click="handleClick" :title="this.title || ''">
		{{ label }}
	</button>
</template>
