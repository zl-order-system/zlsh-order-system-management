import appConstants from "../util/appConstants";
import { z } from "zod";
import { formatDate, getToken } from "../util/util";
import { useMutation } from "@tanstack/react-query";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS"
}

export async function zodParse<T>(response: Response, schema: z.Schema<T>) {
  return schema.parse(await response.json());
}

export function searchParamsBuilder<T extends object>(request: T) {
  const params = Object.entries(request).map(v => {
    if (v[1] instanceof Date)
      return [v[0], formatDate(v[1])];
    return v;
  })
  return (new URLSearchParams(params)).toString();
}

export async function fetchBackend(path: string, init: RequestInit = {}) {
  const headers = {
    "Authorization": `Bearer ${getToken()}`,
    "Content-Type": "application/json"
  };
  return fetch(`${appConstants.backendHost}${path}`, {...init, headers: {...headers, ...init.headers}});
}

// export function fetchBackendWParams<T extends object>(path: string, request: T, init?: RequestInit) {
//   return fetchBackend(`${path}?${searchParamsBuilder(request)}`, init);
// }

export function fetchBackendCurry<R>(url: string, resSchema: z.Schema<R>) {
  return async (): Promise<R> => {
    const response = await fetchBackend(url);
    return zodParse(response, resSchema);
  }
}

export async function fetchBackendWBodyShort<T extends object, R>(path: string, method: HttpMethod, request: T, resSchema: z.Schema<R>): Promise<R | undefined> {
  const requestBody = Object.entries(request).map(v => {
    if (v[1] instanceof Date)
      return [v[0], formatDate(v[1])];
    return v;
  })
  const response = await fetchBackend(path, {body: JSON.stringify(Object.fromEntries(requestBody)), method});
  if (resSchema instanceof z.ZodUndefined)
    return undefined;
  return zodParse(response, resSchema);
}

export async function fetchBackendWParamsShort<T extends object, R>(path: string, request: T, resSchema: z.Schema<R>): Promise<R> {
  const response = await fetchBackend(`${path}?${searchParamsBuilder(request)}`);
  return zodParse(response, resSchema);
}

// Custom hooks
export function useMutationShort<Req extends object, Res>(path: string, method: HttpMethod, resSchema: z.Schema<Res>, key: string) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async (request: Req) => fetchBackendWBodyShort<Req, Res>(path, method, request, resSchema)
  }).mutateAsync;
}


// Curry functions
// export function fetchBackendCurry<R>(url: string, resSchema: z.Schema<R>) {
//   return async (): Promise<R> => {
//     const response = await fetchBackend(url);
//     return zodParse(response, resSchema);
//   }
// }

// export function fetchBackendWBodyCurry<T extends object, R>(url: string, method: HttpMethod, request: T, resSchema: z.Schema<R>) {
//   return async (): Promise<R> => {
//     const response = await fetchBackend(url, {body: JSON.stringify(request), method});
//     return zodParse(response, resSchema);
//   }
// }

// export function fetchBackendWParamsCurry<T extends object, R>(url: string, request: T, resSchema: z.Schema<R>) {
//   return async (): Promise<R> => {
//     const response = await fetchBackendWParams(url, request);
//     return zodParse(response, resSchema);
//   }
// }
