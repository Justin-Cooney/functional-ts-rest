import { Unit } from "functional-ts-primitives";
import { RestClientFactory } from "../src";

const api = "http://localhost:55304";

interface IToDo {
	userId: number,
	id: number,
	title: string,
	completed: boolean
}

describe('getAsync', () => {
	test('getAsync as Unit returns success', async () => {
		var result = await RestClientFactory
			.create()
			.getAsync(`${api}/test/GetReturnJsonModel`)
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});

	test('getAsync as model returns model', async () => {
		var result = await RestClientFactory
			.create()
			.getAsync(`${api}/test/GetReturnJsonModel`)
			.acceptJson()
			.as<IToDo>();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toStrictEqual({
			userId: 1,
			id: 1,
			title: "delectus aut autem",
			completed: true
		});
	});

	test('getAsync with test query parameter', async () => {
		var result = await RestClientFactory
			.create()
			.getAsync(`${api}/test/GetWithTestParameter`)
			.withParameter("testParam", "SomeValue")
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});

	test('getAsync with test query parameters', async () => {
		var result = await RestClientFactory
			.create()
			.getAsync(`${api}/test/GetWithTestParameters`)
			.withParameters({
				testParam: "SomeValue",
				otherParam: "OtherValue"
			})
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});

	test('getAsync with test query parameter', async () => {
		var result = await RestClientFactory
			.create()
			.getAsync(`${api}/test/GetWithTestParameters?testParam=SomeValue`)
			.withParameter("otherParam", "OtherValue")
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});

	test('getAsync accept html', async () => {
		var result = await RestClientFactory
			.create()
			.getAsync(`${api}/test/GetReturnHtml`)
			.acceptHtml()
			.asHtml();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe("<div>Hello World</div>");
	});

	test('getAsync accept text', async () => {
		var result = await RestClientFactory
			.create()
			.getAsync(`${api}/test/GetReturnText`)
			.acceptText()
			.asText();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe("Hello World");
	});

	// test('getAsync accept xml', async () => {
	// 	var result = await RestClientFactory
	// 		.create()
	// 		.getAsync(`${api}/test/GetReturnXML`)
	// 		.acceptXml()
	// 		.asXml();
	// 	expect(result.isSuccess).toBeTruthy();
	// 	expect(result.match(model => model.body, error => null)).toBe("<note><body>Message content</body></note>");
	// });

	test('getAsync as file', async () => {
		var result = await RestClientFactory
			.create()
			.getAsync(`${api}/test/GetReturnTxt`)
			.asBlob();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(blob => blob.size, error => null)).toBe(372);
	});
});

describe('postAsync', () => {
	test('postAsync as Unit returns success', async () => {
		var result = await RestClientFactory
			.create()
			.postAsync(`${api}/test/PostReturnJsonModel`)
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});

	test('postAsync as model returns model', async () => {
		var result = await RestClientFactory
			.create()
			.postAsync(`${api}/test/PostReturnJsonModel`)
			.acceptJson()
			.as<IToDo>();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toStrictEqual({
			userId: 1,
			id: 1,
			title: "delectus aut autem",
			completed: true
		});
	});

	test('postAsync with json body', async () => {
		var result = await RestClientFactory
			.create()
			.postAsync(`${api}/test/PostWithJsonBody`)
			.withJSONBody({
				userId: 1,
				id: 1,
				title: "delectus aut autem",
				completed: true
			})
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});

	test('postAsync with form data', async () => {
		var result = await RestClientFactory
			.create()
			.postAsync(`${api}/test/PostWithFormData`)
			.withFormData({
				userId: "1",
				id: "1",
				title: "delectus aut autem",
				completed: "true"
			})
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});

	test('postAsync with encoded form data', async () => {
		var result = await RestClientFactory
			.create()
			.postAsync(`${api}/test/PostWithFormData`)
			.withFormDataUrlEncoded({
				userId: "1",
				id: "1",
				title: "delectus aut autem",
				completed: "true"
			})
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});

	test('postAsync with header', async () => {
		var result = await RestClientFactory
			.create()
			.postAsync(`${api}/test/PostWithHeader`)
			.withHeader('SomeHeader', 'SomeValue')
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});

	test('postAsync with header', async () => {
		var result = await RestClientFactory
			.create()
			.postAsync(`${api}/test/PostWithHeaders`)
			.withHeaders({
				SomeHeader: 'SomeValue',
				OtherHeader: 'OtherValue'
			})
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});

	test('postAsync with header', async () => {
		var result = await RestClientFactory
			.create()
			.postAsync(`${api}/test/PostWithHeaders`)
			.withHeaders({
				SomeHeader: 'SomeValue',
				OtherHeader: 'OtherValue'
			})
			.acceptJson()
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match<any>(model => model, error => error)).toBe(Unit);
	});
});

describe('putAsync', () => {
	test('putAsync as Unit returns success', async () => {
		var result = await RestClientFactory
			.create()
			.putAsync(`${api}/test/PutTest`)
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});
});

describe('deleteAsync', () => {
	test('deleteAsync as Unit returns success', async () => {
		var result = await RestClientFactory
			.create()
			.deleteAsync(`${api}/test/DeleteTest`)
			.asUnit();
		expect(result.isSuccess()).toBeTruthy();
		expect(result.match(model => model, error => null)).toBe(Unit);
	});
});

describe('errors', () => {
	test('errors are returned', async () => {
		var result = await RestClientFactory
			.create()
			.deleteAsync(`${api}/test/ExceptionTest`)
			.asUnit();
		expect(result.isSuccess()).toBeFalsy();
		expect(result.match(model => null, error => error.message)).toContain("Some unexpected exception");
	});
});