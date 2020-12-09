import { IRequestBuilder, requestBuilder } from "./RequestBuilder"
import { IRequest } from "./IRequest";
import { ResultPromise, ResultFactory, Unit } from "functional-ts-primitives";
import { ResponseExtensions } from "./ResponseExtensions";
import fetch, { Response, RequestInit } from 'node-fetch';
import { HttpMethodType } from "./HttpMethod";
import { ErrorResponse } from "./ErrorResponse";

export interface IRestRequestBuilder<TFailure> extends IRequestBuilder<IRestRequestBuilder<TFailure>> {
	/**
	 * Executes the request and returns a result with the successful response or failure value.
	 * @returns A `Result<Response, TFailure>` with the successful response or a failure value.
	 */
	asResponse: () => ResultPromise<Response, TFailure>,

	/**
	 * Executes the request and parses a successful result to the specified model.
	 * @returns A `Result<T, TFailure>` with the successful parsed response or a failure value.
	 */
	as: <T>() => ResultPromise<T, TFailure>,

	/**
	 * Executes the request and returns a successful `Unit` or a failure value.
	 * @returns A `Result<Unit, TFailure>` with a successful `Unit` or a failure value.
	 */
	asUnit: () => ResultPromise<Unit, TFailure>,

	/**
	 * Executes the request and parses a successful result to a string of html.
	 * @returns A `Result<string, TFailure>` with the successful html or a failure value.
	 */
	asHtml: () => ResultPromise<string, TFailure>

	/**
	 * Executes the request and parses a successful result to a string.
	 * @returns A `Result<string, TFailure>` with the successful string or a failure value.
	 */
	asText: () => ResultPromise<string, TFailure>,

	/**
	 * Executes the request and parses a successful result to a Blob.
	 * @returns A `Result<Blob, TFailure>` with the successful Blob or a failure value.
	 */
	asBlob: () => ResultPromise<Blob, TFailure>,

	/**
	 * Updates the builder to map error responses to a different error model.
	 * @param mapFailure A function that maps an `ErrorResponse` to some new model.
	 * @returns The builder with a new failure type.
	 */
	withFailure: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => TNewFailure) => IRestRequestBuilder<TNewFailure>,

	/**
	 * Updates the builder to map error responses to a different error model.
	 * @param mapFailure An async function that maps an `ErrorResponse` to some new model.
	 * @returns The builder with a new failure type.
	 */
	withFailureAsync: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => Promise<TNewFailure>) => IRestRequestBuilder<TNewFailure>

	/**
	 * Mocks the endpoint by returning a response generated by the provided function. To only be used when testing an endpoint prior to its creation.
	 * @param mockFactory A function that produces the Response to be returned by the mock endpoint.
	 * @returns A success value generated from the mock endpoint.
	 */
	mockResponse: (mockFactory: () => Response) => IRestRequestBuilder<TFailure>
	
	/**
	 * Mocks the endpoint by returning a successful response with the json body generated by the provided function. To only be used when testing an endpoint prior to its creation.
	 * @param mockFactory A function that produces the json body of the Response to be returned by the mock endpoint.
	 * @returns A success value generated from the mock endpoint.
	 */
	mockJSONBody: (mockFactory: () => object) => IRestRequestBuilder<TFailure>
}


export const restRequestBuilder = <TFailure>(endpoint: string, method: HttpMethodType, request: IRequest<TFailure>, mockResponse: (() => Response) | null) : IRestRequestBuilder<TFailure> => ({
	...requestBuilder<IRestRequestBuilder<TFailure>, TFailure>(request, request => restRequestBuilder(endpoint, method, request, mockResponse)),
	asResponse: () : ResultPromise<Response, TFailure> =>
		ResultFactory
			.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request, mockResponse))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.mapFailureAsync(request.failureMapper),
	as : <T>() : ResultPromise<T, TFailure> =>
		 ResultFactory
		 	.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request, mockResponse))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.bindAsync<T>(response => ResponseExtensions.toJsonResult<T>(response))
			.mapFailureAsync(request.failureMapper),
	asHtml: () : ResultPromise<string, TFailure> =>
		ResultFactory
			.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request, mockResponse))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.bindAsync<string>(response => ResponseExtensions.toHtmlResult(response))
			.mapFailureAsync(request.failureMapper),
	asText: () : ResultPromise<string, TFailure> =>
		ResultFactory
			.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request, mockResponse))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.bindAsync<string>(response => ResponseExtensions.toTextResult(response))
			.mapFailureAsync(request.failureMapper),
	asBlob: () : ResultPromise<Blob, TFailure> =>
		ResultFactory
			.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request, mockResponse))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.bindAsync<Blob>(response => ResponseExtensions.toBlobResult(response))
			.mapFailureAsync(request.failureMapper),
	asUnit: () : ResultPromise<Unit, TFailure> =>
		ResultFactory
			.tryAsync<Response>(() => fetchFromRequest(endpoint, method, request, mockResponse))
			.mapFailure(error => ResultFactory.failure<Response, Error>(error))
			.bindAsync<Unit>(response => ResponseExtensions.toUnit(response))
			.mapFailureAsync(request.failureMapper),
	withFailure: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => TNewFailure) => restRequestBuilder(endpoint, method, {
		...request,
		failureMapper: async error => mapFailure(error)
	}, mockResponse),
	withFailureAsync: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => Promise<TNewFailure>) => restRequestBuilder(endpoint, method, {
		...request,
		failureMapper: mapFailure
	}, mockResponse),
	mockResponse: (mockFactory: () => Response) => restRequestBuilder(endpoint, method, request, mockFactory),
	mockJSONBody: (mockFactory: () => object) => restRequestBuilder(endpoint, method, request, () => new Response(JSON.stringify(mockFactory()), { status: 200 }))
});

const fetchFromRequest = async <TFailure>(endpoint: string, method: HttpMethodType, request: IRequest<TFailure>, mockResponse: (() => Response) | null) =>
	mockResponse != null
		? mockResponse()
		: fetch(getUrl(endpoint, request.parameters), await getRequest(request, method));

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