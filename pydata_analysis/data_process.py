#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# CC SH 18
#------------------------------------------------------------------------------

import ccxt
import numpy as np
import time
import pandas as pd
#import matplotlib.pyplot as plt
#from scipy.stats import norm
import json
from tqdm import tqdm
bitfinex = ccxt.bitfinex({'enableRateLimit': True})
bitfinex.rateLimit = bitfinex.rateLimit * 3
bitfinex.load_markets()
ethfinex = ccxt.ethfinex({'enableRateLimit': True})
ethfinex.load_markets()

#------------------------------------------------------------------------------
# Class definitions

def caclulate_median_percent_change(exchange, ccxt_pair):
    candles = exchange.fetch_ohlcv(ccxt_pair, timeframe='1d', since=timestamp_start * 1000)
    df_candles = pd.DataFrame(candles)
    volumes = df_candles[5]
    volumes.index = pd.to_datetime(df_candles[0], unit='ms')
    #volumes.plot()
    volumes_filtered = volumes.rolling(window=4, center=False).median()
    #volumes_filtered.plot()
    a = volumes_filtered.pct_change().abs()
    #percent_abnormal = a[a >= percent_change_thres].size / a.size
    return a.median()

def get_active_symbols(exchange):
    return [symbol for symbol in exchange.symbols if is_active_symbol(exchange, symbol)]

def is_active_symbol(exchange, symbol):
    return ('.' not in symbol) and (('active' not in exchange.markets[symbol]) or (exchange.markets[symbol]['active']))

def process_median_percent_change():
    data_json = dict()
    for symbol in tqdm(get_active_symbols(bitfinex)):
        print('[INFO] Fetching symbol: {0}'.format(symbol))
        median_percent_change = caclulate_median_percent_change(bitfinex, symbol)
        tmp = dict()
        tmp['medianpc'] = median_percent_change
        data_json[symbol] = tmp
        with open('MedianPercentChange.json', 'w') as outfile:
            json.dump(data_json, outfile)
            
def load_median_percent_change():
    with open('MedianPercentChange.json', 'r') as outfile:
        text = outfile.read()
        return json.loads(text)

def caculate_thresholds():
    amber = 0.7
    red = 0.9
    data = load_median_percent_change()
    medianpcs = [item['medianpc'] for key, item in data.items()]
    medianpcs.sort()
    amber_threshold = medianpcs[int(amber*len(medianpcs))]
    red_threshold =   medianpcs[int(red*len(medianpcs))]
    print('Amber Threshold: {0}'.format(amber_threshold))
    print('Red Threshold: {0}'.format(red_threshold))      
# Poll the 24 Hour volume data

# Params

days_back = 100
percent_change_thres = 0.4

timestamp_start = int(np.floor(time.time())) - days_back * 24 * 60 * 60

# main
if __name__ == '__main__':
    data = load_median_percent_change()
    for key, val_d in data.items():
        symbol_id = bitfinex.market_id(key)
        print(symbol_id)
        
    # Correlation
    
    # Generate some random time series data
#    X = pd.Series(np.random.uniform(low=-1, high=1, size=100)).cumsum()
#    X.plot()
#    Y = pd.Series(np.random.uniform(low=-1, high=1, size=100)).cumsum()
#    Y.plot()
#    
#    Z = pd.DataFrame([X,Y])
#    A = Z.corr(method='pearson')
    lending_json = bitfinex.public_get_lends_currency(params={'currency':'usd', 'limit_lends': 500})
    with open('LendingUSDRates.json', 'w') as outfile:
        json.dump(lending_json, outfile)
    
