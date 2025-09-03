import { API } from "../../constants/ConstantKeys.constants";
import { getHeaders, httpClient } from "../../services/api/httpClient";

export interface GeoLocationFiles {
  geolite2Zip: File | null;
}

export class geoLocationServices {
  static uploadGeoLocationFile(data: GeoLocationFiles) {
    if (!data.geolite2Zip) {
      throw new Error("No file provided");
    }

    const formData = new FormData();
    formData.append("geolite2Zip", data.geolite2Zip);

    return httpClient
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${API.geoLocation}`,
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
