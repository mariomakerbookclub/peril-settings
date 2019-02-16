import { danger } from "danger"

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

export default async () => {
  const api = danger.github.api
  const org = "artsy"

  const membersData = await api.orgs.listMembers({ org })
  const members = membersData.data

  const member = members[rand(0, members.length - 1)]

  // TODO: Get random gene from Artsy, this is close
  const gene = "Streaming"

  api.issues.create({
    assignee: member.login,
    title: `Week x - @${member.login} on ${gene}`,
    body: `Alright, this week's topic is ${gene} - ${member.login} you're up for this one.`,
    owner: "mariomakerbookclub",
    repo: "club",
  })
}
