import torch
import pandas as pd 
import mne
# print(mne)
# print("hello world")


file = 'new_data.csv'
data = pd.read_csv(file, usecols = [i+1 for i in range(8)]).transpose()
# print(data)
sfreq = 256
ch_names = ['CP3', 'C3', 'F5',  'PO3', 'PO4', 'F6', 'C4',  'CP4' ]
info = mne.create_info(ch_names = ch_names, sfreq = sfreq)
raw = mne.io.RawArray(data, info)

'''
test_annotation = mne.Annotations(onset=0, duration=0.1, description='test')
test_annotation2 = mne.Annotations(onset=0.1, duration=0.1, description='test2')
raw.set_annotations(test_annotation + test_annotation2)
'''


annot_from_file = mne.read_annotations('events_eve.txt')
print(annot_from_file)