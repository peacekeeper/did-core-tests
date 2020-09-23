const assertions = {
  "DID must not be empty": (scenario) => {
    if (scenario.input.did) return true; else return false;
  },
  "DID syntax is correctly parsed": (scenario) => {
    var url;
    // DID must be a valid URL
    try { url = new URL(scenario.input.did); } catch (error) { url = null; };
    if (! url) return false === scenario.output.valid_did;
    // The URI scheme MUST be 'did:'
    if (! (url.protocol === 'did:')) return false === scenario.output.valid_did;
    // The DID method name MUST be an ASCII lowercase string
    let method_name = url.pathname.substring(0, url.pathname.indexOf(':'));
    if (! (result = method_name.toLowerCase() === method_name)) return false === scenario.output.valid_did;
    // done
    return true === scenario.output.valid_did;
  },
};

const testDidSyntax = (scenario) => {
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

module.exports = testDidSyntax;
