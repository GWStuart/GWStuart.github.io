---
title: "PMan"
permalink: /projects/pman
layout: project
description: "A stateless password manager written in Python with an accompanying web version written in JavaScript."
image: "/assets/images/pman.png"
technologies:
  - name: "Python"
    icon: "/assets/icons/python.svg"
  - name: "JavaScript"
    icon: "/assets/icons/js.svg"
  - name: "Argon2"
    icon: "/assets/icons/lock.svg"
github: "https://github.com/GWStuart/pman"
details: "As a stateless password manager, pman does not actually store your passwords in any database but rather computes them on demand using cryptographic hasing algorithms. This is achieved by passing your master password and the name of a given website / service into the Argon2 cryptographic hash function. This process is irreversible and thus keeping your master password safe without needing to actually store any passwords in memory. <br><br> I have written about pman extensivly in the README page of its GitHub repository to which there is a link at the top of this page. I encourage you to look into that if you are looking for more information."
features:
  - text: "Generates passwords on demand eliminating the need for a database"
  - text: "Available as a CLI and written in Python"
  - text: "Support for a web version written in JavaScript"
  - text: "Uses the Argon2 cryptographic hash"
    subfeatures:
      - "Resistant to GPU cracking attacks"
      - "Optimised to resist side-channel attakcs"
screenshots:
order: 1
---
