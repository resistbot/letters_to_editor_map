import pandas as pd
from pygeocoder import Geocoder

data = pd.read_csv('data.csv')

data['latitude'] = Geocoder.geocode(data["ZIP"]).latitude
data['longitude'] = Geocoder.geocode(data["ZIP"]).longitude

# grouped = data.groupby(['ZIP']).size()
grouped = (data.groupby(['ZIP']).apply(lambda x: x.to_json(orient='records'))).to_json('smang')
print grouped