# Guide to Using the Letters to the Editor Map

## Developer Steps:

1. Clone this repo.
1. Export the spreadsheet containing the most recent letter data to a csv.
1. Move that csv into the resistbot-map directory.
1. Rename that csv 'data.csv'
1. Navigate to resistbot-map repo
1. On your command line, run ```conda env create resistbot_map```
1. On your command line, run ```source activate resistbot_map```
1. On your command line, run ```python data.py```
1. Your repo now contains a file called data.json. This is the file containing the data that www.resistbot.io uses to construct the l2e map. Take that file and move it to the js directory in our main site repo. Upon deployment, the map will use that file to put pins and labels.
1. Please do not commit the actual data.json file anywhere. It contains user information, and we want to protect our users' privacy to the extent that we can. 

## To Update the info on the map from a new CSV:

Repeat the steps above, starting with exporting the spreadsheet containing the most recent letter data.
