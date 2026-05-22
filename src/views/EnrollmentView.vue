<template>
  <div>
    <div class="page-header">
      <h1>托管计划</h1>

      <el-button type="primary" @click="openCreateDialog">
        新增托管计划
      </el-button>
    </div>

    <el-table
      :data="enrollments"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <el-table-column prop="enrollmentId" label="ID" width="80" />
      <el-table-column prop="studentId" label="学生ID" />
      <el-table-column prop="weekdays" label="托管星期" />
      <el-table-column prop="startDate" label="开始日期" />
      <el-table-column prop="endDate" label="结束日期" />
      <el-table-column prop="defaultPickupTime" label="默认接送时间" />
      <el-table-column prop="defaultTeacherId" label="默认老师ID" />
      <el-table-column prop="active" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.active ? 'success' : 'info'">
            {{ row.active ? '启用' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      title="新增托管计划"
      width="600px"
    >
      <el-form :model="form" label-width="110px">
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

        <el-form-item label="负责老师">
          <el-select
            v-model="form.defaultTeacherId"
            placeholder="请选择老师"
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

        <el-form-item label="托管星期">
          <el-checkbox-group v-model="selectedWeekdays">
            <el-checkbox label="MON">周一</el-checkbox>
            <el-checkbox label="TUE">周二</el-checkbox>
            <el-checkbox label="WED">周三</el-checkbox>
            <el-checkbox label="THU">周四</el-checkbox>
            <el-checkbox label="FRI">周五</el-checkbox>
            <el-checkbox label="SAT">周六</el-checkbox>
            <el-checkbox label="SUN">周日</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="开始日期">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="选择开始日期"
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item label="结束日期">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="可不填"
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item label="接送时间">
          <el-time-picker
            v-model="form.defaultPickupTime"
            value-format="HH:mm:ss"
            placeholder="选择时间"
            style="width: 100%;"
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

import { createEnrollment, getEnrollments } from '../api/enrollment'
import { getStudents } from '../api/student'
import { getTeachers } from '../api/teacher'

const enrollments = ref([])
const students = ref([])
const teachers = ref([])

const loading = ref(false)
const dialogVisible = ref(false)
const selectedWeekdays = ref([])

const form = reactive({
  studentId: null,
  defaultTeacherId: null,
  weekdays: '',
  startDate: '',
  endDate: null,
  defaultPickupTime: ''
})

onMounted(() => {
  loadEnrollments()
})

async function loadEnrollments() {
  loading.value = true

  try {
    enrollments.value = await getEnrollments()
  } finally {
    loading.value = false
  }
}

async function openCreateDialog() {
  form.studentId = null
  form.defaultTeacherId = null
  form.weekdays = ''
  form.startDate = ''
  form.endDate = null
  form.defaultPickupTime = ''
  selectedWeekdays.value = []

  students.value = await getStudents()
  teachers.value = await getTeachers()

  dialogVisible.value = true
}

async function submitCreate() {
  if (!form.studentId) {
    ElMessage.warning('请选择学生')
    return
  }

  if (!form.defaultTeacherId) {
    ElMessage.warning('请选择老师')
    return
  }

  if (selectedWeekdays.value.length === 0) {
    ElMessage.warning('请选择托管星期')
    return
  }

  if (!form.startDate) {
    ElMessage.warning('请选择开始日期')
    return
  }

  if (!form.defaultPickupTime) {
    ElMessage.warning('请选择接送时间')
    return
  }

  await createEnrollment({
    studentId: form.studentId,
    weekdays: selectedWeekdays.value.join(','),
    startDate: form.startDate,
    endDate: form.endDate,
    defaultPickupTime: form.defaultPickupTime,
    defaultTeacherId: form.defaultTeacherId
  })

  ElMessage.success('托管计划创建成功')

  dialogVisible.value = false

  await loadEnrollments()
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>