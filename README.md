## Mario Maker Book Club Peril Settings

### What is this project?

This is the configuration repo for Peril. There is a [settings file](peril.settings.json) and org-wide
dangerfiles which are inside the [org folder](org/).

Here's some links to info on Peril

- [Peril](https://github.com/danger/peril)
- [Danger JS](http://danger.systems/js/)
- [Peril for Orgs](https://github.com/danger/peril/blob/master/api/docs/setup_for_org.md)

### TL-DR on this Repo?

This repo:

- Has a [weekly task](task/choose-someone-for-mario-maker.ts) that tells someone they're up
- Takes comments on [this thread](https://github.com/mariomakerbookclub/club/issues/1) and invites them to the org

and in the future it will convert the UUID of a course into a pic + info.

### To Develop

```sh
git clone https://github.com/mariomakerbookclub/peril-settings.git mariomakerbookclub-peril-settings
cd mariomakerbookclub-peril-settings
yarn install
yarn type-check
code .
```
