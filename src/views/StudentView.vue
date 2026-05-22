<template>
  <div>

    <h1>学生管理</h1>

    <el-button
        type="primary"
        @click="loadStudents"
    >
      加载学生
    </el-button>

    <el-table
        :data="students"
        style="width: 100%; margin-top: 20px;"
    >

      <el-table-column
          prop="studentId"
          label="ID"
          width="80"
      />

      <el-table-column
          prop="name"
          label="姓名"
      />

      <el-table-column
          prop="school"
          label="学校"
      />

      <el-table-column
          prop="grade"
          label="年级"
      />

      <el-table-column
          prop="className"
          label="班级"
      />

      <el-table-column
          label="操作"
          width="160"
      >

        <template #default="{ row }">

          <el-button
              size="small"
              @click="openBindGuardianDialog(row)"
          >
            绑定家长
          </el-button>

        </template>

      </el-table-column>

    </el-table>

    <el-dialog
        v-model="bindDialogVisible"
        title="绑定家长"
        width="500px"
    >

      <div v-if="currentStudent">

        <p>
          学生：{{ currentStudent.name }}
        </p>

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

        <el-button
            @click="bindDialogVisible = false"
        >
          取消
        </el-button>

        <el-button
            type="primary"
            @click="submitBindGuardian"
        >
          绑定
        </el-button>

      </template>

    </el-dialog>

  </div>
</template>

<script setup>

import { ref } from 'vue'

import { ElMessage } from 'element-plus'

import {
  getStudents,
  bindGuardianToStudent
} from '../api/student'

import { getGuardians } from '../api/guardian'

const students = ref([])

const bindDialogVisible = ref(false)

const currentStudent = ref(null)

const guardians = ref([])

const selectedGuardianId = ref(null)

async function loadStudents() {

  students.value = await getStudents()
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