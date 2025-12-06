# The Nature of Code

I'm going through Dan Shiffman's [Nature of Code](https://natureofcode.com/) with some folks from [tiat](https://www.tiat.place/) at their new permanent location!

The course started on November 30, 2025 and it will continue until March 13, 2026. [RSVP on Lu.ma](https://luma.com/y90rvpdf?tk=5zE71D) if you want to join us.

## Project Details

I'm using [Marko](https://markojs.com/) with [p5.js](https://p5js.org/), and honestly I was surprised how **well** they work together. Reactivity _just works_ out of the box! Check out the [`<p5-canvas>` component](./src/tags/p5-canvas.marko) for a simple integration.

## Running Locally

To run this app on your machine:

```sh
git clone https://github.com/LuLaValva/nature-of-code.git
cd nature-of-code
npm install
npm run dev
```

This project is powered by [@marko/run](https://github.com/marko-js/run).

- `npm run dev` starts the development server
- `npm run preview` runs a build and hosts locally
- `npm run build` builds a production-ready node.js server
