### Code logic
Add a new loading spinner

Fix the how to play gif

Test with playwright before merging
-- Seems fine sans some boldness issues

The action button in home page is buggy when rehydrating

Game mechanic improvements
--Add half stars logic
--Add an explicit pause button?

------------------------------------------------

Noted while working:
- Does wrapper need isHydrated still? This rendered loaded while hydrating
- Can savedGameState just be a constant now rather than state? We can pass it as a prop?
- Can we move the useEffect which saves the game on exit down into the new gameState hook?

- Refresh the loading screen

- I think isTimerStarted/Paused/Done can be combined into a single variable? which has states neverStarted, running, paused, done.
