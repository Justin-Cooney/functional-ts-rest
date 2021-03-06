import { restClientFactory } from "./RestClientFactory";
export { IRestClient } from './RestClient';

export * from "./ErrorResponse";
export * from "./HttpMethod";
export * from "./HttpResponseCode";

export const RestClientFactory = restClientFactory({
	headers: {},
	body: null,
	parameters: {},
	requestInitMappers: [],
	failureMapper: async error => error,
	headersAsync: []
});