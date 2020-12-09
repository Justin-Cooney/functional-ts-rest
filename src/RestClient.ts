import { restRequestBuilder } from "./RestRequestBuilder";
import { IRestRequestBuilder } from "./RestRequestBuilder";
import { HttpMethod } from "./HttpMethod";
import { IRequest } from "./IRequest";

export interface IRestClient<TFailure> {
	/**
	 * Begins building a new `GET` request from the RestClient.
	 * @param endpoint The rest endpoint to make a request against.
	 * @returns A request builder.
	 */
	getAsync: (endpoint: string) => IRestRequestBuilder<TFailure>,

	/**
	 * Begins building a new `POST` request from the RestClient.
	 * @param endpoint The rest endpoint to make a request against.
	 * @returns A request builder.
	 */
	postAsync: (endpoint: string) => IRestRequestBuilder<TFailure>,

	/**
	 * Begins building a new `PUT` request from the RestClient.
	 * @param endpoint The rest endpoint to make a request against.
	 * @returns A request builder.
	 */
	putAsync: (endpoint: string) => IRestRequestBuilder<TFailure>,

	/**
	 * Begins building a new `DELETE` request from the RestClient.
	 * @param endpoint The rest endpoint to make a request against.
	 * @returns A request builder.
	 */
	deleteAsync: (endpoint: string) => IRestRequestBuilder<TFailure>
}

export const restClient = <TFailure>(request: IRequest<TFailure>) : IRestClient<TFailure> => ({
	getAsync: (endpoint: string) => restRequestBuilder(endpoint, HttpMethod.Get, request, null),
	postAsync: (endpoint: string) => restRequestBuilder(endpoint, HttpMethod.Post, request, null),
	putAsync: (endpoint: string) => restRequestBuilder(endpoint, HttpMethod.Put, request, null),
	deleteAsync: (endpoint: string) => restRequestBuilder(endpoint, HttpMethod.Delete, request, null),
});
