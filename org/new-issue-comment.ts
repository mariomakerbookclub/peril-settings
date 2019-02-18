import { danger } from "danger"
import { IssueComment } from "github-webhook-event-types"

export default async (webhook: IssueComment) => {
  const issue = webhook.issue
  const api = danger.github.api

  const org = webhook.repository.owner.login
  const repo = webhook.repository
  const username = webhook.comment.user.login

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
      const result = await api.orgs.checkMembership({ org, username })
      console.log(result)
      return console.log(`${username} is already a member of ${org}`)
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
