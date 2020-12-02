import { IRequestBuilder } from "./interfaces/IRequestBuilder"
import { IRequestWithParametersBuilder } from "./interfaces/IRequestWithParametersBuilder";
import { RequestWithParametersBuilder } from "./RequestWithParametersBuilder";
import { IRequestExtensions } from "../extensions/IRequestExtensions";

export class RequestBuilder extends RequestWithParametersBuilder implements IRequestBuilder {
	withParameter(key: string, value: string): IRequestBuilder {
		IRequestExtensions.addParameter(this.request, key, value);
		return this;
	};

	withParameters(parameters: { [key: string]: string }): IRequestBuilder {
		IRequestExtensions.addParameters(this.request, parameters);
		return this;
	};

	withHeader(key: string, value: string): IRequestBuilder {
		IRequestExtensions.addHeader(this.request, key, value);
		return this;
	};

	withHeaders(headers: { [key: string]: string }): IRequestBuilder {
		IRequestExtensions.addHeaders(this.request, headers);
		return this;
	};
}