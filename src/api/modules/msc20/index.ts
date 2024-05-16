import service from '@/api/http';
import { PageParam, PageResult } from '@/api/modules/interface';

export const getByAddress = (address: string): Promise<any> => {
  return service.get(`/msc20/${address}`);
};
