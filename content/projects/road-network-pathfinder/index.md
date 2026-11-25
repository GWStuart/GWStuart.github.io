---
title: Road Network Pathfinder
summary: Dijkstra's algorithm and A* search on real-world road networks, written in C with SDL3.
year: 2025
tags: [C, SDL3, Dijkstra's algorithm, A* search, OpenStreetMap]
cover: ./cover.png
featured: true
links:
  github: https://github.com/GWStuart/Pathfinder
---

A pathfinder that runs on real road networks, written entirely in C. It implements Dijkstra's algorithm and A* search, optimised to run efficiently on road networks with tens of thousands of nodes, and animates the search as it spreads across the map.

Road data comes from OpenStreetMap. A Python script cleans an exported GeoJSON file into nodes, edges and roads, and the C program loads those. The repository includes the processed data for the centre of Brisbane, and the [README](https://github.com/GWStuart/Pathfinder) has an animation of the search and explains how to export any other region.

It's a successor to my earlier [Pathfinder](/projects/pathfinder/), which searched a hand-drawn grid rather than a real map.

## Features

- Dijkstra's algorithm and A* search, with a binary heap for the priority queue
- GeoJSON parsing and cleaning, including road partitioning and neighbour parsing
- Graphics rendered with SDL3
- Mouse panning and zooming
- Animated search that stays smooth and responsive on large road networks
- Toggleable node visibility
- Command-line options for the window size and the algorithm
