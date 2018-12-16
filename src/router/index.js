import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full'
import Full2 from '@/containers/Full2'

// Views - Pages
import Page404 from '@/views/errorPages/Page404'
import Page500 from '@/views/errorPages/Page500'


/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  {
    path: '/pages', redirect: '/pages/p404', name: 'Pages',
    component: {
      render(c) { return c('router-view') }
      // Full,
    },
    children: [{ path: '404', name: 'Page404', component: _import('errorPages/Page404') },
    { path: '500', name: 'Page500', component: _import('errorPages/Page404') },
    ]
  }


]

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/',
    redirect: '/chatbot',
    name: '首页',
    component: Full,
    hidden: false,
    children: [
      { path: '/chatbot', name: 'Chatbot', icon: "android-desktop", component: _import('ChatBot') },
      { path: '/botdetail/:id', name: 'BotDetail', hidden: true, component: _import('BotDetail') },
      { path: '/createbot', name: 'CreateBot', hidden: true, component: _import('CreateBot') },
      { path: '/botaddgroup', name: 'BotAddGroup', hidden: true, component: _import('BotAddGroup') },

      { path: '/group', name: 'Group', icon: "android-contacts", component: _import('Group') },
      { path: '/groupdetail/:id', name: 'GroupDetail', hidden: true, component: _import('GroupDetail') },
      
      { path: '/service', name: 'Service', icon: "ios-paperplane", component: _import('Service') },
      { path: '/servdetail/:id', name: 'ServDetail', hidden: true, component: _import('ServDetail') },
    ]
  },
  { path: '*', redirect: '/pages/404', hidden: true }
];
