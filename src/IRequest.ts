import { BodyInit, RequestInit } from 'node-fetch';
import { ErrorResponse } from "./ErrorResponse";

export interface IRequest<TFailure> {
	headers: { [key: string] : string },
	body: BodyInit | null,
	parameters: { [key: string] : string },
	requestInitMappers: ((request: RequestInit) => RequestInit)[],
	failureMapper: (error: ErrorResponse) => TFailure,
	headersAsync: (() => Promise<{ [key: string] : string }>)[]
}