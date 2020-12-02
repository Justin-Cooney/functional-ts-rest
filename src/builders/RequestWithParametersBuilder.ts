import { RequestWithHeadersBuilder } from "./RequestWithHeadersBuilder";
import { IRequestWithHeadersBuilder } from "./interfaces/IRequestWithHeadersBuilder";
import { IRequestWithParametersBuilder } from "./interfaces/IRequestWithParametersBuilder";
import { IRequestExtensions } from "../extensions/IRequestExtensions";

export abstract class RequestWithParametersBuilder extends RequestWithHeadersBuilder implements IRequestWithParametersBuilder {
	withJSONBody(body: object): IRequestWithHeadersBuilder {
		IRequestExtensions.setJSONBody(this.request, body);
		IRequestExtensions.addHeader(this.request, "Content-Type", "application/json");
		return this;
	}

	withFormData(data: { [key: string]: string }): IRequestWithHeadersBuilder {
		IRequestExtensions.setFormDataBody(this.request, data);
		return this;
	}

	withFormDataUrlEncoded(data: { [key: string]: string }): IRequestWithHeadersBuilder {
		IRequestExtensions.setURLSearchParameters(this.request, data);
		return this;
	}
}