<script setup lang="ts">
import { ProTableOption } from '../../components/ProTable/types';

const options: ProTableOption[] = [
  { key: 'id', title: '用户名' },
  { key: 'username', title: '用户名' },
  { key: 'password', title: '密码' },
]

async function request() {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data[i] = {
      id: i,
      username: Math.random(),
      password: Math.random()
    }
  }

  return {
    list: data,
    total: 10
  }
}
</script>

<template>
  <div>
    <ProButton mode="popup"></ProButton>

    <ProFormInput label="用户名" name="username"></ProFormInput>

    <ProTable :options="options" :request="request">
      <template #form-header>
        <div>
          头部
        </div>
      </template>

      <template #tableActions>
        <t-button>导出</t-button>
      </template>
    </ProTable>
  </div>
</template>

<style scoped></style>
