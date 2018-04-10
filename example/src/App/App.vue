<script src="./App.js">
</script>

<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link :to="{path: '/home'}" class="navbar-brand">vue-transition-component</router-link>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
