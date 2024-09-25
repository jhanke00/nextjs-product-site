# Local CI

## tools used

Aside from the tools already configured in the project (eslint, prettier, husky, jest) a couple others were added in order to make the local development experience better:

- commitlint
- lint-staged

### commitlint

[`commitlint`](https://github.com/conventional-changelog/commitlint) does what the name suggests, it checks if the commit message is following the conventional commits format. This is a good practice to follow when writing commit messages, as it helps other developers understand the purpose of the commit and how it should be formatted.

### lint-staged

[`lint-staged`](https://github.com/lint-staged/lint-staged) is a tool that helps us run our linter, formatter, and test runner on staged files before they are committed. It improves upon the original git commit hook by running the commands only on the files that have been staged for commit.

## how to use

Just do commits as usual, and the tools will kick in and run the checks on the staged files.

Commit messages will be checked against the [conventional commits format](https://www.conventionalcommits.org/en/v1.0.0/).

The lint-staged configuration is set to run the linter, formatter, and test runner on staged files before they are committed, stopping the commit if any of the checks fail.

This is in no way a replacement for a proper CI/CD pipeline, but it can be a helpful tool to ensure that your code is following best practices and adhering to the conventions set by the project before any changes are sent to a possibly costly and time consuming CI run.
