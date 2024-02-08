import { getToken } from "../util/util";
import getAppConstants from "../util/AppConstants"

export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS"
}

export async function sendRequest<T>(path: string, method: HttpMethods, searchParams?: URLSearchParams, bodyObject?: unknown): Promise<T> {
    const headers = {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    };
    const body = processBody(bodyObject);
    let url = `${getAppConstants().backendHost}${path}`

    if (searchParams !== undefined)
        url += `?${searchParams.toString()}`

    const response = await fetch(url, {method, headers, body});

    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }

    try {
        return await response.json();
    } catch {
        return Promise.reject();
    }
}

function processBody(bodyObject?: unknown) {
    if (bodyObject === undefined)
        return undefined
    else
        return JSON.stringify(bodyObject)
}
