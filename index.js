const core = require("@actions/core");
const github = require("@actions/github");
const fetch = require("node-fetch");

try {
  const projectId = core.getInput("posthog-project-id");
  const posthogToken = core.getInput("posthog-token");
  const posthogAPIHost = core.getInput("posthog-api-host");
  const annotationMessage = core.getInput("annotation-message");

  const body = {
    content: annotationMessage,
    scope: "project",
    date_marker: new Date().toISOString(),
  };

  // API docs at https://posthog.com/docs/api/annotations#post-api-projects-project_id-annotations
  fetch(`${posthogAPIHost}/api/projects/${projectId}/annotations/`, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${posthogToken}`,
    },
  })
    .then((response) => {
      response.json().then((data) => {
        console.log("success", data);
      });
    })
    .catch((error) => {
      console.error("error", error);
    });

  client.shutdown();
} catch (error) {
  core.setFailed(error.message);
}
