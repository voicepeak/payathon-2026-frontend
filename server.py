"""Standard-library-only local preview. No installation or build required."""
import argparse,json,mimetypes,os,webbrowser
from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from urllib.parse import urlsplit

ROOT=Path(__file__).resolve().parent
DIST=ROOT/'dist'
EVENT='/community/events/payathon-2026'
mimetypes.add_type('text/javascript','.js')
mimetypes.add_type('font/woff2','.woff2')
mimetypes.add_type('image/webp','.webp')

class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(DIST),**kwargs)
 def translate_path(self,path):
  url=urlsplit(path)
  if url.path.startswith('/_astro/'):
   return str(DIST/'assets/site'/url.path.lstrip('/'))
  actual=Path(super().translate_path(path))
  if url.path.startswith(EVENT+'/me/') and not actual.exists():
   return str(DIST/EVENT.lstrip('/')/'me/index.html')
  return str(actual)
 def do_GET(self):
  if self.path=='/':
   self.send_response(302);self.send_header('Location',EVENT+'?preview=1');self.end_headers();return
  if urlsplit(self.path).path=='/__health':
   self.send_response(200);self.send_header('Content-Type','application/json');self.end_headers();self.wfile.write(b'{"status":"ok","mode":"local-preview"}');return
  super().do_GET()
 def do_POST(self):
  if self.path=='/__local_diagnostics':
   length=min(int(self.headers.get('Content-Length','0')),1000000)
   try:
    payload=json.loads(self.rfile.read(length))
    (ROOT/'runtime-diagnostics.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
   except (ValueError,OSError):pass
   self.send_response(204);self.end_headers();return
  self.send_response(503);self.send_header('Content-Type','application/json; charset=utf-8');self.end_headers()
  self.wfile.write(json.dumps({'success':False,'errorCode':'LOCAL_PREVIEW_ONLY','errorMsg':'本地预览未连接官方服务。'},ensure_ascii=False).encode())
 def end_headers(self):
  self.send_header('Cache-Control','no-cache')
  super().end_headers()

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8766);parser.add_argument('--open',action='store_true');args=parser.parse_args()
 server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
 url=f'http://127.0.0.1:{args.port}{EVENT}?preview=1'
 print('PAYATHON local preview: '+url,flush=True)
 if args.open:webbrowser.open(url)
 try:server.serve_forever()
 except KeyboardInterrupt:server.server_close()
