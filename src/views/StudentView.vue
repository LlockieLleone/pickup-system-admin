<template>
  <div>
    <div class="page-header">
      <h1>学生管理</h1>

      <el-button type="primary" @click="openCreateDialog">
        新增学生
      </el-button>
    </div>

    <el-table
      :data="students"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <el-table-column prop="studentId" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="school" label="学校" />
      <el-table-column prop="grade" label="年级" />
      <el-table-column prop="className" label="班级" />

      <el-table-column label="家长">
        <template #default="{ row }">
          <span v-if="row.guardians && row.guardians.length">
            {{ row.guardians.map(g => g.name).join('、') }}
          </span>
          <el-tag v-else type="warning">未绑定</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="active" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.active ? 'success' : 'info'">
            {{ row.active ? '在读' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="160">
        <template #default="{ row }">
          <el-button size="small" @click="openBindGuardianDialog(row)">
            绑定家长
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="createDialogVisible"
      title="新增学生"
      width="500px"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入学生姓名" />
        </el-form-item>

        <el-form-item label="学校">
          <el-input v-model="form.school" placeholder="请输入学校" />
        </el-form-item>

        <el-form-item label="年级">
          <el-input v-model="form.grade" placeholder="例如：三年级" />
        </el-form-item>

        <el-form-item label="班级">
          <el-input v-model="form.className" placeholder="例如：三年一班" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCreate">保存</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="bindDialogVisible"
      title="绑定家长"
      width="500px"
    >
      <div v-if="currentStudent">
        <p>学生：{{ currentStudent.name }}</p>

        <el-select
          v-model="selectedGuardianId"
          placeholder="请选择家长"
          style="width: 100%;"
        >
          <el-option
            v-for="guardian in guardians"
            :key="guardian.guardianId"
            :label="`${guardian.name} - ${guardian.phone} - ${guardian.relation}`"
            :value="guardian.guardianId"
          />
        </el-select>
      </div>

      <template #footer>
        <el-button @click="bindDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitBindGuardian">绑定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import {
  getStudents,
  createStudent,
  bindGuardianToStudent
} from '../api/student'

import { getGuardians } from '../api/guardian'

const students = ref([])
const guardians = ref([])
const loading = ref(false)

const createDialogVisible = ref(false)
const bindDialogVisible = ref(false)

const currentStudent = ref(null)
const selectedGuardianId = ref(null)

const form = reactive({
  name: '',
  school: '',
  grade: '',
  className: ''
})

onMounted(() => {
  loadStudents()
})

async function loadStudents() {
  loading.value = true

  try {
    students.value = await getStudents()
  } finally {
    loading.value = false
  }
}

function openCreateDialog() {
  form.name = ''
  form.school = ''
  form.grade = ''
  form.className = ''
  createDialogVisible.value = true
}

async function submitCreate() {
  if (!form.name) {
    ElMessage.warning('请输入学生姓名')
    return
  }

  await createStudent({
    name: form.name,
    school: form.school,
    grade: form.grade,
    className: form.className
  })

  ElMessage.success('学生创建成功')
  createDialogVisible.value = false
  await loadStudents()
}

async function openBindGuardianDialog(student) {
  currentStudent.value = student
  selectedGuardianId.value = null
  guardians.value = await getGuardians()
  bindDialogVisible.value = true
}

async function submitBindGuardian() {
  if (!selectedGuardianId.value) {
    ElMessage.warning('请选择家长')
    return
  }

  await bindGuardianToStudent(
    currentStudent.value.studentId,
    selectedGuardianId.value
  )

  ElMessage.success('绑定成功')
  bindDialogVisible.value = false
  await loadStudents()
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>