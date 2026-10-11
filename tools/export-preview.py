"""Export public website files to a preview directory; never copy .git or credentials."""
from pathlib import Path
import argparse
import shutil

parser=argparse.ArgumentParser()
parser.add_argument('destination',type=Path)
args=parser.parse_args()
source=Path(__file__).resolve().parents[1]
destination=args.destination.resolve()
if destination==source or source in destination.parents:
    raise SystemExit('Use a preview directory outside the source checkout.')
destination.mkdir(parents=True,exist_ok=True)
for name in ('index.html','styles.css','content.js','app.js','favicon.svg','preview.py','README.md'):
    shutil.copy2(source/name,destination/name)
shutil.copytree(source/'assets',destination/'assets',dirs_exist_ok=True)
print(f'Exported preview: {destination}')
