import { HttpMethodType } from "./HttpMethod";
import { Headers, BodyInit } from 'node-fetch';

export interface IRequest {
	endpoint: string,
	method: HttpMethodType,
	headers: Headers,
	body: BodyInit,
	parameters: { [key: string] : string }
}