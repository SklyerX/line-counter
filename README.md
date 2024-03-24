# Line Counter

## Installation

```
npm i -g @skylerx/line-counter
```

To run the CLI tool with no configurations run:

```
line-counter count
```

To get to know more about the configurations run:

```
line-counter count --help
```

_you can get more information on each configuration by running the command above_

There are many options such as:

- Ignoring files,
- Ignoring extensions,
- Ignoring folders,
- Ignoring empty lines (aka line-breaks),
- verbose mode,
- load, and
- Default Ignores
- save

## Purpose of Project

I built this project because I would always get asked "how many lines of code" is in my project. Whether if it was for an FAQ, docs, or just in general. People wanted to know. I also have seen a lot of [bun](https://bun.sh) content recently on my recommended page (YouTube) so I decided to give it a try.

To my surprise, Bun was **as** fast as advertised. It perfectly installed packages, it worked like any other package manager, and it also hand an insanely low build-time. What was really interesting to me was all the available options that the CLI tool provided.

However, I will be getting into the other aspects of Bun in a separate project. Things such as **realtime server**, **backend development**, **testing**, and **shell scripts**

## Running the project:

### To install the dependencies run:

```
bun install
```

### To test the project in development run:

```
bun run ./src/index.ts count [...options]
```

## Roadmap

- [x] In the near future I may add default configuration to the project to ignore things such as images, lock files, and OS data files.

_for now there are more pending features_
