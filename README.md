# Kaarigar

An app to find local tradespeople based on how many of your own neighbours have already called them.

## The problem

People ask their neighbours for a plumber or electrician, not Google, because the neighbour has
already tested that person. That network works, but it is never written down — every building
re-learns the same names from scratch.

## How it works

- Pick your society or village.
- Pick the trade — AC repair, plumbing, electrical, carpentry, painting, tiling, TV repair.
- See who your neighbours have already called, with their flat numbers and vouch count.
- Call the worker directly, or add your own vouch with your flat number.

## Running locally

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

## Built with

Vite, React and Tailwind CSS. Built in 7 hours at the Rookery AI Hackathon 2026, LTCE, using Kimi K3.

## What is built and what is not

Data is hardcoded in `src/data.js` and vouches persist in `localStorage`. The production design is
three tables — `workers`, `societies`, `vouches` — with a unique constraint on
`(worker_id, flat_number)` so one flat can vouch once per worker.

## Team

Team CoDeOn — Dipanshu Dilip Gupta, Vishal Dhirendra Pandey, Aniket Rai.