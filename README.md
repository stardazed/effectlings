# effectlings
> These exercises are made for me by Claude Sonnet 5.5 (medium). expect some strange effect code.

Small exercises that teach Effect v4, one idea at a time. Think rustlings or ziglings, for Effect.
You only need to know TypeScript. Effect is taught as a language, from the ground up.

Pinned to `effect@4.0.4` (TypeScript 7, Node 22 or newer).

## Start

```sh
npm install
npm start
```

`npm start` watches the `exercises/` folder. It shows the first exercise you have not finished,
re-runs it every time you save, and moves on when it passes.

## How an exercise works

Open the file named by the CLI and read the header comment. Then make it pass:
no type errors, and every `check(...)` at the bottom prints `ok`.

- `complete`: replace the `todo()` holes with your code.
- `fix`: the code is wrong or does not compile. Repair it.
- `translate`: plain TypeScript is shown in a comment. Write the Effect version.

When it passes, delete the `// I AM NOT DONE` line. That records your progress and moves you on.
Progress is saved in `.effectlings/progress.json`.

Do not edit the `check(...)` lines. Everything above them is yours.

## Commands

| Command | What it does |
|---|---|
| `npm start` | Watch mode. Keys: `h` hint, `l` list, `r` re-run, `q` quit |
| `npm run list` | Show all exercises and your progress |
| `npm run next` | Print the current exercise |
| `npm run run -- <n or name>` | Run one exercise once |
| `npm run hint [-- <n or name>]` | Reveal the next hint, easiest first |
| `npm run reset -- <n or name>` | Restore an exercise to its original state |

Reference solutions are in `solutions/`, mirroring `exercises/`. Try the hints first.

## Chapters

| Chapter | Topic | Exercises |
|---|---|---|
| 00_intro | The tool, and what an Effect is | 6 |
| 01_words | Constructors and runners | 15 |
| 02_grammar | map, flatMap, gen, fn, all, forEach | 25 |
| 03_types | Reading and steering A, E, R | 15 |
| 04_errors | Tagged errors, catch*, defects, Cause, Exit, reasons | 29 |
| 05_data | Option, Result, Array, Record, Data, Match, Duration, Predicate | 35 |
| 06_services | Context.Service, Layer, Reference, memoization, mocks | 24 |
| 07_resources | Scope, acquireRelease, finalizers, layers that own resources | 14 |
| 08_concurrency | Fibers, interruption, Ref, Deferred, Latch, Semaphore, Queue, PubSub | 31 |
| 09_schema | Schema: structs, rules, brands, transformations, classes, JSON | 39 |
| 10_streams | Stream and Sink | 29 |
| 11_time | retry, repeat, Schedule, TestClock, DateTime | 20 |
| 12_observability | Config, logging, metrics, tracing | 31 |
| 13 to 15 | Testing with vitest, batching and caching, running Effect in an app, unstable modules | planned |

## For maintainers

Exercises and solutions are generated from one source file each, in `authoring/`.
This keeps them in sync and lets a linter check the teaching order.

```sh
npm run build:exercises -- --lint     lint only
npm run build:exercises -- --force    regenerate exercises/, solutions/, info.json, LEDGER.md
npm run verify                        every solution must pass, every exercise must fail
```

Authoring directives (see the header of `tools/build.ts`):
`//#title`, `//#kind`, `//#hint`, `//#teaches`, `//#deepens`, `//#later`,
and `//#solution` / `//#exercise` / `//#end` blocks.

The linter reads every `Module.member` used in code (plus `pipe`, `.pipe`, `yield*`) and requires it
to be taught earlier, taught in the same exercise, or marked `//#later` on purpose.
`authoring/LEDGER.md` lists what each exercise teaches.

## Updating to a newer version

Unpack the new version next to your old one and copy `.effectlings/progress.json` across.
Paths of finished exercises never change, so your progress carries over.

Regenerating overwrites `exercises/`. Do not run it in a copy where you are solving exercises.
