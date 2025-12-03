### Code logic ###
- Move the modal close button into each modal component
- Pass handleCloseModal to the close button of infoModal

- Add ability for the game to end by timer finish
- Stop the game from being playable after it ends

Pass data into result modal to display on end screen
- Add hintsUsed counter

- Clean up the gameBody function
- Create a context provider to pass all globally needed state through the app
- Use a custom hook to have a useReducer for handleTileClick


Add finish game confirm modal

Rename submitButton to finishButton

Rename countdownClock to countdownTimer

Redesign hints available/points for the hints modal
Shoulds the best words be randomised? Or just ordered top to bottom with no points showing dividers? or lock each tier behind completing the last?

- Flip order of highest scoring words? or leave if doing locked tiers
- Rename highestScoringWords to topWords or something simple like that?

Add half stars logic

use localstoreage for current guesses and reset every midnight/every board
maybe timer should use Dates and keep current date in local storage?

have fonts locally 

### Code styling ###

Fix css to render app properly, app is min full screen, with header always at top?, footer moving with main down the page
- remove contentContainer divs and use margin auto instead?

create skeleton loader while waiting for request?

create error page for when things go wrong?

keep previous submitted word greyed out and fix overflow logic

add styling to tiles for selected, correct, incorrect, etc

change font size on smaller screens
