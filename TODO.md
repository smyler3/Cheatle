### Code logic
Add an indicator for words under min length like duplicate guess.

The new getData hook will refresh the whole app if new data is found. 

Add a submit button to the textbox

Add a pause button?

Make the spoilers button a slider?

Add the list of all possible words, maybe as a toggle option?

Add a new loading spinner

The action button in home page is buggy when rehydrating

Get date and puzzle # from api

Fix the how to play gif


The game currently has no pattern to refresh when data changes
--this means that if you reload the game and a new call is made without refreshing you can get a stale state
--this means that if you get new data and then refresh you will save the previous game data to the new board meaning you get the new board but can't play
--To fix this I would need to redesign the loading state

Game mechanic improvements
--Add half stars logic

------------------------------------------------

Noted while working:
- Does wrapper need isHydrated still? This rendered loaded while hydrating
- Can savedGameState just be a constant now rather than state? We can pass it as a prop?
- Create a util function file for the helper functions for collecting top word hints? Or we can move them to the top of the file?
- Can we move the useEffect which saves the game on exit down into the new gameState hook?
- Should the fetchedData from DataWrapper be supplied in a hook to child components?

- Can I pass all three game logic hooks into one context to pass down? Will this still allow easy saving on close? 
-- This allows me to keep separate hooks for logic types while keeping a clean tree. 
-- Will this cause rerender of everything every second?
- useSaveOnClose needs typing, and does it work well?
- Does useGetSavedGameState needs to state to stop it being re-called / rendered every time it's used?
- Make sure that the whole hook isn't getting re-run every second or every call

- Refresh the loading screen

- Fill in the home page content, may need new data from the server too
-- Change play to resume or results based on savedGameState


I think isTimerStarted/Paused/Done can be combined into a single variable? which has states neverStarted, running, paused, done.
