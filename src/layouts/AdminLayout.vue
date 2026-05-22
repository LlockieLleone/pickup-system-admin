<template>
  <div class="layout">

    <aside class="sidebar">

      <div class="logo">
        托管管理后台
      </div>

      <el-menu
          router
          :default-active="$route.path"
          class="menu"
      >

        <el-menu-item index="/dashboard">
          首页
        </el-menu-item>

        <el-menu-item index="/students">
          学生管理
        </el-menu-item>

        <el-menu-item index="/guardians">
          家长管理
        </el-menu-item>

        <el-menu-item index="/teachers">
          老师管理
        </el-menu-item>

        <el-menu-item index="/enrollments">
          托管计划
        </el-menu-item>

        <el-menu-item index="/tasks">
          每日任务
        </el-menu-item>

        <el-menu-item index="/notifications">
          通知记录
        </el-menu-item>

        <el-menu-item index="/events">
          事件记录
        </el-menu-item>

        <el-menu-item index="/cards">
          卡片管理
        </el-menu-item>

        <el-menu-item index="/attendance-exceptions">
          请假 / 自接
        </el-menu-item>

        <el-menu-item index="/settings">
          系统设置
        </el-menu-item>
      </el-menu>

    </aside>

    <div class="content-area">

      <header class="topbar">

        <div class="page-title">
          管理后台
        </div>

        <div class="topbar-right">

          <span class="admin-name">
            {{ adminName }}
          </span>

          <el-button
            type="danger"
            size="small"
            @click="logout"
          >
            退出
          </el-button>

        </div>

      </header>

      <main class="main-content">
        <router-view />
      </main>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const adminName = computed(() => {
  return window.localStorage.getItem('admin_name') || '管理员'
})

function logout() {
  window.localStorage.removeItem('admin_token')
  window.localStorage.removeItem('admin_name')
  router.push('/login')
}
</script>

<style scoped>

.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #f3f4f6;
}

.sidebar {
  width: 240px;
  background: #111827;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 24px;

  color: white;
  font-size: 22px;
  font-weight: 700;

  flex-shrink: 0;

  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.menu {
  border-right: none;
  background: transparent;
  flex: 1;
}

.menu :deep(.el-menu-item) {
  color: #d1d5db;
  height: 52px;
  font-size: 15px;
}

.menu :deep(.el-menu-item:hover) {
  background: #1f2937;
}

.menu :deep(.is-active) {
  background: #2563eb;
  color: white;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topbar {
  height: 64px;
  background: white;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;

  border-bottom: 1px solid #e5e7eb;

  flex-shrink: 0;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.admin-name {
  color: #374151;
  font-size: 14px;
}

.main-content {
  flex: 1;
  overflow: auto;
  padding: 24px;
}

</style>