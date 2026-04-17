# Configuration Reference

All operational configuration lives in `src/app/config`.

## `api.config.ts`

- `CODEWARS_API_CONFIG.baseUrl`
- Default: `https://www.codewars.com/api/v1`

Use this if Codewars changes base host/path in the future.

## `event.config.ts`

- `EVENT_WINDOW_CONFIG.timeZone`
- `EVENT_WINDOW_CONFIG.startIsoEastern`
- `EVENT_WINDOW_CONFIG.endIsoEastern`

Use full ISO timestamps with an Eastern offset (for example `YYYY-MM-DDTHH:mm:ss-04:00`) to keep event configuration in ET.

## `teams.config.ts`

- `SCOREBOARD_TEAMS_CONFIG`
- Each team includes:
  - `teamMembers: string[]`
  - `codeWarsUser: string`

If username is invalid or removed, that team will normally score 0 (with current tolerance settings).

## `scoring.config.ts`


- `ENFORCE_ACCEPTED_LANGUAGES: boolean` (new)


`SCORE_RUBRIC_CONFIG` maps absolute rank id to points.
Example: rank `-1` maps via key `1`.

Behavior of `ENFORCE_ACCEPTED_LANGUAGES`:

- When `true` (default): only completed kata submissions that include at least one language present in `ACCEPTED_LANGUAGES_CONFIG` count toward the scoreboard points. Submissions completed in languages not listed in `ACCEPTED_LANGUAGES_CONFIG` are ignored for scoring, though their language values are still shown in the admin UI.
- When `false`: a team's completed katas that match `ACCEPTED_KATAS_CONFIG` will count toward scoreboard points regardless of the language(s) used for the submission. The completed language is still displayed in the admin UI.

Note on validation: the preflight validation script (`scripts/preflight-validate.ts`) continues to check that each accepted kata is available in all `ACCEPTED_LANGUAGES_CONFIG` languages and will report missing languages as validation warnings/errors regardless of the `ENFORCE_ACCEPTED_LANGUAGES` setting. The flag only affects which submissions are counted toward the scoreboard total.
Only completions with at least one language in `ACCEPTED_LANGUAGES_CONFIG` are considered score-eligible.

For challenges, configure both a display `name` and API lookup key `slug`.
The app uses `slug` for acceptance checks and API validation, while displaying the configured `name` on the scoreboard.

## Toggling `ENFORCE_ACCEPTED_LANGUAGES`

There are three common ways to change how the app enforces accepted languages:

- Edit the config file directly: change the default in `src/app/config/scoring.config.ts`.

- Set it at app startup (runtime): call the exported setter from `main.ts` before the app bootstraps. Example — add this to `src/main.ts`:

```ts
import { setEnforceAcceptedLanguages } from './app/config/scoring.config';

// Optional: read an override from a global injected object (useful when
// hosting the built app behind a server that can inject runtime values).
const runtime = (window as any).SCOREBOARD_RUNTIME as { enforceAcceptedLanguages?: boolean } | undefined;
if (runtime?.enforceAcceptedLanguages !== undefined) {
  setEnforceAcceptedLanguages(Boolean(runtime.enforceAcceptedLanguages));
}

// continue with the normal Angular bootstrap
```

- Toggle in tests: your unit/integration specs can call `setEnforceAcceptedLanguages(false)` in a `beforeEach` and restore the previous value in `afterEach`.

Notes:

- The setter only affects the in-memory runtime flag for the current browser session. Persisting an override across deployments requires changing the source config or injecting a runtime value into the built assets (for example via a server-side template that writes `window.SCOREBOARD_RUNTIME`).
- The preflight validation script `scripts/preflight-validate.ts` always checks kata availability against `ACCEPTED_LANGUAGES_CONFIG` and is unaffected by this flag.

## `runtime.config.ts`

- `refreshIntervalMs`
- `challengeCacheKey`
- `tolerateTeamFetchErrors`
- `tolerateChallengeDetailErrors`

These control refresh cadence, localStorage cache key, and strict-vs-resilient API error behavior.

## `ui.config.ts`

- Auto-scroll timing and movement:
  - `scrollIntervalMs`
  - `scrollStepPx`
  - `topLoiterMs`
  - `bottomLoiterMs`
  - `uiRefreshIntervalMs`
- Labels:
  - `lastUpdatedPrefix`
  - `emptyLastUpdatedValue`

## `app-display.config.ts`

- `APP_DISPLAY_CONFIG.title`

For title/branding text.

## `validation.config.ts`

- `requestTimeoutMs`
- `maxConcurrency`
- `blockServeOnFailure`

Used by the preflight validation script (`npm run validate:preflight`). Controls per-request timeout, the concurrency limit for parallel API calls, and whether validation failures block the serve step. `blockServeOnFailure` defaults to `false` (warn-only); set the `STRICT_PREFLIGHT_VALIDATION=true` environment variable (via `npm run start:strict-preflight`) to override it at runtime.
