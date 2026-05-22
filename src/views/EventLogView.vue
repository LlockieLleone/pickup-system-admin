<template>
  <div>
    <div class="page-header">
      <h1>事件记录</h1>

      <div class="actions">
        <el-input
          v-model="studentId"
          placeholder="学生ID"
          style="width: 160px;"
          clearable
        />

        <el-button type="primary" @click="searchByStudent">
          按学生查询
        </el-button>

        <el-input
          v-model="taskId"
          placeholder="任务ID"
          style="width: 160px;"
          clearable
        />

        <el-button type="success" @click="searchByTask">
          按任务查询
        </el-button>
      </div>
    </div>

    <el-table
      :data="events"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <el-table-column prop="eventId" label="事件ID" width="90" />
      <el-table-column prop="taskId" label="任务ID" width="90" />
      <el-table-column prop="studentId" label="学生ID" width="90" />

      <el-table-column prop="eventType" label="事件类型" width="140">
        <template #default="{ row }">
          <el-tag :type="getEventTag(row.eventType)">
            {{ getEventText(row.eventType) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="operatorId" label="操作人ID" width="100" />
      <el-table-column prop="location" label="地点" />
      <el-table-column prop="source" label="来源" width="120" />
      <el-table-column prop="note" label="备注" />
      <el-table-column prop="timestamp" label="时间" width="190" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import {
  getEventsByStudent,
  getEventsByTask
} from '../api/event'

const events = ref([])
const loading = ref(false)

const studentId = ref('')
const taskId = ref('')

async function searchByStudent() {
  if (!studentId.value) {
    ElMessage.warning('请输入学生ID')
    return
  }

  loading.value = true

  try {
    events.value = await getEventsByStudent(studentId.value)
  } finally {
    loading.value = false
  }
}

async function searchByTask() {
  if (!taskId.value) {
    ElMessage.warning('请输入任务ID')
    return
  }

  loading.value = true

  try {
    events.value = await getEventsByTask(taskId.value)
  } finally {
    loading.value = false
  }
}

function getEventText(type) {
  const map = {
    PICKED_UP: '已接到',
    ARRIVED: '已到托管',
    RELEASED: '已接走',
    EXCEPTION: '异常',
    MANUAL_CORRECTION: '人工修正'
  }

  return map[type] || type
}

function getEventTag(type) {
  const map = {
    PICKED_UP: 'primary',
    ARRIVED: 'success',
    RELEASED: 'info',
    EXCEPTION: 'danger',
    MANUAL_CORRECTION: 'warning'
  }

  return map[type] || 'info'
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
  align-items: center;
  gap: 12px;
}
</style>