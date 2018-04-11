<script src="./App.js">
</script>

<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" @click="handleToggleMenu">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link :to="{path: '/home'}" class="navbar-brand">vue-block-system</router-link>
        </div>
        <div :class="['collapse', 'navbar-collapse', {'collapse in': mobileMenuActive}]" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li :class="[{'active': pagePath === '/home' || pagePath === '/'}]">
              <router-link :to="{path: '/home'}">Home</router-link>
            </li>
            <li :class="[{'active': pagePath === '/code'}]">
              <router-link :to="{path: '/code'}">Code</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
