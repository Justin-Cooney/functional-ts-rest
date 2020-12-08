# functional-ts-rest

## Introduction

`functional-ts-rest` provides a fluent and functional builder for making calls to rest services.

## Creating a RestClient

Use the `RestClientFactory` to generate a new `RestClient`:

```typescript
import { RestClientFactory } from 'functional-ts-rest';

const restClient : IRestClient<ErrorResponse> = RestClientFactory.create();
```

Add a bearer auth token using the `withBearer` function:

```typescript
import { RestClientFactory } from 'functional-ts-rest';

const restClient : IRestClient<ErrorResponse> =
	RestClientFactory
		.withBearer('YourToken')
		.create();
```

You can defined a custom failure type for requests made with the rest client using the `withFailure` function. Use this function to map an ErrorResponse to your custom error type:

```typescript
import { RestClientFactory } from 'functional-ts-rest';

var restClient : IRestClient<string> =
	RestClientFactory
		.withFailure(error => `Error: ${error.match(response => response.status.toString(), ex => ex.message)}`)
		.create();
```

## Using the RestClient

Use the get, post, put and delete functions to build a request and then use the `as` function to execute the request and parse the response to your model:

```typescript
const result = 
	await restClient
		.getAsync(`some/url`)
		.withParameters({
			textParam: "SomeValue",
			numberParam: 100
		})
		.acceptJson()
		.as<MyModel>();
```

## Request Types

The rest client currently supports making `GET`, `POST`, `PUT`, and `DELETE` requests:

```typescript
const result = 
	await restClient
		.getAsync(`some/url`)
		.as<MyModel>();

const result = 
	await restClient
		.postAsync(`some/url`)
		.asUnit();

const result = 
	await restClient
		.putAsync(`some/url`)
		.asUnit();

const result = 
	await restClient
		.deleteAsync(`some/url`)
		.asUnit();
```

## Building Requests

### withParameter

Adds a parameter to the url of the request.

```typescript
var result = await restClient
			.getAsync(`${api}/test/GetWithTestParameter`)
			.withParameter("testParam", "SomeValue")
			.acceptJson()
			.asUnit();
```

### withParameters

Adds parameters to the url of the request from an input object.

```typescript
var result = await restClient
			.getAsync(`${api}/test/GetWithTestParameters`)
			.withParameters({
				testParam: "SomeValue",
				otherParam: "OtherValue"
			})
			.acceptJson()
			.asUnit();
```

### withHeader

Adds a header to the request.

```typescript
var result = await restClient
			.postAsync(`${api}/test/PostWithHeader`)
			.withHeader('SomeHeader', 'SomeValue')
			.acceptJson()
			.asUnit();
```

### withHeaders

Adds headers to the request from an input object.

```typescript
var result = await restClient
			.postAsync(`${api}/test/PostWithHeaders`)
			.withHeaders({
				SomeHeader: 'SomeValue',
				OtherHeader: 'OtherValue'
			})
			.asUnit();
```

### withBearer

Adds a function for generating authentication bearer tokens for the request.

```typescript
var result = await RestClientFactory
			.withBearer(() => 'SomeToken')
			.create()
			.postAsync(`${api}/test/PostWithBearerToken`)
			.asUnit();
```

### withBearerAsync

Adds an async function for generating authentication bearer tokens for the request.

```typescript
var result = await RestClientFactory
			.withBearerAsync(async () => 'SomeToken')
			.create()
			.postAsync(`${api}/test/PostWithBearerToken`)
			.asUnit();
```

### withJson

Adds a json body to the request.

```typescript
var result = await restClient
			.postAsync(`${api}/test/PostWithJsonBody`)
			.withJson({
				userId: 1,
				id: 1,
				title: "delectus aut autem",
				completed: true
			})
			.asUnit();
```

### withFormData

Adds form data to the request.

```typescript
var result = await restClient
			.postAsync(`${api}/test/PostWithFormData`)
			.withFormData({
				userId: "1",
				id: "1",
				title: "delectus aut autem",
				completed: "true"
			})
			.asUnit();
```

### withFormDataUrlEncoded

Adds url encoded form data to the request.

```typescript
var result = await restClient
			.postAsync(`${api}/test/PostWithFormData`)
			.withFormDataUrlEncoded({
				userId: "1",
				id: "1",
				title: "delectus aut autem",
				completed: "true"
			})
			.asUnit();
```

### with

Maps the request properties to a new set of request properties. Use this method when you wish to alter the request in a way that no other methods on the builder support.

```typescript
var result = await restClient
			.postAsync(`${api}/test/PostWithHeader`)
			.with(request => ({ ...request, headers: { SomeHeader : "SomeValue" } }))
			.acceptJson()
			.asUnit();
```

## Executing Requests

### asResponse

Executes the request and returns a result with the successful response or failure value.

```typescript
var result : ResultPromise<Response, ErrorResponse> = await restClient
			.create()
			.postAsync(`${api}/test/PostReturnJsonModel`)
			.acceptJson()
			.asResponse();
```

### asResponse

Executes the request and parses a successful result to the specified model.

```typescript
var result : ResultPromise<MyModel, ErrorResponse> = await restClient
			.create()
			.postAsync(`${api}/test/PostReturnJsonModel`)
			.acceptJson()
			.as<MyModel>();
```

### asUnit

Executes the request and returns a successful `Unit` or a failure value.

```typescript
var result : ResultPromise<Unit, ErrorResponse> = await restClient
			.create()
			.postAsync(`${api}/test/PostReturnJsonModel`)
			.acceptJson()
			.asUnit();
```

### asHtml

Executes the request and parses a successful result to a string of html.

```typescript
var result : ResultPromise<string, ErrorResponse> = await restClient
			.create()
			.postAsync(`${api}/test/PostReturnJsonModel`)
			.acceptJson()
			.asHtml();
```

### asText

Executes the request and parses a successful result to a string.

```typescript
var result : ResultPromise<string, ErrorResponse> = await restClient
			.create()
			.postAsync(`${api}/test/PostReturnJsonModel`)
			.acceptJson()
			.asText();
```

### asBlob

Executes the request and parses a successful result to a Blob.

```typescript
var result : ResultPromise<Blob, ErrorResponse> = await restClient
			.create()
			.postAsync(`${api}/test/PostReturnJsonModel`)
			.acceptJson()
			.asBlob();
```

## Mapping Failures

The RestClient or RestClientFactory can be configured to map error responses to some other error model. The functions available for this are:

### withFailure

```typescript
const restClient : IRestClient<string> =
	RestClientFactory
		.withFailure(error => `SomeError ${error.match(response => response.status.toString(), ex => ex.message)}`)
		.create();
```

### withFailureAsync

```typescript
const restClient : IRestClient<string> =
	RestClientFactory
		.withFailureAsync(async error => `SomeError ${await error.matchAsync(response => response.text(), ex => ex.message)}`)
		.create();
```