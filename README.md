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
