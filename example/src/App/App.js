import Vue from 'vue';
import { AbstractRegistrableComponent } from 'vue-transition-component';

export default {
  name: 'App',
  extends: AbstractRegistrableComponent,
  data() {
    return {
      mobileMenuActive: false,
    };
  },
  methods: {
    handleToggleMenu() {
      this.mobileMenuActive = !this.mobileMenuActive;
    },
  },
};
