import pandas as pd 
import pymorphy2

dictionary = pd.read_excel('../data/otgovorki.xlsx', index_col=0, sheet_name=None)
morph = pymorphy2.MorphAnalyzer()
themes = ['work', 'study', 'health', 'personal', 'family', 'leisure']
