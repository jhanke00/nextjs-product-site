# DevOps

Documentation on any DevOps changes made.

## Pull Request title validation

Includes a check for titles on pull requests.

## How to test it

You can do this by creating a new branch, committing the changes, pushing to the origin, and then creating a pull request. Visit [Github Actions](https://github.com/jhanke00/next-product-site/actions) to observe the results.

## Considerations

I referred to [Documentation](https://github.com/amannn/action-semantic-pull-request).

## TypeScript validation

Includes a typescript check for files.

## How to test it

You can do this by creating a new branch, committing the changes, pushing to the origin, and then creating a pull request. Visit [Github Actions](https://github.com/jhanke00/next-product-site/actions) to observe the results.

Or locally run:

```sh
pnpm tsc
```

## Automates release generation

Includes automates CHANGELOG generation, the creation of GitHub releases, and version bumps.

## How to test it

Once the PR is merged, it will create a new PR containing the changelog list

## Considerations

I referred to [Documentation](https://github.com/googleapis/release-please).
