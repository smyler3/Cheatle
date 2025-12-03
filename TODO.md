### Code logic ###
Pass data into result modal to display on end screen
- Add hintsUsed counter
- Pass hintsUsed to results modal
- Pass highest scoring words to results modal

- Clean up the gameBody function
- Create a context provider to pass all globally needed state through the app
- Use a custom hook to have a useReducer for handleTileClick

- Pass user score to results modal
- Pass max score to results modal
- Pass guesses to results modal

Game end logic
- Add ability for the game to end by timer finish
-- useEffect that once timeRemaining === 0, we set some isGameOver state to true, or have that in timer?

- Stop the game from being playable after it ends
-- Update the play button not to start the game again
-- Update tile handle click to not run
-- Update hint buttons to not run

Rename submitButton to finishButton
Rename countdownClock to countdownTimer

Add half stars logic

use localstoreage for current guesses and reset every midnight/every board
maybe timer should use Dates and keep current date in local storage?

have fonts locally 

### Code styling ###

Redesign hints available/points for the hints modal
Shoulds the best words be randomised? Or just ordered top to bottom with no points showing dividers? or lock each tier behind completing the last?

Fix css to render app properly, app is min full screen, with header always at top?, footer moving with main down the page
- remove contentContainer divs and use margin auto instead?

create skeleton loader while waiting for request?

create error page for when things go wrong?

keep previous submitted word greyed out and fix overflow logic

add styling to tiles for selected, correct, incorrect, etc

change font size on smaller screens
