### Code logic

The game currently has no pattern to refresh when data changes
--this means that if you reload the game and a new call is made without refreshing you can get a stale state
--this means that if you get new data and then refresh you will save the previous game data to the new board meaning you get the new board but can't play
--To fix this I would need to redesign the loading state

Game mechanic improvements
--Add half stars logic

Bug?
--After loading finishes, info modal scrolled back to the top
