## How does this work?

A scenario is defined in JSON, for example "resolve"

```
{
  "name": "resolve",
  "input": {
    "did": "did:example:123",
    "did-resolution-input-metadata": {}
  },
  "output": {
    "did-document": {
      "id": "did:example:123"
    },
    "did-document-metadata": {},
    "did-resolution-metadata": {}
  }
}
```

A JSON object representing the scenario is posted to the server,

A small javascript function processes the request and returns a response:

```
const assertions = {
  "did should match did-document id": (scenario) => {
    return scenario.input.did === scenario.output["did-document"].id;
  },
};

const testResolve = (scenario) => {
  let assertion_results = {};

  Object.keys(assertions).forEach((assertion) => {
    assertion_results = {
      ...assertion_results,
      [assertion]: assertions[assertion](scenario),
    };
  });

  const test_result = Object.values(assertion_results).every((result) => {
    return result === true;
  });

  return {
    scenario: scenario.name,
    test: test_result ? "PASS" : "FAIL",
    assertion_results,
  };
};
```

For example:

```
{
  "scenario": "resolve",
  "test": "PASS",
  "assertion_results": { "did should match did-document id": true }
}
```

Multiple scenarios can be submitted at once:

```
curl -s -X POST http://localhost:8080/test \
-H "Content-Type: application/json" \
-d @./packages/did-core-test-vectors/did-method/did-key/test-all.json \
| jq '.'
```

And all results are produced as json:

```
❯ curl -s -X POST http://localhost:8080/test \
-H "Content-Type: application/json" \
-d @./packages/did-core-test-vectors/did-method/did-key/test-all.json \
| jq '.'
{
  "test": "PASS",
  "scenarios": [
    {
      "scenario": "resolve",
      "test": "PASS",
      "assertion_results": {
        "did should match did-document id": true
      }
    }
  ]
}
```

## Designing Scenarios

Scenarios can be simple or complex, but they require a vendor to be honest about the inputs and outputs of their system with respect to the did core data model.

A vendor might write extra software to be able to autoamtically generate scenarios for validation.

If a concept can't be represented via a JSON data model and some small javascript program that validates it, it cannot be tested.

## Presentation of Test Results

With more time, test results might be better structured for being consumed in 3rd party software.

### Run Docker Image

```
docker run --publish 3000:3000 --detach --name dcts or13/did-core-test-server:1.0
```

### Run Server Locally

```
npm run docker:up
```
