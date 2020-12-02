import { IRequestWithAcceptBuilder } from "./IRequestWithAcceptBuilder";

export interface IRequestWithHeadersBuilder extends IRequestWithAcceptBuilder {
	accept(type: string): IRequestWithAcceptBuilder,
	acceptJson(): IRequestWithAcceptBuilder,
	acceptHtml(): IRequestWithAcceptBuilder,
	//acceptXml(): IRequestWithAcceptBuilder,
	acceptText(): IRequestWithAcceptBuilder
	// acceptPdf(): IRequestWithAcceptBuilder
}