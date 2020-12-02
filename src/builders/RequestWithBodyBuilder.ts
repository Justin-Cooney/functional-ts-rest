import { IRequestExtensions } from "../extensions/IRequestExtensions";
import { RequestWithHeadersBuilder } from "./RequestWithHeadersBuilder";
import { IRequestWithBodyBuilder } from "./interfaces/IRequestWithBodyBuilder";
import { IRequestWithHeadersBuilder } from "./interfaces/IRequestWithHeadersBuilder";

export abstract class RequestWithBodyBuilder extends RequestWithHeadersBuilder implements IRequestWithBodyBuilder {
	withHeader(key: string, value: string): IRequestWithBodyBuilder {
		IRequestExtensions.addHeader(this.request, key, value);
		return this;
	};

	withHeaders(headers: { [key: string]: string }): IRequestWithHeadersBuilder {
		IRequestExtensions.addHeaders(this.request, headers);
		return this;
	};
}