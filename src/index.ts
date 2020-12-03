import { restClientFactory } from "./RestClientFactory";

export * from "./ErrorResponse";
export * from "./HttpMethod";
export * from "./HttpResponseCode";

export const RestClientFactory = restClientFactory({
	headers: {},
	body: null,
	parameters: {},
	requestInitMappers: [],
	failureMapper: error => error
});

export const RestClient = RestClientFactory.create();