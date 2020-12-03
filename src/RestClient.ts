import { restRequestBuilder } from "./RestRequestBuilder";
import { IRestRequestBuilder } from "./RestRequestBuilder";
import { HttpMethod } from "./HttpMethod";
import { IRequest } from "./IRequest";

export interface IRestClient<TFailure> {
	getAsync: (endpoint: string) => IRestRequestBuilder<TFailure>,
	postAsync: (endpoint: string) => IRestRequestBuilder<TFailure>,
	putAsync: (endpoint: string) => IRestRequestBuilder<TFailure>,
	deleteAsync: (endpoint: string) => IRestRequestBuilder<TFailure>
}

export const restClient = <TFailure>(request: IRequest<TFailure>) : IRestClient<TFailure> => ({
	getAsync: (endpoint: string) => restRequestBuilder(endpoint, HttpMethod.Get, request),
	postAsync: (endpoint: string) => restRequestBuilder(endpoint, HttpMethod.Post, request),
	putAsync: (endpoint: string) => restRequestBuilder(endpoint, HttpMethod.Put, request),
	deleteAsync: (endpoint: string) => restRequestBuilder(endpoint, HttpMethod.Delete, request),
});
