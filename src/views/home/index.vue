<template>
  <div class="w-300 m-auto h-full">
    <div class="text-2xl ml-2 font-bold">Latest Inscriptions</div>
    <div class="flex-grow" v-infinite-scroll="load" infinite-scroll-immediate="false">
      <div class="flex flex-wrap">
        <div v-for="inscription in inscriptionsData.list" :key="inscription.id" class="w-48 shadow-lg ml-2 mt-2">
          <div class="flex flex-col h-46 font-bold bg-[#181a1f] p-2">
            <div class="w-full flex-grow flex overflow-x-auto">
              <div class="text-base font-normal whitespace-pre">
                {{ JSON.stringify(JSON.parse(inscription.content), null, 4) }}
              </div>
            </div>
          </div>
          <div class="bg-[#2b2d33] p-2">
            <div class="flex itxst text-sm justify-between">
              <div class="truncate font-bold"># {{ inscription.id }}</div>
              <button class="flex items-center" @click="copyClick(inscription)">
                <!--                <el-icon :size="12"><CopyDocument /></el-icon>-->
                <span class="ml-1">{{ `${inscription.hash.slice(0, 6)}...${inscription.hash.slice(-4)}` }}</span>
              </button>
            </div>
            <div class="text-sm">
              {{ formatDate(inscription.timestamp) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/formatTime';
import * as InscriptionApi from '@/api/modules/inscriptions';
import { PageParam } from '@/api/modules/interface';
import Clipboard from 'clipboard';

const copyClick = (inscription) => {
  let clipboard = new Clipboard('.itxst', {
    text: () => {
      //返回需要复制的字符串
      return inscription.hash;
    },
  });
  clipboard.on('success', () => {
    ElMessage.success('Copy success');
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    clipboard.destroy();
  });
};

const inscriptionsData = ref({
  total: 0,
  list: [],
});
const pageParam: PageParam = reactive({
  pageNo: 1,
  pageSize: 20,
});

const load = async () => {
  pageParam.pageNo += 1;
  const data = await InscriptionApi.pageLatest(pageParam);
  inscriptionsData.value = {
    total: data.total,
    list: inscriptionsData.value.list.concat(data.list),
  };
};

const requestData = async () => {
  inscriptionsData.value = await InscriptionApi.pageLatest(pageParam);
};

onMounted(async () => {
  await requestData();
});
</script>

<style lang="scss" scoped></style>
