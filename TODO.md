### Code logic

TEST with adding a single variable to saved state at a time
-- TimeRemaining
then
-- CorrectGuesses
then
-- HintPoints and HintsUsed
then
-- topWOrdHints

-- Either figure out a way for the localStorage to collect data from all hooks beneath on usebeforeunload/visibilitychange with eventListeners to hidden or create a hook/useEffect under modalProvider which will collect data from everything above and 'publish' it

QueryClientProvider
CheatleDataProvider -- New hook to wrap access to the backend data
DailyStorageProvider -- New hook to query localStorage with board key and provide source of update truth
TimerProvider
GameDataProvider
HintProvider
ModalProvider
UI

Modals
--Add info modal images
--Info modal doesn't explain how to physically play (submit etc)
--modals should cancel background scroll
--When modal opened while page isn't scrolling, edge of screen content is hidden, and this also affects background scrolling hidden logic

have fonts locally

Game mechanic improvements
--Add half stars logic

Bug?
--Timer pauses when out of tab
--Add favicon
--After loading finishes, info modal scrolled back to the top

A11y
--alt tags on images

create error page for when things go wrong (pass some default data)?

### Code styling

change font size everywhere

Redesign hints available/points for the hints modal
