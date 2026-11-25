---
title: PyGridPlot
summary: A Python library for interactive, zoomable Cartesian planes in pygame-ce, in the spirit of Desmos.
year: 2026
tags: [Python, pygame-ce, NumPy, Graphing]
cover: ./cover.png
thumbnail: ./thumbnail.png
featured: true
links:
  github: https://github.com/GWStuart/PyGridPlot
---

PyGridPlot draws an interactive Cartesian plane, in the spirit of the Desmos graph view, inside a pygame-ce program. You give it NumPy or `math` functions, numbers and arrays, and it draws them antialiased over a grid whose lines and labels adapt as you pan and zoom.

It's a library rather than a framework: your program owns the main loop, and the plane is an object you draw each frame. Because each frame is drawn from your own variables, animation and interactivity need nothing special.

Part of the design goal is that it looks right without any settings and is hard to break. Grid lines follow 1-2-5 steps that fade in and out as you zoom, labels never overlap, and a function that raises an error or returns NaN just leaves a gap in the plot. The repository has a full user guide, an API reference and 24 example programs.

## Features

- Graphs of functions, with exact derivatives of any order, integrals, Taylor polynomials and Fourier series
- Parametric, polar and implicit curves, and contour maps
- Regions between graphs or where inequalities hold, and vector and slope fields
- Data plots: scatter plots with colour bars, error bars, bar charts, histograms, and box and violin plots
- Interaction: points the user can drag, sliders with a play button, checkboxes, and smooth panning and zooming
- Linear or logarithmic axes
- Exports pictures at any resolution and records videos (MP4, WebM, GIF) through ffmpeg
