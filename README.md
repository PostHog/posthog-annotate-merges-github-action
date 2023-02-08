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
uses: actions/posthog-github-action
with:
  posthog-token: ${{ secrets.API_TOKEN }}
  posthog-project-id: ${{ secrets.PROJECT_ID }}
  annotation-message: "PR #21 merged"
```
