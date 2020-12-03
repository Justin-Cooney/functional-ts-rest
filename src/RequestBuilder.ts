import { IRequest } from "./IRequest";
import { ErrorResponse } from "./ErrorResponse";
import FormData from "form-data";
import URLSearchParams from "url-search-params";
import { RequestInit } from "node-fetch";

export interface IRequestBuilder<TBase extends IRequestBuilder<TBase>> {
	with: (mapper: (requestInit: RequestInit) => RequestInit) => TBase
	withParameter: (key: string, value: string) => TBase
	withParameters: (parameters: { [key: string]: string }) => TBase
	withHeader: (key: string, value: string) => TBase
	withHeaders: (headers: { [key: string]: string }) => TBase
	withBearer: (token: string) => TBase
	withJson: (body: object) => TBase
	withFormData: (data: { [key: string]: string }) => TBase
	withFormDataUrlEncoded: (data: { [key: string]: string }) => TBase
	accept: (type: string) => TBase
	acceptJson: () => TBase
	acceptHtml: () => TBase
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
	withBearer: (token: string) : TBase => baseFactory({
		...request,
		headers : {
			...request.headers,
			Authorization: `Bearer ${token}`
		}
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
	acceptText : () : TBase => baseFactory(request).accept("text/plain"),
	// withFailure : <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => TNewFailure) : TBase => baseFactory(({
	// 	...request,
	// 	failureMapper: mapFailure
	// }))
});