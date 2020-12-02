import { IRequestWithAcceptBuilder } from "./interfaces/IRequestWithAcceptBuilder";
import { ResultPromise, ResultFactory, Unit } from "functional-ts-primitives";
import { ResponseExtensions } from "../extensions/ResponseExtensions";
import { IRequest } from "../IRequest";
import { HttpMethodType } from "../HttpMethod";
import fetch, { Headers, RequestInit, Response, Blob } from 'node-fetch';

export abstract class RequestWithAcceptBuilder implements IRequestWithAcceptBuilder {
	request: IRequest;

	constructor(endpoint: string, method: HttpMethodType) {
		this.request = {
			endpoint: endpoint,
			method: method,
			headers: new Headers(),
			body: null,
			parameters: {}
		}
	}
	
	as<T>(): ResultPromise<T, Error> {
		return ResultFactory
			.tryAsync<Response>(() => this.innerFetch())
			.bindAsync<T>(response => ResponseExtensions.toJsonResult<T>(response));
	};

	asHtml(): ResultPromise<string, Error> {
		return ResultFactory
			.tryAsync<Response>(() => this.innerFetch())
			.bindAsync<string>(response => ResponseExtensions.toHtmlResult(response));
	};

	// asXml(): ResultPromise<Document, Error> {
	// 	return ResultFactory
	// 		.tryAsync<Response>(() => this.innerFetch())
	// 		.bindAsync<Document>(response => ResponseExtensions.toXmlResult(response));
	// }

	asText(): ResultPromise<string, Error> {
		return ResultFactory
			.tryAsync<Response>(() => this.innerFetch())
			.bindAsync<string>(response => ResponseExtensions.toTextResult(response));
	};

	asBlob(): ResultPromise<Blob, Error> {
		return ResultFactory
			.tryAsync<Response>(() => this.innerFetch())
			.bindAsync<Blob>(response => ResponseExtensions.toBlobResult(response));
	};

	asUnit(): ResultPromise<Unit, Error> {
		return ResultFactory
			.tryAsync(() => this.innerFetch())
			.bindAsync<Unit>(response => ResponseExtensions.toUnit(response))
	}

	private innerFetch = () => fetch(this.getUrl(this.request.endpoint, this.request.parameters), this.getRequest());

	private getUrl = (endpoint: string, parameters: { [key: string] : any }) => {
		const url = new URL(endpoint);
		Object
		.keys(parameters)
		.map(key => {
			url.searchParams.append(key, parameters[key]);
		});
		return url;
	}
	
	private getRequest = () : RequestInit => ({
		method: this.request.method,
		headers: this.request.headers,
		body: this.request.body
	});
}