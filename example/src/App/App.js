import { AbstractRegistrableComponent } from 'vue-transition-component';

export default {
  name: 'App',
  extends: AbstractRegistrableComponent,
  data() {
    return {
      mobileMenuActive: false,
      pagePath: null,
    };
  },
  watch: {
    $route(value) {
      this.pagePath = value.path;
    },
  },
  methods: {
    handleAllComponentsReady() {
      this.pagePath = this.$router.currentRoute.path;
    },
    handleToggleMenu() {
      this.mobileMenuActive = !this.mobileMenuActive;
    },
  },
};
