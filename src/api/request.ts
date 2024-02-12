import { getToken, redirectToLoginPage, redirectToMainApp } from "../util/util";
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
    const body = processBody(bodyObject);
    const headers = {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    };
    // Url
    let url = `${getAppConstants().backendHost}${path}`
    // Add search params if exist
    if (searchParams !== undefined)
        url += `?${searchParams.toString()}`

    // Request
    const response = await fetch(url, {method, headers, body});
    handleResponseCode(response);

    try {
        return await response.json();
    } catch {
        return Promise.reject();
    }
}

function handleResponseCode(response: Response) {
    switch (response.status) {
        case 200:
        case 204:
            return;
        case 401:
        case 403:
            console.log("Redirecting to Main App - No Sufficient Permissions");
            redirectToMainApp(window);
            break;
        default:
            throw new Error(`Error fetching data: ${response.statusText}`);
    }
}

function processBody(bodyObject?: unknown) {
    if (bodyObject === undefined)
        return undefined
    else
        return JSON.stringify(bodyObject)
}
