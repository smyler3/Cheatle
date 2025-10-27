-----------------------
#SERVER
-----------------------
Clean trie/game:
-- Re-write the quick select logic
-- Add dice rolling logic
-- Trial a heap implementation too with timing to compare across multiple boards
-- Remove magic strings and number from prefixTree (not insto shared)

use child processes to run python scripts too?
-- Script to scrape valid words from the dictionary
-- Script to store that into a data
-- Script to store valid/best words into a dictionary?

Add singleton pattern for Game? With the ability to add nwe boards and run the game again?
Move all game-start logic into seperate function to be called each day?

-----------------------
#FRONTEND
-----------------------

combine totalScore and PreviousGuesses together?

keep previous submitted word greyed out and fix overflow logic

maybe timer should use Dates and keep current date in local storage?
move ActionButtons to it's own containers directory or move all gameRendering to GameBody or fix clock causing rerenders

use Game component to run everything else?

add styling to tiles for selected, correct, incorrect, etc

extrapolate timer logic into hook? 

extrapolate hint system logic into hook?

have fonts locally

change font size on smaller screens