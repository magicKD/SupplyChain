import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import login from "@/pages/login";

// const login = r => require.ensure([], () => r(require('@/pages/login')), 'login');

const manage = r => require.ensure([], () => r(require('@/pages/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const userList = r => require.ensure([], () => r(require('@/pages/userList')), 'userList');
const addCompany = r => require.ensure([], () => r(require('@/pages/addCompany')), 'addShop');
const companyList = r => require.ensure([], () => r(require('@/pages/companyList')), 'companyList');
const addInvoice = r => require.ensure([], () => r(require('@/pages/addInvoice')), 'addInvoice');
const invoiceList = r => require.ensure([], () => r(require('@/pages/invoiceList')), 'invoiceList');
const distributeToken = r => require.ensure([], () => r(require('@/pages/distributeToken')), 'distributeToken');
const moneyBusiness = r => require.ensure([], () => r(require('@/pages/moneyBusiness')), 'moneyBusiness');
const wallet = r => require.ensure([], () => r(require('@/pages/wallet')), 'wallet');
const receivablePayement = r => require.ensure([], () => r(require('@/pages/receivablePayement')), 'receivablePayement');
const createPayment = r => require.ensure([], () => r(require('@/pages/createPayment')), 'createPayment');
const payablePayment = r => require.ensure([], () => r(require('@/pages/payablePayment')), 'payablePayment');
const transferPayment = r => require.ensure([], () => r(require('@/pages/transferPayment')), 'transferPayment');
const loanRequestList = r => require.ensure([], () => r(require('@/pages/loanRequestList')), 'loanRequestList');
const requestLoan = r => require.ensure([], () => r(require('@/pages/requestLoan')), 'requestLoan');
const loanList = r => require.ensure([], () => r(require('@/pages/loanList')), 'loanList');
const assetManagement = r => require.ensure([], () => r(require('@/pages/assetManagement')), 'assetManagement');
const assetList = r => require.ensure([], () => r(require('@/pages/assetList')), 'assetList');
//assetList

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:"/manage",
      component:manage,
      name: " ",
      children: [
        {
          path: '',
          component: home,
          meta: [],
        },
        {
          path: '/userList',
          component: userList,
          meta: ['数据管理', '用户列表'],
        },
        {
          path: '/addShop',
          component: addCompany,
          meta: ['添加数据', '添加公司'],
        },
        {
          path: "/companyList",
          component: companyList,
          meta: ['数据管理', '公司列表'],
        },
        {
          path: "/addInvoice",
          component: addInvoice,
          meta: ['添加数据', '添加发票'],
        },
        {
          path: "/invoiceList",
          component: invoiceList,
          meta: ['数据管理', '发票列表'],
        },
        {
          path: "/distributeToken",
          component: distributeToken,
          meta: ['银行业务', '资产鉴定'],
        },
        {
          path: "/moneyBusiness",
          component: moneyBusiness,
          meta: ['银行业务', '存款/取款'],
        },
        {
          path: "/loanRequestList",
          component: loanRequestList,
          meta: ['银行业务', '贷款请求处理'],
        },
        {
          path: "/wallet",
          component: wallet,
          meta: ['资金管理', '现有资产'],
        },
        {
          path: "/receivablePayement",
          component: receivablePayement,
          meta: ['资金管理', '应收账款'],
        },
        {
          path: "/createPayment",
          component:createPayment,
          meta: ['资金管理', '创建应收账款'],
        },
        {
          path: "/payablePayment",
          component: payablePayment,
          meta: ['资金管理', '应还账款'],
        },
        {
          path: "/transferPayment",
          component: transferPayment,
          meta: ['资金管理', '转移应收账款'],
        },
        {
          path: "/requestLoan",
          component: requestLoan,
          meta: ['资金管理', '申请贷款'],
        },
        {
          path: "/loanList",
          component: loanList,
          meta: ['银行业务', '贷款列表'],
        },
        {
          path: "/assetManagement",
          component: assetManagement,
          meta: ['银行业务', '入池质押'],
        },
        {
          path: "/assetList",
          component: assetList,
          meta: ['银行业务', '资产列表'],
        }
      ]
    }
  ]
})
