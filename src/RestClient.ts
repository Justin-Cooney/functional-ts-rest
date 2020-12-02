import { IRequestBuilder } from "./builders/interfaces/IRequestBuilder";
import { RequestBuilder } from "./builders/RequestBuilder";
import { HttpMethod } from "./HttpMethod";
import { IRestClient } from "./IRestClient";

export class RestClient implements IRestClient {
	getAsync(endpoint: string) : IRequestBuilder {
		return new RequestBuilder(endpoint, HttpMethod.Get);
	};
	postAsync(endpoint: string) : IRequestBuilder {
		return new RequestBuilder(endpoint, HttpMethod.Post)
	};
	putAsync(endpoint: string) : IRequestBuilder {
		return new RequestBuilder(endpoint, HttpMethod.Put)
	};
	deleteAsync(endpoint: string): IRequestBuilder {
		return new RequestBuilder(endpoint, HttpMethod.Delete)
	}
}