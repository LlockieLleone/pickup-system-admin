<template>
  <div>
    <div class="page-header">
      <h1>系统设置</h1>

      <el-button type="primary" @click="loadSettings">
        刷新
      </el-button>
    </div>

    <el-card style="margin-top: 20px;">
      <template #header>
        <strong>通知设置</strong>
      </template>

      <el-form label-width="180px">

        <el-form-item label="短信服务商">
          <el-select
            v-model="settingMap['sms.provider']"
            style="width: 240px;"
          >
            <el-option label="Mock 测试短信" value="mock" />
            <el-option label="阿里云短信" value="aliyun" />
          </el-select>
        </el-form-item>

        <el-form-item label="启用短信通知">
          <el-switch v-model="settingBooleanMap['notification.sms.enabled']" />
        </el-form-item>

        <el-form-item label="接到学生后通知">
          <el-switch v-model="settingBooleanMap['notification.event.picked_up']" />
        </el-form-item>

        <el-form-item label="到达托管后通知">
          <el-switch v-model="settingBooleanMap['notification.event.arrived']" />
        </el-form-item>

        <el-form-item label="家长接走后通知">
          <el-switch v-model="settingBooleanMap['notification.event.released']" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveNotificationSettings">
            保存通知设置
          </el-button>
        </el-form-item>

      </el-form>
    </el-card>

    <el-card style="margin-top: 20px;">
      <template #header>
        <strong>全部配置</strong>
      </template>

      <el-table
        :data="settings"
        v-loading="loading"
        style="width: 100%;"
      >
        <el-table-column prop="settingId" label="ID" width="80" />
        <el-table-column prop="settingKey" label="Key" min-width="220" />
        <el-table-column prop="settingValue" label="Value" min-width="160" />
        <el-table-column prop="description" label="说明" min-width="260" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import {
  getSettings,
  updateSetting
} from '../api/setting'

const settings = ref([])
const loading = ref(false)

const settingMap = reactive({})
const settingBooleanMap = reactive({})

onMounted(() => {
  loadSettings()
})

async function loadSettings() {
  loading.value = true

  try {
    settings.value = await getSettings()

    for (const item of settings.value) {
      settingMap[item.settingKey] = item.settingValue
      settingBooleanMap[item.settingKey] = item.settingValue === 'true'
    }

  } finally {
    loading.value = false
  }
}

async function saveNotificationSettings() {
  await updateSetting('sms.provider', {
    settingValue: settingMap['sms.provider'],
    description: '短信服务提供商'
  })

  await updateSetting('notification.sms.enabled', {
    settingValue: String(settingBooleanMap['notification.sms.enabled']),
    description: '是否启用短信通知'
  })

  await updateSetting('notification.event.picked_up', {
    settingValue: String(settingBooleanMap['notification.event.picked_up']),
    description: '学生被接到后是否通知家长'
  })

  await updateSetting('notification.event.arrived', {
    settingValue: String(settingBooleanMap['notification.event.arrived']),
    description: '学生到达托管后是否通知家长'
  })

  await updateSetting('notification.event.released', {
    settingValue: String(settingBooleanMap['notification.event.released']),
    description: '学生被接走后是否通知家长'
  })

  ElMessage.success('系统设置保存成功')

  await loadSettings()
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>