### Run Docker Image

```
docker run --publish 3000:3000 --detach --name dcts or13/did-core-test-server:1.0
```

### Run Server Locally

```
npm run docker:up
```

### Test Against Local Server

```
curl -s -X POST http://localhost:8080/test \
-H "Content-Type: application/json" \
-d @./packages/did-core-test-vectors/did-method/did-key/test-all.json \
| jq '.'
```

##### Example Response

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
