import { AxiosResponse } from "axios";

export const responseOk = (response: AxiosResponse<any, any>) => {
  if (response.status >= 200 && response.status <= 399) return true;
  return false;
};
