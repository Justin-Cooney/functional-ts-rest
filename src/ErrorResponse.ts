import { Result, ResultFactory } from "functional-ts-primitives";
import { Response } from "node-fetch";

export interface ErrorResponse extends Result<Response, Error> {
}