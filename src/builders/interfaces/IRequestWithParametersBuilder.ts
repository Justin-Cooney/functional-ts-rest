import { IRequestWithBodyBuilder } from "./IRequestWithBodyBuilder";

export interface IRequestWithParametersBuilder extends IRequestWithBodyBuilder {
	withJSONBody(body: object): IRequestWithBodyBuilder,
	withFormData(data: { [key: string]: string }): IRequestWithBodyBuilder,
	withFormDataUrlEncoded(data: { [key: string]: string }): IRequestWithBodyBuilder
}