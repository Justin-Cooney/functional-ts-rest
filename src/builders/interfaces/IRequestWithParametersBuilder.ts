import { IRequestWithHeadersBuilder } from "./IRequestWithHeadersBuilder";

export interface IRequestWithParametersBuilder extends IRequestWithHeadersBuilder {
	withJSONBody(body: object): IRequestWithHeadersBuilder,
	withFormData(data: { [key: string]: string }): IRequestWithHeadersBuilder,
	withFormDataUrlEncoded(data: { [key: string]: string }): IRequestWithHeadersBuilder
}