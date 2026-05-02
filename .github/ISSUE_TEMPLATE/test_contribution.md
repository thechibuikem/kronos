> Part of Kronos -> Developer Productivity Guardian

---
name: Write Tests

about: Contribute unit tests for a module

title: "Tests: [Module Name]"

labels: "good first issue, tests"

---

## Module
[e.g., krons service, repos module]

## Test structure to follow
Use Vitest + mocks. Follow this pattern:

```javascript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { functionName } from "path/to/module";

vi.mock("dependencies");

describe("functionName", () => {
  let req, res; // or relevant test doubles

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset state
  });

  it("happy path: should [behavior]", () => {
    // ARRANGE
    // ACT
    // ASSERT
  });

  it("error case: should [behavior]", () => {
    // ARRANGE
    // ACT
    // ASSERT
  });
});
```

## File location
Place controller-related test at: `[module]/tests/controller/[filename].test.js`
Place service-related test at: `[module]/tests/services/[filename].test.js`

## Checklist
- [ ] Mock external dependencies
- [ ] Test happy path
- [ ] Test error/edge cases
- [ ] Use `expect.objectContaining()` for partial matches
- [ ] File passes `npm run test`

**Questions?** Reply in the issue or check [auth tests](https://github.com/thechibuikem/kronos/tree/main/backend/modules/auth/tests) for reference.