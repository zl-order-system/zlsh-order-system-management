import appConstants from "../util/appConstants";
import { z } from "zod";
import { getToken } from "../util/util";

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS"
}

export async function zodParseAndCatch(response: Response, type: z.ZodSchema) {
  try {
    return type.parse(await response.json());
  } catch (e) {
    Promise.reject(e);
  }
}

export async function fetchBackend(url: string, init?: RequestInit) {
  const headers = {
    "Authorization": `Bearer ${getToken()}`
  };

  if (init?.headers === undefined)
    init = { ...init, headers: headers };

  init.headers = {...headers, ...init.headers}
  return fetch(`${appConstants.backendHost}${url}`, init);
}
