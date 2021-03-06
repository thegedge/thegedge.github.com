---
title: Greedy Voxel Meshing
category: dev
tags: [c++, opengl, voxels]
description: >-
  A brief explanation of greedy meshing for voxel data, along with an animation to help explain the
  process.
---

I've been busy working on improving the performance in my voxel engine over the past week. The
biggest improvement came from implementing greedy voxel meshing, which is what this entry is all
about. I'm going to put a little more effort into creating higher quality blog posts from now on,
with a focus on explaining a concept or algorithm through visualization. If you have any suggestions
for improvements or blog posts to write, leave me a comment.

Mikola Lysenko goes into great detail describing various methods of meshing in his
[blog post](https://0fps.net/2012/06/30/meshing-in-a-minecraft-game/). I highly recommend reading
his post to get a better understanding of why greedy meshing works and how bad it can get. My goal
is to give a more intuitive explanation of Mikola's post. I'll emphasize the most important part of
the algorithm to understand: the ordering of quads. Mikola gives this ordering:

```cpp
bool compareQuads(const Quad &q1, const Quad &q2) {
  if(q1.y != q2.y) return q1.y < q2.y;
  if(q1.x != q2.x) return q1.x < q2.x;
  if(q1.w != q2.w) return q1.w > q2.w;
  return q1.h >= q2.h;
}
```

What this means is that we form our quads from top to bottom, left to right. Whenever we reach a
face that has yet to be covered with a quad, we take the widest possible quad at that point. If we
can extend that quad in height, we do so as much as possible.

That's all fairly hand-wavy, so here's an animation to help explain:

<!-- prettier-ignore-start -->
<script src="/js/greedy_anim.js"></script>
<style type="text/css" scoped>
  #greedy_anim { stroke-width: 2px; stroke-opacity: 0.8; }
  .grid rect { stroke: none; }
  .faces rect { fill: url(#quad); stroke: black; }
</style>
<svg id="greedy_anim" viewBox="-1 -1 752 252" shape-rendering="crispEdges" class="mx-auto">
  <defs>
    <pattern id="emptyPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="5" height="5" fill="#eeeeee" />
      <rect x="5" y="5" width="5" height="5" fill="#eeeeee" />
    </pattern>
    <pattern id="quad" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <line x1="-1" y1="1" x2="1" y2="-1" stroke="black" stroke-opacity="0.1" />
      <line x1="9" y1="11" x2="11" y2="9" stroke="black" stroke-opacity="0.1" />
      <line x1="0" y1="10" x2="10" y2="0" stroke="black" stroke-opacity="0.1" />
    </pattern>
  </defs>
</svg>
<!-- prettier-ignore-end -->

Here's a result from my own engine:

<!-- prettier-ignore-start -->
> ![greedy meshing](/img/voxels/2014_08_17_greedy.png)
> ![normal meshing](/img/voxels/2014_08_17_normal.png)
>
> With (left) and without (right) greedy meshing.
<!-- prettier-ignore-end -->
