import { API } from "../../constants/ConstantKeys.constants";
import { getHeaders, httpClient } from "../../services/api/httpClient";

export interface GeoLocationFiles {
  geoLocationsFile: File | null;
}

export class geoLocationServices {
  static uploadGeoLocationFile(data: GeoLocationFiles) {
    console.log("file test: .... ", data);
    return httpClient
      .post(`${import.meta.env.VITE_API_BASE_URL}${API.geoLocation}`, {
        headers: getHeaders(),
        params: {
          locationsFile: data.geoLocationsFile,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(
          error.response?.data.message +
            "\n" +
            error.response?.data.descriptionEn
        );
      });
  }
}
