### Code logic ###
Clean topWords:
- use a map to grab all top words and organise by pointValue
- Pass that map into useHints and results modal
- rename highestScoringWords to topWords

Game end logic
- Stop the game from being playable after it ends

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
