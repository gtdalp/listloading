/* jshint esversion: 6 */
/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import listLoading from '@/widget/listloading/listloading.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'listLoading',
      component: listLoading
    }
  ]
});
