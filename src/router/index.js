import { createRouter, createWebHashHistory } from 'vue-router'
import { publicPath } from '../../vue.config';

const routes = [
  {
    path: '/',
    name: 'loginHome',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/LoginView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component:  () => import(/* webpackChunkName: "about" */ '../views/general/HomeView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/UsuarioView.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/ListUsersView.vue'),
  },
  {
    path: '/editUser/:id',
    name: 'editUser',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/EditUsuarioView.vue'),
  },
  {
    path: '/mycad',
    name: 'cadastro',
    component: () => import(/* webpackChunkName: "home" */ '../views/user/MyCadastroView.vue'), 
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/general/AboutView.vue'),
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: () => import(/* webpackChunkName: "home" */ '../views/user/ForgotView.vue'), 
  },
  {
    path: '/reset/:token',
    name: 'reset',
    component: () => import('../views/user/ResetView.vue'), 
  },
  {
    path: '/servidor',
    name: 'servidor',
    component: () => import(/* webpackChunkName: "user" */ '../views/servidor/ServidorView.vue'),
  },
  {
    path: '/servidores',
    name: 'servidores',
    component: () => import(/* webpackChunkName: "user" */ '../views/servidor/ListServidorView.vue'),
  },
  {
    path: '/editServidor/:id',
    name: 'editServidor',
    component: () => import(/* webpackChunkName: "user" */ '../views/servidor/EditServidorView.vue'),
  },
  {
    path: '/uniforme/:serv',
    name: 'uniforme',
    component: () => import(/* webpackChunkName: "user" */ '../views/uniforme/UniformeView.vue'),
  },
  {
    path: '/atividade',
    name: 'atividade',
    component: () => import(/* webpackChunkName: "user" */ '../views/atividade/AtividadeView.vue'),
  },
  {
    path: '/atividades',
    name: 'atividades',
    component: () => import(/* webpackChunkName: "user" */ '../views/atividade/ListAtividadeView.vue'),
  },
  {
    path: '/editAtividade/:id',
    name: 'editAtividade',
    component: () => import(/* webpackChunkName: "user" */ '../views/atividade/EditAtividadeView.vue'),
  },
  {
    path: '/laboratorio',
    name: 'laboratorio',
    component: () => import(/* webpackChunkName: "user" */ '../views/laboratorio/LaboratorioView.vue'),
  },
  {
    path: '/laboratorios',
    name: 'laboratorios',
    component: () => import(/* webpackChunkName: "user" */ '../views/laboratorio/ListLaboratorioView.vue'),
  },
  {
    path: '/editLaboratorio/:id',
    name: 'editLaboratorio',
    component: () => import(/* webpackChunkName: "user" */ '../views/laboratorio/EditLaboratorioView.vue'),
  },
  {
    path: '/planejamento',
    name: 'planejamento',
    component: () => import(/* webpackChunkName: "user" */ '../views/planejamento/PlanejamentoView.vue'),
  },
  {
    path: '/planejamentos',
    name: 'planejamentos',
    component: () => import(/* webpackChunkName: "user" */ '../views/planejamento/ListPlanejamentoView.vue'),
  },
  {
    path: '/editPlanejamento/:id',
    name: 'editPlanejamento',
    component: () => import(/* webpackChunkName: "user" */ '../views/planejamento/EditPlanejamentoView.vue'),
  },
  {
    path: '/financeiro',
    name: 'financeiro',
    component: () => import(/* webpackChunkName: "user" */ '../views/financeiro/FinanceiroView.vue'),
  },
  {
    path: '/financeiros',
    name: 'financeiros',
    component: () => import(/* webpackChunkName: "user" */ '../views/financeiro/ListFinanceiroView.vue'),
  },
  {
    path: '/editFinanceiro/:id',
    name: 'editFinanceiro',
    component: () => import(/* webpackChunkName: "user" */ '../views/financeiro/EditFinanceiroView.vue'),
  },
  {
    path: '/mainReport/:id',
    name: 'mainReport',
    component: () => import(/* webpackChunkName: "user" */ '../views/report/MainReportView.vue'),
  },
  {
    path: '/report/:id',
    name: 'report',
    component: () => import(/* webpackChunkName: "user" */ '../views/report/ReportView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  base: publicPath
})

export default router
