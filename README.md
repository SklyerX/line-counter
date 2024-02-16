# line-counter

To run the CLI tool with no configurations run:

```
line-counter count
```

To get to know more about the configurations run:

```
line-counter count --help
```

There are many options such as:

- Ignoring files,
- Ignoring extensions,
- Ignoring folders,
- Ignoring empty lines (aka line-breaks),
- verbose mode,
- load, and
- save

## Purpose of Project

I built this project because I would always get asked "how many lines of code" is in my project. Whether if it was for an FAQ, docs, or just in general. People wanted to know. I also have seen a lot of [bun](https://bun.sh) content recently on my recommended page (YouTube) so I decided to give it a try.

To my surprise, Bun was **as** fast as advertised. It perfectly installed packages, it worked like any other package manager, and it also hand an insanely low build-time. What was really interesting to me was all the available options that the CLI tool provided.

However, I will be getting into the other aspects of Bun in a separate project. Things such as **realtime server**, **backend development**, **testing**, and **shell scripts**

---

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.0.26. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
