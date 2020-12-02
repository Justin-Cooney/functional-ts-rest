import { IRequestExtensions } from "../extensions/IRequestExtensions";
import { IRequestWithHeadersBuilder } from "./interfaces/IRequestWithHeadersBuilder";
import { RequestWithAcceptBuilder } from "./RequestWithAcceptBuilder";
import { IRequestWithAcceptBuilder } from "./interfaces/IRequestWithAcceptBuilder";

export abstract class RequestWithHeadersBuilder extends RequestWithAcceptBuilder implements IRequestWithHeadersBuilder {
	accept(type: string): IRequestWithAcceptBuilder {
		IRequestExtensions.addHeader(this.request, "Accept", type);
		return this;
	}

	acceptJson(): IRequestWithAcceptBuilder {
		IRequestExtensions.addHeader(this.request, "Accept", "application/json");
		return this;
	}

	acceptHtml(): IRequestWithAcceptBuilder {
		IRequestExtensions.addHeader(this.request, "Accept", "text/html");
		return this;
	}

	// acceptXml(): IRequestWithAcceptBuilder {
	// 	IRequestExtensions.addHeader(this.request, "Accept", "application/xml");
	// 	return this;
	// }
	
	acceptText(): IRequestWithAcceptBuilder {
		IRequestExtensions.addHeader(this.request, "Accept", "text/plain");
		return this;
	}

	// acceptPdf(): IRequestWithAcceptBuilder {
	// 	IRequestExtensions.addHeader(this.request, "Accept", "application/pdf")
	// 	return this;
	// }
}