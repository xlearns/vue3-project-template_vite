<template>
	<div id="app">
		<router-view />
	</div>
</template>
<style lang="scss">
* {
	margin: 0;
	padding: 0;
}
html,
body {
	width: 100%;
	height: 100%;
	background-color: #f9f8fd;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	width: 100%;
	height: 100%;
	min-width: 1250px;
}
</style>
