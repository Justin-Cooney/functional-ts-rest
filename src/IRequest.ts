import { BodyInit, RequestInit } from 'node-fetch';
import { ErrorResponse } from "./ErrorResponse";

export interface IRequest<TFailure> {
	headers: { [key: string] : string },
	body: BodyInit,
	parameters: { [key: string] : string },
	requestInitMappers: ((request: RequestInit) => RequestInit)[],
	failureMapper: (error: ErrorResponse) => TFailure
}