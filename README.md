# Battletrack: a Battlecode stats analyzer

Massively in development

## Instructions

- To generate stats, run `npx ts-node src/index.ts`

## Cool things to consider doing

### MVP

- Get all matches in a tournament
- Get all matches over multiple tournaments
- Simple visualization on a website
  - Use same graphing framework as client does

### Code simplifications

- Abstract away each "stat" to an implementation to a base class. This should help aggregating across any range, and should make implementing new stats easy
  - Eg "round stat" vs "match stat", with aggregator methods that run at different times
  - Each "stat" can hold a value for its "count" too
- Clean up the base package files

### Advanced features

- Datastore (even a csv, I guess)
- Caching
  - Creating concept of "version of stats", and storing that in csv
