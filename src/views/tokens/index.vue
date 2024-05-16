<template>
  <el-card class="w-300 m-auto">
    <template #header>
      <div class="w-full flex justify-between">
        <div>
          <span class="text-lg font-bold">All mint Tokens</span>
        </div>
        <div class="w-100">
          <el-input v-model="searchTick" size="large" placeholder="Please input tick">
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </div>
      </div>
    </template>
    <div>
      <el-table :data="tableData.list" size="large">
        <el-table-column prop="tick" label="Tick">
          <template #default="{ row }">
            <span class="text-red-500 font-bold">{{ row.tick }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="max" label="Max"></el-table-column>
        <el-table-column prop="limit" label="Limit"></el-table-column>
        <el-table-column prop="minted" label="Minted"></el-table-column>
        <el-table-column prop="progress" label="Progress"></el-table-column>
        <el-table-column prop="txs" label="Txs"></el-table-column>
        <el-table-column prop="deployAt" label="Deploy At" width="200">
          <template #default="{ row }">
            <span>{{ formatDate(row.deployAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template #default="{ row }">
            <el-button link type="primary" @click="mintBtnClick(row)">Mint</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt-2"
        @current-change="handleCurrentChange"
        :current-page="pageParam.pageNo"
        :page-size="pageParam.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="tableData.total"
      >
      </el-pagination>
    </div>
  </el-card>

  <el-dialog v-model="mintDialogVisible" :title="'Mint ' + mintForm.tick" width="400px">
    <el-form class="mt-4 flex-col space-y-4">
      <el-input
        class="no-number"
        placeholder="Amount"
        v-model="mintForm.amount"
        type="number"
        :controls="false"
      ></el-input>
    </el-form>
    <template #footer>
      <div class="text-center">
        <el-button link @click="mintDialogVisible = false">Cancel</el-button>
        <el-button link type="primary" @click="mintClick"> Mint </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import * as TokensApi from '@/api/modules/tokens';
import { PageParam } from '@/api/modules/interface';
import { onMounted } from 'vue';
import { formatDate } from '@/utils/formatTime';
import { Search } from '@element-plus/icons-vue';
import { inscribeMint } from '@/utils/inscribe';

const searchTick = ref('');

const tableData = ref({
  total: 0,
  list: [],
});

const pageParam: PageParam = reactive({
  pageNo: 1,
  pageSize: 10,
});

const requestData = () => {
  TokensApi.page(pageParam)
    .then((res) => {
      tableData.value = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleCurrentChange = (val) => {
  pageParam.pageNo = val;
  requestData();
};

const mintForm = reactive({
  tick: '',
  amount: 0,
});

const mintBtnClick = (row: any) => {
  mintDialogVisible.value = true;
  mintForm.tick = row.tick;
  mintForm.amount = row.limit;
};

const mintClick = () => {
  inscribeMint(mintForm.tick, mintForm.amount)
    .then((res) => {
      ElMessage.success('Mint successfully');
      requestData();
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error('Mint failed');
    })
    .finally(() => {});
  mintDialogVisible.value = false;
};

const mintDialogVisible = ref(false);
onMounted(() => {
  requestData();
});
</script>

<style scoped lang="scss"></style>
