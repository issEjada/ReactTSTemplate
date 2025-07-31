import { httpClient, getHeaders } from "./api/httpClient";
import { API } from "../constants/ConstantKeys.constants";

export interface DropDownsAttributes {
  key: string;
  value: string;
}
export interface DropDownValue {
  key: string;
  valueEn: string;
  valueAr: string | null;
}

export interface DropDownsPayload {
  code: string;
  attributes?: DropDownsAttributes[];
}

export interface GetDropDownsResponse {
  code: string;
  description: string;
  values: DropDownCategory[];
}

export interface DropDownCategory {
  code: string;
  description: string;
  values: DropDownValue[];
}

export const getDropDownsValue = (
  data: DropDownsPayload
): Promise<GetDropDownsResponse | DropDownCategory> => {
  return httpClient
    .post(
      `${import.meta.env.VITE_API_BASE_URL}${API.getDropDownsValue}`,
      data,
      {
        headers: getHeaders(),
        params: { code: data.code },
      }
    )
    .then(
      (response) => response.data as GetDropDownsResponse | DropDownCategory
    )
    .catch((error) => {
      throw new Error(
        error.response?.data.message + "\n" + error.response?.data.descriptionEn
      );
    });
};
