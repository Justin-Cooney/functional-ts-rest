import { BodyInit, RequestInit } from 'node-fetch';
import { ErrorResponse } from "./ErrorResponse";

export interface IRequest<TFailure> {
	headers: { [key: string] : string | undefined },
	body: BodyInit | null,
	parameters: { [key: string] : string | undefined },
	requestInitMappers: ((request: RequestInit) => RequestInit)[],
	failureMapper: (error: ErrorResponse) => Promise<TFailure>,
	headersAsync: (() => Promise<{ [key: string] : string }>)[]
}