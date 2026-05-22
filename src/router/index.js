import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from '../layouts/AdminLayout.vue'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import StudentView from '../views/StudentView.vue'
import TeacherView from '../views/TeacherView.vue'
import GuardianView from '../views/GuardianView.vue'
import EnrollmentView from '../views/EnrollmentView.vue'
import TaskView from '../views/TaskView.vue'
import NotificationView from '../views/NotificationView.vue'
import SettingView from '../views/SettingView.vue'
import AttendanceExceptionView from '../views/AttendanceExceptionView.vue'
import EventLogView from '../views/EventLogView.vue'
import CardView from '../views/CardView.vue'

const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard',
    children: [
        {
            path: 'dashboard',
            component: DashboardView
        },
        {
            path: 'students',
            component: StudentView
        },
        {
            path: 'guardians',
            component: GuardianView
        },
        {
            path: 'teachers',
            component: TeacherView
        },
        {
            path: 'enrollments',
            component: EnrollmentView
        },
        {
            path: 'tasks',
            component: TaskView
        },
        {
            path: 'notifications',
            component: NotificationView
        },
        {
            path: 'settings',
            component: SettingView
        },
        {
            path: 'attendance-exceptions',
            component: AttendanceExceptionView
        },
        {
            path: 'events',
            component: EventLogView
        },
        {
            path: 'cards',
            component: CardView
        }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('admin_token')

  if (to.path === '/login') {
    next()
    return
  }

  if (!token) {
    next('/login')
    return
  }

  next()
})

export default router