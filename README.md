# Big-ui

This is an attempt to explore how to handle, and keep easily deployable, massive frontend architectures.

## Problems we are trying to solve

* A single massive frontend is difficult to test and deploy in a timely manner
* In a large interlinked codebase, determining "blast radius" of a change is hard

## Multi-frontend

The idea here is to have multiple seperate frontends that share code in a set of common libraries. Each frontend is responsible for an isolated chunk of the site and is deployable seperately.

## Isolated buildless packages

I use a pnpm workspace to allow code sharing between packages and apps without a build step. It is assumed that each consuming app is responsible for bundling the packages into a usable format.

Through the use of the "bundler" node resolution strategy for typescript, combined with the use of the "exports" field in package.json we effectively acheive the notion of a "public" interface for our packages. Only code that is explicitly exported can easily be used by others, vscode will not attempt to import non-exported code and simple attempts to do so will result in a build-time error (It is still possible to walk the filesystem and import that way but it needs to be pretty deliberate).

## Shared dependancies

For dependancies used in many places I am using a pnpm catalog to make sure I always use the same version throughout the repo.

## Turborepo

This repo is built using turborepo and as such there are a few commands available in the root:

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

## Current structure

apps - contains all frontends
    docs - an example next site
    web - another example next site
    storybook - a shared storybook instance
packages - packages used by the frontends for functionality
    tailwind - basic tailwind config
    shadcn - implementation of the shadcn components
    ui - pretty much just a pointless stub right now
tooling - packages related to the build process
    typescript-config - shared tsconfig files

## Linting

Linting is currently handled from the repo root and is implemented using biome for speed.

## What about module federation?

Module federation is cool, it is more advanced than this by effectively allowing a single SPA to be indenpendantly deployable.....it is also complex to setup and maintain and most of the problems it's solving may not be needed if the sections of your site are pretty independant.

## Is this structure good for anything else?

I'm finding it works very well if you want to make lots of little micro-products that share things like auth and payment setup. As such its an excellent little micro-saas build engine.




