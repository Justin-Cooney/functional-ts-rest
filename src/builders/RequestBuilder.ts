import { IRequestBuilder } from "./interfaces/IRequestBuilder"
import { IRequestWithParametersBuilder } from "./interfaces/IRequestWithParametersBuilder";
import { RequestWithParametersBuilder } from "./RequestWithParametersBuilder";

export class RequestBuilder extends RequestWithParametersBuilder implements IRequestBuilder {
	withParameter(key: string, value: string): IRequestBuilder {
		this.parameters[key] = value
		return this;
	};

	withParameters(parameters: { [key: string]: string }): IRequestWithParametersBuilder {
		this.parameters = { ...this.parameters, ...parameters }
		return this;
	};
}