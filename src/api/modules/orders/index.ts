import service from '@/api/http';

export const getByAddress = (address: string): Promise<any> => {
  return service.get(`/orders/${address}`);
};

export const getListingByTick = (tick: string): Promise<any> => {
  return service.get(`/orders/listing`, { tick });
};

export const create = (data: any): Promise<any> => {
  return service.put(`/orders/create`, data);
};

export const sign = (data: any): Promise<any> => {
  return service.put(`/orders/sign`, data);
};
