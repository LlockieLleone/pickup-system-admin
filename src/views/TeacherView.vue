<template>
  <div>
    <div class="page-header">
      <h1>老师管理</h1>

      <el-button type="primary" @click="openCreateDialog">
        新增老师
      </el-button>
    </div>

    <el-table
      :data="teachers"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <el-table-column prop="teacherId" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="active" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.active ? 'success' : 'info'">
            {{ row.active ? '在职' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      title="新增老师"
      width="500px"
    >
      <el-form :model="form" label-width="90px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入老师姓名" />
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入登录密码"
          />
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="form.role" style="width: 100%;">
            <el-option label="老师" value="TEACHER" />
            <el-option label="管理员" value="ADMIN" />
          </el-select>
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
import { createTeacher, getTeachers } from '../api/teacher'

const teachers = ref([])
const loading = ref(false)
const dialogVisible = ref(false)

const form = reactive({
  name: '',
  phone: '',
  password: '',
  role: 'TEACHER'
})

onMounted(() => {
  loadTeachers()
})

async function loadTeachers() {
  loading.value = true

  try {
    teachers.value = await getTeachers()
  } finally {
    loading.value = false
  }
}

function openCreateDialog() {
  form.name = ''
  form.phone = ''
  form.password = ''
  form.role = 'TEACHER'
  dialogVisible.value = true
}

async function submitCreate() {
  if (!form.name) {
    ElMessage.warning('请输入老师姓名')
    return
  }

  if (!form.phone) {
    ElMessage.warning('请输入手机号')
    return
  }

  if (!form.password) {
    ElMessage.warning('请输入密码')
    return
  }

  await createTeacher({
    name: form.name,
    phone: form.phone,
    password: form.password,
    role: form.role
  })

  ElMessage.success('老师创建成功')
  dialogVisible.value = false
  await loadTeachers()
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>