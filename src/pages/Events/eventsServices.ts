import { getHeaders, httpClient } from "../../services/api/httpClient";
import type { GetRulesParameterResponse } from "../ScoringRules/scoringRulesServices";
import { API } from "../../constants/ConstantKeys.constants";

export interface EventFormValues {
  id: number;
  name: string;
  description: string;
  code: string;
  status: string;
  identifier: EventIdentifier;
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
  fromCreationTimestamp: string;
  toCreationTimestamp: string;
}

export interface EventIdentifierInterface {
  eventSourceDevice: string;
  scheme: string;
}

export interface EventIdentifier {
  eventSourceDevice: string;
  scheme: string;
}

export interface GetEventDataPayload {
  maxPageSize?: number;
  page: number;
  name?: string;
  description?: string;
  identifier?: EventIdentifier;
  code?: string;
  status?: string;
  fromCreationTimestamp?: string;
  toCreationTimestamp?: string;
}

export interface GetEventByIdPayload {
  id: number;
}

export interface CreateEventPayload {
  name: string;
  identifier: EventIdentifier;
  code: string;
  description: string;
  status: string;
}

export interface UpdateEventPayload {
  name: string;
  identifier: EventIdentifier;
  description: string;
  status: string;
}

export interface GetEventParametersPayload {
  identifier: EventIdentifier;
  status: string | null;
}

export interface GetEventsItem {
  id: number;
  name: string;
  code: string;
  description: string;
  status: string;
  identifier: EventIdentifier;
  creationTimestamp: string;
}

export interface EventData {
  events: GetEventsItem[];
}
export interface GetEventsResponse {
  data: EventData;
  meta: PaginationMeta;
}

export interface PaginationMeta {
  totalPages: number;
  totalItems: number;
}

export class EventsServices {
  static getEventData(data: GetEventDataPayload): Promise<GetEventsResponse> {
    const { page, maxPageSize, ...requestBody } = data;
    return httpClient
      .post(`${import.meta.env.VITE_API_BASE_URL}${API.events}`, requestBody, {
        headers: getHeaders(),
        params: { page: page, maxPageSize: maxPageSize },
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

  static getEventById(data: GetEventByIdPayload): Promise<EventFormValues> {
    return httpClient
      .get(
        `${import.meta.env.VITE_API_BASE_URL}${API.getEventeById}/${data.id}`,
        {
          headers: getHeaders(),
        }
      )
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

  static createEvent(data: CreateEventPayload): Promise<void> {
    return httpClient
      .post(`${import.meta.env.VITE_API_BASE_URL}${API.getEventeById}`, data, {
        headers: getHeaders(),
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

  static updateEvent(data: UpdateEventPayload, ruleId: number): Promise<void> {
    return httpClient
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}${API.getEventeById}/${ruleId}`,
        data,
        {
          headers: getHeaders(),
        }
      )
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

  static getRulesParameters(
    data: GetEventParametersPayload
  ): Promise<GetRulesParameterResponse> {
    return httpClient
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${API.getEventParameter}`,
        data,
        {
          headers: getHeaders(),
        }
      )
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
