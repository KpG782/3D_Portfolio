---
name: context-7
description: Verify code against current, real library documentation before using an API. Use when working with a specific library/framework version and you must not guess APIs. Encourages checking official docs/types for the installed version. NOTE - the real Context7 is an MCP server; see setup notes below to enable live doc lookup.
---

# Context-7 (docs-grounded coding)

Don't code from memory of how a library *used to* work — ground it in the
docs/types for the version actually installed.

## When to use
Invoke when you're about to use a library API and version drift could bite
(new major versions, deprecated methods, changed signatures).

## Method (works today, no extra setup)

1. **Find the installed version.**
   `node -p "require('<pkg>/package.json').version"` (or check the lockfile).

2. **Read the source of truth locally.** Inspect the package's own
   `package.json` (exports, peerDependencies), TypeScript `.d.ts` types, and
   README inside `node_modules/<pkg>`. The installed code never lies about
   its API.

3. **Confirm signatures before calling.** Verify the function/prop exists in
   THIS version rather than assuming. For React/Three/Tailwind, check peer
   ranges so you don't mix incompatible majors.

4. **Prefer official examples** matching the installed major version.

5. **State your evidence.** When you use an API, note where you confirmed it
   ("verified against three@0.x types") so it's auditable.

## Enabling the real Context7 MCP (optional, recommended)

Context7 (by Upstash) is an MCP server that fetches live, version-accurate
docs. To wire it up so live lookups are available in sessions, add it to your
MCP config (e.g. `.mcp.json` or Claude settings):

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

Once connected, its `mcp__context7__*` tools provide live documentation
retrieval; this skill's discipline still applies — confirm against the
installed version.
