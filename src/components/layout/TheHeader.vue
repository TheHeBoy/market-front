<template>
  <div class="flex justify-between items-center px-6 space-x-12 py-2 border-b-1">
    <div class="w-300 m-auto flex justify-between">
      <div class="flex items-center">
        <router-link to="/">
          <div class="flex items-center">
            <anchor class="h-12 w-12" />
            <div class="font-bold text-xl ml-2">SupInscriptions</div>
          </div>
        </router-link>

        <el-tag type="info" class="ml-2">Sepolia</el-tag>
        <div class="flex items-center space-x-12 ml-12">
          <router-link
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ active: activeTab === tab }"
            class="menu"
            :to="'/' + tab"
            @click="activeTab = tab"
          >
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </router-link>
        </div>
      </div>

      <div class="p-2 min-w-40 flex items-center">
        <el-input @keyup.enter="search" v-model="searchAddress" placeholder="0x219A...b630">
          <template #suffix>
            <button class="flex items-center" @click="search">
              <el-icon> <Search /></el-icon>
            </button>
          </template>
        </el-input>
      </div>

      <div class="ml-2 flex items-center space-x-2" @click="useWalletStore.connectWallet()">
        <div v-if="!useWalletStore.isConnect">
          <wallet class="h-10 w-10" />
        </div>
        <div v-else-if="!useWalletStore.isChainId" class="p-2 font-bold bg-red-900">Wrong Network</div>
        <avatar v-else class="h-10 w-10" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import anchor from '@/assets/svg/anchor.svg?component';
import wallet from '@/assets/svg/wallet.svg?component';
import avatar from '@/assets/svg/avatar.svg?component';
import useWalletStoreWithOut from '@/store/wallet';
import { Search } from '@element-plus/icons-vue';

const tabs = ['tokens', 'deploy', 'marketplace', 'profile'];

function split(uri: string) {
  const pathParts = uri.split('/'); // 分割路径
  return pathParts[pathParts.length - 1].split('?')[0];
}

const activeTab = ref(split(location.pathname));
const useWalletStore = useWalletStoreWithOut();
const searchAddress = ref();
const router = useRouter();

const search = () => {
  if (searchAddress.value) {
    searchAddress.value = null;
    router.push({ path: `/address/${searchAddress.value}` });
  }
};
</script>

<style lang="scss">
.menu {
  @apply text-xl hover:underline hover:font-bold;
}

.active {
  @apply underline font-bold;
}
</style>
