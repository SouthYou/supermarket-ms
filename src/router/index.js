import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'el-icon-house' }
    }]
  }
]

/**
 * adminRoutes
 * 系统管理员特有权限
 */
export const adminRoutes = [
  {
    path: '/goods',
    component: Layout,
    children: [{
      path: '',
      name: 'Goods',
      component: () => import('@/views/admin/goods-manage/index'),
      meta: { title: '商品管理（开发）', icon: 'el-icon-goods' }
    }]
  },

  {
    path: '/stock',
    component: Layout,
    children: [{
      path: '',
      name: 'Stock',
      component: () => import('@/views/admin/stock-manage/index'),
      meta: { title: '库存管理（开发）', icon: 'el-icon-truck' }
    }]
  },
  
  {
    path: '/sales',
    component: Layout,
    children: [{
      path: '',
      name: 'Sales',
      component: () => import('@/views/admin/sales-record/index'),
      meta: { title: '销售记录（开发）', icon: 'el-icon-edit-outline' }
    }]
  },

  {
    path: '/finance',
    component: Layout,
    children: [{
      path: '',
      name: 'Finance',
      component: () => import('@/views/admin/finance-manage/index'),
      meta: { title: '财务管理（开发）', icon: 'el-icon-money' }
    }]
  },
  ////////////////////////////////////////////////////////
  ///////////////////以下为历史项目遗留////////////////////
  ////////////////////////////////////////////////////////
  {
    path: '/news',
    component: Layout,
    children: [{
      path: 'index',
      name: 'News',
      component: () => import('@/views/demo/news/index'),
      meta: { title: '考试新闻管理', icon: 'el-icon-news' }
    }]
  },

  {
    path: '/exam',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Exam',
      component: () => import('@/views/demo/exam/index'),
      meta: { title: '考试信息设置', icon: 'el-icon-setting' }
    }]
  },

  {
    path: '/log',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Log',
      component: () => import('@/views/demo/logging/index'),
      meta: { title: '日志管理', icon: 'el-icon-notebook-2' }
    }]
  },

  {
    path: '/site',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Site',
      component: () => import('@/views/demo/site/index'),
      meta: { title: '考点管理', icon: 'el-icon-location-information' }
    }]
  },

  {
    path: '/session',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Session',
      component: () => import('@/views/demo/session/index'),
      meta: { title: '场次管理', icon: 'el-icon-alarm-clock' }
    }]
  },

  {
    path: '/invigilator',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Invigilator',
      component: () => import('@/views/demo/invigilator/index'),
      meta: { title: '监考教师管理', icon: 'el-icon-user' }
    }]
  },

  {
    path: '/arrange',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Arrange',
      component: () => import('@/views/demo/arrange/index'),
      meta: { title: '考试安排管理', icon: 'el-icon-date' }
    }]
  },

  {
    path: '/score',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Score',
      component: () => import('@/views/demo/score/index'),
      meta: { title: '成绩导入', icon: 'el-icon-upload2' }
    }]
  },

  {
    path: '/status',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Status',
      component: () => import('@/views/demo/status/index'),
      meta: { title: '考试状态管理', icon: 'el-icon-s-operation' }
    }]
  },

  {
    path: '/enroll',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Enroll',
      component: () => import('@/views/demo/enroll/index'),
      meta: { title: '报考信息管理', icon: 'el-icon-document' }
    }]
  },

  {
    path: '/apply',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Apply',
      component: () => import('@/views/demo/apply/index'),
      meta: { title: '修改申请审核', icon: 'el-icon-coordinate' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
