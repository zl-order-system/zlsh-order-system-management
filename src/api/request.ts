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

export async function sendRequest<T>(rawPath: string, method: HttpMethods, searchParams?: URLSearchParams, bodyObject?: T) {
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    const body = processBody(bodyObject);
    const path = `${getAppConstants().backendHost}${rawPath}?${searchParams?.toString()}`;

    try {
        const response = await fetch(getAppConstants().backendHost + path, {method, headers, body});

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

function processBody<T>(bodyObject?: T) {
    if (bodyObject === undefined)
        return undefined
    else
        return JSON.stringify(bodyObject)
}
