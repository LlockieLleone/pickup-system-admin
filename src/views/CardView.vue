<template>
  <div>
    <div class="page-header">
      <h1>卡片管理</h1>

      <el-button type="primary" @click="openCreateDialog">
        新增卡片
      </el-button>
    </div>

    <el-alert
      title="当前系统主流程使用手动确认，卡片/NFC功能仅作为技术预留。"
      type="info"
      show-icon
      style="margin-top: 16px;"
    />

    <el-table
      :data="cards"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <el-table-column prop="cardId" label="卡片ID" width="90" />
      <el-table-column prop="uid" label="UID" />
      <el-table-column prop="type" label="类型" width="100" />
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column prop="assignedStudentId" label="绑定学生ID" width="130" />

      <el-table-column label="操作" width="160">
        <template #default="{ row }">
          <el-button size="small" @click="openBindDialog(row)">
            绑定学生
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="createDialogVisible"
      title="新增卡片"
      width="500px"
    >
      <el-form :model="createForm" label-width="80px">
        <el-form-item label="UID">
          <el-input v-model="createForm.uid" placeholder="请输入卡片UID" />
        </el-form-item>

        <el-form-item label="类型">
          <el-select v-model="createForm.type" style="width: 100%;">
            <el-option label="RFID" value="RFID" />
            <el-option label="NFC" value="NFC" />
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="createForm.status" style="width: 100%;">
            <el-option label="启用" value="ACTIVE" />
            <el-option label="丢失" value="LOST" />
            <el-option label="停用" value="DISABLED" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCreate">保存</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="bindDialogVisible"
      title="绑定学生"
      width="500px"
    >
      <div v-if="currentCard">
        <p>卡片 UID：{{ currentCard.uid }}</p>

        <el-select
          v-model="selectedStudentId"
          placeholder="请选择学生"
          style="width: 100%;"
        >
          <el-option
            v-for="student in students"
            :key="student.studentId"
            :label="`${student.name} - ${student.school}`"
            :value="student.studentId"
          />
        </el-select>
      </div>

      <template #footer>
        <el-button @click="bindDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitBind">绑定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import { bindCardToStudent, createCard, getCards } from '../api/card'
import { getStudents } from '../api/student'

const cards = ref([])
const students = ref([])
const loading = ref(false)

const createDialogVisible = ref(false)
const bindDialogVisible = ref(false)

const currentCard = ref(null)
const selectedStudentId = ref(null)

const createForm = reactive({
  uid: '',
  type: 'RFID',
  status: 'ACTIVE'
})

onMounted(() => {
  loadCards()
})

async function loadCards() {
  loading.value = true

  try {
    cards.value = await getCards()
  } finally {
    loading.value = false
  }
}

function openCreateDialog() {
  createForm.uid = ''
  createForm.type = 'RFID'
  createForm.status = 'ACTIVE'
  createDialogVisible.value = true
}

async function submitCreate() {
  if (!createForm.uid) {
    ElMessage.warning('请输入卡片UID')
    return
  }

  await createCard({
    uid: createForm.uid,
    type: createForm.type,
    status: createForm.status
  })

  ElMessage.success('卡片创建成功')
  createDialogVisible.value = false
  await loadCards()
}

async function openBindDialog(card) {
  currentCard.value = card
  selectedStudentId.value = card.assignedStudentId || null
  students.value = await getStudents()
  bindDialogVisible.value = true
}

async function submitBind() {
  if (!selectedStudentId.value) {
    ElMessage.warning('请选择学生')
    return
  }

  await bindCardToStudent(selectedStudentId.value, currentCard.value.cardId)

  ElMessage.success('绑定成功')
  bindDialogVisible.value = false
  await loadCards()
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>