---
title: Pathfinder
summary: An interactive visualiser for A* search and Dijkstra's algorithm on a grid.
year: 2021
tags: [Python, Tkinter, A* search, Dijkstra's algorithm]
cover: ./cover.png
links:
  github: https://github.com/GWStuart/PythonProjects/tree/main/Pathfinder
  video: https://www.youtube.com/watch?v=Vecikh8XsEw
---

A pathfinder that finds and displays the shortest path between any two points on a grid. Users pick the start and end points and draw in obstacles for the pathfinder to get around. The search is then animated, showing every cell the program checks, which gives a feel for how each algorithm works.

It implements two of the most common pathfinding algorithms, A* search and Dijkstra's algorithm. Switching between them makes the difference in their behaviour easy to see.

I later came back to the idea in C, running on real road networks instead of a grid: see [Road Network Pathfinder](/projects/road-network-pathfinder/).

## Features

- Supports A* search and Dijkstra's algorithm
- Written in Python with a Tkinter GUI
- Shows every cell the algorithm checks and queues
- Also supports
  - random maze generation
  - enabling and disabling diagonal moves
  - variable animation speed
