# DevOps

Documentation on any DevOps changes made.

## Pre-commit Hook Configuration

Includes pre-commit hooks to run linting, formatting, and testing on staged files before committing.

### How to test it

1. Create a new branch.
2. Make changes to code files.
3. Stage the changes.
4. Commit the changes. The pre-commit hooks will automatically:
   - Lint and format the staged files.
   - Run related tests.
   - Validate the commit message.

### Commitizen

To use Commitizen for standardized commit messages, run:

```sh
pnpm commit
```

This command will guide you through creating a commit message based on conventional commit standards.

### Considerations

- The hooks will only run on staged files to avoid unnecessary processing.
