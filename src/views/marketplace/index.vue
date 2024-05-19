<template>
  <el-card class="w-300 m-auto">
    <template #header>
      <div class="w-full flex justify-between">
        <div>
          <span class="text-lg font-bold">All Listing orders</span>
        </div>
        <div class="w-100">
          <el-input v-model="searchTick" @keyup.enter="search" size="large" placeholder="Please input tick">
            <template #suffix>
              <button class="flex items-center" @click="search">
                <el-icon> <Search /></el-icon>
              </button>
            </template>
          </el-input>
        </div>
      </div>
    </template>
    <el-table size="large" @rowClick="rowClick" :data="tableData.list">
      <el-table-column prop="tick" label="Tick">
        <template #default="{ row }">
          <span class="text-red-500 font-bold">{{ row.tick }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="floorPrice" label="Floor Price">
        <template #default="{ row }">
          <span>{{ ethers.formatEther(row.floorPrice) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="volumeDay" label="Volume Day">
        <template #default="{ row }">
          <span>{{ ethers.formatEther(row.volumeDay) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="salesDay" label="Sales Day"></el-table-column>
      <el-table-column prop="owners" label="Owners"></el-table-column>
      <el-table-column prop="totalVolume" label="Total Volume">
        <template #default="{ row }">
          <span>{{ ethers.formatEther(row.totalVolume) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalSales" label="Total Sales"></el-table-column>
      <el-table-column prop="listed" label="Listed"></el-table-column>
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
  </el-card>
</template>

<script setup lang="ts">
import * as TokensApi from '@/api/modules/tokens';
import { PageParam } from '@/api/modules/interface';
import { onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ethers } from 'ethers';

const searchTick = ref('');

const tableData = ref({
  total: 0,
  list: [],
});

const pageParam = reactive({
  pageNo: 1,
  pageSize: 10,
  tick: '',
});

const handleCurrentChange = (val) => {
  pageParam.pageNo = val;
  requestData();
};

const router = useRouter();
const rowClick = (row: any) => {
  router.push({ name: 'order', params: { tick: row.tick } });
};

const search = () => {
  if (searchTick.value) {
    pageParam.pageNo = 1;
    pageParam.tick = searchTick.value;
    requestData();
  }
};

const requestData = async () => {
  tableData.value = await TokensApi.pageListing(pageParam);
};

onMounted(async () => {
  await requestData();
});
</script>

<style scoped lang="scss"></style>
