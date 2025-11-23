### Code logic ###
Add modal content
- Write start of game modal
- Write hints modal
- Write end of game modal

- Use enum for modalToShow?
- Add buttons to setModalToShow


extrapolate timer logic into hook?

extrapolate hint system logic into hook?

have fonts locally 

Add half stars logic

use localstoreage for current guesses and reset every midnight/every board
maybe timer should use Dates and keep current date in local storage?

Clean up the gameBody function
- Create a context provider to pass all globally needed state through the app
- Use a custom hook to have a useReducer for handleTileClick

### Code styling ###

Fix css to render app properly, app is min full screen, with header always at top?, footer moving with main down the page
- remove contentContainer divs and use margin auto instead?

create skeleton loader while waiting for request?

create error page for when things go wrong?

keep previous submitted word greyed out and fix overflow logic

add styling to tiles for selected, correct, incorrect, etc

change font size on smaller screens
