from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re, os
ROOT=Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
    def end_headers(self):
        self.send_header('Accept-Ranges','bytes')
        super().end_headers()
    def do_GET(self):
        request_range=self.headers.get('Range')
        path=Path(self.translate_path(self.path))
        if not request_range or not path.is_file():return super().do_GET()
        match=re.fullmatch(r'bytes=(\d*)-(\d*)',request_range)
        if not match:return super().do_GET()
        size=path.stat().st_size
        start=int(match[1]) if match[1] else max(0,size-int(match[2] or size))
        end=min(int(match[2]) if match[2] and match[1] else size-1,size-1)
        if start>=size or start>end:
            self.send_response(416);self.send_header('Content-Range',f'bytes */{size}');self.end_headers();return
        self.send_response(206)
        self.send_header('Content-Type',self.guess_type(str(path)))
        self.send_header('Content-Length',str(end-start+1))
        self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
        self.end_headers()
        try:
            with path.open('rb') as f:
                f.seek(start);remaining=end-start+1
                while remaining:
                    data=f.read(min(1024*1024,remaining))
                    if not data:break
                    self.wfile.write(data);remaining-=len(data)
        except (BrokenPipeError,ConnectionResetError):pass
ThreadingHTTPServer(('127.0.0.1',8765),Handler).serve_forever()
