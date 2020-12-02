import { ResultFactory, ResultPromise, Unit, Result } from "functional-ts-primitives";
import { Response, Blob } from 'node-fetch';

const isSuccess = (response: Response) : boolean => response.ok;
const toJsonResult = <T>(response: Response) : ResultPromise<T, Error> =>
	ResultFactory.createAsync<T, Error>(
		async () => isSuccess(response),
		() => response.json(),
		async () => toError(response));
const toHtmlResult = (response: Response) : ResultPromise<string, Error> =>
	ResultFactory.createAsync<string, Error>(
		async () => isSuccess(response),
		() => response.text(),
		async () => toError(response));
// const toXmlResult = (response: Response) : ResultPromise<Document, Error> =>
// 	ResultFactory.createAsync<Document, Error>(
// 		async () => isSuccess(response),
// 		() => response.text().then(text => (new window.DOMParser()).parseFromString(text, "text/xml")),
// 		() => response.json());
const toTextResult = (response: Response) : ResultPromise<string, Error> =>
	ResultFactory.createAsync<string, Error>(
		async () => isSuccess(response),
		() => response.text(),
		async () => toError(response));
const toBlobResult = (response: Response) : ResultPromise<Blob, Error> =>
	ResultFactory.createAsync<Blob, Error>(
		async () => isSuccess(response),
		() => response.blob(),
		async () => toError(response));
const toUnit = (response: Response) : ResultPromise<Unit, Error> =>
	ResultFactory.createAsync<Unit, Error>(
		async () => isSuccess(response),
		async () => Unit,
		async () => toError(response));

const toError = async (response: Response) =>
	new Error(await response.text());

export const ResponseExtensions = {
	isSuccess,
	toJsonResult,
	toHtmlResult,
	//toXmlResult,
	toTextResult,
	toBlobResult,
	toUnit
}