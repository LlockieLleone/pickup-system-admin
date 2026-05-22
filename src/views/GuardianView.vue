<template>
  <div>
    <div class="page-header">
      <h1>家长管理</h1>

      <el-button type="primary" @click="openCreateDialog">
        新增家长
      </el-button>
    </div>

    <el-table
      :data="guardians"
      style="width: 100%; margin-top: 20px;"
      v-loading="loading"
    >
      <el-table-column prop="guardianId" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="relation" label="关系" />
      <el-table-column prop="active" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.active ? 'success' : 'info'">
            {{ row.active ? '有效' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      title="新增家长"
      width="500px"
    >
      <el-form :model="form" label-width="90px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入家长姓名" />
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item label="关系">
          <el-input v-model="form.relation" placeholder="例如：母亲 / 父亲" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCreate">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { createGuardian, getGuardians } from '../api/guardian'

const guardians = ref([])
const loading = ref(false)
const dialogVisible = ref(false)

const form = reactive({
  name: '',
  phone: '',
  relation: ''
})

onMounted(() => {
  loadGuardians()
})

async function loadGuardians() {
  loading.value = true
  try {
    guardians.value = await getGuardians()
  } finally {
    loading.value = false
  }
}

function openCreateDialog() {
  form.name = ''
  form.phone = ''
  form.relation = ''
  dialogVisible.value = true
}

async function submitCreate() {
  if (!form.name) {
    ElMessage.warning('请输入家长姓名')
    return
  }

  if (!form.phone) {
    ElMessage.warning('请输入手机号')
    return
  }

  await createGuardian({
    name: form.name,
    phone: form.phone,
    relation: form.relation
  })

  ElMessage.success('家长创建成功')
  dialogVisible.value = false
  await loadGuardians()
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>