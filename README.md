# GDPR & EU AI Act Learning Quiz

A role-based quiz that helps teams inside an organisation get comfortable with GDPR and the EU AI Act. Instead of one generic question set, it's organised by function, HR, Marketing, Sales, Engineering, Legal, and Leadership each get scenarios drawn from situations they actually run into, alongside the shared fundamentals everyone should know.

Live at [gdpr-quiz.ancatrif.com](https://gdpr-quiz.ancatrif.com), linked from the [Learning Tools menu](https://ancatrif.com) on the main portfolio site.

## What it does

- Pick a team (or General/Mixed) before starting
- Choose depth (Core vs. Deep dive) and focus (GDPR only, EU AI Act only, or both)
- Answer scenario- and definition-based multiple-choice questions with an explanation after each one
- Get a score, a percentage breakdown, and a short written takeaway at the end, including a flag if you missed anything in a high-risk or prohibited-practice category

## Stack

- Single static frontend (`public/index.html`): vanilla HTML/CSS/JS, no build step, no framework
- `server.js`: a small Express server that serves `public/` as static files

## Running locally

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## Project structure

```
├── public/
│   └── index.html   ← the actual quiz. Express serves this.
├── server.js         ← Express static file server
├── package.json
└── README.md
```

Only `public/index.html` needs editing to change the quiz itself, everything else is server plumbing.

## Notes

No quiz answers or scores are stored anywhere, this is a learning tool, not a tracked assessment.
