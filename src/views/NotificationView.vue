<template>
  <div>
    <div class="page-header">
      <h1>通知记录</h1>

      <div class="actions">
        <el-input
          v-model="studentId"
          placeholder="输入学生ID查询"
          style="width: 180px;"
          clearable
        />

        <el-button type="primary" @click="searchByStudent">
          查询
        </el-button>

        <el-button @click="loadNotifications">
          全部
        </el-button>
      </div>
    </div>

    <el-table
      :data="notifications"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <el-table-column prop="notificationId" label="ID" width="80" />
      <el-table-column prop="studentId" label="学生ID" width="90" />
      <el-table-column prop="eventId" label="事件ID" width="90" />
      <el-table-column prop="channel" label="渠道" width="100" />

      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusTag(row.status)">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="recipientPhone" label="接收手机号" width="140" />
      <el-table-column prop="content" label="通知内容" min-width="280" />
      <el-table-column prop="errorMessage" label="错误信息" min-width="180" />
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column prop="sentAt" label="发送时间" width="180" />
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

import {
  getNotifications,
  getNotificationsByStudent
} from '../api/notification'

const notifications = ref([])
const loading = ref(false)
const studentId = ref('')

onMounted(() => {
  loadNotifications()
})

async function loadNotifications() {
  loading.value = true

  try {
    notifications.value = await getNotifications()
  } finally {
    loading.value = false
  }
}

async function searchByStudent() {
  if (!studentId.value) {
    ElMessage.warning('请输入学生ID')
    return
  }

  loading.value = true

  try {
    notifications.value = await getNotificationsByStudent(studentId.value)
  } finally {
    loading.value = false
  }
}

function getStatusText(status) {
  const map = {
    SUCCESS: '成功',
    FAILED: '失败',
    PENDING: '待发送'
  }

  return map[status] || status
}

function getStatusTag(status) {
  const map = {
    SUCCESS: 'success',
    FAILED: 'danger',
    PENDING: 'warning'
  }

  return map[status] || 'info'
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>