---
title: PMan
summary: A stateless password manager in Python, with a companion web version in JavaScript.
year: 2023
tags: [Python, JavaScript, Cryptography, Argon2]
cover: ./cover.png
featured: true
links:
  github: https://github.com/GWStuart/pman
---

PMan is a stateless password manager: it never stores your passwords. Instead it computes each one on demand by passing your master password and the name of a website or service through the Argon2 hash function. The process can't be reversed, so the master password stays safe, and there is no password database to protect in the first place.

The [README on GitHub](https://github.com/GWStuart/pman) goes into the design in much more detail.

## Features

- Generates passwords on demand, so no database is needed
- Command-line interface written in Python
- A web version written in JavaScript
- Uses the Argon2 cryptographic hash, which is
  - resistant to GPU cracking attacks
  - designed to resist side-channel attacks
