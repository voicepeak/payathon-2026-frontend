"""Check packaged files, imports, syntax, and optional local HTTP routes."""
import argparse
import concurrent.futures as cf
import json,re,subprocess,sys
from pathlib import Path
from urllib.parse import urlsplit,unquote
from urllib.request import urlopen
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parent
parser=argparse.ArgumentParser()
parser.add_argument('server',nargs='?')
parser.add_argument('--dist',default='dist')
parser.add_argument('--prefix',default='')
parser.add_argument('--report',default='verification.json')
args=parser.parse_args()
DIST=ROOT/args.dist
PREFIX=args.prefix.rstrip('/')
missing=[];external=[];references=0

def resolve(ref,base):
 global references
 if not ref or ref.startswith(('data:','blob:','#','javascript:')):return
 parsed=urlsplit(ref)
 if parsed.scheme or parsed.netloc:
  external.append({'file':str(base.relative_to(DIST)),'url':ref});return
 if not parsed.path:return
 path=parsed.path
 if PREFIX and path.startswith(PREFIX+'/'):path=path[len(PREFIX):]
 if path.startswith('/_astro/'):target=DIST/'assets/site'/path.lstrip('/')
 elif path.startswith('/'):target=DIST/path.lstrip('/')
 else:target=base.parent/path
 references+=1
 if not target.exists():missing.append({'file':str(base.relative_to(DIST)),'reference':ref})

class Page(HTMLParser):
 def __init__(self,path):super().__init__();self.path=path
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if tag in ('script','img','source','video','audio','iframe') and attrs.get('src'):resolve(attrs['src'],self.path)
  if tag=='link' and attrs.get('rel') in ('stylesheet','preload','modulepreload','icon'):resolve(attrs.get('href'),self.path)
  if attrs.get('poster'):resolve(attrs['poster'],self.path)
  if attrs.get('srcset'):
   for part in attrs['srcset'].split(','):resolve(part.strip().split(' ')[0],self.path)

for path in DIST.rglob('*'):
 if not path.is_file():continue
 if path.suffix=='.html':Page(path).feed(path.read_text(encoding='utf-8'))
 if path.suffix in ('.js','.css'):
  s=path.read_text(encoding='utf-8')
  if path.suffix=='.js':
   for ref in re.findall(r'(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)["\x27]([^"\x27]+)["\x27]',s):
    if ref.startswith(('.','/')):resolve(ref,path)
   for ref in re.findall(r'["\x27](/assets/[^"\x27]+)["\x27]',s):resolve(ref,path)
  if path.suffix=='.css':
   for ref in re.findall(r'url\(\s*["\x27]?([^\s)"\x27]+)',s):resolve(ref,path)

scripts=list(DIST.rglob('*.js'))
def syntax(path):
 r=subprocess.run(['node','--check',str(path)],capture_output=True,text=True,encoding='utf-8',errors='replace')
 return None if r.returncode==0 else {'file':str(path.relative_to(DIST)),'message':r.stderr[:1500]}
with cf.ThreadPoolExecutor(max_workers=6) as pool:syntax_errors=[r for r in pool.map(syntax,scripts) if r]
http=[]
if args.server:
 base=args.server.rstrip('/')
 for route in ('/__health','/','/community/events/payathon-2026?preview=1','/community/events/payathon-2026/me?preview=1','/community/events/payathon-2026/me/works?preview=1','/community/events/payathon-2026/me/works/new?preview=1','/community/events/payathon-2026/me/works/detail?preview=1&id=preview-work-effective','/assets/site/_astro/three-r132.min.CEObKxds.js','/local-adapter.js'):
  try:
   with urlopen(base+route,timeout=10) as r:http.append({'path':route,'status':r.status,'bytes':len(r.read()),'content_type':r.headers.get('Content-Type')})
  except Exception as e:http.append({'path':route,'error':str(e)})
result={'date':'2026-10-25','html_pages_checked':len(list(DIST.rglob('*.html'))),'local_references_checked':references,'missing_references':missing,'external_resource_references':external,'javascript_files_checked':len(scripts),'javascript_syntax_errors':syntax_errors,'http_checks':http,'visual_browser_qa':'NOT COMPLETED: Computer Use could not reliably determine current browser URL and stopped.'}
result['passed']=not missing and not syntax_errors and not external and all(x.get('status')==200 for x in http)
(ROOT/args.report).write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
sys.exit(0 if result['passed'] else 1)
