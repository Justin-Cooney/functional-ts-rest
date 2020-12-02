import { IRequestWithHeadersBuilder } from "./IRequestWithHeadersBuilder";

export interface IRequestWithBodyBuilder extends IRequestWithHeadersBuilder {
	withHeader(key: string, value: string): IRequestWithBodyBuilder,
	withHeaders(headers: { [key: string]: string }): IRequestWithHeadersBuilder
}