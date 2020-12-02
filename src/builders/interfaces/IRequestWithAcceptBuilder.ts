import { ResultPromise, Unit } from "functional-ts-primitives";
import { Blob } from 'node-fetch';

export interface IRequestWithAcceptBuilder {
	as<T>(): ResultPromise<T, Error>,
	asUnit(): ResultPromise<Unit, Error>,
	asHtml(): ResultPromise<string, Error>,
	//asXml(): ResultPromise<Document, Error>,
	asText(): ResultPromise<string, Error>,
	asBlob(): ResultPromise<Blob, Error>
}