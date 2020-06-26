import pandas as pd
import pymorphy2
from flask import url_for


def get_dictionary(app_name='otgovorki'):
    print(app_name)
    return pd.read_excel(f"{app_name}/data/otgovorki.xlsx", index_col=0, sheet_name=None)


morph = pymorphy2.MorphAnalyzer()
themes = ['work', 'study', 'health', 'personal', 'family', 'leisure']
