---
title: Let's Tri To Speed Things Up
category: dev
tags: [c++, graphics, voxels]
description: >-
  How I improved performance by using visibility testing to reduce the number of triangles needed to
  render.
---

The second post in my voxel journey will just be a short one. I was pretty happy with a small
optimization I made today and would like to share it.

One aspect of performance when it comes to graphics is the number of triangles you're pushing to the
GPU. If you're trying to draw 10k triangles, it's likely &mdash; but not necessarily &mdash; more
performant than trying to draw a million triangles. Take all of this with a grain of salt though;
you can draw 10k triangles inefficiently. Another big aspect in performance is the number of
fragments generated.

> ![screenshot](/img/voxels/2013_11_30.png)
>
> Itty bitty world.

Anyways, grains of salt. Here are the numbers from my naive implementation seen above, from small to
large scale:

1. 12 triangles for each voxel.
2. 16x16 cross-sectional area (of voxels) per sector, perhaps about four or five cross-sectional
   areas worth of voxels.
3. 8x8 map of sectors.

So if you work out the math you get about a million triangles. I could render this at 60 FPS (adding
more sectors reduced the FPS). Do we really need all 12 triangles though? If I place cube A on top
of cube B, then the triangles for the bottom face of cube A and the top face of cube B do not need
to be rendered (assuming everything is).

In other words, I only render the triangles that are necessary to render. To maintain this
information, I use a bitmask for each face of a voxel. The first bit represents the left face, the
second bit the right face, and so on for all six faces. If a bit is 1, the face is hidden by another
cube. If it is 0, the face is visible. Whenever a voxel is added to a sector, I update the
appropriate bits for neighbouring voxels.

The result? Although it's roughly the same number of triangles, I can draw an order of magnitude
more sectors:

> ![screenshot](/img/voxels/2013_12_02.png)
>
> Ten times the voxels? Ten times the **FUN**!

This is only the tip of the iceberg when it comes to optimizing things, but it was an obvious
optimization that I had on my TODO list. Hopefully I'll have more interesting optimizations in
future posts.
