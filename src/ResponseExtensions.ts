import { Result, ResultPromise, Unit } from "functional-ts-primitives";
import { Response, Blob } from 'node-fetch';
import { ErrorResponse } from "./ErrorResponse";

const isSuccess = (response: Response) : boolean => response.ok;
const toJsonResult = <T>(response: Response) : ResultPromise<T, ErrorResponse> =>
	Result.createAsync<T, ErrorResponse>(
		async () => isSuccess(response),
		() => response.json(),
		async () => Result.success<Response, Error>(response));
const toHtmlResult = (response: Response) : ResultPromise<string, ErrorResponse> =>
	Result.createAsync<string, ErrorResponse>(
		async () => isSuccess(response),
		() => response.text(),
		async () => Result.success<Response, Error>(response));
const toTextResult = (response: Response) : ResultPromise<string, ErrorResponse> =>
	Result.createAsync<string, ErrorResponse>(
		async () => isSuccess(response),
		() => response.text(),
		async () => Result.success<Response, Error>(response));
const toBlobResult = (response: Response) : ResultPromise<Blob, ErrorResponse> =>
	Result.createAsync<Blob, ErrorResponse>(
		async () => isSuccess(response),
		() => response.blob(),
		async () => Result.success<Response, Error>(response));
const toUnit = (response: Response) : ResultPromise<Unit, ErrorResponse> =>
	Result.createAsync<Unit, ErrorResponse>(
		async () => isSuccess(response),
		async () => Unit,
		async () => Result.success<Response, Error>(response));

export const ResponseExtensions = {
	isSuccess,
	toJsonResult,
	toHtmlResult,
	toTextResult,
	toBlobResult,
	toUnit
}