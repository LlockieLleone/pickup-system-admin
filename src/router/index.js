import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import StudentView from '../views/StudentView.vue'
import TeacherView from '../views/TeacherView.vue'
import GuardianView from '../views/GuardianView.vue'
import EnrollmentView from '../views/EnrollmentView.vue'
import TaskView from '../views/TaskView.vue'
import NotificationView from '../views/NotificationView.vue'
import SettingView from '../views/SettingView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardView
  },
  {
    path: '/students',
    component: StudentView
  },
  {
    path: '/teachers',
    component: TeacherView
  },
  {
    path: '/guardians',
    component: GuardianView
  },
  {
    path: '/enrollments',
    component: EnrollmentView
  },
  {
    path: '/tasks',
    component: TaskView
  },
  {
    path: '/notifications',
    component: NotificationView
  },
  {
    path: '/settings',
    component: SettingView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router