import appConstants from "../util/appConstants";
import { z } from "zod";
import { formatDate, getToken } from "../util/util";

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS"
}

export async function zodParse<T>(response: Response, type: z.ZodSchema<T>) {
  return type.parse(await response.json());
}

export async function fetchBackend(url: string, init: RequestInit = {}) {
  const headers = {
    "Authorization": `Bearer ${getToken()}`
  };
  return fetch(`${appConstants.backendHost}${url}`, {...init, headers: {...headers, ...init.headers}});
}

export function searchParamsBuilder<T extends object>(request: T) {
  const params = Object.entries(request).map(v => {
    if (v[1] instanceof Date)
      return [v[0], formatDate(v[1])];
    return v;
  })
  return (new URLSearchParams(params)).toString();
}

export function fetchBackendWParams<T extends object>(url: string, request: T, init?: RequestInit) {
  return fetchBackend(`${url}?${searchParamsBuilder(request)}`, init);
}
