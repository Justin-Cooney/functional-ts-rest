import { IRequestBuilder } from "./builders/interfaces/IRequestBuilder";

export interface IRestClient {
	getAsync(endpoint: string) : IRequestBuilder,
	postAsync(endpoint: string) : IRequestBuilder,
	putAsync(endpoint: string) : IRequestBuilder,
	deleteAsync(endpoint: string) : IRequestBuilder
}