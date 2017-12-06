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
1. On your command line, run ```python -m SimpleHTTPServer 8000```
1. In your browser, navigate to ```localhost:8000```

## To Update the info on the map from a new CSV:

Repeat the steps above, starting with exporting the spreadsheet containing the most recent letter data.