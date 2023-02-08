# PostHog GitHub Action

This action lets you send annotations to PostHog from your GitHub actions.

At PostHog we use it to track when PRs are merged

## Inputs

### `posthog-API-token`

**Required** Your PostHog Personal API Token. Not the write-only project key. Create a personal api token at https://app.posthog.com/me/settings

### `posthog-project-id

**Required** Your PostHog Project ID. You can find this in the project settings.

### `posthog-api-host`

Your PostHog API Host.

Defaults to "https://app.posthog.com"

### `annotation-message`

**REQUIRED** The message to send to PostHog.

## Example usage

Your personal API token must be kept secret.

```yaml
name: Report PR to PostHog

on:
  pull_request:
    types:
      - closed

jobs:
  report-pr-age:
    name: Report PR to PostHog
    runs-on: ubuntu-20.04
    if: github.event.pull_request.merged == true
    steps:
      - name: Report PR to PostHog
        uses: PostHog/posthog-annotate-merges-github-action@0.1.4
        with:
          posthog-token: ${{secrets.POSTHOG_PERSONAL_API_KEY}}
          posthog-project-id: ${{secrets.POSTHOG_PROJECT_ID}}
          annotation-message: "Merged PR #${{github.event.pull_request.number}} ${{github.event.pull_request.title}}"
```
