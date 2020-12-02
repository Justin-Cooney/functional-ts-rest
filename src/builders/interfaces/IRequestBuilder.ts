import { IRequestWithParametersBuilder } from "./IRequestWithParametersBuilder";

export interface IRequestBuilder extends IRequestWithParametersBuilder {
	withParameter(key: string, value: string): IRequestBuilder,
	withParameters(parameters: { [key: string]: string }): IRequestWithParametersBuilder
}