#!/usr/bin/env python3
"""
Smart Driver & Passenger Live Translator (مترجم هوشمند راننده و مسافر)
Async Backend Server:
- Multi-engine translation proxy (/api/translate) with caching & quota-warning protection
- Studio-quality Microsoft Neural TTS (/api/tts) supporting Persian (دل‌آرا / فرید) & 10+ passenger languages
- PWA Manifest & Service Worker support
"""

import asyncio
import html
import json
import os
import urllib.parse
from collections import OrderedDict
from pathlib import Path

from aiohttp import ClientSession, ClientTimeout, web

try:
    import edge_tts
    HAS_EDGE_TTS = True
except ImportError:
    HAS_EDGE_TTS = False

BASE_DIR = Path(__file__).resolve().parent

# Neural Voice Map (Microsoft Edge Neural Voices)
NEURAL_VOICES = {
    "fa": {"female": "fa-IR-DilaraNeural", "male": "fa-IR-FaridNeural"},
    "en": {"female": "en-US-JennyNeural", "male": "en-US-GuyNeural"},
    "de": {"female": "de-DE-KatjaNeural", "male": "de-DE-ConradNeural"},
    "ar": {"female": "ar-SA-ZariyahNeural", "male": "ar-SA-HamedNeural"},
    "tr": {"female": "tr-TR-EmelNeural", "male": "tr-TR-AhmetNeural"},
    "ru": {"female": "ru-RU-SvetlanaNeural", "male": "ru-RU-DmitryNeural"},
    "fr": {"female": "fr-FR-DeniseNeural", "male": "fr-FR-HenriNeural"},
    "es": {"female": "es-ES-ElviraNeural", "male": "es-ES-AlvaroNeural"},
    "it": {"female": "it-IT-ElsaNeural", "male": "it-IT-DiegoNeural"},
    "zh": {"female": "zh-CN-XiaoxiaoNeural", "male": "zh-CN-YunxiNeural"},
    "nl": {"female": "nl-NL-ColetteNeural", "male": "nl-NL-MaartenNeural"},
}


class LRUCache:
    def __init__(self, capacity: int = 256):
        self.capacity = capacity
        self.store: OrderedDict = OrderedDict()

    def get(self, key):
        if key not in self.store:
            return None
        self.store.move_to_end(key)
        return self.store[key]

    def set(self, key, value):
        if key in self.store:
            self.store.move_to_end(key)
        self.store[key] = value
        if len(self.store) > self.capacity:
            self.store.popitem(last=False)


translate_cache = LRUCache(capacity=500)
tts_cache = LRUCache(capacity=100)


def normalize_lang(code: str) -> str:
    if not code:
        return "en"
    base = code.strip().lower().split("-")[0].split("_")[0]
    return base if base else "en"


def extract_dict_chrome_text(payload) -> str:
    """Safely extract translated text from clients5.google.com JSON formats."""
    if isinstance(payload, str):
        return payload.strip()
    if isinstance(payload, list):
        parts = []
        for item in payload:
            if isinstance(item, str):
                parts.append(item)
            elif isinstance(item, list) and len(item) > 0 and isinstance(item[0], str):
                parts.append(item[0])
        return " ".join(p.strip() for p in parts if p and p.strip()).strip()
    if isinstance(payload, dict) and "sentences" in payload:
        return "".join(s.get("trans", "") for s in payload["sentences"]).strip()
    return ""


async def translate_with_fallbacks(session: ClientSession, text: str, src: str, tgt: str):
    src_norm = normalize_lang(src)
    tgt_norm = normalize_lang(tgt)
    clean_text = text.strip()
    if not clean_text:
        return {"translatedText": "", "engine": "empty"}
    if src_norm == tgt_norm:
        return {"translatedText": clean_text, "engine": "same-lang"}

    cache_key = (src_norm, tgt_norm, clean_text)
    cached = translate_cache.get(cache_key)
    if cached:
        return {"translatedText": cached, "engine": "cache"}

    encoded = urllib.parse.quote(clean_text)
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json, text/plain, */*",
    }

    # Engine 1: Google Chrome Extension Translate Endpoint (fast, fluent, idiomatic)
    try:
        url1 = (
            f"https://clients5.google.com/translate_a/t"
            f"?client=dict-chrome-ex&sl={src_norm}&tl={tgt_norm}&q={encoded}"
        )
        async with session.get(url1, headers=headers, timeout=ClientTimeout(total=6)) as resp:
            if resp.status == 200:
                raw = await resp.text()
                data = json.loads(raw)
                translated = html.unescape(extract_dict_chrome_text(data))
                if translated:
                    translate_cache.set(cache_key, translated)
                    return {"translatedText": translated, "engine": "google-neural"}
    except Exception:
        pass

    # Engine 2: Google GTX Single Endpoint
    try:
        url2 = (
            f"https://translate.googleapis.com/translate_a/single"
            f"?client=gtx&sl={src_norm}&tl={tgt_norm}&dt=t&q={encoded}"
        )
        async with session.get(url2, headers=headers, timeout=ClientTimeout(total=6)) as resp:
            if resp.status == 200:
                raw = await resp.text()
                data = json.loads(raw)
                if isinstance(data, list) and len(data) > 0 and isinstance(data[0], list):
                    translated = "".join(
                        seg[0] for seg in data[0] if isinstance(seg, list) and seg and seg[0]
                    ).strip()
                    translated = html.unescape(translated)
                    if translated:
                        translate_cache.set(cache_key, translated)
                        return {"translatedText": translated, "engine": "gtx"}
    except Exception:
        pass

    # Engine 3: MyMemory API with strict status & quota-warning validation
    try:
        url3 = (
            f"https://api.mymemory.translated.net/get"
            f"?q={encoded}&langpair={src_norm}|{tgt_norm}"
        )
        async with session.get(url3, headers=headers, timeout=ClientTimeout(total=7)) as resp:
            if resp.status == 200:
                data = await resp.json(content_type=None)
                status_code = int(data.get("responseStatus", 0) or 0)
                quota_finished = bool(data.get("quotaFinished", False))
                candidate = html.unescape(
                    (data.get("responseData") or {}).get("translatedText") or ""
                ).strip()
                upper_cand = candidate.upper()
                if (
                    status_code == 200
                    and not quota_finished
                    and candidate
                    and "MYMEMORY WARNING" not in upper_cand
                    and "YOU USED ALL AVAILABLE" not in upper_cand
                ):
                    translate_cache.set(cache_key, candidate)
                    return {"translatedText": candidate, "engine": "mymemory"}
    except Exception:
        pass

    raise RuntimeError("Translation services temporarily unavailable")


@web.middleware
async def cors_middleware(request: web.Request, handler):
    if request.method == "OPTIONS":
        resp = web.Response(status=204)
    else:
        resp = await handler(request)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return resp


async def handle_index(request: web.Request) -> web.Response:
    html_path = BASE_DIR / "index.html"
    content = html_path.read_text(encoding="utf-8")
    return web.Response(
        text=content,
        content_type="text/html",
        charset="utf-8",
        headers={"Cache-Control": "no-cache"},
    )


async def handle_manifest(request: web.Request) -> web.Response:
    manifest = {
        "name": "مترجم هوشمند راننده و مسافر | RideTalk Pro",
        "short_name": "مترجم راننده",
        "description": "مترجم همزمان صوتی و هوشمند ویژه رانندگان و مسافران بین‌المللی",
        "start_url": "./",
        "display": "standalone",
        "background_color": "#0b0d17",
        "theme_color": "#0b0d17",
        "orientation": "portrait",
        "lang": "fa",
        "dir": "rtl",
        "icons": [
            {
                "src": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' rx='28' fill='%23131629'/%3E%3Ccircle cx='44' cy='64' r='26' fill='%23a855f7' opacity='0.9'/%3E%3Ccircle cx='84' cy='64' r='26' fill='%2314b8a6' opacity='0.9'/%3E%3Cpath d='M64 34v60M48 52h32M48 76h32' stroke='%23fff' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E",
                "sizes": "128x128",
                "type": "image/svg+xml",
            }
        ],
    }
    return web.json_response(manifest)


async def handle_sw(request: web.Request) -> web.Response:
    sw_code = """
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
""".strip()
    return web.Response(text=sw_code, content_type="application/javascript", charset="utf-8")


async def handle_health(request: web.Request) -> web.Response:
    return web.json_response(
        {
            "ok": True,
            "neural_tts": HAS_EDGE_TTS,
            "supported_languages": list(NEURAL_VOICES.keys()),
        }
    )


async def handle_translate(request: web.Request) -> web.Response:
    if request.method == "POST":
        try:
            body = await request.json()
        except Exception:
            body = {}
        text = str(body.get("q") or body.get("text") or "").strip()
        src = str(body.get("from") or body.get("sl") or "fa")
        tgt = str(body.get("to") or body.get("tl") or "en")
    else:
        text = str(request.query.get("q") or request.query.get("text") or "").strip()
        src = str(request.query.get("from") or request.query.get("sl") or "fa")
        tgt = str(request.query.get("to") or request.query.get("tl") or "en")

    if not text:
        return web.json_response({"ok": False, "error": "Empty text"}, status=400)
    if len(text) > 2000:
        text = text[:2000]

    try:
        result = await translate_with_fallbacks(request.app["http_session"], text, src, tgt)
        return web.json_response(
            {
                "ok": True,
                "translatedText": result["translatedText"],
                "engine": result["engine"],
                "from": normalize_lang(src),
                "to": normalize_lang(tgt),
            }
        )
    except Exception as exc:
        return web.json_response(
            {"ok": False, "error": str(exc)},
            status=502,
        )


async def handle_tts(request: web.Request) -> web.Response:
    if not HAS_EDGE_TTS:
        return web.json_response({"ok": False, "error": "edge-tts not available"}, status=503)

    text = str(request.query.get("q") or request.query.get("text") or "").strip()
    lang = normalize_lang(str(request.query.get("lang") or "fa"))
    gender = str(request.query.get("gender") or "female").strip().lower()
    if gender not in ("female", "male"):
        gender = "female"

    try:
        rate_num = int(request.query.get("rate") or 0)
        rate_num = max(-35, min(35, rate_num))
    except ValueError:
        rate_num = 0
    rate_str = f"{rate_num:+d}%"

    if not text:
        return web.json_response({"ok": False, "error": "Empty text"}, status=400)
    if len(text) > 1000:
        text = text[:1000]

    voice_pair = NEURAL_VOICES.get(lang, NEURAL_VOICES["en"])
    voice = voice_pair.get(gender, voice_pair["female"])

    cache_key = (voice, rate_str, text)
    cached_audio = tts_cache.get(cache_key)
    if cached_audio:
        return web.Response(
            body=cached_audio,
            content_type="audio/mpeg",
            headers={
                "Content-Length": str(len(cached_audio)),
                "Accept-Ranges": "bytes",
                "Cache-Control": "public, max-age=3600",
                "X-TTS-Voice": voice,
            },
        )

    try:
        communicate = edge_tts.Communicate(text, voice, rate=rate_str)
        chunks = bytearray()
        async for chunk in communicate.stream():
            if chunk.get("type") == "audio" and chunk.get("data"):
                chunks.extend(chunk["data"])

        audio_bytes = bytes(chunks)
        if not audio_bytes:
            raise RuntimeError("Empty audio stream returned")

        tts_cache.set(cache_key, audio_bytes)
        return web.Response(
            body=audio_bytes,
            content_type="audio/mpeg",
            headers={
                "Content-Length": str(len(audio_bytes)),
                "Accept-Ranges": "bytes",
                "Cache-Control": "public, max-age=3600",
                "X-TTS-Voice": voice,
            },
        )
    except Exception as exc:
        return web.json_response({"ok": False, "error": str(exc)}, status=502)


async def on_startup(app: web.Application):
    app["http_session"] = ClientSession()


async def on_cleanup(app: web.Application):
    session = app.get("http_session")
    if session and not session.closed:
        await session.close()


def create_app() -> web.Application:
    app = web.Application(middlewares=[cors_middleware])
    app.on_startup.append(on_startup)
    app.on_cleanup.append(on_cleanup)
    app.router.add_get("/", handle_index)
    app.router.add_get("/index.html", handle_index)
    app.router.add_get("/manifest.json", handle_manifest)
    app.router.add_get("/sw.js", handle_sw)
    app.router.add_get("/api/health", handle_health)
    app.router.add_get("/api/translate", handle_translate)
    app.router.add_post("/api/translate", handle_translate)
    app.router.add_get("/api/tts", handle_tts)
    return app


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    web.run_app(create_app(), host="0.0.0.0", port=port, print=lambda msg: print(msg, flush=True))
