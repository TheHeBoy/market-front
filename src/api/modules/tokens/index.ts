import service from '@/api/http';
import {PageParam, PageResult} from "@/api/modules/interface";


export const page = (pageParam: PageParam): Promise<PageResult> => {
  return service.get(`/tokens/page`, pageParam);
};

export const pageListing = (pageParam: PageParam): Promise<PageResult> => {
  return service.get(`/tokens/page-listing`, pageParam);
};

export const getByAddress = (address: string): Promise<any> => {
  return service.get(`/tokens/${address}`);
};
