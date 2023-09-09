# WziData

## Project structure

### Features

Every part of the data structure should be separated in to its own directory, here called features. Containing two sub-directories. This will hopefully make things easier to find.

#### Components

Different features has different components. But naming conventions should be structured to make it easier to find.

##### index.tsx

Details of each individual asset, used in list.tsx

##### list.tsx

Should return a `<Section>` containing information and a list of all of the objects of the specific type in the level.

##### highlight.tsx

Used in the highlight next to the map

#### lib

##### helper.ts

All functions relating to the feature

##### state.ts

State information

##### types.ts

Should contain the zod schema for the asset

## Issues

- Split up Evaluator
- Create Resource Cache Card for Overview
- Asset names, not just location name
  - For tech shopping list the other way around
- Hardened bonuses
- Add smelter and crafter speed to tech list