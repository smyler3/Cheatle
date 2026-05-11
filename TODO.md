### Code logic
Add an indicator for words under min length like duplicate guess.
Prevent button text being selectable

Move to a new home-page format that has a play/how to play button.
-- Render updated how to play modal
-- or
-- Render the board wrapped inside of a getData hook, a gameState hook, and a modalHook
-- Add a new loading spinner if the board is waiting on data.
-- If an error occurs, set the data to default data.

The new getData hook will refresh the whole app if new data is found. 

If the game has been finished already, display results on the home screen too?

Add a submit button to the textbox

Clicking the cheatle button at the top now brings you back to home


The game currently has no pattern to refresh when data changes
--this means that if you reload the game and a new call is made without refreshing you can get a stale state
--this means that if you get new data and then refresh you will save the previous game data to the new board meaning you get the new board but can't play
--To fix this I would need to redesign the loading state

Game mechanic improvements
--Add half stars logic

Bug?
--After loading finishes, info modal scrolled back to the top

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
