import Vue from 'vue'
import Router from 'vue-router'
// 登录
import Login from '@/view/login/login'
//进入主页
import ProjectHome from '@/view/common/ProjectHome'
import TaskHome from '@/view/common/TaskHome'
import Boss from '@/view/page/Project'
import Manager from '@/view/page/Task'

//站内信
import PrivateMsg from '@/view/page/message/privateMsg'
//任务列表
import TaskTable from '@/view/page/task/taskTable'
import BasicInfo from '@/view/page/task/taskCheck'
import Feedback from '@/view/page/task/taskFeedback'
//客户管理
import ClientAdmin from '@/view/page/boss/clientadmin/clientAdmin'
import ClientCheck from '@/view/page/boss/clientadmin/clientCheck'
import ClientRedact from '@/view/page/boss/clientadmin/clientRedact'
import ClientAdd from '@/view/page/boss/clientadmin/clientAdd'
//项目列表
import ProjectCheck from '@/view/page/boss/project/projectCheck'
import ProjectAdd from '@/view/page/boss/project/projectAdd'
import ProjectAdmin from '@/view/page/boss/project/projectAdmin'
import ProjectRedact from '@/view/page/boss/project/projectRedact'
//账号管理
import Account from '@/view/page/boss/accountadmin/account'
import AddAccount from '@/view/page/boss/accountadmin/addAccount'
import AccountRedact from '@/view/page/boss/accountadmin/accountRedact'
//产品经理查看详情
import ManagerDetail from '@/view/page/manager/managerDetail/checkDetail'
import ManagerProject from '@/view/page/manager/managerProject'
//客户查看详情
import Customertask from '@/view/page/customer/customerTask'
import ClientDetail from '@/view/page/customer/customerDetail/checkDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/boss',
      name: 'projectHome',
      component: ProjectHome,
      children:[
        {
          path:'/',
          component:Boss
        },
        {
          path:'/msg',
          component:PrivateMsg
        },
        {
          path:'/admintask',
          component:TaskTable
        },
        {
          path:'/basic',
          component:BasicInfo
        },
        {
          path:'/feedback',
          component:Feedback
        },
        {
          path:'/clientcheck',
          component:ClientCheck
        },
        {
          path:'/clientredact',
          component:ClientRedact
        },
        {
          path:'/clientadd',
          component:ClientAdd
        },
        {
          path:'/pcheck',
          component:ProjectCheck
        },
        {
          path:'/projectadd',
          component:ProjectAdd
        },
        {
          path:'/projectredact',
          component:ProjectRedact
        },
        {
          path:'/adminaccount',
          component:Account
        },
        {
          path:'/addaccount',
          component:AddAccount
        },
        {
          path:'/accountRedact',
          component:AccountRedact
        },
        {
          path:'/adminclient',
          component:ClientAdmin
        },
        {
          path:'/adminproject',
          component:ProjectAdmin
        },
        {
          path:'/managerdetail',
          component:ManagerDetail,
        },
        {
          path:'/managerproject',
          component:ManagerProject,
        },
        
      

      ]
    },
    {
      path: '/department',
      name:'taskHome',
      component:TaskHome,
      children:[
        {
          path:'/',
          component:Manager
        },
        {
          path:'/admintask/:id',
          component:TaskTable
        },
        {
          path:'/basic',
          component:BasicInfo
        },
        {
          path:'/feedback',
          component:Feedback
        },
        {
          path:'/customertask',
          component:Customertask
        },
        {
          path:'/msg',
          component:PrivateMsg
        },
        {
          path:'/clientdetail',
          component:ClientDetail,
        },
      ]
    },
    
  ]
})
