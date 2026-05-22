<template>
  <div>
    <div class="page-header">
      <h1>首页概览</h1>

      <div class="actions">
        <el-date-picker
          v-model="selectedDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="选择日期"
        />

        <el-button type="primary" @click="loadSummary">
          查询
        </el-button>
      </div>
    </div>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="6">
        <el-card>
          <div class="stat-title">今日任务总数</div>
          <div class="stat-number">{{ summary.total }}</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <div class="stat-title">待接</div>
          <div class="stat-number warning">{{ summary.pendingPickup }}</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <div class="stat-title">已接到</div>
          <div class="stat-number primary">{{ summary.pickedUp }}</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <div class="stat-title">已到托管</div>
          <div class="stat-number success">{{ summary.arrived }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="6">
        <el-card>
          <div class="stat-title">已接走</div>
          <div class="stat-number info">{{ summary.released }}</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <div class="stat-title">请假</div>
          <div class="stat-number info">{{ summary.leave }}</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <div class="stat-title">家长自接</div>
          <div class="stat-number info">{{ summary.parentPickup }}</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <div class="stat-title">异常</div>
          <div class="stat-number danger">{{ summary.exception }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getDashboardSummary } from '../api/dashboard'

const selectedDate = ref(getToday())

const summary = reactive({
  total: 0,
  pendingPickup: 0,
  pickedUp: 0,
  arrived: 0,
  released: 0,
  leave: 0,
  parentPickup: 0,
  exception: 0
})

onMounted(() => {
  loadSummary()
})

async function loadSummary() {
  const data = await getDashboardSummary(selectedDate.value)

  summary.total = data.total
  summary.pendingPickup = data.pendingPickup
  summary.pickedUp = data.pickedUp
  summary.arrived = data.arrived
  summary.released = data.released
  summary.leave = data.leave
  summary.parentPickup = data.parentPickup
  summary.exception = data.exception
}

function getToday() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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

.stat-title {
  color: #6b7280;
  font-size: 14px;
}

.stat-number {
  margin-top: 12px;
  font-size: 36px;
  font-weight: bold;
}

.warning {
  color: #e6a23c;
}

.primary {
  color: #409eff;
}

.success {
  color: #67c23a;
}

.info {
  color: #909399;
}

.danger {
  color: #f56c6c;
}
</style>