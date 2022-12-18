
import pandas as pd 
import mne
import numpy as np


def plotRaw(file, sfreq, ch_count, ch_type="eeg"):
    data = pd.read_csv(file, usecols = [i+1 for i in range(ch_count)]).transpose()
    channels_type = [ch_type for x in range(ch_count)]
    info = mne.create_info(ch_names = ch_names, sfreq = sfreq, ch_types=ch_type)
    raw = mne.io.RawArray(data, info)
    raw.plot(duration=1.0)
    print(channels_type)

ch_names = ['CP3', 'C3', 'F5',  'PO3', 'PO4', 'F6', 'C4',  'CP4' ]
plotRaw("sleeping.csv", 256, 8, "eeg")