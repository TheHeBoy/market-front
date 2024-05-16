<template>
  <div class="w-300 m-auto">
    <el-card>
      <div class="header">
        <avatar class="h-10 w-10" />
      </div>
      <div class="font-bold text-xl">{{ useWalletStore.getWallet.address }}</div>
    </el-card>
    <el-tabs v-model="activeName" class="mt-2">
      <el-tab-pane label="Tokens" name="token">
        <div class="flex flex-wrap">
          <div v-for="token in tokenData" :key="token.tick" class="w-48 shadow-lg ml-2 mt-2">
            <div class="flex flex-col h-35 font-bold bg-[#181a1f] p-2">
              <div class="text-red-500">
                {{ token.tick }}
              </div>
              <div class="w-full flex-grow flex items-center justify-center">
                {{ token.holdersNum }}
              </div>
            </div>
            <div class="bg-[#2b2d33] p-2">
              <div># {{ token.inscriptionsNum }}</div>
              <div>
                <el-button link type="primary" @click="transferBtnClick(token)">Transfer</el-button>
                <el-button link type="primary" @click="listBtnClick(token)">List</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Inscriptions" name="inscriptions">
        <div class="flex flex-wrap">
          <div v-for="msc20 in msc20Data" :key="msc20.id" class="w-40 shadow-lg ml-2 mt-2">
            <div class="flex flex-col h-50 font-bold bg-[#181a1f] p-2">
              <div class="text-red-500">
                {{ msc20.operation }}
              </div>
              <div class="w-full flex-grow flex items-center overflow-x-auto">
                <div class="text-xs font-normal whitespace-pre">
                  {{ JSON.stringify(JSON.parse(msc20.content), null, 4) }}
                </div>
              </div>
            </div>
            <div class="bg-[#2b2d33] p-2">
              <div class="font-bold"># {{ msc20.id }}</div>
              <div class="text-sm">
                {{ formatDate(msc20.timestamp) }}
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Orders" name="orders">
        <div class="flex flex-wrap">
          <div v-for="order in orderData" :key="order.id" class="w-48 shadow-lg ml-2 mt-2">
            <div class="flex flex-col h-35 font-bold bg-[#181a1f] p-2">
              <div class="text-red-500">
                {{ order.tick }}
              </div>
              <div class="w-full flex-grow flex items-center justify-center">
                {{ order.amount }}
              </div>
            </div>
            <div class="bg-[#2b2d33] p-2">
              <div class="flex justify-between">
                <div class="font-bold">{{ ethers.formatEther(order.price) }} ETH</div>
                <el-button v-if="order.status === '2'" link type="primary" @click="cancelBtnClick(order)"
                  >Cancel</el-button
                >
                <el-button v-if="order.status === '4'" link type="primary" @click="signBtnClick(order)">Sign</el-button>
                <ElTag type="success" v-if="order.status === '3'">Sold</ElTag>
                <ElTag type="info" v-if="order.status === '5'">Canceled</ElTag>
                <ElTag type="" v-if="order.status === '1'">WaitList</ElTag>
              </div>
              <div class="text-sm">{{ formatDate(order.createdAt) }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="transferDialogVisible" title="Transfer" width="400px">
      <div class="w-30 m-auto">
        <div class="flex-col font-bold bg-[#181a1f] p-2">
          <div class="text-red-500">
            {{ transferToken.tick }}
          </div>
          <div class="flex w-full py-2 items-center justify-center">
            {{ transferToken.holdersNum }}
          </div>
        </div>
        <div class="bg-[#2b2d33] text-center p-2">
          <div># {{ transferToken.inscriptionsNum }}</div>
        </div>
      </div>
      <el-form class="mt-4 flex-col space-y-4">
        <el-input
          class="no-number"
          placeholder="Amount"
          v-model="transferForm.amount"
          type="number"
          :controls="false"
        ></el-input>
        <el-input placeholder="To" v-model="transferForm.to"></el-input>
      </el-form>
      <template #footer>
        <div class="text-center">
          <el-button link @click="transferDialogVisible = false">Cancel</el-button>
          <el-button link type="primary" @click="transferClick"> Transfer</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="listDialogVisible" title="Listing" width="400px">
      <div class="w-30 m-auto">
        <div class="flex-col font-bold bg-[#181a1f] p-2">
          <div class="text-red-500">
            {{ listToken.tick }}
          </div>
          <div class="flex w-full py-2 items-center justify-center">
            {{ listToken.holdersNum }}
          </div>
        </div>
        <div class="bg-[#2b2d33] text-center p-2">
          <div># {{ listToken.inscriptionsNum }}</div>
        </div>
      </div>
      <el-form class="mt-4 flex-col space-y-4">
        <el-input class="no-number" type="number" placeholder="Price" v-model="listForm.price">
          <template #append>
            <div>ETH</div>
          </template>
        </el-input>
        <el-input class="no-number" type="number" placeholder="Amount" v-model="listForm.amount"></el-input>
      </el-form>
      <div class="font-bold mt-2">Service Fee: {{ serviceFee }}%</div>
      <template #footer>
        <div class="text-center">
          <el-button link @click="listDialogVisible = false">Cancel</el-button>
          <el-button link type="primary" @click="listClick">List</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="signDialogVisible" title="Sign" width="400px">
      <el-form class="flex-col space-y-4">
        <el-input class="no-number" type="number" placeholder="Price" v-model="listForm.price">
          <template #append>
            <div>ETH</div>
          </template>
        </el-input>
      </el-form>
      <div class="font-bold mt-2">Service Fee: {{ serviceFee }}%</div>
      <template #footer>
        <div class="text-center">
          <el-button link @click="signDialogVisible = false">Cancel</el-button>
          <el-button link type="primary" @click="signClick">Sign</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import avatar from '@/assets/svg/avatar.svg?component';
import useWalletStoreWithOut from '@/store/wallet';
import { formatDate } from '@/utils/formatTime';
import { inscribeList, inscribeTransfer } from '@/utils/inscribe';
import * as TokensApi from '@/api/modules/tokens';
import * as Msc20Api from '@/api/modules/msc20';
import * as OrderApi from '@/api/modules/orders';
import { ethers } from 'ethers';
import { cancelOrder } from '@/contract/contract';

const useWalletStore = useWalletStoreWithOut();
const activeName = ref('token');

const tokenData = ref([]);
const msc20Data = ref([]);
const orderData = ref([]);

const transferBtnClick = (token) => {
  transferToken.value = token;
  transferDialogVisible.value = true;
};
const transferToken = ref({});
const transferDialogVisible = ref(false);
const transferForm = reactive({
  amount: undefined,
  to: '',
});
const transferClick = () => {
  inscribeTransfer(transferToken.tick, transferForm.amount, transferForm.to);
  transferDialogVisible.value = false;
};

const serviceFee = import.meta.env.VITE_SERVICE_FEE / 100;
const listBtnClick = (token) => {
  listToken.value = token;
  listDialogVisible.value = true;
};
const listToken = ref({});
const listDialogVisible = ref(false);

const listForm = reactive({
  price: null,
  amount: null,
});
const listClick = async () => {
  let loading = ElLoading.service({
    text: 'Loading List...',
  });

  let txHash;
  try {
    txHash = await inscribeList(listToken.value.tick, listForm.amount);
    const order = await sign(txHash, listToken.value.tick, listForm.amount, listForm.price);
    await OrderApi.create(order);
  } catch (err) {
    ElMessage.error('List failed');
    console.log(err);
  } finally {
    loading.close();
    await requestData();
    listDialogVisible.value = false;
  }
};

const sign = async (listHash, tick, amount, price) => {
  const domain = {
    name: 'MSC20Market',
    version: '1',
    chainId: import.meta.env.VITE_CHAIN_ID,
    verifyingContract: import.meta.env.VITE_CONTRACT_ADDRESS,
  };

  const types = {
    MSC20Order: [
      { name: 'seller', type: 'address' },
      { name: 'listHash', type: 'bytes32' },
      { name: 'tick', type: 'string' },
      { name: 'amount', type: 'uint256' },
      { name: 'price', type: 'uint256' },
      { name: 'creatorFeeRate', type: 'uint16' },
    ],
  };

  const order = {
    seller: useWalletStore.getWallet.address,
    tick: tick,
    listHash: listHash,
    amount: Number(amount),
    price: ethers.parseEther(price).toString(),
    creatorFeeRate: Number(import.meta.env.VITE_SERVICE_FEE),
  };

  order.signature = await toRaw(useWalletStore.getWallet).signer.signTypedData(domain, types, order);
  return order;
};

const signDialogVisible = ref(false);
const signOrder = ref({});
const signBtnClick = async (order) => {
  signOrder.value = order;
  signDialogVisible.value = true;
};
const signClick = async () => {
  signDialogVisible.value = false;
  const order = await sign(signOrder.value.listHash, signOrder.value.tick, signOrder.value.amount, listForm.price);
  const signReq = {
    id: signOrder.value.id,
    price: order.price,
    creatorFeeRate: order.creatorFeeRate,
    signature: order.signature,
  };
  await OrderApi.sign(signReq);
  ElMessage.success('Sign success');
  await requestData();
};

const cancelBtnClick = async (order) => {
  await cancelOrder(order);
};

onMounted(async () => {
  await requestData();
});

const requestData = async () => {
  tokenData.value = await TokensApi.getByAddress(useWalletStore.getWallet.address);
  msc20Data.value = await Msc20Api.getByAddress(useWalletStore.getWallet.address);
  orderData.value = await OrderApi.getByAddress(useWalletStore.getWallet.address);
};
</script>
