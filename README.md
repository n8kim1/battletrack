# Battletrack: a Battlecode stats analyzer

Massively in development

## Instructions

- To download matches, go into the `battletrack` subfolder. (This location is important! TODO automated check for it) Then run `npx ts-node src/stats/download.ts`.
- To generate and see stats locally, from the `client` folder, run `npm run battletrack-watch`.  Then navigate to `http://localhost:3000/index.html`.

## Cool things to consider doing

### MVP

- Get all matches in a tournament
 - Saving matches
- Simple visualization on a website
  - Use same graphing framework as client does
- Clean up the code
- Consider cleaning git history

### Code simplifications

- Abstract away each "stat" to an implementation to a base class. This should help aggregating across any range, and should make implementing new stats easy
  - Eg "round stat" vs "match stat", with aggregator methods that run at different times
  - Each "stat" can hold a value for its "count" too
- Clean up the base package files

### Advanced features

- Datastore (even a csv, I guess)
- Caching
  - Creating concept of "version of stats", and storing that in csv
