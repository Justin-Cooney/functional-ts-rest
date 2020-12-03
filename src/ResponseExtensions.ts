import { ResultFactory, ResultPromise, Unit, Result } from "functional-ts-primitives";
import { Response, Blob } from 'node-fetch';
import { ErrorResponse } from "./ErrorResponse";

const isSuccess = (response: Response) : boolean => response.ok;
const toJsonResult = <T>(response: Response) : ResultPromise<T, ErrorResponse> =>
	ResultFactory.createAsync<T, ErrorResponse>(
		async () => isSuccess(response),
		() => response.json(),
		async () => ResultFactory.success<Response, Error>(response));
const toHtmlResult = (response: Response) : ResultPromise<string, ErrorResponse> =>
	ResultFactory.createAsync<string, ErrorResponse>(
		async () => isSuccess(response),
		() => response.text(),
		async () => ResultFactory.success<Response, Error>(response));
const toTextResult = (response: Response) : ResultPromise<string, ErrorResponse> =>
	ResultFactory.createAsync<string, ErrorResponse>(
		async () => isSuccess(response),
		() => response.text(),
		async () => ResultFactory.success<Response, Error>(response));
const toBlobResult = (response: Response) : ResultPromise<Blob, ErrorResponse> =>
	ResultFactory.createAsync<Blob, ErrorResponse>(
		async () => isSuccess(response),
		() => response.blob(),
		async () => ResultFactory.success<Response, Error>(response));
const toUnit = (response: Response) : ResultPromise<Unit, ErrorResponse> =>
	ResultFactory.createAsync<Unit, ErrorResponse>(
		async () => isSuccess(response),
		async () => Unit,
		async () => ResultFactory.success<Response, Error>(response));

export const ResponseExtensions = {
	isSuccess,
	toJsonResult,
	toHtmlResult,
	toTextResult,
	toBlobResult,
	toUnit
}