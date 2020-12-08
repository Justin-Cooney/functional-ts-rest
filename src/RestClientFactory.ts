import { IRestClient, restClient } from "./RestClient";
import { requestBuilder } from "./RequestBuilder";
import { IRequestBuilder } from "./RequestBuilder";
import { IRequest } from "./IRequest";
import { ErrorResponse } from "./ErrorResponse";

export interface IRestClientFactory<TFailure> extends IRequestBuilder<IRestClientFactory<TFailure>> {
	/**
	 * Creates a new rest client with the configuration specified by factory.
	 * @returns A new RestClient.
	 */
	create() : IRestClient<TFailure>,

	/**
	 * Updates the builder to map error responses to a different error model.
	 * @param mapFailure A function that maps an `ErrorResponse` to some new model.
	 * @returns The builder with a new failure type.
	 */
	withFailure: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => TNewFailure) => IRestClientFactory<TNewFailure>,

	/**
	 * Updates the builder to map error responses to a different error model.
	 * @param mapFailure An async function that maps an `ErrorResponse` to some new model.
	 * @returns The builder with a new failure type.
	 */
	withFailureAsync: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => Promise<TNewFailure>) => IRestClientFactory<TNewFailure>
}

export const restClientFactory = <TFailure>(request: IRequest<TFailure>) : IRestClientFactory<TFailure> => ({
	...requestBuilder(request, (r) => restClientFactory(r)),
	create: () => restClient(request),
	withFailure: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => TNewFailure) => restClientFactory({
		...request,
		failureMapper: async error => mapFailure(error)
	}),
	withFailureAsync: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => Promise<TNewFailure>) => restClientFactory({
		...request,
		failureMapper: mapFailure
	})
});