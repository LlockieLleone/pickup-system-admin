<template>
  <div>
    <div class="page-header">
      <h1>每日任务</h1>

      <div class="actions">
        <el-date-picker
          v-model="selectedDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="选择日期"
        />

        <el-button type="primary" @click="loadTasks">
          查询
        </el-button>

        <el-button type="success" @click="handleGenerateTasks">
          生成任务
        </el-button>
      </div>
    </div>

    <el-table
      :data="tasks"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <el-table-column prop="taskId" label="任务ID" width="90" />
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="studentId" label="学生ID" />
      <el-table-column prop="school" label="学校" />
      <el-table-column prop="assignedTeacherId" label="老师ID" />
      <el-table-column prop="expectedPickupTime" label="预计时间" />
      <el-table-column prop="generatedFrom" label="来源" />

      <el-table-column prop="currentStatus" label="状态">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.currentStatus)">
            {{ getStatusText(row.currentStatus) }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { generateTasks, getTasks } from '../api/task'

const tasks = ref([])
const loading = ref(false)

const selectedDate = ref(getToday())

onMounted(() => {
  loadTasks()
})

function getToday() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

async function loadTasks() {
  loading.value = true

  try {
    tasks.value = await getTasks(selectedDate.value)
  } finally {
    loading.value = false
  }
}

async function handleGenerateTasks() {
  const count = await generateTasks(selectedDate.value)

  ElMessage.success(`已生成 ${count} 条任务`)

  await loadTasks()
}

function getStatusText(status) {
  const map = {
    PENDING_PICKUP: '待接',
    PICKED_UP: '已接到',
    ARRIVED: '已到托管',
    RELEASED: '已接走',
    LEAVE: '请假',
    PARENT_PICKUP: '家长自接',
    EXCEPTION: '异常'
  }

  return map[status] || status
}

function getStatusTagType(status) {
  const map = {
    PENDING_PICKUP: 'warning',
    PICKED_UP: 'primary',
    ARRIVED: 'success',
    RELEASED: 'info',
    LEAVE: 'info',
    PARENT_PICKUP: 'info',
    EXCEPTION: 'danger'
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
  align-items: center;
  gap: 12px;
}
</style>