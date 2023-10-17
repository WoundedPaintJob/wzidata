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

- Map/hardened/ascension bonuses
- Powers
- mini view. next hospital, next merc.
- Show amounts needed in market view
- Multiplier page
- make sure path takes In js and run the extra steps more times
- tech make a separated mobile table
- map make breakpoint for wider map earlier
- keep showing permanent assets
- make sure to calculate required correctly. Doesn't add last zone cost
- max level for advancement
- bonuses not updating on map after conquer
- Zone checkbox not updating when conquering path