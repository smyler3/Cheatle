### Code logic ###
Clean up the gameBody function
- Create a context provider to pass all globally needed state through the app
- Use a custom hook to have a useReducer for handleTileClick
- Guess list and results modal have duplicate logic for getting the user score
- Guess list and results modal have duplicate logic for getting the max possible score
- HintsModal and ResultsModal have duplicate logic for getting 

Clean topWords:
- use a map to grab all top words and organise by pointValue
- Pass that map into useHints and results modal
- rename highestScoringWords to topWords

Game end logic
- Add ability for the game to end by timer finish
-- useEffect that once timeRemaining === 0, we set some isGameOver state to true, or have that in timer?
-- isGameOver then stops the timer, and renders the result screen

- End game when max score is reached
-- Need to add max score calculator to the backend and pass it through?

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
