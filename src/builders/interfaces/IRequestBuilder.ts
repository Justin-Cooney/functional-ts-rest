import { IRequestWithParametersBuilder } from "./IRequestWithParametersBuilder";

export interface IRequestBuilder extends IRequestWithParametersBuilder {
	withParameter(key: string, value: string): IRequestBuilder,
	withParameters(parameters: { [key: string]: string }): IRequestBuilder,
	withHeader(key: string, value: string): IRequestBuilder,
	withHeaders(headers: { [key: string]: string }): IRequestBuilder
}