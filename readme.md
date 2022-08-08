# Decision template

## Problem Statement

Keep this business focused. If it drifts technical then you risk solutioning before understanding the problem you are
trying to solve

## Stakeholders

Make sure that all the people who have a influence in the decision have been consulted

## Criteria

What are the things that our chosen decision needs to satisfy? This might include factors like cost, security or
simplicity. Be careful of going too deep in this high level decision. You are better off pointing at supplementary
resources for the next level of detail.

Remember your stakeholders all need to agree on the rules of the game, i.e. what are options rated against, if you want
a successful decision.

## Options

Try to think of at least 3 ways to achieve the business goal. A diagram is a great way to convey the design intent here.
Capture the important points about the option without over analysing here.

## Comparisons

We have criteria and options. Think about ordering your options by importance. Bear in mind the least important criteria
must still be worth something in the decision process.
The idea is to rate the options simply (Good, Medium, Bad) against the criteria.

This is a great opportunity for discussion. If the stakeholders above cannot agree on the weighting of the options
against the criteria, then you've identified a need for more conversation.

A matrix is a good way to present this section. Using color (TODO red / green colour blind) can help draw attention to options that are rated better than others.

<style>
    .decisionMatrix {
        width: 70%;
        text-align: center;
    }
    .decisionMatrix th {
        background: grey;
        word-wrap: break-word;
        text-align: center;
    }

    .decisionMatrix tr td:nth-child(1) { color: white; }
    .decisionMatrix tr { color: black; }

    .decisionMatrix tr:nth-child(1) td:nth-child(2) { background: green; }
    .decisionMatrix tr:nth-child(1) td:nth-child(3) { background: yellow; }
    .decisionMatrix tr:nth-child(1) td:nth-child(4) { background: red; }

    .decisionMatrix tr:nth-child(2) td:nth-child(2) { background: green; }
    .decisionMatrix tr:nth-child(2) td:nth-child(3) { background: green; }
    .decisionMatrix tr:nth-child(2) td:nth-child(4) { background: yellow; }

    .decisionMatrix tr:nth-child(3) td:nth-child(2) { background: red; }
    .decisionMatrix tr:nth-child(3) td:nth-child(3) { background: green; }
    .decisionMatrix tr:nth-child(3) td:nth-child(4) { background: green; }

</style>

<div class="decisionMatrix">

| Criteria               | Option 1 | Option 2 | Option 3 |
|------------------------|----------|----------|----------|
| Cost                   | Good     | Medium   | Bad      |
| Ease of operation      | Good     | Good     | Medium   |
| Ability to find skills | Bad      | Good     | Good     |

</div>



