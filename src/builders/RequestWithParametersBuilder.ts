import { RequestWithBodyBuilder } from "./RequestWithBodyBuilder";
import { IRequestWithBodyBuilder } from "./interfaces/IRequestWithBodyBuilder";
import { IRequestWithParametersBuilder } from "./interfaces/IRequestWithParametersBuilder";
import { IRequestExtensions } from "../extensions/IRequestExtensions";

export abstract class RequestWithParametersBuilder extends RequestWithBodyBuilder implements IRequestWithParametersBuilder {
	withJSONBody(body: object): IRequestWithBodyBuilder {
		IRequestExtensions.setJSONBody(this.request, body);
		IRequestExtensions.addHeader(this.request, "Content-Type", "application/json");
		return this;
	}

	withFormData(data: { [key: string]: string }): IRequestWithBodyBuilder {
		IRequestExtensions.setFormDataBody(this.request, data);
		return this;
	}

	withFormDataUrlEncoded(data: { [key: string]: string }): IRequestWithBodyBuilder {
		IRequestExtensions.setURLSearchParameters(this.request, data);
		return this;
	}
}