### Code logic ###

Clean up the gameBody function
- Create a context provider to pass all globally needed state through the app
- Use a custom hook to have a useReducer for handleTileClick

combine totalScore and PreviousGuesses together?

maybe timer should use Dates and keep current date in local storage?
move ActionButtons to it's own containers directory or move all gameRendering to GameBody or fix clock causing rerenders

extrapolate timer logic into hook?

extrapolate hint system logic into hook?

have fonts locally 

Use new react view to have two seperate modals
- Write hints modal
- Write end of game modal
- Write start of game modal

Add half stars

### Code styling ###

Fix css to render app properly, app is min full screen, with header always at top?, footer moving with main down the page
- remove contentContainer divs and use margin auto instead?

create skeleton loader while waiting for request?

create error page for when things go wrong?

keep previous submitted word greyed out and fix overflow logic

add styling to tiles for selected, correct, incorrect, etc

change font size on smaller screens
