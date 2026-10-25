"""Export the local frontend as a GitHub Pages project site."""
import argparse,re,shutil
from pathlib import Path

ROOT=Path(__file__).resolve().parent
parser=argparse.ArgumentParser()
parser.add_argument('--base-path',default='/payathon-2026-frontend')
parser.add_argument('--output',default='_site')
args=parser.parse_args()
prefix='/'+args.base_path.strip('/') if args.base_path.strip('/') else ''
if prefix and not re.fullmatch(r'/[A-Za-z0-9_.-]+',prefix):
 raise SystemExit('Expected a single GitHub repository name as base path.')
destination=(ROOT/args.output).resolve()
if destination==ROOT or ROOT not in destination.parents:
 raise SystemExit('Build output must stay inside the project directory.')
destination.mkdir(parents=True,exist_ok=True)
shutil.copytree(ROOT/'dist',destination,dirs_exist_ok=True)

event='/community/events/payathon-2026'
center=destination/event.lstrip('/')/'me/index.html'
for route in ('registration','benefits','works/detail','works/edit'):
 target=center.parent/route/'index.html'
 target.parent.mkdir(parents=True,exist_ok=True)
 shutil.copyfile(center,target)

for path in destination.rglob('*'):
 if not path.is_file() or path.suffix not in ('.html','.js','.css','.svg'):continue
 text=path.read_text(encoding='utf-8')
 if path.name=='service.DJvbNf3A.js':
  old='ce(location.hostname,["localhost","127.0.0.1","::1"].includes(location.hostname),Z())'
  if old not in text:raise SystemExit('The expected isolated preview switch was not found.')
  text=text.replace(old,'!0')
 # Do not rewrite absolute official URLs; local root paths need the repository prefix.
 text=re.sub(r'(?<![A-Za-z0-9.:])/(assets/|community/events/payathon-2026|local-adapter\.js)',lambda m:prefix+'/'+m.group(1),text)
 text=text.replace('"/_astro/','"'+prefix+'/assets/site/_astro/')
 if path.suffix=='.html':
  text=text.replace('<head>','<head><meta name="robots" content="noindex,nofollow">',1)
 path.write_text(text,encoding='utf-8')
(destination/'.nojekyll').touch()
# Preserve query strings for static deep-link fallbacks, without external dependencies.
(destination/'404.html').write_text('<!doctype html><meta charset="utf-8"><title>PAYATHON preview</title><script>const u=new URL(location.href);u.pathname='+repr(prefix+event+'/me/')+';u.searchParams.set("preview","1");location.replace(u.href)</script>',encoding='utf-8')
print(f'GitHub Pages static export: {destination} (base path: {prefix or "/"})')
