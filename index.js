import { getInput, setFailed } from "@actions/core";
import fetch from "node-fetch";

try {
  const projectId = getInput("posthog-project-id");
  const posthogToken = getInput("posthog-token");
  const posthogAPIHost = getInput("posthog-api-host");
  const annotationMessage = getInput("annotation-message");

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
  setFailed(error.message);
}
