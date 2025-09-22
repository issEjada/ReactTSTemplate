// import { API } from "../../constants/ConstantKeys.constants";
import { httpClient } from "../../services/api/httpClient";
import SecureStorage from "react-secure-storage";
import { ConstantKeys } from "../../constants/ConstantKeys.constants";
export interface GeoLocationFiles {
  geolite2Zip: File | null;
}

export const getHeaders = () => {
  const secureToken = SecureStorage.getItem(ConstantKeys.accessToken);
  const localToken = localStorage.getItem(ConstantKeys.accessToken);
  const token =
    typeof secureToken === "string" && secureToken
      ? secureToken
      : typeof localToken === "string" && localToken
      ? localToken
      : "";
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };
};

export class geoLocationServices {
  static uploadGeoLocationFile(data: GeoLocationFiles) {
    if (!data.geolite2Zip) {
      throw new Error("No file provided");
    }

    const formData = new FormData();
    formData.append("geolite2Zip", data.geolite2Zip);

    return httpClient
      .post(
        `https://api.alphas.com:14280/alphas-backoffice/v1/geolocation/geolite2/data/upload`,
        formData,
        {
          headers: {
            ...getHeaders(),
            "Content-Type": "multipart/form-data", // ensure multipart
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(
          error.response?.data?.message +
            "\n" +
            error.response?.data?.descriptionEn
        );
      });
  }
}
