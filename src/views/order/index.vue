<template>
  <div class="w-300 m-auto flex flex-wrap">
    <div>
      <button class="text-xl flex items-center space-x-2" @click="router.go(-1)">
        <el-icon :size="24">
          <Back />
        </el-icon>
        <span>Listing orders / {{ tick }}</span>
      </button>
    </div>
    <el-divider />
    <div v-for="order in orderData" :key="order.id" class="w-48 shadow-lg ml-2 mt-2">
      <div class="flex flex-col h-35 font-bold bg-[#181a1f] p-2">
        <div class="text-red-500">
          {{ order.tick }}
        </div>
        <div class="w-full flex-grow flex items-center justify-center">
          <div class="text-center space-y-2">
            <div>{{ order.amount }}</div>
            <div class="text-red-200">
              {{ (Number(ethers.formatEther(order.price)) / order.amount).toFixed(4) }} / {{ tick }}
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#2b2d33] p-2">
        <div class="flex justify-between">
          <div class="font-bold">{{ ethers.formatEther(order.price) }} ETH</div>
          <el-button link type="primary" @click="butClick(order)">Buy</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import * as OrderApi from '@/api/modules/orders';
import { Back } from '@element-plus/icons-vue';
import { executeOrder } from '@/contract/contract';
import { ethers } from 'ethers';

const route = useRoute();
const router = useRouter();

const orderData = ref([]);
let tick = ref();

const requestData = async () => {
  orderData.value = await OrderApi.getListingByTick(tick.value);
};

const butClick = async (order: any) => {
  await executeOrder(order);
};

onMounted(async () => {
  tick.value = route.params.tick as string;
  await requestData();
});
</script>
