import { IRestClient } from "./IRestClient";
import { RestClient } from "./RestClient";

export const RestClientFactory = {
	create: () : IRestClient => new RestClient()
}