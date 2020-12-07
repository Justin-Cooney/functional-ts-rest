import { IRequestBuilder, requestBuilder } from "./RequestBuilder"
import { IRequest } from "./IRequest";
import { ResultPromise, ResultFactory, Unit } from "functional-ts-primitives";
import { ResponseExtensions } from "./ResponseExtensions";
import fetch, { Response, RequestInit } from 'node-fetch';
import { HttpMethodType } from "./HttpMethod";
import { ErrorResponse } from "./ErrorResponse";

export interface IRestRequestBuilder<TFailure> extends IRequestBuilder<IRestRequestBuilder<TFailure>> {
	asResponse: () => ResultPromise<Response, TFailure>,
	as: <T>() => ResultPromise<T, TFailure>,
	asUnit: () => ResultPromise<Unit, TFailure>,
	asHtml: () => ResultPromise<string, TFailure>
	asText: () => ResultPromise<string, TFailure>,
	asBlob: () => ResultPromise<Blob, TFailure>,
	withFailure: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => TNewFailure) => IRestRequestBuilder<TNewFailure>
}


export const restRequestBuilder = <TFailure>(endpoint: string, method: HttpMethodType, request: IRequest<TFailure>) : IRestRequestBuilder<TFailure> => ({
	...requestBuilder<IRestRequestBuilder<TFailure>, TFailure>(request, request => restRequestBuilder(endpoint, method, request)),
	asResponse: () : ResultPromise<Response, TFailure> =>
		ResultFactory
			.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.mapFailure(request.failureMapper),
	as : <T>() : ResultPromise<T, TFailure> =>
		 ResultFactory
		 	.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.bindAsync<T>(response => ResponseExtensions.toJsonResult<T>(response))
			.mapFailure(request.failureMapper),
	asHtml: () : ResultPromise<string, TFailure> =>
		ResultFactory
			.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.bindAsync<string>(response => ResponseExtensions.toHtmlResult(response))
			.mapFailure(request.failureMapper),
	asText: () : ResultPromise<string, TFailure> =>
		ResultFactory
			.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.bindAsync<string>(response => ResponseExtensions.toTextResult(response))
			.mapFailure(request.failureMapper),
	asBlob: () : ResultPromise<Blob, TFailure> =>
		ResultFactory
			.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.bindAsync<Blob>(response => ResponseExtensions.toBlobResult(response))
			.mapFailure(request.failureMapper),
	asUnit: () : ResultPromise<Unit, TFailure> =>
		ResultFactory
			.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.bindAsync<Unit>(response => ResponseExtensions.toUnit(response))
			.mapFailure(request.failureMapper),
	withFailure: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => TNewFailure) => restRequestBuilder(endpoint, method, {
		...request,
		failureMapper: mapFailure
	})
});

const fetchFromRequest = async <TFailure>(endpoint: string, method: HttpMethodType, request: IRequest<TFailure>) => fetch(getUrl(endpoint, request.parameters), await getRequest(request, method));

const getUrl = (endpoint: string, parameters: { [key: string] : any }) => {
	const url = new URL(endpoint);
	Object
	.keys(parameters)
	.map(key => {
		url.searchParams.append(key, parameters[key]);
	});
	return url;
}

const getRequest = async <TFailure>(request: IRequest<TFailure>, method: HttpMethodType) : Promise<RequestInit> =>
{
	var asyncHeaders = await Promise.all(request.headersAsync.map(getHeader => getHeader()));
	var requestInit : RequestInit = {
		method: method,
		headers: {
			...Object.assign({}, ...asyncHeaders),
			...request.headers
		},
		body: request.body ?? undefined
	};
	request.requestInitMappers.forEach(mapper => requestInit = mapper(requestInit));
	return requestInit;
}