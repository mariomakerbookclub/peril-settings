import { danger } from "danger"
import { Issues } from "github-webhook-event-types"

export default async (webhook: Issues) => {
  console.log("Looking at an issue")
  const issue = webhook.issue
  const api = danger.github.api

  const org = webhook.repository.owner.login
  const repo = webhook.repository
  const username = webhook.issue.user.login

  if (repo.name !== "club") {
    return console.log("Not on the club repo, skipping")
  }

  if (webhook.sender.type === "bot") {
    return console.log("No robots in this club")
  }

  // https://github.com/mariomakerbookclub/club/issues/1
  const isJoinOrgIssue = issue.number === 1
  if (isJoinOrgIssue) {
    try {
      await api.orgs.checkMembership({ org, username })
      return console.log("Already a member")
    } catch (error) {
      await api.orgs.addOrUpdateMembership({ org, username, role: "member" })

      // Post a message
      await danger.github.api.issues.createComment({
        owner: repo.owner.login,
        repo: repo.name,
        number: issue.number,
        body: `Invited you @${username}.`,
      })
    }
  }
}
