import { IRestClient, restClient } from "./RestClient";
import { requestBuilder } from "./RequestBuilder";
import { IRequestBuilder } from "./RequestBuilder";
import { IRequest } from "./IRequest";
import { ErrorResponse } from "./ErrorResponse";

export interface IRestClientFactory<TFailure> extends IRequestBuilder<IRestClientFactory<TFailure>> {
	create() : IRestClient<TFailure>,
	withFailure: <TNewFailure>(mapFailure: (errorResponse: ErrorResponse) => TNewFailure) => IRestClientFactory<TNewFailure>,
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