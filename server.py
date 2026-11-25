import http.server
import json
import os
import socketserver

PORT = 8080
STORAGE_FILE = "kontakt_anfragen.json"


class ContactRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/api/contact":
            content_length = int(self.headers.get("Content-Length", 0))
            raw_body = self.rfile.read(content_length)
            try:
                payload = json.loads(raw_body.decode("utf-8"))
            except Exception:
                self.send_response(400)
                self.end_headers()
                return

            entries = []
            if os.path.exists(STORAGE_FILE):
                try:
                    with open(STORAGE_FILE, "r", encoding="utf-8") as f:
                        entries = json.load(f)
                except Exception:
                    entries = []

            entries.append(payload)
            with open(STORAGE_FILE, "w", encoding="utf-8") as f:
                json.dump(entries, f, ensure_ascii=False, indent=2)

            response = json.dumps({"ok": True, "count": len(entries)}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()
            self.wfile.write(response)
        else:
            self.send_response(404)
            self.end_headers()


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ContactRequestHandler) as httpd:
        print(f"Serving HTTP and /api/contact on port {PORT} (http://localhost:{PORT}/) ...")
        httpd.serve_forever()

