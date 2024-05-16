import useWalletStoreWithOut from "@/store/wallet";


const useWalletStore = useWalletStoreWithOut()
const textEncoder = new TextEncoder();

function encode(data: string): Uint8Array {
  return textEncoder.encode('data:text/plain;rule=esip6,' + data);
}

export const inscribeDeploy = async (tick: string, totalSupply: number, limitPerMint: number): Promise<string> => {
  const wallet = toRaw(useWalletStore.getWallet);
  const deploy = JSON.stringify({
    p: "msc-20",
    op: "deploy",
    tick: tick,
    max: totalSupply.toString(),
    lim: limitPerMint.toString(),
  })
  const response = await wallet.signer.sendTransaction({
    to: wallet.address,
    data: encode(deploy),
  });
  return response.hash;
}

export const inscribeMint = async (tick: string, limit: number): Promise<string> => {
  const wallet = toRaw(useWalletStore.getWallet);
  const mint = JSON.stringify({
    p: "msc-20",
    op: "mint",
    tick: tick,
    amt: limit.toString(),
  })
  const response = await wallet.signer.sendTransaction({
    to: wallet.address,
    data: encode(mint),
  });
  return response.hash;
}

export const inscribeTransfer = async (tick: string, amount: number, to: string): Promise<string> => {
  const wallet = toRaw(useWalletStore.getWallet);
  const mint = JSON.stringify({
    p: "msc-20",
    op: "transfer",
    tick: tick,
    amt: amount.toString(),
  })
  const response = await wallet.signer.sendTransaction({
    to: to,
    data: encode(mint),
  });
  return response.hash;
}

export const inscribeList = async (tick: string, amount: number): Promise<string> => {
  const wallet = toRaw(useWalletStore.getWallet);
  const mint = JSON.stringify({
    p: "msc-20",
    op: "list",
    tick: tick,
    amt: amount.toString(),
  })

  const response = await wallet.signer.sendTransaction({
    to: import.meta.env.VITE_CONTRACT_ADDRESS,
    data: encode(mint),
  });
  return response.hash;
}
