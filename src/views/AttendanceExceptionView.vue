<template>
  <div>
    <div class="page-header">
      <h1>请假 / 自接管理</h1>

      <el-button type="primary" @click="openCreateDialog">
        新增异常
      </el-button>
    </div>

    <el-table
      :data="exceptions"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <el-table-column prop="exceptionId" label="ID" width="80" />
      <el-table-column prop="studentId" label="学生ID" />
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="type" label="类型">
        <template #default="{ row }">
          <el-tag :type="getTypeTag(row.type)">
            {{ getTypeText(row.type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="newPickupTime" label="新时间" />
      <el-table-column prop="newTeacherId" label="新老师ID" />
      <el-table-column prop="note" label="备注" />
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      title="新增请假 / 自接"
      width="600px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="学生">
          <el-select
            v-model="form.studentId"
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
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="选择日期"
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item label="类型">
          <el-select
            v-model="form.type"
            placeholder="请选择类型"
            style="width: 100%;"
          >
            <el-option label="请假" value="LEAVE" />
            <el-option label="家长自接" value="PARENT_PICKUP" />
            <el-option label="修改时间" value="TIME_CHANGE" />
            <el-option label="修改老师" value="TEACHER_CHANGE" />
            <el-option label="修改时间和老师" value="TIME_AND_TEACHER_CHANGE" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="form.type === 'TIME_CHANGE' || form.type === 'TIME_AND_TEACHER_CHANGE'"
          label="新时间"
        >
          <el-time-picker
            v-model="form.newPickupTime"
            value-format="HH:mm:ss"
            placeholder="选择新时间"
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item
          v-if="form.type === 'TEACHER_CHANGE' || form.type === 'TIME_AND_TEACHER_CHANGE'"
          label="新老师"
        >
          <el-select
            v-model="form.newTeacherId"
            placeholder="请选择新老师"
            style="width: 100%;"
          >
            <el-option
              v-for="teacher in teachers"
              :key="teacher.teacherId"
              :label="`${teacher.name} - ${teacher.phone}`"
              :value="teacher.teacherId"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="form.note"
            type="textarea"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>

        <el-button type="primary" @click="submitCreate">
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import {
  createAttendanceException,
  getAttendanceExceptions
} from '../api/attendanceException'

import { getStudents } from '../api/student'
import { getTeachers } from '../api/teacher'

const exceptions = ref([])
const students = ref([])
const teachers = ref([])
const loading = ref(false)
const dialogVisible = ref(false)

const form = reactive({
  studentId: null,
  date: '',
  type: '',
  newPickupTime: null,
  newTeacherId: null,
  note: ''
})

onMounted(() => {
  loadExceptions()
})

async function loadExceptions() {
  loading.value = true

  try {
    exceptions.value = await getAttendanceExceptions()
  } finally {
    loading.value = false
  }
}

async function openCreateDialog() {
  form.studentId = null
  form.date = getToday()
  form.type = ''
  form.newPickupTime = null
  form.newTeacherId = null
  form.note = ''

  students.value = await getStudents()
  teachers.value = await getTeachers()

  dialogVisible.value = true
}

async function submitCreate() {
  if (!form.studentId) {
    ElMessage.warning('请选择学生')
    return
  }

  if (!form.date) {
    ElMessage.warning('请选择日期')
    return
  }

  if (!form.type) {
    ElMessage.warning('请选择类型')
    return
  }

  if (
    (form.type === 'TIME_CHANGE' || form.type === 'TIME_AND_TEACHER_CHANGE') &&
    !form.newPickupTime
  ) {
    ElMessage.warning('请选择新时间')
    return
  }

  if (
    (form.type === 'TEACHER_CHANGE' || form.type === 'TIME_AND_TEACHER_CHANGE') &&
    !form.newTeacherId
  ) {
    ElMessage.warning('请选择新老师')
    return
  }

  await createAttendanceException({
    studentId: form.studentId,
    date: form.date,
    type: form.type,
    newPickupTime: form.newPickupTime,
    newTeacherId: form.newTeacherId,
    note: form.note
  })

  ElMessage.success('保存成功')
  dialogVisible.value = false
  await loadExceptions()
}

function getToday() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getTypeText(type) {
  const map = {
    LEAVE: '请假',
    PARENT_PICKUP: '家长自接',
    TIME_CHANGE: '修改时间',
    TEACHER_CHANGE: '修改老师',
    TIME_AND_TEACHER_CHANGE: '修改时间和老师'
  }

  return map[type] || type
}

function getTypeTag(type) {
  const map = {
    LEAVE: 'info',
    PARENT_PICKUP: 'warning',
    TIME_CHANGE: 'primary',
    TEACHER_CHANGE: 'primary',
    TIME_AND_TEACHER_CHANGE: 'success'
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
</style>