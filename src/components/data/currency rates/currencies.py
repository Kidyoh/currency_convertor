import requests
import json
from datetime import datetime

url = "https://api.apilayer.com/exchangerates_data/latest?base=USD"  # Remove the "symbols" parameter

payload = {}
headers = {
    "apikey": "mTCITByknx60Lm0zpzNALooB0HI4AP76"
}

response = requests.request("GET", url, headers=headers, data=payload)

status_code = response.status_code
result = response.json()  # Parse the response as JSON

if status_code == 200:
    base_currency = "USD"
    currencies = result.get("rates", {})  # Get the rates dictionary

    # Create a dictionary to store the exchange rates with date and time
    exchange_rates = {
        "date_time": datetime.now().isoformat(),
        "base": base_currency,
        "rates": currencies
    }

    # Save the data to a JSON file in the public folder
    public_folder_path = "public/exchange_rates.json"  
    with open(public_folder_path, "w") as json_file:
        json.dump(exchange_rates, json_file, indent=4)

    print(f"Exchange rates saved to {public_folder_path}")
else:
    print(f"Request failed with status code: {status_code}")
