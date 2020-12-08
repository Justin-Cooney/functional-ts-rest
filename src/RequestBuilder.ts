import { IRequest } from "./IRequest";
import FormData from "form-data";
import URLSearchParams from "url-search-params";
import { RequestInit } from "node-fetch";

export interface IRequestBuilder<TBase extends IRequestBuilder<TBase>> {
	/**
	 * Maps the request properties to a new set of request properties.
	 * @param mapper A function that maps the current `RequestInit` to a new `RequestInit`
	 * @returns The current request builder.
	 */
	with: (mapper: (requestInit: RequestInit) => RequestInit) => TBase

	/**
	 * Adds a parameter to the url of the request.
	 * @param key The key of the parameter.
	 * @param value The value of the parameter.
	 * @returns The current request builder.
	 */
	withParameter: (key: string, value: string) => TBase

	/**
	 * Adds parameters to the url of the request from an input object.
	 * @param parameters An object containing the parameters to be added to the request url.
	 * @returns The current request builder.
	 */
	withParameters: (parameters: { [key: string]: string }) => TBase

	/**
	 * Adds a header to the request.
	 * @param key The name of the header.
	 * @param value The value of the header.
	 * @returns The current request builder.
	 */
	withHeader: (name: string, value: string) => TBase

	/**
	 * Adds headers to the request from an input object.
	 * @param headers An object containing the headers to be added to the request.
	 * @returns The current request builder.
	 */
	withHeaders: (headers: { [key: string]: string }) => TBase

	/**
	 * Adds a function for generating authentication bearer tokens for the request.
	 * @param tokenFactory A factory function that generates a bearer token for the request.
	 * @returns The current request builder.
	 */
	withBearer: (tokenFactory: () => string) => TBase

	/**
	 * Adds an async function for generating authentication bearer tokens for the request.
	 * @param tokenFactory An async factory function that generates a bearer token for the request.
	 * @returns The current request builder.
	 */
	withBearerAsync: (tokenFactory: () => Promise<string>) => TBase

	/**
	 * Adds a json body to the request.
	 * @param body An object to be parsed into json and added as the body of the request.
	 * @returns The current request builder.
	 */
	withJson: (body: object) => TBase

	/**
	 * Adds form data to the request.
	 * @param data An object to be parsed into form data and added to the form data of the request.
	 * @returns The current request builder.
	 */
	withFormData: (data: { [key: string]: string }) => TBase

	/**
	 * Adds url encoded form data to the request.
	 * @param data An object to be parsed into form data and added to the form data of the request.
	 * @returns The current request builder.
	 */
	withFormDataUrlEncoded: (data: { [key: string]: string }) => TBase

	/**
	 * Adds an `Accept` header to the request.
	 * @param type The value of the accept header.
	 * @returns The current request builder.
	 */
	accept: (type: string) => TBase

	/**
	 * Adds an `Accept` header of type `application/json` to the request.
	 * @returns The current request builder.
	 */
	acceptJson: () => TBase

	/**
	 * Adds an `Accept` header of type `text/html` to the request.
	 * @returns The current request builder.
	 */
	acceptHtml: () => TBase

	/**
	 * Adds an `Accept` header of type `text/plain` to the request.
	 * @returns The current request builder.
	 */
	acceptText: () => TBase
}

export const requestBuilder = <TBase extends IRequestBuilder<TBase>, TFailure>(request: IRequest<TFailure>, baseFactory: (request: IRequest<TFailure>) => TBase) : IRequestBuilder<TBase> => ({
	with: (mapper: (requestInit: RequestInit) => RequestInit) => baseFactory({
		...request,
		requestInitMappers: [
			...request.requestInitMappers,
			mapper
		]
	}),
	withParameter: (key: string, value: string) => baseFactory({
		...request,
		parameters: {
			...request.parameters,
			[key]: value
		}
	}),
	withParameters: (parameters: { [key: string]: string }) : TBase => baseFactory({
		...request,
		parameters: {
			...request.parameters,
			...parameters
		}
	}),
	withHeader: (key: string, value: string) : TBase => baseFactory({
		...request,
		headers : {
			...request.headers,
			[key] : value
		}
	}),
	withHeaders: (headers: { [key: string]: string }) : TBase => baseFactory({
		...request,
		headers : {
			...request.headers,
			...headers
		}
	}),
	withBearer: (tokenFactory: () => string) : TBase => baseFactory({
		...request,
		headersAsync : [
			...request.headersAsync,
			(async () => ({ Authorization: `Bearer ${tokenFactory()}` }))
		]
	}),
	withBearerAsync: (tokenFactory: () => Promise<string>) : TBase => baseFactory({
		...request,
		headersAsync: [
			...request.headersAsync,
			(async () => ({ Authorization: `Bearer ${await tokenFactory()}` }))
		]
	}),
	withJson: (body: object) : TBase => baseFactory({
			...request,
			body: JSON.stringify(body)
	}).withHeader("Content-Type", "application/json"),
	withFormData: (data: { [key: string]: string }) : TBase => {
		const formData = new FormData();
		Object
			.keys(data)
			.map(key => {
				formData.append(key, data[key]);
			});
		return baseFactory({
			...request,
			body: formData
		})
	},
	withFormDataUrlEncoded: (data: { [key: string]: string }) : TBase => {
		const params = new URLSearchParams();
		Object
			.keys(data)
			.map(key => {
				params.append(key, data[key]);
			});
		return baseFactory({
			...request,
			body: params
		})
	},
	accept : (type: string) : TBase => baseFactory(request).withHeader("Accept", type),
	acceptJson : () : TBase => baseFactory(request).accept("application/json"),
	acceptHtml: () : TBase => baseFactory(request).accept("text/html"),
	acceptText : () : TBase => baseFactory(request).accept("text/plain")
});