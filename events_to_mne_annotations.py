import mne
import numpy as np
import csv


annotations = None
times = np.arange(0, 1, 0.000001)  # Use 1,000,000 samples (1hr)
info = mne.create_info(ch_names=["A"], sfreq=256)
raw = mne.io.RawArray(np.array([times]), info)

with open("annotations_eve.txt", 'r') as csv_file:
    reader = csv.reader(csv_file)
    for row in reader:
        _onset = float(row[0].split(" ")[0])
        _duration = float(row[0].split(" ")[1])
        _label = row[0].split(" ")[2]
        if annotations == None:
            annotations = mne.Annotations(onset=_onset, duration=_duration, description=_label)
        else:
            annotations = annotations + mne.Annotations(onset=_onset, duration=_duration, description=_label)

raw.set_annotations(annotations)
raw.annotations.save('saved-annotations2.csv', overwrite=True)
