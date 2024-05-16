import { ethers } from 'ethers';
import useWalletStoreWithOut from '@/store/wallet';
import abi from '@/contract/abi.json';

const useWalletStore = useWalletStoreWithOut();

export const executeOrder = async (order: any): Promise<any> => {
  const wallet = toRaw(useWalletStore.getWallet);
  const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, JSON.stringify(abi), wallet.signer);
  const tx = contract.executeOrder(
    [
      order.seller,
      order.listHash,
      order.tick,
      order.amount,
      order.price,
      import.meta.env.VITE_SERVICE_FEE,
      order.signature,
    ],
    wallet.address,
    { value: order.price, gasLimit: 300000 },
  );
};

export const cancelOrder = async (order: any): Promise<any> => {
  const wallet = toRaw(useWalletStore.getWallet);
  const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, JSON.stringify(abi), wallet.signer);
  const tx = contract.cancelOrder([
    order.seller,
    order.listHash,
    order.tick,
    order.amount,
    order.price,
    import.meta.env.VITE_SERVICE_FEE,
    order.signature,
  ]);
};
