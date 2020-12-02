import { IRequest } from '../IRequest';
import FormData from 'form-data';
import URLSearchParams from 'url-search-params';

const addHeader = (request: IRequest, name: string, value: string) : IRequest => {
	request.headers.set(name, value);
	return request;
}

const addHeaders = (request: IRequest, headers: { [key: string]: string }) : IRequest => {
	Object
		.keys(headers)
		.forEach(key => request.headers.set(key, headers[key]))
	return request;
}

const addParameter = (request: IRequest, name: string, value: string) : IRequest => {
	request.parameters[name] = value
	return request;
}

const addParameters = (request: IRequest, parameters: { [key: string]: string }) : IRequest => {
	request.parameters = { ...request.parameters, ...parameters }
	return request;
}

const setJSONBody = (request: IRequest, body: object): IRequest => {
	request.body = JSON.stringify(body);
	return request;
}

const setFormDataBody = (request: IRequest, data: { [key: string]: string }): IRequest => {
	const formData = new FormData();
	Object
		.keys(data)
		.map(key => {
			formData.append(key, data[key]);
		});
	request.body = formData;
	return request;
}

const setURLSearchParameters = (request: IRequest, data: { [key: string]: string }): IRequest => {
	const params = new URLSearchParams();
	Object
		.keys(data)
		.map(key => {
			params.append(key, data[key]);
		});
	request.body = params;
	return request;
}

export const IRequestExtensions = {
	addHeader,
	addHeaders,
	addParameter,
	addParameters,
	setJSONBody,
	setFormDataBody,
	setURLSearchParameters
}