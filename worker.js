// Adapted MIT licensed edge-tts-ws-worker, https://github.com/neosun100/edgetts-ws-worker
const UI_HTML = "<!DOCTYPE html>\n<html lang=\"fa\" dir=\"rtl\" data-theme=\"dark\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, viewport-fit=cover\">\n    <meta name=\"theme-color\" content=\"#0b0d17\">\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\">\n    <title>مترجم هوشمند راننده و مسافر | Smart Driver &amp; Passenger Live Translator</title>\n    <style>\n        :root {\n            --bg-main: #0b0d17;\n            --bg-elevated: #141829;\n            --bg-card: #1a1f35;\n            --bg-card-hover: #222844;\n            --border-subtle: rgba(255, 255, 255, 0.09);\n            --border-strong: rgba(255, 255, 255, 0.18);\n            --text-primary: #f8fafc;\n            --text-secondary: #cbd5e1;\n            --text-muted: #94a3b8;\n\n            --driver-primary: #a855f7;\n            --driver-secondary: #7e22ce;\n            --driver-soft: rgba(168, 85, 247, 0.16);\n            --driver-border: rgba(185, 107, 255, 0.42);\n\n            --pass-primary: #14b8a6;\n            --pass-secondary: #0f766e;\n            --pass-soft: rgba(20, 184, 166, 0.16);\n            --pass-border: rgba(32, 227, 200, 0.42);\n\n            --accent-amber: #f59e0b;\n            --accent-danger: #ef4444;\n            --accent-success: #22c55e;\n            --shadow-lg: 0 14px 34px rgba(0, 0, 0, 0.42);\n            --radius-xl: 22px;\n            --radius-lg: 16px;\n        }\n\n        [data-theme=\"light\"] {\n            --bg-main: #f1f5f9;\n            --bg-elevated: #ffffff;\n            --bg-card: #ffffff;\n            --bg-card-hover: #f8fafc;\n            --border-subtle: rgba(15, 23, 42, 0.1);\n            --border-strong: rgba(15, 23, 42, 0.2);\n            --text-primary: #0f172a;\n            --text-secondary: #334155;\n            --text-muted: #64748b;\n\n            --driver-primary: #9333ea;\n            --driver-secondary: #6b21a8;\n            --driver-soft: rgba(147, 51, 234, 0.1);\n            --driver-border: rgba(147, 51, 234, 0.35);\n\n            --pass-primary: #0d9488;\n            --pass-secondary: #115e59;\n            --pass-soft: rgba(13, 148, 136, 0.1);\n            --pass-border: rgba(13, 148, 136, 0.35);\n\n            --shadow-lg: 0 10px 28px rgba(15, 23, 42, 0.1);\n        }\n\n        * {\n            box-sizing: border-box;\n            -webkit-tap-highlight-color: transparent;\n        }\n\n        html, body {\n            margin: 0;\n            padding: 0;\n            width: 100%;\n            height: 100%;\n            height: 100dvh;\n            overflow: hidden;\n            background-color: var(--bg-main);\n            color: var(--text-primary);\n            font-family: 'Vazirmatn', 'IRANSansX', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Tahoma', sans-serif;\n        }\n\n        .app-shell {\n            display: flex;\n            flex-direction: column;\n            width: 100%;\n            max-width: 780px;\n            height: 100%;\n            height: 100dvh;\n            margin: 0 auto;\n            padding: max(10px, env(safe-area-inset-top)) 12px max(12px, env(safe-area-inset-bottom));\n            gap: 8px;\n        }\n\n        .top-header {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            gap: 8px;\n            background: var(--bg-elevated);\n            border: 1px solid var(--border-subtle);\n            border-radius: var(--radius-lg);\n            padding: 10px 12px;\n            box-shadow: var(--shadow-lg);\n            flex-shrink: 0;\n        }\n\n        .brand-wrap {\n            display: flex;\n            align-items: center;\n            gap: 10px;\n            min-width: 0;\n        }\n\n        .brand-logo {\n            width: 38px;\n            height: 38px;\n            border-radius: 12px;\n            background: linear-gradient(135deg, var(--driver-primary), var(--pass-primary));\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            flex-shrink: 0;\n            box-shadow: 0 4px 14px rgba(168, 85, 247, 0.32);\n        }\n\n        .brand-titles {\n            min-width: 0;\n        }\n\n        .brand-title-fa {\n            font-size: 15px;\n            font-weight: 800;\n            line-height: 1.25;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            display: flex;\n            align-items: center;\n            gap: 6px;\n        }\n\n        .neural-badge {\n            font-size: 10px;\n            font-weight: 700;\n            padding: 2px 6px;\n            border-radius: 999px;\n            background: rgba(34, 197, 94, 0.16);\n            color: #4ade80;\n            border: 1px solid rgba(34, 197, 94, 0.35);\n        }\n\n        [data-theme=\"light\"] .neural-badge {\n            color: #15803d;\n            background: rgba(34, 197, 94, 0.14);\n        }\n\n        .brand-title-sub {\n            font-size: 11.5px;\n            color: var(--text-muted);\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            margin-top: 2px;\n        }\n\n        .header-actions {\n            display: flex;\n            align-items: center;\n            gap: 5px;\n            flex-shrink: 0;\n        }\n\n        .icon-pill {\n            border: 1px solid var(--border-subtle);\n            background: var(--bg-card);\n            color: var(--text-primary);\n            border-radius: 11px;\n            padding: 7px 9px;\n            font-size: 12px;\n            font-weight: 700;\n            font-family: inherit;\n            cursor: pointer;\n            display: inline-flex;\n            align-items: center;\n            gap: 4px;\n            transition: transform 0.14s ease, background 0.18s ease, border-color 0.18s ease;\n            text-decoration: none;\n        }\n\n        .icon-pill:hover {\n            background: var(--bg-card-hover);\n            border-color: var(--border-strong);\n        }\n\n        .icon-pill:active {\n            transform: scale(0.96);\n        }\n\n        .icon-pill.active-auto {\n            background: rgba(245, 158, 11, 0.18);\n            border-color: rgba(245, 158, 11, 0.55);\n            color: #fbbf24;\n        }\n\n        [data-theme=\"light\"] .icon-pill.active-auto {\n            color: #b45309;\n        }\n\n        .icon-pill.active-face {\n            background: var(--pass-soft);\n            border-color: var(--pass-border);\n            color: var(--pass-primary);\n        }\n\n        .control-bar {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            gap: 8px;\n            flex-shrink: 0;\n        }\n\n        .lang-switcher {\n            display: flex;\n            align-items: center;\n            gap: 6px;\n            flex: 1;\n            background: var(--bg-elevated);\n            border: 1px solid var(--border-subtle);\n            border-radius: 14px;\n            padding: 5px 8px;\n            min-width: 0;\n        }\n\n        .lang-chip {\n            display: flex;\n            align-items: center;\n            gap: 5px;\n            padding: 6px 9px;\n            border-radius: 10px;\n            font-size: 12.5px;\n            font-weight: 700;\n            white-space: nowrap;\n        }\n\n        .lang-chip.driver-chip {\n            background: var(--driver-soft);\n            border: 1px solid var(--driver-border);\n            color: var(--text-primary);\n        }\n\n        .lang-swap-icon {\n            color: var(--text-muted);\n            font-size: 13px;\n            flex-shrink: 0;\n        }\n\n        .pass-lang-btn {\n            flex: 1;\n            min-width: 0;\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            gap: 6px;\n            background: var(--pass-soft);\n            border: 1px solid var(--pass-border);\n            color: var(--text-primary);\n            padding: 6px 10px;\n            border-radius: 10px;\n            font-family: inherit;\n            font-size: 12.5px;\n            font-weight: 700;\n            cursor: pointer;\n        }\n\n        .pass-lang-label {\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n        }\n\n        .phrases-toggle-btn {\n            background: var(--bg-elevated);\n            border: 1px solid var(--border-subtle);\n            color: var(--text-primary);\n            border-radius: 14px;\n            padding: 10px 12px;\n            font-family: inherit;\n            font-size: 12.5px;\n            font-weight: 700;\n            cursor: pointer;\n            display: flex;\n            align-items: center;\n            gap: 5px;\n            white-space: nowrap;\n        }\n\n        .phrases-toggle-btn.open {\n            background: var(--driver-soft);\n            border-color: var(--driver-border);\n        }\n\n        .face-banner {\n            display: none;\n            background: linear-gradient(135deg, rgba(20, 184, 166, 0.18), rgba(15, 118, 110, 0.08));\n            border: 1px solid var(--pass-border);\n            border-radius: var(--radius-lg);\n            padding: 11px 14px;\n            flex-shrink: 0;\n            transition: transform 0.3s ease;\n        }\n\n        .face-banner.visible { display: block; }\n        .face-banner.flipped { transform: rotate(180deg); }\n\n        .face-banner-top {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            font-size: 11.5px;\n            color: var(--text-muted);\n            margin-bottom: 4px;\n        }\n\n        .face-banner-text {\n            font-size: 17.5px;\n            font-weight: 800;\n            line-height: 1.4;\n            color: var(--text-primary);\n            word-break: break-word;\n        }\n\n        .mini-flip-btn {\n            background: var(--bg-card);\n            border: 1px solid var(--border-subtle);\n            color: var(--text-secondary);\n            border-radius: 8px;\n            padding: 3px 8px;\n            font-size: 11px;\n            font-family: inherit;\n            cursor: pointer;\n        }\n\n        .phrases-drawer {\n            display: none;\n            flex-direction: column;\n            gap: 8px;\n            background: var(--bg-elevated);\n            border: 1px solid var(--border-strong);\n            border-radius: var(--radius-lg);\n            padding: 10px;\n            max-height: 220px;\n            flex-shrink: 0;\n            box-shadow: var(--shadow-lg);\n        }\n\n        .phrases-drawer.open { display: flex; }\n\n        .phrase-tabs {\n            display: flex;\n            gap: 6px;\n            overflow-x: auto;\n            padding-bottom: 2px;\n            scrollbar-width: none;\n        }\n\n        .phrase-tabs::-webkit-scrollbar { display: none; }\n\n        .phrase-tab {\n            border: 1px solid var(--border-subtle);\n            background: var(--bg-card);\n            color: var(--text-secondary);\n            border-radius: 999px;\n            padding: 5px 11px;\n            font-size: 12px;\n            font-weight: 700;\n            font-family: inherit;\n            white-space: nowrap;\n            cursor: pointer;\n        }\n\n        .phrase-tab.active {\n            background: var(--driver-primary);\n            border-color: var(--driver-primary);\n            color: #fff;\n        }\n\n        .phrase-grid {\n            display: grid;\n            grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));\n            gap: 6px;\n            overflow-y: auto;\n        }\n\n        .phrase-item-btn {\n            text-align: right;\n            background: var(--bg-card);\n            border: 1px solid var(--border-subtle);\n            color: var(--text-primary);\n            border-radius: 11px;\n            padding: 8px 10px;\n            font-family: inherit;\n            font-size: 12.5px;\n            font-weight: 600;\n            cursor: pointer;\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            gap: 8px;\n        }\n\n        .phrase-item-btn:hover {\n            background: var(--bg-card-hover);\n            border-color: var(--driver-border);\n        }\n\n        .phrase-item-btn span.play-tag {\n            color: var(--pass-primary);\n            font-size: 13px;\n            flex-shrink: 0;\n        }\n\n        .settings-panel {\n            display: none;\n            background: var(--bg-elevated);\n            border: 1px solid var(--border-strong);\n            border-radius: var(--radius-lg);\n            padding: 11px 12px;\n            gap: 10px;\n            flex-wrap: wrap;\n            align-items: center;\n            justify-content: space-between;\n            flex-shrink: 0;\n        }\n\n        .settings-panel.open { display: flex; }\n\n        .setting-group {\n            display: flex;\n            align-items: center;\n            gap: 6px;\n            font-size: 12px;\n            color: var(--text-secondary);\n            flex-wrap: wrap;\n        }\n\n        .seg-control {\n            display: inline-flex;\n            background: var(--bg-card);\n            border: 1px solid var(--border-subtle);\n            border-radius: 10px;\n            padding: 2px;\n        }\n\n        .seg-btn {\n            border: none;\n            background: transparent;\n            color: var(--text-secondary);\n            padding: 5px 9px;\n            border-radius: 8px;\n            font-family: inherit;\n            font-size: 11.5px;\n            font-weight: 700;\n            cursor: pointer;\n        }\n\n        .seg-btn.active {\n            background: var(--driver-primary);\n            color: #fff;\n        }\n\n        .chat-section {\n            flex: 1;\n            min-height: 0;\n            background: var(--bg-elevated);\n            border: 1px solid var(--border-subtle);\n            border-radius: var(--radius-xl);\n            display: flex;\n            flex-direction: column;\n            overflow: hidden;\n        }\n\n        .chat-topbar {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            padding: 8px 14px;\n            border-bottom: 1px solid var(--border-subtle);\n            font-size: 12px;\n            color: var(--text-muted);\n            flex-shrink: 0;\n        }\n\n        .status-indicator {\n            display: flex;\n            align-items: center;\n            gap: 7px;\n            font-weight: 700;\n        }\n\n        .status-dot {\n            width: 8px;\n            height: 8px;\n            border-radius: 50%;\n            background: var(--accent-success);\n        }\n\n        .status-dot.listening {\n            background: var(--accent-danger);\n            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.25);\n            animation: blinkDot 1s infinite;\n        }\n\n        .status-dot.speaking {\n            background: var(--pass-primary);\n            box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.25);\n            animation: blinkDot 1s infinite;\n        }\n\n        @keyframes blinkDot {\n            0%, 100% { opacity: 1; }\n            50% { opacity: 0.35; }\n        }\n\n        .chat-toolbar-btns {\n            display: flex;\n            align-items: center;\n            gap: 6px;\n        }\n\n        .text-link-btn {\n            background: transparent;\n            border: 1px solid var(--border-subtle);\n            color: var(--text-muted);\n            border-radius: 8px;\n            padding: 3px 8px;\n            font-family: inherit;\n            font-size: 11.5px;\n            cursor: pointer;\n        }\n\n        .text-link-btn:hover {\n            color: var(--text-primary);\n            border-color: var(--border-strong);\n        }\n\n        .chat-stream {\n            flex: 1;\n            overflow-y: auto;\n            padding: 12px;\n            display: flex;\n            flex-direction: column;\n            gap: 10px;\n            scroll-behavior: smooth;\n        }\n\n        .empty-state {\n            margin: auto;\n            max-width: 490px;\n            text-align: center;\n            padding: 14px 10px;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            gap: 10px;\n        }\n\n        .empty-bilingual-box {\n            width: 100%;\n            display: grid;\n            grid-template-columns: 1fr 1fr;\n            gap: 8px;\n        }\n\n        @media (max-width: 480px) {\n            .empty-bilingual-box {\n                grid-template-columns: 1fr;\n            }\n        }\n\n        .empty-guide-card {\n            background: var(--bg-card);\n            border: 1px solid var(--border-subtle);\n            border-radius: 14px;\n            padding: 11px;\n            font-size: 12.5px;\n            line-height: 1.5;\n        }\n\n        .empty-guide-card.driver-guide { border-color: var(--driver-border); }\n        .empty-guide-card.pass-guide { border-color: var(--pass-border); }\n\n        .live-interim-card {\n            display: none;\n            background: var(--bg-card);\n            border: 1.5px dashed var(--driver-primary);\n            border-radius: 16px;\n            padding: 11px 14px;\n            margin: 0 12px 10px;\n            align-items: center;\n            justify-content: space-between;\n            gap: 10px;\n            flex-shrink: 0;\n        }\n\n        .live-interim-card.visible { display: flex; }\n        .live-interim-card.pass-mode { border-color: var(--pass-primary); }\n\n        .wave-bars {\n            display: inline-flex;\n            align-items: center;\n            gap: 3px;\n            height: 20px;\n            flex-shrink: 0;\n        }\n\n        .wave-bars span {\n            width: 3.5px;\n            height: 8px;\n            border-radius: 99px;\n            background: currentColor;\n            animation: soundWave 0.85s ease-in-out infinite;\n        }\n\n        .wave-bars span:nth-child(2) { animation-delay: 0.15s; height: 16px; }\n        .wave-bars span:nth-child(3) { animation-delay: 0.3s; height: 20px; }\n        .wave-bars span:nth-child(4) { animation-delay: 0.45s; height: 12px; }\n\n        @keyframes soundWave {\n            0%, 100% { transform: scaleY(0.45); }\n            50% { transform: scaleY(1.15); }\n        }\n\n        .msg-card {\n            border-radius: 18px;\n            padding: 12px 14px;\n            border: 1px solid var(--border-subtle);\n            background: var(--bg-card);\n            display: flex;\n            flex-direction: column;\n            gap: 7px;\n            animation: slideUp 0.22s ease-out;\n        }\n\n        @keyframes slideUp {\n            from { opacity: 0; transform: translateY(8px); }\n            to { opacity: 1; transform: translateY(0); }\n        }\n\n        .msg-card.from-driver {\n            border-right: 4px solid var(--driver-primary);\n            background: linear-gradient(90deg, var(--bg-card) 0%, var(--driver-soft) 100%);\n        }\n\n        .msg-card.from-passenger {\n            border-left: 4px solid var(--pass-primary);\n            background: linear-gradient(270deg, var(--bg-card) 0%, var(--pass-soft) 100%);\n        }\n\n        .msg-card.latest-msg .msg-translated {\n            font-size: 20.5px;\n        }\n\n        .msg-meta {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            font-size: 11.5px;\n            color: var(--text-muted);\n        }\n\n        .speaker-badge {\n            font-weight: 800;\n            display: inline-flex;\n            align-items: center;\n            gap: 5px;\n        }\n\n        .from-driver .speaker-badge { color: var(--driver-primary); }\n        .from-passenger .speaker-badge { color: var(--pass-primary); }\n\n        .msg-translated {\n            font-size: 18px;\n            font-weight: 800;\n            line-height: 1.45;\n            color: var(--text-primary);\n            word-break: break-word;\n        }\n\n        .msg-original {\n            font-size: 13.5px;\n            line-height: 1.45;\n            color: var(--text-secondary);\n            padding-top: 5px;\n            border-top: 1px solid var(--border-subtle);\n            word-break: break-word;\n        }\n\n        .msg-actions {\n            display: flex;\n            align-items: center;\n            gap: 6px;\n            margin-top: 2px;\n        }\n\n        .msg-action-btn {\n            background: rgba(255, 255, 255, 0.05);\n            border: 1px solid var(--border-subtle);\n            color: var(--text-secondary);\n            border-radius: 9px;\n            padding: 4px 10px;\n            font-family: inherit;\n            font-size: 11.5px;\n            font-weight: 700;\n            cursor: pointer;\n            display: inline-flex;\n            align-items: center;\n            gap: 4px;\n        }\n\n        [data-theme=\"light\"] .msg-action-btn {\n            background: rgba(15, 23, 42, 0.04);\n        }\n\n        .keyboard-bar {\n            display: flex;\n            align-items: center;\n            gap: 6px;\n            background: var(--bg-elevated);\n            border: 1px solid var(--border-subtle);\n            border-radius: 15px;\n            padding: 6px;\n            flex-shrink: 0;\n        }\n\n        .sender-role-toggle {\n            border: 1px solid var(--driver-border);\n            background: var(--driver-soft);\n            color: var(--text-primary);\n            border-radius: 10px;\n            padding: 8px 10px;\n            font-family: inherit;\n            font-size: 12px;\n            font-weight: 800;\n            cursor: pointer;\n            white-space: nowrap;\n            flex-shrink: 0;\n        }\n\n        .sender-role-toggle.role-passenger {\n            border-color: var(--pass-border);\n            background: var(--pass-soft);\n        }\n\n        .manual-input {\n            flex: 1;\n            min-width: 0;\n            border: none;\n            outline: none;\n            background: transparent;\n            color: var(--text-primary);\n            font-family: inherit;\n            font-size: 14px;\n            padding: 6px 8px;\n        }\n\n        .manual-input::placeholder { color: var(--text-muted); }\n\n        .send-btn {\n            border: none;\n            background: linear-gradient(135deg, var(--driver-primary), var(--pass-primary));\n            color: #fff;\n            border-radius: 10px;\n            padding: 8px 12px;\n            font-family: inherit;\n            font-size: 12.5px;\n            font-weight: 800;\n            cursor: pointer;\n            white-space: nowrap;\n            flex-shrink: 0;\n        }\n\n        .auto-loop-banner {\n            display: none;\n            align-items: center;\n            justify-content: space-between;\n            gap: 8px;\n            background: rgba(245, 158, 11, 0.15);\n            border: 1px solid rgba(245, 158, 11, 0.45);\n            border-radius: 13px;\n            padding: 7px 12px;\n            font-size: 12px;\n            font-weight: 700;\n            color: #fcd34d;\n            flex-shrink: 0;\n        }\n\n        [data-theme=\"light\"] .auto-loop-banner { color: #92400e; }\n        .auto-loop-banner.visible { display: flex; }\n\n        .mic-dock {\n            display: grid;\n            grid-template-columns: 1fr 1fr;\n            gap: 10px;\n            flex-shrink: 0;\n        }\n\n        .mic-btn {\n            position: relative;\n            border: 2px solid transparent;\n            border-radius: var(--radius-xl);\n            padding: 14px 10px;\n            min-height: 94px;\n            cursor: pointer;\n            font-family: inherit;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            gap: 5px;\n            transition: transform 0.14s ease, box-shadow 0.2s ease;\n            user-select: none;\n        }\n\n        .mic-btn:active { transform: scale(0.97); }\n\n        .mic-btn.driver-mic {\n            background: linear-gradient(145deg, #c084fc 0%, #9333ea 100%);\n            color: #ffffff;\n            box-shadow: 0 10px 24px rgba(147, 51, 234, 0.35);\n        }\n\n        .mic-btn.pass-mic {\n            background: linear-gradient(145deg, #2dd4bf 0%, #0d9488 100%);\n            color: #042f2e;\n            box-shadow: 0 10px 24px rgba(13, 148, 136, 0.35);\n        }\n\n        .mic-btn.listening {\n            border-color: #ffffff;\n            animation: activeMicPulse 1.35s infinite;\n        }\n\n        @keyframes activeMicPulse {\n            0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.55); }\n            70% { box-shadow: 0 0 0 14px rgba(255, 255, 255, 0); }\n            100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }\n        }\n\n        .mic-icon-circle {\n            width: 36px;\n            height: 36px;\n            border-radius: 50%;\n            background: rgba(255, 255, 255, 0.22);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n\n        .pass-mic .mic-icon-circle { background: rgba(4, 47, 46, 0.14); }\n\n        .mic-main-title {\n            font-size: 16px;\n            font-weight: 900;\n            line-height: 1.2;\n            text-align: center;\n        }\n\n        .mic-sub-hint {\n            font-size: 11.5px;\n            font-weight: 700;\n            opacity: 0.9;\n            text-align: center;\n        }\n\n        .modal-backdrop {\n            display: none;\n            position: fixed;\n            inset: 0;\n            background: rgba(5, 7, 15, 0.78);\n            backdrop-filter: blur(6px);\n            z-index: 100;\n            align-items: center;\n            justify-content: center;\n            padding: 16px;\n        }\n\n        .modal-backdrop.open { display: flex; }\n\n        .modal-box {\n            width: 100%;\n            max-width: 480px;\n            background: var(--bg-elevated);\n            border: 1px solid var(--border-strong);\n            border-radius: var(--radius-xl);\n            padding: 18px;\n            box-shadow: var(--shadow-lg);\n            max-height: 86dvh;\n            display: flex;\n            flex-direction: column;\n            gap: 12px;\n        }\n\n        .modal-header {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            font-size: 15.5px;\n            font-weight: 800;\n        }\n\n        .lang-grid {\n            display: grid;\n            grid-template-columns: repeat(2, 1fr);\n            gap: 8px;\n            overflow-y: auto;\n        }\n\n        .lang-option-btn {\n            background: var(--bg-card);\n            border: 1px solid var(--border-subtle);\n            color: var(--text-primary);\n            border-radius: 14px;\n            padding: 10px 12px;\n            font-family: inherit;\n            cursor: pointer;\n            display: flex;\n            align-items: center;\n            gap: 10px;\n            text-align: right;\n        }\n\n        .lang-option-btn.selected {\n            border-color: var(--pass-primary);\n            background: var(--pass-soft);\n        }\n\n        .lang-flag { font-size: 22px; }\n        .lang-names { display: flex; flex-direction: column; min-width: 0; }\n        .lang-native { font-size: 14px; font-weight: 800; }\n        .lang-fa-sub { font-size: 11.5px; color: var(--text-muted); }\n\n        .zoom-card-content {\n            padding: 24px 16px;\n            text-align: center;\n            font-size: 28px;\n            font-weight: 900;\n            line-height: 1.45;\n            word-break: break-word;\n            transition: transform 0.3s ease;\n        }\n\n        .zoom-card-content.rotated { transform: rotate(180deg); }\n\n        .toast {\n            position: fixed;\n            bottom: 124px;\n            left: 50%;\n            transform: translateX(-50%) translateY(16px);\n            background: #1e293b;\n            color: #f8fafc;\n            border: 1px solid rgba(255, 255, 255, 0.16);\n            padding: 9px 16px;\n            border-radius: 999px;\n            font-size: 12.5px;\n            font-weight: 700;\n            opacity: 0;\n            pointer-events: none;\n            transition: opacity 0.2s ease, transform 0.2s ease;\n            z-index: 200;\n            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);\n            max-width: 92vw;\n            text-align: center;\n        }\n\n        .toast.show {\n            opacity: 1;\n            transform: translateX(-50%) translateY(0);\n        }\n\n        /* Simplified driver view: tools stay accessible in the menu. */\n        .app-shell { position: relative; }\n        .brand-title-sub { display: none; }\n        .top-header { padding: 10px 12px; }\n        .brand-title-fa { font-size: 16px; }\n        #btnSettings { min-height: 44px; padding: 8px 14px; font-size: 14px; }\n        .settings-panel.open { display: flex; }\n        .settings-panel {\n            position: absolute; z-index: 50; top: max(68px, calc(env(safe-area-inset-top) + 62px));\n            left: 12px; right: 12px; max-height: min(72dvh, 520px); overflow-y: auto;\n            flex-direction: column; flex-wrap: nowrap; align-items: stretch; justify-content: flex-start;\n            background: var(--bg-elevated); box-shadow: 0 18px 60px rgba(0,0,0,.55); padding: 15px;\n        }\n        .simple-menu-heading { display: flex; align-items: center; justify-content: space-between; font-size: 16px; font-weight: 800; }\n        #btnCloseMenu { background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border-subtle); border-radius: 10px; min-width: 42px; min-height: 42px; font-size: 18px; }\n        .simple-menu-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }\n        .simple-menu-actions button { min-width: 0; min-height: 44px; justify-content: center; white-space: normal; border-radius: 11px; }\n        .simple-menu-actions .text-link-btn { background: var(--bg-card); color: var(--text-primary); font-size: 12px; font-weight: 700; }\n        .setting-group { padding-top: 8px; border-top: 1px solid var(--border-subtle); }\n        .keyboard-bar[hidden] { display: none !important; }\n        .empty-title { font-weight: 800; font-size: 19px; }\n        .empty-subtitle { color: var(--text-muted); font-size: 14px; }\n        .message-more { position: relative; }\n        .message-more summary { cursor: pointer; color: var(--text-secondary); padding: 6px 10px; font-size: 12px; list-style: none; }\n        .message-more summary::-webkit-details-marker { display: none; }\n        .message-more[open] { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }\n        .lang-chip, .pass-lang-btn { min-height: 44px; font-size: 14px; }\n        .mic-btn { min-height: 118px; }\n        @media (max-height: 570px) { .mic-btn { min-height: 86px; padding: 8px; } }\n\n    </style>\n</head>\n<body>\n    <div class=\"app-shell\">\n        <!-- Header -->\n        <header class=\"top-header\">\n            <div class=\"brand-wrap\">\n                <div class=\"brand-logo\" aria-hidden=\"true\">\n                    <svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\"/>\n                        <path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"/>\n                        <line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"22\"/>\n                    </svg>\n                </div>\n                <div class=\"brand-titles\">\n                    <div class=\"brand-title-fa\">\n                        <span>مترجم هوشمند راننده</span>\n                        <span class=\"neural-badge\" id=\"ttsEngineBadge\">آماده</span>\n                    </div>\n                    <div class=\"brand-title-sub\" id=\"headerSubTitle\" dir=\"ltr\">Smart Driver &amp; Passenger Live Translator</div>\n                </div>\n            </div>\n\n            <div class=\"header-actions\">\n                <button class=\"icon-pill\" id=\"btnSettings\" type=\"button\" title=\"تنظیمات صدا، تم و ذخیره فایل\">\n                    ☰ منو\n                </button>\n                <a class=\"icon-pill\" id=\"btnNewTab\" href=\"#\" target=\"_blank\" rel=\"noopener\" style=\"display:none;\" title=\"باز کردن در تب مستقل مرورگر\">\n                    ↗\n                </a>\n            </div>\n        </header>\n\n        <!-- Settings Drawer -->\n        <div class=\"settings-panel\" id=\"settingsPanel\" aria-label=\"منوی امکانات\">\n            <div class=\"simple-menu-heading\">امکانات بیشتر <button type=\"button\" id=\"btnCloseMenu\" aria-label=\"بستن منو\">✕</button></div>\n            <div class=\"simple-menu-actions\">\n                <button class=\"icon-pill\" id=\"btnAutoMode\" type=\"button\" title=\"تغییر بین حالت دستی و گفتگوی خودکار نوبتی\">\n                    <span id=\"autoModeIcon\">👆</span>\n                    <span id=\"autoModeText\">دستی</span>\n                </button>\n                <button class=\"icon-pill\" id=\"btnFaceMode\" type=\"button\" title=\"نمایش کارت روبه‌رو برای مسافر\">\n                    🔄 روبه‌رو\n                </button>\n            <button type=\"button\" class=\"phrases-toggle-btn\" id=\"btnTogglePhrases\">\n                <span>⚡</span>\n                <span>جملات آماده</span>\n            </button>\n                <button type=\"button\" class=\"icon-pill\" id=\"btnToggleKeyboard\">⌨️ تایپ پیام</button>\n                <button type=\"button\" class=\"icon-pill\" id=\"btnShowHistory\">🕘 تاریخچه گفتگو</button>\n                <button type=\"button\" class=\"text-link-btn\" id=\"btnDemoConv\">▶️ تست نمونه مکالمه</button>\n                <button type=\"button\" class=\"text-link-btn\" id=\"btnClearChat\" style=\"display:none;\">🗑️ پاکسازی تاریخچه</button>\n            </div>\n            <div class=\"setting-group\">\n                <span>گوینده:</span>\n                <div class=\"seg-control\">\n                    <button type=\"button\" class=\"seg-btn active\" data-gender=\"female\">زن (دل‌آرا)</button>\n                    <button type=\"button\" class=\"seg-btn\" data-gender=\"male\">مرد (فرید)</button>\n                </div>\n            </div>\n            <div class=\"setting-group\">\n                <span>سرعت:</span>\n                <div class=\"seg-control\">\n                    <button type=\"button\" class=\"seg-btn\" data-rate=\"-15\">آهسته</button>\n                    <button type=\"button\" class=\"seg-btn active\" data-rate=\"0\">عادی</button>\n                    <button type=\"button\" class=\"seg-btn\" data-rate=\"15\">سریع</button>\n                </div>\n            </div>\n            <div class=\"setting-group\">\n                <button type=\"button\" class=\"icon-pill\" id=\"btnThemeToggle\">☀️ روز / شب</button>\n                <button type=\"button\" class=\"icon-pill\" id=\"btnDownloadSelf\">📥 دانلود HTML</button>\n                <span id=\"wakeLockBadge\" style=\"font-size:11px;color:var(--text-muted);\">🔆 صفحه بیدار</span>\n            </div>\n        </div>\n\n        <!-- Language Selector & Quick Phrases Trigger -->\n        <div class=\"control-bar\">\n            <div class=\"lang-switcher\">\n                <div class=\"lang-chip driver-chip\">\n                    <span>🇮🇷</span>\n                    <span>راننده: فارسی</span>\n                </div>\n                <span class=\"lang-swap-icon\" aria-hidden=\"true\">⇄</span>\n                <button type=\"button\" class=\"pass-lang-btn\" id=\"btnOpenLangModal\" title=\"انتخاب زبان مسافر\">\n                    <span class=\"pass-lang-label\" id=\"currentPassLangLabel\">🇬🇧 مسافر: English</span>\n                    <span style=\"font-size:11px;opacity:0.8;\">▼</span>\n                </button>\n            </div>\n\n\n        </div>\n\n        <!-- Face-to-Face Rotatable Banner for Passenger -->\n        <div class=\"face-banner\" id=\"faceBanner\">\n            <div class=\"face-banner-top\">\n                <span>نمایش ویژه مسافر • Passenger Display</span>\n                <button type=\"button\" class=\"mini-flip-btn\" id=\"btnFlipBanner\">🔄 چرخش ۱۸۰°</button>\n            </div>\n            <div class=\"face-banner-text\" id=\"faceBannerText\" dir=\"ltr\">Welcome! Tap the teal button below to speak in English.</div>\n        </div>\n\n        <!-- Quick Taxi Phrases Drawer -->\n        <div class=\"phrases-drawer\" id=\"phrasesDrawer\">\n            <div class=\"phrase-tabs\" id=\"phraseTabs\">\n                <button type=\"button\" class=\"phrase-tab active\" data-cat=\"top\">⭐ پرکاربردترین</button>\n                <button type=\"button\" class=\"phrase-tab\" data-cat=\"start\">👋 شروع سفر</button>\n                <button type=\"button\" class=\"phrase-tab\" data-cat=\"route\">🛣️ مسیر و رفاه</button>\n                <button type=\"button\" class=\"phrase-tab\" data-cat=\"end\">💳 پایان و پرداخت</button>\n            </div>\n            <div class=\"phrase-grid\" id=\"phraseGrid\"></div>\n        </div>\n\n        <!-- Auto Turn-Taking Active Banner -->\n        <div class=\"auto-loop-banner\" id=\"autoLoopBanner\">\n            <span id=\"autoLoopStatusText\">🔁 گفتگوی خودکار فعال است</span>\n            <button type=\"button\" class=\"mini-flip-btn\" id=\"btnStopAutoNow\">⏹ توقف</button>\n        </div>\n\n        <!-- Main Conversation Area -->\n        <main class=\"chat-section\">\n            <div class=\"chat-topbar\">\n                <div class=\"status-indicator\">\n                    <span class=\"status-dot\" id=\"statusDot\"></span>\n                    <span id=\"statusText\">آماده گفتگو</span>\n                </div>\n\n            </div>\n\n            <div class=\"chat-stream\" id=\"chatStream\"></div>\n\n            <!-- Live Speech Recognition Interim Preview -->\n            <div class=\"live-interim-card\" id=\"liveInterimCard\">\n                <div style=\"min-width:0;flex:1;\">\n                    <div id=\"interimSpeakerLabel\" style=\"font-size:11.5px;font-weight:700;color:var(--text-muted);margin-bottom:3px;\">در حال شنیدن...</div>\n                    <div id=\"interimTextContent\" style=\"font-size:15.5px;font-weight:700;color:var(--text-primary);word-break:break-word;\">صحبت کنید...</div>\n                </div>\n                <div class=\"wave-bars\" id=\"interimWaveBars\" style=\"color:var(--driver-primary);\">\n                    <span></span><span></span><span></span><span></span>\n                </div>\n            </div>\n        </main>\n\n        <!-- Manual Text Input Fallback -->\n        <form class=\"keyboard-bar\" id=\"manualForm\" autocomplete=\"off\" hidden>\n            <button type=\"button\" class=\"sender-role-toggle\" id=\"btnToggleSenderRole\">\n                🇮🇷 از طرف: راننده\n            </button>\n            <input\n                type=\"text\"\n                class=\"manual-input\"\n                id=\"manualInput\"\n                placeholder=\"تایپ پیام به فارسی (برای محیط شلوغ یا بدون میکروفون)...\"\n            />\n            <button type=\"submit\" class=\"send-btn\">ترجمه و پخش 🔊</button>\n        </form>\n\n        <!-- Bottom Dual Microphone Dock -->\n        <div class=\"mic-dock\">\n            <button type=\"button\" class=\"mic-btn driver-mic\" id=\"btnMicDriver\">\n                <div class=\"mic-icon-circle\">\n                    <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\"/>\n                        <path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"/>\n                        <line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"22\"/>\n                    </svg>\n                </div>\n                <div class=\"mic-main-title\">راننده • فارسی</div>\n                <div class=\"mic-sub-hint\" id=\"driverBtnHint\">ضربه بزنید و صحبت کنید</div>\n            </button>\n\n            <button type=\"button\" class=\"mic-btn pass-mic\" id=\"btnMicPassenger\" dir=\"ltr\">\n                <div class=\"mic-icon-circle\">\n                    <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\"/>\n                        <path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"/>\n                        <line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"22\"/>\n                    </svg>\n                </div>\n                <div class=\"mic-main-title\" id=\"passBtnTitle\">Passenger • English</div>\n                <div class=\"mic-sub-hint\" id=\"passBtnHint\">Tap to speak</div>\n            </button>\n        </div>\n    </div>\n\n    <!-- Language Picker Modal -->\n    <div class=\"modal-backdrop\" id=\"langModal\">\n        <div class=\"modal-box\">\n            <div class=\"modal-header\">\n                <span>🌍 انتخاب زبان مسافر</span>\n                <button type=\"button\" class=\"icon-pill\" id=\"btnCloseLangModal\">✕ بستن</button>\n            </div>\n            <div class=\"lang-grid\" id=\"langGrid\"></div>\n        </div>\n    </div>\n\n    <!-- Fullscreen Zoom Card Modal -->\n    <div class=\"modal-backdrop\" id=\"zoomModal\">\n        <div class=\"modal-box\" style=\"max-width:600px;\">\n            <div class=\"modal-header\">\n                <span>🔍 نمایش درشت برای مسافر</span>\n                <div style=\"display:flex;gap:6px;\">\n                    <button type=\"button\" class=\"icon-pill\" id=\"btnZoomSpeak\">🔊 پخش</button>\n                    <button type=\"button\" class=\"icon-pill\" id=\"btnZoomRotate\">🔄 ۱۸۰°</button>\n                    <button type=\"button\" class=\"icon-pill\" id=\"btnCloseZoomModal\">✕</button>\n                </div>\n            </div>\n            <div class=\"zoom-card-content\" id=\"zoomCardContent\"></div>\n        </div>\n    </div>\n\n    <!-- Toast -->\n    <div class=\"toast\" id=\"toastBox\"></div>\n\n    <script>\n        (() => {\n            'use strict';\n\n            // Sandbox-safe storage wrappers (works inside sandboxed iframes, file://, and normal tabs)\n            function safeGetLocal(key, fallback) {\n                try {\n                    const val = window.localStorage.getItem(key);\n                    return val !== null ? val : fallback;\n                } catch (_) {\n                    return fallback;\n                }\n            }\n            function safeSetLocal(key, val) {\n                try { window.localStorage.setItem(key, val); } catch (_) {}\n            }\n            function safeGetSession(key) {\n                try { return window.sessionStorage.getItem(key); } catch (_) { return null; }\n            }\n            function safeSetSession(key, val) {\n                try { window.sessionStorage.setItem(key, val); } catch (_) {}\n            }\n            function safeRemoveSession(key) {\n                try { window.sessionStorage.removeItem(key); } catch (_) {}\n            }\n\n            // 1. Supported Passenger Languages\n            const LANGUAGES = {\n                en: {\n                    code: 'en', speechCode: 'en-US', flag: '🇬🇧', nativeName: 'English', faName: 'انگلیسی', dir: 'ltr',\n                    appTitle: 'Smart Driver & Passenger Live Translator', passRole: 'Passenger',\n                    tapHint: 'Tap to speak', listeningHint: 'Listening... Tap to stop',\n                    emptyGuide: 'Tap the teal button below and speak naturally in English.',\n                    welcomeBanner: 'Welcome! Tap the teal button below to speak in English.',\n                    typingPlaceholder: 'Type message in English...'\n                },\n                de: {\n                    code: 'de', speechCode: 'de-DE', flag: '🇩🇪', nativeName: 'Deutsch', faName: 'آلمانی', dir: 'ltr',\n                    appTitle: 'Intelligenter Fahrer- & Fahrgast-Übersetzer', passRole: 'Fahrgast',\n                    tapHint: 'Tippen zum Sprechen', listeningHint: 'Ich höre zu... Tippen zum Stoppen',\n                    emptyGuide: 'Tippen Sie unten auf die türkisfarbene Taste, um auf Deutsch zu sprechen.',\n                    welcomeBanner: 'Willkommen! Tippen Sie unten auf Deutsch, um zu sprechen.',\n                    typingPlaceholder: 'Nachricht auf Deutsch eingeben...'\n                },\n                ar: {\n                    code: 'ar', speechCode: 'ar-SA', flag: '🇸🇦', nativeName: 'العربية', faName: 'عربی', dir: 'rtl',\n                    appTitle: 'المترجم الفوري الذكي للسائق والركاب', passRole: 'المسافر',\n                    tapHint: 'اضغط للتحدث', listeningHint: 'جاري الاستماع... اضغط للإيقاف',\n                    emptyGuide: 'اضغط على الزر الأخضر بالأسفل وتحدث باللغة العربية.',\n                    welcomeBanner: 'أهلاً بك! اضغط على الزر بالأسفل للتحدث بالعربية.',\n                    typingPlaceholder: 'اكتب رسالتك بالعربية...'\n                },\n                tr: {\n                    code: 'tr', speechCode: 'tr-TR', flag: '🇹🇷', nativeName: 'Türkçe', faName: 'ترکی استانبولی', dir: 'ltr',\n                    appTitle: 'Akıllı Sürücü ve Yolcu Çevirmeni', passRole: 'Yolcu',\n                    tapHint: 'Konuşmak için dokunun', listeningHint: 'Dinleniyor... Durdurmak için dokunun',\n                    emptyGuide: 'Türkçe konuşmak için aşağıdaki turkuaz düğmeye dokunun.',\n                    welcomeBanner: 'Hoş geldiniz! Türkçe konuşmak için aşağıdaki düğmeye dokunun.',\n                    typingPlaceholder: 'Türkçe mesaj yazın...'\n                },\n                ru: {\n                    code: 'ru', speechCode: 'ru-RU', flag: '🇷🇺', nativeName: 'Русский', faName: 'روسی', dir: 'ltr',\n                    appTitle: 'Умный переводчик водителя и пассажира', passRole: 'Пассажир',\n                    tapHint: 'Нажмите, чтобы говорить', listeningHint: 'Слушаю... Нажмите для стопа',\n                    emptyGuide: 'Нажмите бирюзовую кнопку внизу и говорите по-русски.',\n                    welcomeBanner: 'Добро пожаловать! Нажмите кнопку внизу, чтобы говорить.',\n                    typingPlaceholder: 'Введите сообщение на русском...'\n                },\n                fr: {\n                    code: 'fr', speechCode: 'fr-FR', flag: '🇫🇷', nativeName: 'Français', faName: 'فرانسوی', dir: 'ltr',\n                    appTitle: 'Traducteur vocal Chauffeur & Passager', passRole: 'Passager',\n                    tapHint: 'Appuyez pour parler', listeningHint: 'Écoute en cours... Appuyez pour arrêter',\n                    emptyGuide: 'Appuyez sur le bouton turquoise ci-dessous pour parler en français.',\n                    welcomeBanner: 'Bienvenue ! Appuyez sur le bouton ci-dessous pour parler.',\n                    typingPlaceholder: 'Écrivez votre message en français...'\n                },\n                es: {\n                    code: 'es', speechCode: 'es-ES', flag: '🇪🇸', nativeName: 'Español', faName: 'اسپانیایی', dir: 'ltr',\n                    appTitle: 'Traductor inteligente Conductor y Pasajero', passRole: 'Pasajero',\n                    tapHint: 'Toque para hablar', listeningHint: 'Escuchando... Toque para detener',\n                    emptyGuide: 'Toque el botón turquesa de abajo para hablar en español.',\n                    welcomeBanner: '¡Bienvenido! Toque el botón de abajo para hablar en español.',\n                    typingPlaceholder: 'Escriba su mensaje en español...'\n                },\n                it: {\n                    code: 'it', speechCode: 'it-IT', flag: '🇮🇹', nativeName: 'Italiano', faName: 'ایتالیایی', dir: 'ltr',\n                    appTitle: 'Traduttore vocale Autista e Passeggero', passRole: 'Passeggero',\n                    tapHint: 'Tocca per parlare', listeningHint: 'In ascolto... Tocca per fermare',\n                    emptyGuide: 'Tocca il pulsante turchese qui sotto per parlare in italiano.',\n                    welcomeBanner: 'Benvenuto! Tocca il pulsante qui sotto per parlare.',\n                    typingPlaceholder: 'Scrivi un messaggio in italiano...'\n                },\n                zh: {\n                    code: 'zh', speechCode: 'zh-CN', flag: '🇨🇳', nativeName: '中文', faName: 'چینی', dir: 'ltr',\n                    appTitle: '智能司机与乘客实时语音翻译', passRole: '乘客',\n                    tapHint: '点击说话', listeningHint: '正在倾听… 点击停止',\n                    emptyGuide: '请点击下方的青色按钮并用中文说话。',\n                    welcomeBanner: '欢迎乘车！请点击下方按钮用中文说话。',\n                    typingPlaceholder: '输入中文消息...'\n                },\n                nl: {\n                    code: 'nl', speechCode: 'nl-NL', flag: '🇳🇱', nativeName: 'Nederlands', faName: 'هلندی', dir: 'ltr',\n                    appTitle: 'Slimme Chauffeur & Passagier Vertaler', passRole: 'Passagier',\n                    tapHint: 'Tik om te spreken', listeningHint: 'Aan het luisteren... Tik om te stoppen',\n                    emptyGuide: 'Tik op de groenblauwe knop hieronder om Nederlands te spreken.',\n                    welcomeBanner: 'Welkom! Tik op de knop hieronder om te spreken.',\n                    typingPlaceholder: 'Typ een bericht in het Nederlands...'\n                }\n            };\n\n            // 2. Complete Offline-Ready Built-in Taxi Quick Phrases (All 10 Languages!)\n            const QUICK_PHRASES = [\n                {\n                    cat: ['top', 'start'],\n                    fa: 'سلام، بسیار خوش آمدید! لطفاً بفرمایید.',\n                    t: {\n                        en: 'Hello, welcome aboard! Please hop in.',\n                        de: 'Hallo, herzlich willkommen! Bitte steigen Sie ein.',\n                        ar: 'أهلاً وسهلاً بك! تفضل بالركوب.',\n                        tr: 'Merhaba, hoş geldiniz! Lütfen buyurun.',\n                        ru: 'Здравствуйте, добро пожаловать! Пожалуйста, садитесь.',\n                        fr: 'Bonjour et bienvenue ! Je vous en prie, montez.',\n                        es: '¡Hola, bienvenido! Por favor, suba.',\n                        it: 'Ciao, benvenuto a bordo! Prego, salga pure.',\n                        zh: '您好，欢迎乘车！请上车。',\n                        nl: 'Hallo, van harte welkom! Stapt u alstublieft in.'\n                    }\n                },\n                {\n                    cat: ['top', 'start'],\n                    fa: 'لطفاً کمربند ایمنی خود را ببندید.',\n                    t: {\n                        en: 'Please fasten your seatbelt.',\n                        de: 'Bitte schnallen Sie sich an.',\n                        ar: 'يرجى ربط حزام الأمان من فضلك.',\n                        tr: 'Lütfen emniyet kemerinizi bağlayın.',\n                        ru: 'Пожалуйста, пристегните ремень безопасности.',\n                        fr: 'Veuillez attacher votre ceinture de sécurité, s’il vous plaît.',\n                        es: 'Por favor, abróchese el cinturón de seguridad.',\n                        it: 'Per favore, allacci la cintura di sicurezza.',\n                        zh: '请系好您的安全带。',\n                        nl: 'Doe alstublieft uw veiligheidsgordel om.'\n                    }\n                },\n                {\n                    cat: ['top', 'start'],\n                    fa: 'آیا مقصد ثبت‌شده روی نقشه درست است؟',\n                    t: {\n                        en: 'Is the destination shown on the map correct?',\n                        de: 'Ist das auf der Karte angezeigte Ziel richtig?',\n                        ar: 'هل الوجهة المحددة على الخريطة صحيحة؟',\n                        tr: 'Haritada görünen varış noktası doğru mu?',\n                        ru: 'Адрес назначения на карте указан верно?',\n                        fr: 'La destination indiquée sur la carte est-elle correcte ?',\n                        es: '¿Es correcto el destino que aparece en el mapa?',\n                        it: 'La destinazione mostrata sulla mappa è corretta?',\n                        zh: '地图上显示的目的地正确吗？',\n                        nl: 'Klopt de bestemming op de kaart?'\n                    }\n                },\n                {\n                    cat: ['start'],\n                    fa: 'اجازه بدهید چمدان‌هایتان را در صندوق عقب بگذارم.',\n                    t: {\n                        en: 'Let me put your luggage in the trunk.',\n                        de: 'Lassen Sie mich Ihr Gepäck in den Kofferraum legen.',\n                        ar: 'دعني أضع حقائبك في صندوق السيارة.',\n                        tr: 'Bavullarınızı bagaja koymama izin verin.',\n                        ru: 'Давайте я положу ваш багаж в багажник.',\n                        fr: 'Laissez-moi mettre vos bagages dans le coffre.',\n                        es: 'Permítame guardar su equipaje en el maletero.',\n                        it: 'Mi lasci mettere i suoi bagagli nel bagagliaio.',\n                        zh: '让我把您的行李放进后备箱吧。',\n                        nl: 'Laat mij uw bagage in de kofferbak leggen.'\n                    }\n                },\n                {\n                    cat: ['start'],\n                    fa: 'لطفاً در این برنامه به زبان خودتان صحبت کنید تا برایم ترجمه شود.',\n                    t: {\n                        en: 'Please speak in your language into this app so it translates for me.',\n                        de: 'Bitte sprechen Sie in Ihrer Sprache in diese App, damit sie für mich übersetzt.',\n                        ar: 'يرجى التحدث بلغتك في هذا التطبيق ليقوم بالترجمة لي.',\n                        tr: 'Lütfen bu uygulamaya kendi dilinizde konuşun, benim için çevirecektir.',\n                        ru: 'Пожалуйста, говорите на своём языке в это приложение, оно переведёт мне.',\n                        fr: 'Veuillez parler dans votre langue dans cette application pour qu’elle traduise.',\n                        es: 'Por favor, hable en su idioma en esta aplicación para que me traduzca.',\n                        it: 'Per favore parli nella sua lingua in questa app così tradurrà per me.',\n                        zh: '请对着这个应用说您的语言，它会帮我翻译。',\n                        nl: 'Spreek alstublieft in uw eigen taal in deze app, zodat het voor mij vertaalt.'\n                    }\n                },\n                {\n                    cat: ['top', 'route'],\n                    fa: 'آیا دمای داخل خودرو و کولر یا بخاری برایتان مناسب است؟',\n                    t: {\n                        en: 'Is the car temperature and AC comfortable for you?',\n                        de: 'Ist die Temperatur und Klimaanlage im Auto angenehm für Sie?',\n                        ar: 'هل درجة حرارة السيارة والتكييف مناسبة لك؟',\n                        tr: 'Araç içi sıcaklık ve klima sizin için uygun mu?',\n                        ru: 'Вам комфортна температура и кондиционер в салоне?',\n                        fr: 'La température et la climatisation vous conviennent-elles ?',\n                        es: '¿Está bien la temperatura y el aire acondicionado para usted?',\n                        it: 'La temperatura e l’aria condizionata sono confortevoli per lei?',\n                        zh: '车内的温度和空调对您来说合适吗？',\n                        nl: 'Is de temperatuur en airconditioning in de auto aangenaam voor u?'\n                    }\n                },\n                {\n                    cat: ['route'],\n                    fa: 'در مسیر ترافیک است، ممکن است چند دقیقه دیرتر برسیم.',\n                    t: {\n                        en: 'There is heavy traffic ahead; we might arrive a few minutes later.',\n                        de: 'Vor uns ist dichter Verkehr; wir kommen eventuell ein paar Minuten später an.',\n                        ar: 'يوجد ازدحام مروري في الطريق، قد نصل متأخرين بضع دقائق.',\n                        tr: 'İleride trafik yoğun, birkaç dakika geç varabiliriz.',\n                        ru: 'Впереди пробка, мы можем приехать на несколько минут позже.',\n                        fr: 'Il y a des embouteillages devant nous, nous arriverons quelques minutes plus tard.',\n                        es: 'Hay tráfico más adelante, podríamos llegar unos minutos más tarde.',\n                        it: 'C’è traffico più avanti, potremmo arrivare con qualche minuto di ritardo.',\n                        zh: '前方交通拥堵，我们可能会晚几分钟到达。',\n                        nl: 'Er staat file verderop; we komen mogelijk een paar minuten later aan.'\n                    }\n                },\n                {\n                    cat: ['route'],\n                    fa: 'آیا عجله دارید یا باید به پرواز برسید؟',\n                    t: {\n                        en: 'Are you in a hurry or catching a flight?',\n                        de: 'Haben Sie es eilig oder müssen Sie einen Flug erreichen?',\n                        ar: 'هل أنت في عجلة من أمرك أم لديك رحلة طيران؟',\n                        tr: 'Aceleniz var mı veya uçağa mı yetişeceksiniz?',\n                        ru: 'Вы торопитесь или опаздываете на рейс?',\n                        fr: 'Êtes-vous pressé ou devez-vous prendre un vol ?',\n                        es: '¿Tiene prisa o tiene que tomar un vuelo?',\n                        it: 'Ha fretta o deve prendere un volo?',\n                        zh: '您赶时间还是要赶飞机？',\n                        nl: 'Heeft u haast of moet u een vlucht halen?'\n                    }\n                },\n                {\n                    cat: ['top', 'end'],\n                    fa: 'دقیقاً کجا برایتان نگه دارم تا راحت پیاده شوید؟',\n                    t: {\n                        en: 'Where exactly would you like me to pull over for you?',\n                        de: 'Wo genau soll ich für Sie anhalten?',\n                        ar: 'أين تفضل أن أتوقف بالضبط لتنزل براحتك؟',\n                        tr: 'İnmeniz için tam olarak nerede durmamı istersiniz?',\n                        ru: 'Где именно вам удобнее, чтобы я остановился?',\n                        fr: 'Où souhaitez-vous exactement que je m’arrête ?',\n                        es: '¿Dónde exactamente prefiere que me detenga?',\n                        it: 'Dove preferisce esattamente che mi fermi per farla scendere?',\n                        zh: '您希望我在哪里停车方便您下车？',\n                        nl: 'Waar zal ik precies voor u stoppen om uit te stappen?'\n                    }\n                },\n                {\n                    cat: ['top', 'end'],\n                    fa: 'به مقصد رسیدیم.',\n                    t: {\n                        en: 'We have arrived at your destination.',\n                        de: 'Wir haben Ihr Ziel erreicht.',\n                        ar: 'لقد وصلنا إلى وجهتك.',\n                        tr: 'Varış noktanıza ulaştık.',\n                        ru: 'Мы прибыли в пункт назначения.',\n                        fr: 'Nous sommes arrivés à votre destination.',\n                        es: 'Hemos llegado a su destino.',\n                        it: 'Siamo arrivati a destinazione.',\n                        zh: '我们已经到达您的目的地。',\n                        nl: 'We zijn aangekomen op uw bestemming.'\n                    }\n                },\n                {\n                    cat: ['top', 'end'],\n                    fa: 'پرداخت را نقدی انجام می‌دهید یا با کارت؟',\n                    t: {\n                        en: 'Would you like to pay by cash or card?',\n                        de: 'Möchten Sie bar oder mit Karte bezahlen?',\n                        ar: 'هل تفضل الدفع نقداً أم بالبطاقة؟',\n                        tr: 'Ödemeyi nakit mi yoksa kartla mı yapmak istersiniz?',\n                        ru: 'Вы хотите оплатить наличными или картой?',\n                        fr: 'Souhaitez-vous payer en espèces ou par carte ?',\n                        es: '¿Desea pagar en efectivo o con tarjeta?',\n                        it: 'Preferisce pagare in contanti o con carta?',\n                        zh: '您想用现金还是刷卡支付？',\n                        nl: 'Wilt u contant of met pin/kaart betalen?'\n                    }\n                },\n                {\n                    cat: ['end'],\n                    fa: 'لطفاً صندلی را چک کنید تا وسایل شخصی‌تان جا نماند. روز خوش!',\n                    t: {\n                        en: 'Please check your seat for personal belongings. Have a wonderful day!',\n                        de: 'Bitte prüfen Sie Ihren Sitz auf persönliche Gegenstände. Einen schönen Tag noch!',\n                        ar: 'يرجى التأكد من عدم نسيان متعلقاتك الشخصية. أتمنى لك يوماً سعيداً!',\n                        tr: 'Lütfen özel eşyalarınızı unutmayın. İyi günler dilerim!',\n                        ru: 'Пожалуйста, проверьте, не забыли ли вы личные вещи. Хорошего дня!',\n                        fr: 'Veuillez vérifier que vous n’avez rien oublié. Excellente journée !',\n                        es: 'Por favor revise que no olvide sus pertenencias. ¡Que tenga un buen día!',\n                        it: 'Controlli di non aver dimenticato oggetti personali. Buona giornata!',\n                        zh: '请检查随身物品以免遗落。祝您有美好的一天！',\n                        nl: 'Controleer alstublieft of u geen persoonlijke spullen vergeet. Fijne dag!'\n                    }\n                }\n            ];\n\n            // 3. State\n            const state = {\n                passLang: safeGetLocal('dt_pass_lang', 'en'),\n                autoMode: false,\n                autoRunning: false,\n                nextAutoSpeaker: 'driver',\n                silentAutoCount: 0,\n                faceMode: false,\n                faceFlipped: false,\n                voiceGender: safeGetLocal('dt_gender', 'female'),\n                voiceRate: parseInt(safeGetLocal('dt_rate', '0'), 10) || 0,\n                theme: safeGetLocal('dt_theme', 'dark'),\n                manualRole: 'driver',\n                activePhraseCat: 'top',\n                isListening: false,\n                listeningRole: null,\n                isSpeaking: false,\n                backendAvailable: false,\n                messages: [],\n                showHistory: false,\n                zoomPayload: null,\n                zoomRotated: false\n            };\n\n            if (!LANGUAGES[state.passLang]) state.passLang = 'en';\n\n            try {\n                const savedMsgs = safeGetSession('dt_messages_v2');\n                if (savedMsgs) state.messages = JSON.parse(savedMsgs) || [];\n            } catch (_) {}\n\n            // DOM Elements\n            const el = {\n                headerSubTitle: document.getElementById('headerSubTitle'),\n                ttsEngineBadge: document.getElementById('ttsEngineBadge'),\n                btnAutoMode: document.getElementById('btnAutoMode'),\n                autoModeIcon: document.getElementById('autoModeIcon'),\n                autoModeText: document.getElementById('autoModeText'),\n                btnFaceMode: document.getElementById('btnFaceMode'),\n                btnSettings: document.getElementById('btnSettings'),\n                btnNewTab: document.getElementById('btnNewTab'),\n                settingsPanel: document.getElementById('settingsPanel'),\n                btnThemeToggle: document.getElementById('btnThemeToggle'),\n                btnDownloadSelf: document.getElementById('btnDownloadSelf'),\n                wakeLockBadge: document.getElementById('wakeLockBadge'),\n                btnOpenLangModal: document.getElementById('btnOpenLangModal'),\n                currentPassLangLabel: document.getElementById('currentPassLangLabel'),\n                btnTogglePhrases: document.getElementById('btnTogglePhrases'),\n                phrasesDrawer: document.getElementById('phrasesDrawer'),\n                phraseTabs: document.getElementById('phraseTabs'),\n                phraseGrid: document.getElementById('phraseGrid'),\n                faceBanner: document.getElementById('faceBanner'),\n                faceBannerText: document.getElementById('faceBannerText'),\n                btnFlipBanner: document.getElementById('btnFlipBanner'),\n                autoLoopBanner: document.getElementById('autoLoopBanner'),\n                autoLoopStatusText: document.getElementById('autoLoopStatusText'),\n                btnStopAutoNow: document.getElementById('btnStopAutoNow'),\n                statusDot: document.getElementById('statusDot'),\n                statusText: document.getElementById('statusText'),\n                btnDemoConv: document.getElementById('btnDemoConv'),\n                btnClearChat: document.getElementById('btnClearChat'),\n                chatStream: document.getElementById('chatStream'),\n                liveInterimCard: document.getElementById('liveInterimCard'),\n                interimSpeakerLabel: document.getElementById('interimSpeakerLabel'),\n                interimTextContent: document.getElementById('interimTextContent'),\n                interimWaveBars: document.getElementById('interimWaveBars'),\n                manualForm: document.getElementById('manualForm'),\n                btnToggleSenderRole: document.getElementById('btnToggleSenderRole'),\n                manualInput: document.getElementById('manualInput'),\n                btnMicDriver: document.getElementById('btnMicDriver'),\n                driverBtnHint: document.getElementById('driverBtnHint'),\n                btnMicPassenger: document.getElementById('btnMicPassenger'),\n                passBtnTitle: document.getElementById('passBtnTitle'),\n                passBtnHint: document.getElementById('passBtnHint'),\n                langModal: document.getElementById('langModal'),\n                langGrid: document.getElementById('langGrid'),\n                btnCloseLangModal: document.getElementById('btnCloseLangModal'),\n                zoomModal: document.getElementById('zoomModal'),\n                zoomCardContent: document.getElementById('zoomCardContent'),\n                btnZoomSpeak: document.getElementById('btnZoomSpeak'),\n                btnZoomRotate: document.getElementById('btnZoomRotate'),\n                btnCloseZoomModal: document.getElementById('btnCloseZoomModal'),\n                toastBox: document.getElementById('toastBox')\n            };\n\n            // Show \"Open in New Tab\" only if running on http/https inside an iframe\n            try {\n                if (location.protocol.startsWith('http') && window.self !== window.top) {\n                    el.btnNewTab.href = window.location.href;\n                    el.btnNewTab.style.display = 'inline-flex';\n                }\n            } catch (_) {}\n\n            // 4. Web Audio Chimes & Reusable Audio Element\n            let audioCtx = null;\n            const ttsPlayer = new Audio();\n            ttsPlayer.preload = 'auto';\n            let currentBlobUrl = null;\n\n            function unlockAudioOnGesture() {\n                try {\n                    const Ctx = window.AudioContext || window.webkitAudioContext;\n                    if (Ctx && !audioCtx) audioCtx = new Ctx();\n                    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();\n                } catch (_) {}\n            }\n\n            function playChime(type) {\n                try {\n                    if (!audioCtx) return;\n                    const now = audioCtx.currentTime;\n                    const osc = audioCtx.createOscillator();\n                    const gain = audioCtx.createGain();\n                    osc.connect(gain);\n                    gain.connect(audioCtx.destination);\n                    if (type === 'start') {\n                        osc.type = 'sine';\n                        osc.frequency.setValueAtTime(520, now);\n                        osc.frequency.exponentialRampToValueAtTime(760, now + 0.11);\n                        gain.gain.setValueAtTime(0.08, now);\n                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);\n                        osc.start(now);\n                        osc.stop(now + 0.15);\n                    } else if (type === 'done') {\n                        osc.type = 'sine';\n                        osc.frequency.setValueAtTime(680, now);\n                        osc.frequency.exponentialRampToValueAtTime(520, now + 0.1);\n                        gain.gain.setValueAtTime(0.06, now);\n                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);\n                        osc.start(now);\n                        osc.stop(now + 0.13);\n                    } else if (type === 'error') {\n                        osc.type = 'triangle';\n                        osc.frequency.setValueAtTime(280, now);\n                        osc.frequency.linearRampToValueAtTime(210, now + 0.18);\n                        gain.gain.setValueAtTime(0.09, now);\n                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);\n                        osc.start(now);\n                        osc.stop(now + 0.21);\n                    }\n                } catch (_) {}\n            }\n\n            // 5. Screen Wake Lock\n            let wakeLockSentinel = null;\n            async function requestWakeLock() {\n                if (!('wakeLock' in navigator)) return;\n                try {\n                    wakeLockSentinel = await navigator.wakeLock.request('screen');\n                    el.wakeLockBadge.textContent = '🔆 صفحه همیشه روشن';\n                } catch (_) {}\n            }\n            document.addEventListener('visibilitychange', () => {\n                if (document.visibilityState === 'visible' && wakeLockSentinel !== null) requestWakeLock();\n            });\n\n            // 6. Toast\n            let toastTimer = null;\n            function showToast(msg) {\n                el.toastBox.textContent = msg;\n                el.toastBox.classList.add('show');\n                clearTimeout(toastTimer);\n                toastTimer = setTimeout(() => el.toastBox.classList.remove('show'), 2900);\n            }\n\n            // 7. Backend Health Probe\n            async function checkBackendHealth() {\n                if (!location.protocol.startsWith('http')) {\n                    el.ttsEngineBadge.textContent = 'نسخه مستقل همراه';\n                    return;\n                }\n                try {\n                    const controller = new AbortController();\n                    const timer = setTimeout(() => controller.abort(), 2500);\n                    const res = await fetch('api/health', { signal: controller.signal });\n                    clearTimeout(timer);\n                    if (res.ok) {\n                        const data = await res.json();\n                        state.backendAvailable = Boolean(data && data.ok);\n                        if (data.neural_tts) el.ttsEngineBadge.textContent = 'صدای طبیعی فارسی فعال';\n                    }\n                } catch (_) {\n                    state.backendAvailable = false;\n                    el.ttsEngineBadge.textContent = 'آماده به کار';\n                }\n            }\n\n            // 8. Multi-Engine Resilient Translation\n            function decodeEntities(str) {\n                const txt = document.createElement('textarea');\n                txt.innerHTML = str;\n                return txt.value;\n            }\n\n            async function translateText(text, fromLang, toLang) {\n                const clean = (text || '').trim();\n                if (!clean) return '';\n                if (fromLang === toLang) return clean;\n\n                // Layer 1: Local Server Proxy (/api/translate)\n                if (state.backendAvailable || location.protocol.startsWith('http')) {\n                    try {\n                        const res = await fetch(`api/translate?from=${encodeURIComponent(fromLang)}&to=${encodeURIComponent(toLang)}&q=${encodeURIComponent(clean)}`);\n                        if (res.ok) {\n                            const data = await res.json();\n                            if (data && data.ok && data.translatedText) {\n                                state.backendAvailable = true;\n                                return data.translatedText.trim();\n                            }\n                        }\n                    } catch (_) {}\n                }\n\n                // Layer 2: Direct Google Chrome Dict Endpoint\n                try {\n                    const u1 = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${encodeURIComponent(fromLang)}&tl=${encodeURIComponent(toLang)}&q=${encodeURIComponent(clean)}`;\n                    const r1 = await fetch(u1);\n                    if (r1.ok) {\n                        const d1 = await r1.json();\n                        let out = '';\n                        if (typeof d1 === 'string') out = d1;\n                        else if (Array.isArray(d1)) {\n                            out = d1.map(item => Array.isArray(item) ? item[0] : item).filter(Boolean).join(' ');\n                        }\n                        if (out && out.trim()) return decodeEntities(out.trim());\n                    }\n                } catch (_) {}\n\n                // Layer 3: Google GTX Endpoint\n                try {\n                    const u2 = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(fromLang)}&tl=${encodeURIComponent(toLang)}&dt=t&q=${encodeURIComponent(clean)}`;\n                    const r2 = await fetch(u2);\n                    if (r2.ok) {\n                        const d2 = await r2.json();\n                        if (Array.isArray(d2) && Array.isArray(d2[0])) {\n                            const out = d2[0].map(seg => seg && seg[0] ? seg[0] : '').join('').trim();\n                            if (out) return decodeEntities(out);\n                        }\n                    }\n                } catch (_) {}\n\n                // Layer 4: Validated MyMemory Fallback\n                try {\n                    const u3 = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=${encodeURIComponent(fromLang)}|${encodeURIComponent(toLang)}`;\n                    const r3 = await fetch(u3);\n                    if (r3.ok) {\n                        const d3 = await r3.json();\n                        const candidate = ((d3 && d3.responseData && d3.responseData.translatedText) || '').trim();\n                        const upper = candidate.toUpperCase();\n                        if (\n                            Number(d3.responseStatus) === 200 &&\n                            !d3.quotaFinished &&\n                            candidate &&\n                            !upper.includes('MYMEMORY WARNING') &&\n                            !upper.includes('YOU USED ALL AVAILABLE')\n                        ) {\n                            return decodeEntities(candidate);\n                        }\n                    }\n                } catch (_) {}\n\n                throw new Error('TRANSLATE_FAILED');\n            }\n\n            // 9. Speech Output (Neural Backend TTS -> Browser SpeechSynthesis -> Online Audio TTS Fallback)\n            function stopSpeaking() {\n                state.isSpeaking = false;\n                try {\n                    ttsPlayer.pause();\n                    ttsPlayer.currentTime = 0;\n                } catch (_) {}\n                if (currentBlobUrl) {\n                    URL.revokeObjectURL(currentBlobUrl);\n                    currentBlobUrl = null;\n                }\n                if ('speechSynthesis' in window) {\n                    try { window.speechSynthesis.cancel(); } catch (_) {}\n                }\n                updateStatusUI();\n            }\n\n            async function speakText(text, langCode) {\n                const clean = (text || '').trim();\n                if (!clean) return;\n\n                stopSpeaking();\n                state.isSpeaking = true;\n                updateStatusUI('در حال پخش صدای ترجمه...');\n\n                const shortLang = langCode.split('-')[0].toLowerCase();\n\n                // Strategy 1: Neural Edge-TTS via /api/tts when connected to backend\n                if (state.backendAvailable || location.protocol.startsWith('http')) {\n                    try {\n                        const ttsUrl = `api/tts?lang=${encodeURIComponent(shortLang)}&gender=${encodeURIComponent(state.voiceGender)}&rate=${encodeURIComponent(state.voiceRate)}&q=${encodeURIComponent(clean)}`;\n                        const resp = await fetch(ttsUrl);\n                        if (resp.ok && (resp.headers.get('content-type') || '').includes('audio')) {\n                            const blob = await resp.blob();\n                            if (blob.size > 200) {\n                                state.backendAvailable = true;\n                                await new Promise((resolve) => {\n                                    currentBlobUrl = URL.createObjectURL(blob);\n                                    ttsPlayer.src = currentBlobUrl;\n                                    ttsPlayer.onended = () => resolve();\n                                    ttsPlayer.onerror = () => resolve();\n                                    const p = ttsPlayer.play();\n                                    if (p && typeof p.catch === 'function') p.catch(() => resolve());\n                                });\n                                state.isSpeaking = false;\n                                updateStatusUI();\n                                return;\n                            }\n                        }\n                    } catch (_) {}\n                }\n\n                // Strategy 2: Browser Native SpeechSynthesis (if matching voice exists)\n                let spokenByBrowser = false;\n                if ('speechSynthesis' in window) {\n                    const voices = window.speechSynthesis.getVoices() || [];\n                    const fullBcp = shortLang === 'fa' ? 'fa-IR' : (LANGUAGES[shortLang]?.speechCode || langCode);\n                    const matchedVoice =\n                        voices.find(v => v.lang.toLowerCase() === fullBcp.toLowerCase()) ||\n                        voices.find(v => v.lang.toLowerCase().startsWith(shortLang));\n\n                    if (matchedVoice || (shortLang !== 'fa' && voices.length === 0)) {\n                        spokenByBrowser = await new Promise((resolve) => {\n                            try {\n                                window.speechSynthesis.cancel();\n                                const utterance = new SpeechSynthesisUtterance(clean);\n                                utterance.lang = fullBcp;\n                                utterance.rate = state.voiceRate < 0 ? 0.86 : state.voiceRate > 0 ? 1.14 : 1.0;\n                                if (matchedVoice) utterance.voice = matchedVoice;\n\n                                const safety = setTimeout(() => resolve(true), Math.max(4000, clean.length * 130));\n                                utterance.onend = () => { clearTimeout(safety); resolve(true); };\n                                utterance.onerror = () => { clearTimeout(safety); resolve(false); };\n                                window.speechSynthesis.speak(utterance);\n                            } catch (_) {\n                                resolve(false);\n                            }\n                        });\n                    }\n                }\n\n                // Strategy 3: Online Audio TTS Fallback for Passenger Languages in Standalone HTML\n                if (!spokenByBrowser && shortLang !== 'fa' && clean.length <= 200) {\n                    try {\n                        await new Promise((resolve) => {\n                            ttsPlayer.referrerPolicy = 'no-referrer';\n                            ttsPlayer.src = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(clean)}&tl=${encodeURIComponent(shortLang)}&client=tw-ob`;\n                            const safety = setTimeout(() => resolve(), 6000);\n                            ttsPlayer.onended = () => { clearTimeout(safety); resolve(); };\n                            ttsPlayer.onerror = () => { clearTimeout(safety); resolve(); };\n                            const p = ttsPlayer.play();\n                            if (p && typeof p.catch === 'function') p.catch(() => { clearTimeout(safety); resolve(); });\n                        });\n                    } catch (_) {}\n                }\n\n                state.isSpeaking = false;\n                updateStatusUI();\n            }\n\n            // 10. Managed Speech Recognition\n            let activeRecognition = null;\n            let autoTurnTimeout = null;\n\n            function stopListening(cancelAuto = false) {\n                clearTimeout(autoTurnTimeout);\n                if (cancelAuto) {\n                    state.autoRunning = false;\n                    state.silentAutoCount = 0;\n                    renderAutoBanner();\n                }\n                if (activeRecognition) {\n                    try { activeRecognition.onend = null; activeRecognition.abort(); } catch (_) {}\n                    activeRecognition = null;\n                }\n                state.isListening = false;\n                state.listeningRole = null;\n                el.liveInterimCard.classList.remove('visible', 'pass-mode');\n                renderMicButtons();\n                updateStatusUI();\n            }\n\n            function startListeningForRole(role) {\n                unlockAudioOnGesture();\n                requestWakeLock();\n\n                if (state.isListening && state.listeningRole === role) {\n                    playChime('done');\n                    stopListening(true);\n                    return;\n                }\n\n                stopSpeaking();\n                stopListening(false);\n\n                const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;\n                if (!SpeechRec) {\n                    playChime('error');\n                    showToast('مرورگر فعلی از میکروفون پشتیبانی نمی‌کند؛ فایل را در کروم/سافاری باز کنید یا پیام را تایپ کنید.');\n                    el.manualInput.focus();\n                    return;\n                }\n\n                const passInfo = LANGUAGES[state.passLang];\n                const recLang = role === 'driver' ? 'fa-IR' : passInfo.speechCode;\n\n                const recognition = new SpeechRec();\n                activeRecognition = recognition;\n                recognition.lang = recLang;\n                recognition.continuous = false;\n                recognition.interimResults = true;\n                recognition.maxAlternatives = 1;\n\n                state.isListening = true;\n                state.listeningRole = role;\n                if (state.autoMode) {\n                    state.autoRunning = true;\n                    state.nextAutoSpeaker = role;\n                    renderAutoBanner();\n                }\n\n                el.liveInterimCard.classList.add('visible');\n                el.liveInterimCard.classList.toggle('pass-mode', role === 'passenger');\n                el.interimWaveBars.style.color = role === 'driver' ? 'var(--driver-primary)' : 'var(--pass-primary)';\n                el.interimSpeakerLabel.textContent = role === 'driver'\n                    ? '🎙️ در حال شنیدن صدای راننده (فارسی)...'\n                    : `🎙️ ${passInfo.passRole} (${passInfo.nativeName}) — ${passInfo.listeningHint}`;\n                el.interimTextContent.textContent = role === 'driver' ? 'بفرمایید، صحبت کنید...' : '...';\n                el.interimTextContent.dir = role === 'driver' ? 'rtl' : passInfo.dir;\n\n                renderMicButtons();\n                updateStatusUI(role === 'driver' ? 'در حال گوش دادن به راننده...' : `در حال گوش دادن به مسافر (${passInfo.faName})...`);\n                playChime('start');\n\n                let finalTranscript = '';\n                let handledResult = false;\n\n                recognition.onresult = (event) => {\n                    let interim = '';\n                    for (let i = event.resultIndex; i < event.results.length; i++) {\n                        const txt = event.results[i][0].transcript;\n                        if (event.results[i].isFinal) finalTranscript += txt + ' ';\n                        else interim += txt;\n                    }\n                    const preview = (finalTranscript + interim).trim();\n                    if (preview) el.interimTextContent.textContent = preview;\n                };\n\n                recognition.onerror = (event) => {\n                    const err = event.error;\n                    if (err === 'aborted') return;\n\n                    playChime('error');\n                    state.isListening = false;\n                    state.listeningRole = null;\n                    el.liveInterimCard.classList.remove('visible', 'pass-mode');\n                    renderMicButtons();\n\n                    if (err === 'not-allowed' || err === 'service-not-allowed') {\n                        state.autoRunning = false;\n                        renderAutoBanner();\n                        showToast('میکروفون در دسترس نیست. برنامه را از طریق HTTPS باز کنید و در تنظیمات کروم مجوز میکروفون بدهید.');\n                        updateStatusUI('نیاز به مجوز میکروفون');\n                    } else if (err === 'no-speech') {\n                        showToast('صدایی دریافت نشد.');\n                        updateStatusUI('صدایی شنیده نشد');\n                        if (state.autoMode && state.autoRunning) {\n                            state.silentAutoCount += 1;\n                            if (state.silentAutoCount >= 2) {\n                                state.autoRunning = false;\n                                state.silentAutoCount = 0;\n                                renderAutoBanner();\n                                showToast('گفتگوی خودکار به دلیل سکوت متوقف شد.');\n                            }\n                        }\n                    } else {\n                        state.autoRunning = false;\n                        renderAutoBanner();\n                        showToast('خطا در دریافت صدا: ' + err);\n                        updateStatusUI('آماده گفتگو');\n                    }\n                };\n\n                recognition.onend = async () => {\n                    if (activeRecognition !== recognition) return;\n                    activeRecognition = null;\n                    state.isListening = false;\n                    state.listeningRole = null;\n                    el.liveInterimCard.classList.remove('visible', 'pass-mode');\n                    renderMicButtons();\n\n                    const spoken = finalTranscript.trim();\n                    if (spoken && !handledResult) {\n                        handledResult = true;\n                        state.silentAutoCount = 0;\n                        playChime('done');\n                        await processUtterance(role, spoken);\n\n                        if (state.autoMode && state.autoRunning) {\n                            const nextRole = role === 'driver' ? 'passenger' : 'driver';\n                            state.nextAutoSpeaker = nextRole;\n                            renderAutoBanner();\n                            autoTurnTimeout = setTimeout(() => {\n                                if (state.autoMode && state.autoRunning && !state.isSpeaking) {\n                                    startListeningForRole(nextRole);\n                                }\n                            }, 500);\n                        }\n                    } else {\n                        updateStatusUI();\n                    }\n                };\n\n                try {\n                    recognition.start();\n                } catch (_) {\n                    stopListening(true);\n                    showToast('امکان شروع میکروفون نبود؛ دوباره تلاش کنید.');\n                }\n            }\n\n            // 11. Process Utterance -> Translate -> Append -> Speak\n            async function processUtterance(role, rawText, fallbackTranslation = null) {\n                const text = (rawText || '').trim();\n                if (!text) return;\n\n                const passInfo = LANGUAGES[state.passLang];\n                const fromLang = role === 'driver' ? 'fa' : passInfo.code;\n                const toLang = role === 'driver' ? passInfo.code : 'fa';\n\n                updateStatusUI('در حال ترجمه هوشمند...');\n\n                let translated = null;\n                if (fallbackTranslation && !navigator.onLine) {\n                    translated = fallbackTranslation;\n                } else {\n                    try {\n                        translated = await translateText(text, fromLang, toLang);\n                    } catch (_) {\n                        if (fallbackTranslation) {\n                            translated = fallbackTranslation;\n                        } else {\n                            playChime('error');\n                            showToast('در پیش‌نمایش آفلاین اینترنت مسدود است؛ فایل HTML را دانلود و در مرورگر باز کنید.');\n                            updateStatusUI('نیاز به اتصال اینترنت');\n                            return;\n                        }\n                    }\n                }\n\n                const msgObj = {\n                    id: Date.now() + Math.random().toString(36).slice(2, 6),\n                    role,\n                    fromLang,\n                    toLang,\n                    original: text,\n                    translated,\n                    passLangSnapshot: passInfo.code,\n                    time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })\n                };\n\n                state.showHistory = false;\n                state.messages.push(msgObj);\n                if (state.messages.length > 60) state.messages.shift();\n                safeSetSession('dt_messages_v2', JSON.stringify(state.messages));\n\n                if (role === 'driver') {\n                    el.faceBannerText.textContent = translated;\n                    el.faceBannerText.dir = passInfo.dir;\n                } else {\n                    el.faceBannerText.textContent = text;\n                    el.faceBannerText.dir = passInfo.dir;\n                }\n\n                renderChat();\n                await speakText(translated, toLang);\n            }\n\n            // 12. Rendering\n            function updateStatusUI(customText) {\n                el.statusDot.classList.remove('listening', 'speaking');\n                if (state.isListening) {\n                    el.statusDot.classList.add('listening');\n                    el.statusText.textContent = customText || 'در حال شنیدن...';\n                } else if (state.isSpeaking) {\n                    el.statusDot.classList.add('speaking');\n                    el.statusText.textContent = customText || 'در حال پخش صدا...';\n                } else {\n                    el.statusText.textContent = customText || 'آماده گفتگو';\n                }\n            }\n\n            function renderLanguageUI() {\n                const info = LANGUAGES[state.passLang];\n                el.headerSubTitle.textContent = info.appTitle;\n                el.headerSubTitle.dir = info.dir;\n                el.currentPassLangLabel.textContent = `${info.flag} مسافر: ${info.nativeName} (${info.faName})`;\n                el.passBtnTitle.textContent = `${info.passRole} • ${info.nativeName}`;\n                el.btnMicPassenger.dir = info.dir;\n\n                if (state.messages.length === 0) {\n                    el.faceBannerText.textContent = info.welcomeBanner;\n                    el.faceBannerText.dir = info.dir;\n                }\n\n                updateManualRoleUI();\n                renderMicButtons();\n                renderChat();\n            }\n\n            function renderMicButtons() {\n                const info = LANGUAGES[state.passLang];\n                const driverActive = state.isListening && state.listeningRole === 'driver';\n                const passActive = state.isListening && state.listeningRole === 'passenger';\n\n                el.btnMicDriver.classList.toggle('listening', driverActive);\n                el.driverBtnHint.textContent = driverActive ? 'در حال شنیدن... (توقف)' : 'ضربه بزنید و صحبت کنید';\n\n                el.btnMicPassenger.classList.toggle('listening', passActive);\n                el.passBtnHint.textContent = passActive ? info.listeningHint : info.tapHint;\n            }\n\n            function renderAutoBanner() {\n                el.btnAutoMode.classList.toggle('active-auto', state.autoMode);\n                el.autoModeIcon.textContent = state.autoMode ? '🔁' : '👆';\n                el.autoModeText.textContent = state.autoMode ? 'خودکار' : 'دستی';\n\n                const showLoop = state.autoMode && state.autoRunning;\n                el.autoLoopBanner.classList.toggle('visible', showLoop);\n                if (showLoop) {\n                    const turnName = state.nextAutoSpeaker === 'driver' ? 'راننده (فارسی)' : `مسافر (${LANGUAGES[state.passLang].faName})`;\n                    el.autoLoopStatusText.textContent = `🔁 گفتگوی خودکار فعال • نوبت فعلی: ${turnName}`;\n                }\n            }\n\n            function renderChat() {\n                const info = LANGUAGES[state.passLang];\n                el.chatStream.textContent = '';\n                el.btnClearChat.style.display = state.messages.length > 0 ? 'inline-block' : 'none';\n\n                const historyButton = document.getElementById('btnShowHistory');\n                historyButton.textContent = state.showHistory ? '↩️ نمایش آخرین پیام' : `🕘 تاریخچه گفتگو (${state.messages.length})`;\n                if (state.messages.length === 0) {\n                    const wrap = document.createElement('div');\n                    wrap.className = 'empty-state simple-empty';\n                    const title = document.createElement('div');\n                    title.className = 'empty-title';\n                    title.textContent = 'برای شروع، دکمه صحبت را بزنید';\n                    const hint = document.createElement('div');\n                    hint.className = 'empty-subtitle';\n                    hint.textContent = info.emptyGuide;\n                    hint.dir = info.dir;\n                    wrap.append(title, hint);\n                    el.chatStream.appendChild(wrap);\n                    return;\n                }\n\n                state.messages.forEach((m, idx) => {\n                    const isLatest = idx === state.messages.length - 1;\n                    if (!state.showHistory && !isLatest) return;\n                    const card = document.createElement('div');\n                    card.className = `msg-card ${m.role === 'driver' ? 'from-driver' : 'from-passenger'}${isLatest ? ' latest-msg' : ''}`;\n\n                    const passSnap = LANGUAGES[m.passLangSnapshot] || info;\n                    const meta = document.createElement('div');\n                    meta.className = 'msg-meta';\n\n                    const badge = document.createElement('span');\n                    badge.className = 'speaker-badge';\n                    badge.textContent = m.role === 'driver'\n                        ? `🇮🇷 راننده ⬅ ${passSnap.flag} ترجمه به ${passSnap.faName}`\n                        : `${passSnap.flag} مسافر (${passSnap.nativeName}) ⬅ 🇮🇷 ترجمه به فارسی`;\n\n                    const timeSpan = document.createElement('span');\n                    timeSpan.textContent = m.time;\n                    meta.append(badge, timeSpan);\n\n                    const transDiv = document.createElement('div');\n                    transDiv.className = 'msg-translated';\n                    transDiv.dir = m.toLang === 'fa' || m.toLang === 'ar' ? 'rtl' : 'ltr';\n                    transDiv.textContent = m.translated;\n\n                    const origDiv = document.createElement('div');\n                    origDiv.className = 'msg-original';\n                    origDiv.dir = m.fromLang === 'fa' || m.fromLang === 'ar' ? 'rtl' : 'ltr';\n                    origDiv.textContent = m.original;\n\n                    const actions = document.createElement('div');\n                    actions.className = 'msg-actions';\n\n                    const btnSpeak = document.createElement('button');\n                    btnSpeak.type = 'button';\n                    btnSpeak.className = 'msg-action-btn';\n                    btnSpeak.textContent = '🔊 پخش مجدد';\n                    btnSpeak.addEventListener('click', () => {\n                        unlockAudioOnGesture();\n                        speakText(m.translated, m.toLang);\n                    });\n\n                    const btnZoom = document.createElement('button');\n                    btnZoom.type = 'button';\n                    btnZoom.className = 'msg-action-btn';\n                    btnZoom.textContent = '🔍 نمایش بزرگ';\n                    btnZoom.addEventListener('click', () => openZoomModal(m));\n\n                    const btnCopy = document.createElement('button');\n                    btnCopy.type = 'button';\n                    btnCopy.className = 'msg-action-btn';\n                    btnCopy.textContent = '📋 کپی';\n                    btnCopy.addEventListener('click', async () => {\n                        try {\n                            await navigator.clipboard.writeText(`${m.translated}\\n(${m.original})`);\n                            showToast('متن پیام کپی شد');\n                        } catch (_) {\n                            showToast('آماده کپی');\n                        }\n                    });\n\n                    const more = document.createElement('details');\n                    more.className = 'message-more';\n                    const moreTitle = document.createElement('summary');\n                    moreTitle.textContent = '⋯ بیشتر';\n                    more.append(moreTitle, btnZoom, btnCopy);\n                    actions.append(btnSpeak, more);\n                    card.append(meta, transDiv, origDiv, actions);\n                    el.chatStream.appendChild(card);\n                });\n\n                el.chatStream.scrollTop = el.chatStream.scrollHeight;\n            }\n\n            function renderPhrases() {\n                el.phraseGrid.textContent = '';\n                const filtered = QUICK_PHRASES.filter(p => p.cat.includes(state.activePhraseCat));\n                filtered.forEach(item => {\n                    const btn = document.createElement('button');\n                    btn.type = 'button';\n                    btn.className = 'phrase-item-btn';\n\n                    const label = document.createElement('span');\n                    label.textContent = item.fa;\n\n                    const icon = document.createElement('span');\n                    icon.className = 'play-tag';\n                    icon.textContent = '🔊';\n\n                    btn.append(label, icon);\n                    btn.addEventListener('click', async () => {\n                        unlockAudioOnGesture();\n                        el.phrasesDrawer.classList.remove('open');\n                        el.btnTogglePhrases.classList.remove('open');\n                        const pre = item.t[state.passLang] || null;\n                        if (pre) {\n                            // Instant 0ms bilingual display & speech!\n                            const passInfo = LANGUAGES[state.passLang];\n                            const msgObj = {\n                                id: Date.now() + Math.random().toString(36).slice(2, 6),\n                                role: 'driver',\n                                fromLang: 'fa',\n                                toLang: passInfo.code,\n                                original: item.fa,\n                                translated: pre,\n                                passLangSnapshot: passInfo.code,\n                                time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })\n                            };\n                            state.showHistory = false;\n                            state.messages.push(msgObj);\n                            safeSetSession('dt_messages_v2', JSON.stringify(state.messages));\n                            el.faceBannerText.textContent = pre;\n                            el.faceBannerText.dir = passInfo.dir;\n                            renderChat();\n                            await speakText(pre, passInfo.code);\n                        } else {\n                            await processUtterance('driver', item.fa, null);\n                        }\n                    });\n                    el.phraseGrid.appendChild(btn);\n                });\n            }\n\n            function renderLanguageModal() {\n                el.langGrid.textContent = '';\n                Object.values(LANGUAGES).forEach(lang => {\n                    const btn = document.createElement('button');\n                    btn.type = 'button';\n                    btn.className = `lang-option-btn${lang.code === state.passLang ? ' selected' : ''}`;\n\n                    const flag = document.createElement('span');\n                    flag.className = 'lang-flag';\n                    flag.textContent = lang.flag;\n\n                    const names = document.createElement('div');\n                    names.className = 'lang-names';\n                    const nat = document.createElement('span');\n                    nat.className = 'lang-native';\n                    nat.textContent = lang.nativeName;\n                    const sub = document.createElement('span');\n                    sub.className = 'lang-fa-sub';\n                    sub.textContent = lang.faName;\n\n                    names.append(nat, sub);\n                    btn.append(flag, names);\n\n                    btn.addEventListener('click', () => {\n                        state.passLang = lang.code;\n                        safeSetLocal('dt_pass_lang', lang.code);\n                        el.langModal.classList.remove('open');\n                        renderLanguageModal();\n                        renderLanguageUI();\n                        showToast(`زبان مسافر به ${lang.faName} (${lang.nativeName}) تغییر کرد`);\n                    });\n\n                    el.langGrid.appendChild(btn);\n                });\n            }\n\n            function updateManualRoleUI() {\n                const info = LANGUAGES[state.passLang];\n                const isPass = state.manualRole === 'passenger';\n                el.btnToggleSenderRole.classList.toggle('role-passenger', isPass);\n                el.btnToggleSenderRole.textContent = isPass ? `${info.flag} از طرف: مسافر` : '🇮🇷 از طرف: راننده';\n                el.manualInput.placeholder = isPass\n                    ? info.typingPlaceholder\n                    : 'تایپ پیام به فارسی (برای محیط شلوغ یا بدون میکروفون)...';\n                el.manualInput.dir = isPass ? info.dir : 'rtl';\n            }\n\n            function openZoomModal(msgObj) {\n                state.zoomPayload = msgObj;\n                state.zoomRotated = false;\n                el.zoomCardContent.classList.remove('rotated');\n                el.zoomCardContent.textContent = msgObj.translated;\n                el.zoomCardContent.dir = msgObj.toLang === 'fa' || msgObj.toLang === 'ar' ? 'rtl' : 'ltr';\n                el.zoomModal.classList.add('open');\n            }\n\n            // 13. Events\n            el.btnMicDriver.addEventListener('click', () => startListeningForRole('driver'));\n            el.btnMicPassenger.addEventListener('click', () => startListeningForRole('passenger'));\n\n            el.btnAutoMode.addEventListener('click', () => {\n                unlockAudioOnGesture();\n                state.autoMode = !state.autoMode;\n                if (!state.autoMode) {\n                    state.autoRunning = false;\n                    clearTimeout(autoTurnTimeout);\n                }\n                renderAutoBanner();\n                showToast(state.autoMode\n                    ? 'حالت خودکار فعال شد؛ روی دکمه راننده یا مسافر بزنید تا چرخه شروع شود'\n                    : 'حالت دستی (لمسی) فعال شد');\n            });\n\n            el.btnStopAutoNow.addEventListener('click', () => {\n                stopListening(true);\n                stopSpeaking();\n                showToast('چرخه خودکار متوقف شد');\n            });\n\n            el.btnFaceMode.addEventListener('click', () => {\n                state.faceMode = !state.faceMode;\n                el.faceBanner.classList.toggle('visible', state.faceMode);\n                el.btnFaceMode.classList.toggle('active-face', state.faceMode);\n            });\n\n            el.btnFlipBanner.addEventListener('click', () => {\n                state.faceFlipped = !state.faceFlipped;\n                el.faceBanner.classList.toggle('flipped', state.faceFlipped);\n            });\n\n            const closeSimpleMenu = () => { el.settingsPanel.classList.remove('open'); el.btnSettings.setAttribute('aria-expanded', 'false'); };\n            el.btnSettings.setAttribute('aria-expanded', 'false');\n            el.btnSettings.addEventListener('click', () => {\n                const opened = el.settingsPanel.classList.toggle('open');\n                el.btnSettings.setAttribute('aria-expanded', String(opened));\n            });\n            document.getElementById('btnCloseMenu').addEventListener('click', closeSimpleMenu);\n            document.getElementById('btnShowHistory').addEventListener('click', () => {\n                state.showHistory = !state.showHistory;\n                renderChat();\n                closeSimpleMenu();\n            });\n            document.getElementById('btnToggleKeyboard').addEventListener('click', () => {\n                el.manualForm.hidden = !el.manualForm.hidden;\n                document.getElementById('btnToggleKeyboard').textContent = el.manualForm.hidden ? '⌨️ تایپ پیام' : '⌨️ پنهان کردن تایپ';\n                closeSimpleMenu();\n                if (!el.manualForm.hidden) el.manualInput.focus();\n            });\n            [el.btnTogglePhrases, el.btnAutoMode, el.btnFaceMode, el.btnDemoConv].forEach(btn => btn.addEventListener('click', closeSimpleMenu));\n            document.addEventListener('keydown', event => { if (event.key === 'Escape') closeSimpleMenu(); });\n\n            document.querySelectorAll('[data-gender]').forEach(btn => {\n                btn.classList.toggle('active', btn.dataset.gender === state.voiceGender);\n                btn.addEventListener('click', () => {\n                    state.voiceGender = btn.dataset.gender;\n                    safeSetLocal('dt_gender', state.voiceGender);\n                    document.querySelectorAll('[data-gender]').forEach(b => b.classList.toggle('active', b === btn));\n                    showToast(state.voiceGender === 'female' ? 'صدای گوینده: زن (دل‌آرا)' : 'صدای گوینده: مرد (فرید)');\n                });\n            });\n\n            document.querySelectorAll('[data-rate]').forEach(btn => {\n                btn.classList.toggle('active', parseInt(btn.dataset.rate, 10) === state.voiceRate);\n                btn.addEventListener('click', () => {\n                    state.voiceRate = parseInt(btn.dataset.rate, 10);\n                    safeSetLocal('dt_rate', String(state.voiceRate));\n                    document.querySelectorAll('[data-rate]').forEach(b => b.classList.toggle('active', b === btn));\n                });\n            });\n\n            function applyTheme() {\n                document.documentElement.setAttribute('data-theme', state.theme);\n            }\n            applyTheme();\n\n            el.btnThemeToggle.addEventListener('click', () => {\n                state.theme = state.theme === 'dark' ? 'light' : 'dark';\n                safeSetLocal('dt_theme', state.theme);\n                applyTheme();\n            });\n\n            // Self-Download HTML button\n            el.btnDownloadSelf.addEventListener('click', () => {\n                try {\n                    const htmlSource = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;\n                    const blob = new Blob([htmlSource], { type: 'text/html;charset=utf-8' });\n                    const url = URL.createObjectURL(blob);\n                    const a = document.createElement('a');\n                    a.href = url;\n                    a.download = 'driver-translator-pro.html';\n                    document.body.appendChild(a);\n                    a.click();\n                    a.remove();\n                    setTimeout(() => URL.revokeObjectURL(url), 1500);\n                    showToast('فایل HTML برنامه دانلود شد');\n                } catch (_) {\n                    showToast('از دکمه Download بالای پنجره فایل استفاده کنید');\n                }\n            });\n\n            el.btnOpenLangModal.addEventListener('click', () => {\n                renderLanguageModal();\n                el.langModal.classList.add('open');\n            });\n\n            el.btnCloseLangModal.addEventListener('click', () => el.langModal.classList.remove('open'));\n            el.langModal.addEventListener('click', (e) => {\n                if (e.target === el.langModal) el.langModal.classList.remove('open');\n            });\n\n            el.btnTogglePhrases.addEventListener('click', () => {\n                const isOpen = el.phrasesDrawer.classList.toggle('open');\n                el.btnTogglePhrases.classList.toggle('open', isOpen);\n            });\n\n            el.phraseTabs.querySelectorAll('.phrase-tab').forEach(tab => {\n                tab.addEventListener('click', () => {\n                    state.activePhraseCat = tab.dataset.cat;\n                    el.phraseTabs.querySelectorAll('.phrase-tab').forEach(t => t.classList.toggle('active', t === tab));\n                    renderPhrases();\n                });\n            });\n\n            el.btnToggleSenderRole.addEventListener('click', () => {\n                state.manualRole = state.manualRole === 'driver' ? 'passenger' : 'driver';\n                updateManualRoleUI();\n                el.manualInput.focus();\n            });\n\n            el.manualForm.addEventListener('submit', async (e) => {\n                e.preventDefault();\n                unlockAudioOnGesture();\n                const val = el.manualInput.value.trim();\n                if (!val) return;\n                el.manualInput.value = '';\n                await processUtterance(state.manualRole, val);\n            });\n\n            el.btnClearChat.addEventListener('click', () => {\n                stopSpeaking();\n                state.messages = [];\n                safeRemoveSession('dt_messages_v2');\n                renderChat();\n                showToast('تاریخچه گفتگو پاک شد');\n            });\n\n            // Demo Conversation (Works both online & offline!)\n            let demoRunning = false;\n            el.btnDemoConv.addEventListener('click', async () => {\n                if (demoRunning) return;\n                demoRunning = true;\n                unlockAudioOnGesture();\n                const samples = {\n                    en: { p: 'Hi driver! Could you please take me to Terminal 2 at the airport?', fa: 'سلام راننده! ممکن است لطفاً من را به ترمینال ۲ فرودگاه ببرید؟', dReply: 'Sure, welcome aboard! Please fasten your seatbelt; we will arrive in about 20 minutes.' },\n                    de: { p: 'Hallo Fahrer! Können Sie mich bitte zum Terminal 2 am Flughafen bringen?', fa: 'سلام راننده! ممکن است لطفاً من را به ترمینال ۲ فرودگاه ببرید؟', dReply: 'Natürlich, herzlich willkommen! Bitte schnallen Sie sich an, wir sind in etwa 20 Minuten da.' },\n                    ar: { p: 'مرحباً أيها السائق! هل يمكنك توصيلي إلى الصالة رقم ٢ في المطار؟', fa: 'سلام راننده! ممکن است من را به ترمینال ۲ فرودگاه برسانید؟', dReply: 'بالتأكيد، أهلاً وسهلاً بك! يرجى ربط حزام الأمان، سنصل خلال ٢٠ دقيقة تقريباً.' },\n                    tr: { p: 'Merhaba şoför bey! Beni havalimanı Terminal 2’ye götürebilir misiniz?', fa: 'سلام آقای راننده! ممکن است من را به ترمینال ۲ فرودگاه ببرید؟', dReply: 'Elbette, hoş geldiniz! Lütfen emniyet kemerinizi bağlayın, yaklaşık 20 dakikaya varırız.' },\n                    ru: { p: 'Здравствуйте! Отвезите меня, пожалуйста, во второй терминал аэропорта.', fa: 'سلام! لطفاً من را به ترمینال دوم فرودگاه ببرید.', dReply: 'Конечно, добро пожаловать! Пристегните ремень, будем примерно через 20 минут.' },\n                    fr: { p: 'Bonjour chauffeur ! Pouvez-vous m’emmener au terminal 2 de l’aéroport ?', fa: 'سلام راننده! می‌توانید من را به ترمینال ۲ فرودگاه ببرید؟', dReply: 'Bien sûr, bienvenue ! Attachez votre ceinture, nous arriverons dans environ 20 minutes.' },\n                    es: { p: '¡Hola conductor! ¿Podría llevarme a la Terminal 2 del aeropuerto?', fa: 'سلام راننده! ممکن است من را به ترمینال ۲ فرودگاه ببرید؟', dReply: '¡Claro, bienvenido! Abróchese el cinturón, llegaremos en unos 20 minutos.' },\n                    it: { p: 'Ciao autista! Può portarmi al Terminal 2 dell’aeroporto?', fa: 'سلام راننده! ممکن است من را به ترمینال ۲ فرودگاه ببرید؟', dReply: 'Certamente, benvenuto! Allacci la cintura, arriveremo tra circa 20 minuti.' },\n                    zh: { p: '司机您好！请问能送我去机场2号航站楼吗？', fa: 'سلام راننده! ممکن است من را به ترمینال ۲ فرودگاه ببرید؟', dReply: '当然可以，欢迎乘车！请系好安全带，我们大约20分钟后到达。' },\n                    nl: { p: 'Hallo chauffeur! Kunt u mij naar Terminal 2 op de luchthaven brengen?', fa: 'سلام راننده! ممکن است من را به ترمینال ۲ فرودگاه ببرید؟', dReply: 'Natuurlijk, welkom! Doe uw gordel om, we zijn er over ongeveer 20 minuten.' }\n                };\n                const s = samples[state.passLang] || samples.en;\n                await processUtterance('passenger', s.p, s.fa);\n                await new Promise(r => setTimeout(r, 400));\n                await processUtterance('driver', 'حتماً، بسیار خوش آمدید! لطفاً کمربند ایمنی خود را ببندید، حدود بیست دقیقه دیگر می‌رسیم.', s.dReply);\n                demoRunning = false;\n            });\n\n            // Zoom Modal\n            el.btnCloseZoomModal.addEventListener('click', () => el.zoomModal.classList.remove('open'));\n            el.zoomModal.addEventListener('click', (e) => {\n                if (e.target === el.zoomModal) el.zoomModal.classList.remove('open');\n            });\n            el.btnZoomRotate.addEventListener('click', () => {\n                state.zoomRotated = !state.zoomRotated;\n                el.zoomCardContent.classList.toggle('rotated', state.zoomRotated);\n            });\n            el.btnZoomSpeak.addEventListener('click', () => {\n                if (state.zoomPayload) {\n                    unlockAudioOnGesture();\n                    speakText(state.zoomPayload.translated, state.zoomPayload.toLang);\n                }\n            });\n\n            if ('speechSynthesis' in window) {\n                try {\n                    window.speechSynthesis.getVoices();\n                    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();\n                } catch (_) {}\n            }\n\n            renderPhrases();\n            renderLanguageUI();\n            renderAutoBanner();\n            checkBackendHealth();\n        })();\n    </script>\n</body>\n</html>\n";
// workers.js
var DEFAULT_CONCURRENCY = 10;
var DEFAULT_CHUNK_SIZE = 300;

// 站点图标：docs/logo.svg 的精简版（去掉播放键、加粗声波），16px 下仍可辨识。
var FAVICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
  '<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">' +
  '<stop offset="0%" stop-color="#6ee7b7"/><stop offset="55%" stop-color="#38bdf8"/>' +
  '<stop offset="100%" stop-color="#4f46e5"/></linearGradient></defs>' +
  '<rect width="512" height="512" rx="96" fill="url(#g)"/><g fill="#fff">' +
  '<rect x="104" y="206" width="44" height="100" rx="22" opacity="0.75"/>' +
  '<rect x="172" y="146" width="44" height="220" rx="22" opacity="0.9"/>' +
  '<rect x="240" y="86"  width="44" height="340" rx="22"/>' +
  '<rect x="308" y="156" width="44" height="200" rx="22" opacity="0.9"/>' +
  '<rect x="376" y="216" width="44" height="80"  rx="22" opacity="0.75"/>' +
  '</g></svg>';

// All tunable bounds live here rather than as magic numbers at the call sites.
var LIMITS = {
  MAX_INPUT_CHARS: 50000,
  // 50000 字符最坏情况(全 4 字节 UTF-8)约 200KB，留出 cleaning_options 等字段的余量
  MAX_BODY_BYTES: 262144,   // 256 KB
  MIN_SPEED: 0.25,
  MAX_SPEED: 4,
  MIN_PITCH: 0.5,
  MAX_PITCH: 1.5,
  MIN_CONCURRENCY: 1,
  MAX_CONCURRENCY: 20,
  MIN_CHUNK_SIZE: 50,
  MAX_CHUNK_SIZE: 2000,
  // 真正的硬约束是**分块数**，不是字符数：每个分块一次上游 subrequest，而 Workers 单次
  // 调用的 subrequest 上限是 50。默认 chunk_size=300 时，50000 字符要 167 个 subrequest，
  // 必然超限。线上实测（2026-08-04）：chunk_size=50 时 50 块还能过、51 块就 500；默认
  // 参数下约 6000 字符起就开始间歇性 503（CF error 1102），15000 字符稳定失败。
  //
  // 留 5 个余量给 token 端点与语音列表等非合成请求。超限时必须在**发出响应头之前**拒绝：
  // 流式路径一旦发过头，CF 掐掉 isolate 后客户端只会看到 200 + 干净 EOF 的短音频，
  // 与成功完全无法区分（实测截断响应与完整响应的结尾字节都是 0\r\n\r\n）。
  MAX_CHUNKS: 45,
};

// Microsoft voice names look like "zh-CN-XiaoxiaoNeural" or "zh-CN-liaoning-XiaobeiNeural".
// Anything outside this shape is rejected rather than escaped, because it is interpolated
// into an SSML attribute and there is no legitimate reason for other characters.
// Bounds verified against the live voice list (322 voices, 3-4 segments, longest 27 chars).
var VOICE_RE = /^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,40}){1,4}$/;
var STYLE_RE = /^[a-z][a-z0-9-]{0,30}$/;
var OPENAI_VOICE_MAP = {
  "shimmer": "zh-CN-XiaoxiaoNeural",
  // 温柔女声 -> 晓晓
  "alloy": "zh-CN-YunyangNeural",
  // 专业男声 -> 云扬  
  "fable": "zh-CN-YunjianNeural",
  // 激情男声 -> 云健
  "onyx": "zh-CN-XiaoyiNeural",
  // 活泼女声 -> 晓伊
  "nova": "zh-CN-YunxiNeural",
  // 阳光男声 -> 云希
  "echo": "zh-CN-liaoning-XiaobeiNeural"
  // 东北女声 -> 晓北
};
// ------------------------------------------------------------------ 结构化日志
//
// 为什么需要：审计发现 18 个日志点里 17 个只在**异常路径**，唯一那条正常路径日志记的是
// token 有效期 —— 于是一个成功的 200 请求不产生任何日志。后果是 5xx 率 / p99 / 重试率
// 都**没有分母**（只有出错才留痕，算不出「率」），「哪些音色真的被用」也答不出来。
// 本周修掉的几个 bug（分批栅栏白扔 2.5× 延迟、Deploy 三天没通、UI 数值贴到隔壁列）
// 都是「没人在看」才活下来的，缺的不是告警规则，是可被聚合的正常路径数据。
//
// 为什么是**每请求一个对象**、而不是模块级的「当前请求」变量：Workers 的单个 isolate
// 会并发处理多个请求，并在每个 await 处交错。实测同一模型下 3 个并发请求（延迟
// 30/5/15ms）用模块级变量记日志，三条全部记成最后一个开始的那个请求 —— 字段会串到
// 别的请求上，而这种错误在日志里是看不出来的。所以 ctx 必须显式穿过调用链。
//
// 成本：JSON.stringify 一个 9 字段对象实测中位 0.00021ms，占最坏合法请求纯 CPU
// （1.867ms 中位）的 0.011%。收集字段本身只是几个整数自增。
//
// 刻意**不记**的东西：input 文本（用户内容，连哈希也不记）、API key、上游返回体。
// 只记可聚合的维度与计数。
function newLogCtx(route) {
  return { route, t0: Date.now(), retries: 0, upstreamCalls: 0, degraded: null };
}

/**
 * 一条请求一行 JSON。level 用 log/warn/error 以便按严重度过滤。
 *
 * 错误码怎么拿到：错误响应的 body 里已经有 `code`，但 body 是流、读一次就消耗掉，
 * 不能直接读要返回给调用方的那个 Response。所以只对 **>=400** 的响应 `clone()` 后读
 * —— 错误体是几百字节的 JSON，克隆代价可忽略；成功响应可能是几 MB 音频，绝不克隆。
 * 另一条路是加 `x-error-code` 响应头，但那会把内部错误码暴露给公网（本项目刻意只在
 * body 里给 code），且响应头参与缓存键，所以不走那条。
 */
async function emitLog(ctx, res, extra) {
  if (!ctx) return;
  const status = res ? res.status : (extra && extra.status);
  let code;
  if (res && status >= 400) {
    try {
      const body = await res.clone().json();
      code = body && body.error && body.error.code;
    } catch {
      // 错误体不是 JSON（不该发生），但日志绝不能因此让请求失败。
      code = "unparseable_error_body";
    }
  }
  // 请求维度（voice/format/chunks/...）只在通过全部校验后才被设上，所以这里用「有就带、
  // 没有就省」—— 一个 400 请求的 voice 维度没有意义，硬塞 null 只会污染聚合。
  const line = JSON.stringify({
    ev: "req",
    route: ctx.route,
    status,
    ms: Date.now() - ctx.t0,
    upstream: ctx.upstreamCalls,
    retries: ctx.retries,
    ...(ctx.voice ? { voice: ctx.voice } : {}),
    ...(ctx.format ? { format: ctx.format } : {}),
    ...(ctx.chunks !== undefined ? { chunks: ctx.chunks } : {}),
    ...(ctx.concurrency !== undefined ? { conc: ctx.concurrency } : {}),
    ...(ctx.stream !== undefined ? { stream: ctx.stream } : {}),
    ...(ctx.inputChars !== undefined ? { chars: ctx.inputChars } : {}),
    ...(ctx.bytes !== undefined ? { bytes: ctx.bytes } : {}),
    ...(code ? { code } : {}),
    ...(ctx.degraded ? { degraded: ctx.degraded } : {}),
    ...extra
  });
  // 5xx 用 error、4xx 用 warn，其余 log —— Workers 日志面板按 level 过滤，
  // 这样「5xx 率」不必解析 JSON 就能先粗筛。
  if (status >= 500) console.error(line);
  else if (status >= 400) console.warn(line);
  else console.log(line);
}

var workers_default = {
  async fetch(request, env, ctx) {
    return await handleRequest(request, env);
  }
};
async function handleRequest(request, env) {
  if (request.method === "OPTIONS") return handleOptions(request);
  const url = new URL(request.url);
  if (url.pathname === "/v1/models/public") return await handlePublicModelsRequest(request);
  // favicon 必须在鉴权之前短路：否则浏览器自动发起的 /favicon.ico 会命中鉴权分支
  // 返回 401，在 devtools 里留下一条无意义的错误。直接返回内嵌的 logo。
  if (url.pathname === "/favicon.ico" || url.pathname === "/favicon.svg") {
    return new Response(FAVICON_SVG, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=604800",
        ...makeCORSHeaders()
      }
    });
  }
  if (url.pathname === "/" || url.pathname === "/index.html") {
    return new Response(getHtmlContent(), {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        // 5 分钟 + must-revalidate：部署后几分钟内自然生效，不必强刷。
        // 之前是 max-age=86400（1 天），每次发版都得让用户手动硬刷才能看到新版。
        "Cache-Control": "public, max-age=300, must-revalidate"
      }
    });
  }
  // Auth is mandatory unless explicitly opted out. Previously this was `if (env.API_KEY)`,
  // which meant a missing binding silently downgraded the API to fully public — the
  // "no key configured" and "key verified" paths were indistinguishable.
  if (!env.API_KEY) {
    if (env.ALLOW_ANONYMOUS !== "true") {
      console.error("API_KEY 未绑定且未设置 ALLOW_ANONYMOUS=true，拒绝请求");
      return errorResponse(
        "服务端未配置 API_KEY。请绑定 API_KEY secret，或显式设置 ALLOW_ANONYMOUS=true 以开放访问。",
        503,
        "server_misconfigured"
      );
    }
    console.warn("以匿名模式运行（ALLOW_ANONYMOUS=true），接口无鉴权");
  } else {
    const authHeader = request.headers.get("authorization") || "";
    const presented = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!timingSafeEqual(presented, env.API_KEY)) {
      return errorResponse("无效的 API 密钥", 401, "invalid_api_key");
    }
  }
  // 在这里(而不是每个 return 处)埋日志：handleSpeechRequest 有 20 个出口，逐个包裹既
  // 冗长又必然漏掉新增的那个。这里是唯一的漏斗，所有响应都要经过。
  const logCtx = newLogCtx(url.pathname);
  try {
    if (url.pathname === "/v1/audio/speech") {
      const res = await handleSpeechRequest(request, logCtx);
      // 流式已自行安排在流结束时记录（见 streamVoice），这里再记一次只会得到一条
      // upstream=0 的假数据。
      if (!logCtx.streamLogged) await emitLog(logCtx, res);
      return res;
    }
    if (url.pathname === "/v1/models") {
      const res = await handleModelsRequest(request);
      await emitLog(logCtx, res);
      return res;
    }
  } catch (err) {
    // 同上：内部错误细节只进日志。err.message 可能是运行时抛出的原始信息
    // (依赖内部路径、变量名等)，不该出现在面向公网的响应里。
    console.error("请求处理器错误:", err);
    const res = errorResponse("服务器内部错误", 500, "internal_server_error");
    await emitLog(logCtx, res);
    return res;
  }
  const notFound = errorResponse("未找到", 404, "not_found");
  await emitLog(logCtx, notFound);
  return notFound;
}
// Constant-time compare so a wrong key can't be recovered byte-by-byte from latency.
function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const enc = new TextEncoder();
  const ba = enc.encode(a);
  const bb = enc.encode(b);
  // Length is not secret, but keep the loop length fixed regardless of mismatch.
  let diff = ba.length ^ bb.length;
  const max = Math.max(ba.length, bb.length);
  for (let i = 0; i < max; i++) {
    diff |= (ba[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

function handleOptions(request) {
  // headers.get() yields null when the header is absent, and a default parameter only
  // kicks in for undefined — passing null straight through emitted the literal
  // "Access-Control-Allow-Headers: null", so a preflight that didn't advertise its
  // headers was never told Content-Type/Authorization are allowed.
  const requested = request.headers.get("Access-Control-Request-Headers") ?? undefined;
  return new Response(null, { status: 204, headers: makeCORSHeaders(requested) });
}
async function handleSpeechRequest(request, logCtx = null) {
  if (request.method !== "POST") {
    return errorResponse("不允许的方法", 405, "method_not_allowed", "api_error", {
      "Allow": "POST, OPTIONS"
    });
  }
  // 先看 Content-Length 再读 body：await request.json() 会把整个 body 收进内存后
  // 才轮到下面的 input 长度校验，等于「先受伤再检查」。一个 input 合法、但塞了
  // 巨大 cleaning_options 的请求可以绕过 MAX_INPUT_CHARS 白吃内存。
  const declaredLen = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLen) && declaredLen > LIMITS.MAX_BODY_BYTES) {
    return errorResponse(
      `请求体过大：${declaredLen} > ${LIMITS.MAX_BODY_BYTES} 字节`,
      413,
      "payload_too_large"
    );
  }
  let requestBody;
  try {
    // 读成文本先量实际字节数：Content-Length 在 chunked 传输下可能缺失，
    // 光靠声明值会被绕过。
    const raw = await request.text();
    const actualBytes = new TextEncoder().encode(raw).length;
    if (actualBytes > LIMITS.MAX_BODY_BYTES) {
      return errorResponse(
        `请求体过大：${actualBytes} > ${LIMITS.MAX_BODY_BYTES} 字节`,
        413,
        "payload_too_large"
      );
    }
    requestBody = JSON.parse(raw);
  } catch {
    // param 指向整个 body,而不是某个字段 —— 与下面「input 字段缺失」区分开。
    return errorResponse("请求体不是合法 JSON", 400, "invalid_request_error", "api_error", null, "body");
  }
  if (typeof requestBody?.input !== "string" || !requestBody.input.trim()) {
    return errorResponse(
      "'input' 是必需参数，且必须为非空字符串",
      400,
      "invalid_request_error",
      "api_error",
      null,
      "input"
    );
  }
  if (requestBody.input.length > LIMITS.MAX_INPUT_CHARS) {
    return errorResponse(
      `'input' 超出长度上限：${requestBody.input.length} > ${LIMITS.MAX_INPUT_CHARS}`,
      400,
      "input_too_long"
    );
  }
  const {
    model = "tts-1",
    // 模型名称
    input,
    // 输入文本
    voice = "shimmer",
    // 语音
    speed = 1,
    // 语速 (0.25-2.0)
    pitch = 1,
    // 音调 (0.5-1.5)
    style = "general",
    // 语音风格
    stream = false,
    // 是否流式输出
    response_format = "mp3",
    // 输出格式: mp3 | pcm | opus | aac | flac | wav
    concurrency = DEFAULT_CONCURRENCY,
    // 并发数
    chunk_size = DEFAULT_CHUNK_SIZE,
    // 分块大小
    cleaning_options = {}
    // 文本清理选项
  } = requestBody;
  // stream 只接受布尔。之前是真值判断，于是 stream: "false" / "no" / [] 全都进流式 ——
  // 字符串 "false" 得到的行为与字面意思相反，而与 wav/opus 叠加时那正是静默截断的入口。
  if (stream !== undefined && typeof stream !== "boolean") {
    return errorResponse(
      `'stream' 必须是布尔值，收到 ${typeof stream}` +
        (typeof stream === "string" ? `（${JSON.stringify(stream)}）` : "") +
        "。JSON 里请写 true / false，不要加引号。",
      400,
      "invalid_stream"
    );
  }
  // 修:cleaning_options 必须是对象。传字符串/数组/数字时展开成 {...'abc'} 得到的是
  // {0:"a",1:"b",...}，于是所有清理选项静默退回默认值，调用方以为自己关掉了某项。
  if (
    cleaning_options !== undefined &&
    (typeof cleaning_options !== "object" || cleaning_options === null || Array.isArray(cleaning_options))
  ) {
    return errorResponse(
      `'cleaning_options' 必须是对象，收到 ${Array.isArray(cleaning_options) ? "array" : typeof cleaning_options}。` +
        "例如 {\"remove_markdown\": false}。",
      400,
      "invalid_cleaning_options"
    );
  }
  const finalCleaningOptions = {
    remove_markdown: true,
    // 移除 Markdown
    remove_emoji: true,
    // 移除 Emoji
    remove_urls: true,
    // 移除 URL
    remove_line_breaks: true,
    // 移除换行符
    remove_citation_numbers: true,
    // 移除引用数字
    custom_keywords: "",
    // 自定义关键词
    ...cleaning_options
  };
  // custom_keywords 会被 .split(",") —— 传数字/数组/对象时那个方法不存在，异常冒到最外层
  // 的 catch，调用方收到 500 internal_server_error。这是调用方的输入错误，必须是 400，
  // 而且要说清收到的是什么类型，否则对方只能猜。
  if (
    finalCleaningOptions.custom_keywords !== undefined &&
    typeof finalCleaningOptions.custom_keywords !== "string"
  ) {
    return errorResponse(
      `cleaning_options.custom_keywords 必须是逗号分隔的字符串，收到 ${typeof finalCleaningOptions.custom_keywords}`,
      400,
      "invalid_cleaning_options",
      "api_error",
      null,
      "cleaning_options.custom_keywords"
    );
  }
  const cleanedInput = cleanText(input, finalCleaningOptions);
  if (!cleanedInput) {
    return errorResponse("文本清理后为空，请检查 cleaning_options", 400, "input_empty_after_cleaning");
  }

  // Resolve the voice with explicit intent winning over inference:
  //   1. `voice` that is already a real Microsoft name  -> use as-is
  //   2. `voice` that is an OpenAI alias ("shimmer", …) -> map it
  //   3. otherwise fall back to an alias derived from `model` ("tts-1-alloy")
  // Ordering matters: resolving the alias map first let `model` silently hijack an
  // explicitly requested voice (e.g. voice=en-US-AvaNeural + model=tts-1-nova
  // synthesized Chinese), and made the model-derived branch unreachable because
  // `voice` defaults to the alias "shimmer".
  const modelAlias = typeof model === "string" ? OPENAI_VOICE_MAP[model.replace("tts-1-", "")] : undefined;
  const finalVoice =
    (typeof voice === "string" && VOICE_RE.test(voice) && voice) ||
    OPENAI_VOICE_MAP[voice] ||
    modelAlias ||
    voice;
  if (typeof finalVoice !== "string" || !VOICE_RE.test(finalVoice)) {
    return errorResponse(
      `无效的语音名称：${JSON.stringify(finalVoice)}。应形如 "zh-CN-XiaoxiaoNeural"`,
      400,
      "invalid_voice"
    );
  }
  if (typeof style !== "string" || !STYLE_RE.test(style)) {
    return errorResponse(
      `无效的 style：${JSON.stringify(style)}。仅允许小写字母、数字与连字符`,
      400,
      "invalid_style"
    );
  }

  const speedNum = Number(speed);
  const pitchNum = Number(pitch);
  if (!Number.isFinite(speedNum) || speedNum < LIMITS.MIN_SPEED || speedNum > LIMITS.MAX_SPEED) {
    return errorResponse(
      `speed 超出范围：${speed}，允许 ${LIMITS.MIN_SPEED}–${LIMITS.MAX_SPEED}`,
      400,
      "invalid_speed"
    );
  }
  if (!Number.isFinite(pitchNum) || pitchNum < LIMITS.MIN_PITCH || pitchNum > LIMITS.MAX_PITCH) {
    return errorResponse(
      `pitch 超出范围：${pitch}，允许 ${LIMITS.MIN_PITCH}–${LIMITS.MAX_PITCH}`,
      400,
      "invalid_pitch"
    );
  }

  const rate = ((speedNum - 1) * 100).toFixed(0);
  const finalPitch = ((pitchNum - 1) * 100).toFixed(0);
  // 这里有两种**刻意不同**的策略，模块审计时发现代码里没写明理由，补记：
  //
  //   speed / pitch      -> 越界即 400 拒绝（见上面 invalid_speed / invalid_pitch）
  //   concurrency / chunk_size -> clamp 夹紧，不拒绝
  //
  // 依据是「用户听得出来吗」：speed/pitch 直接决定音频听起来什么样，静默改成别的值会让
  // 调用方以为服务坏了（要 4.0 倍速却得到 2.0，音频完好、就是不对）。而 concurrency 与
  // chunk_size 是**性能旋钮**，只影响上游调用的次数与并发，不改变音频内容 —— 实测
  // concurrency=1e9 与 concurrency=20 的上游调用次数完全相同。夹紧比拒绝对调用方更友好。
  //
  // clamp 的语义也记一下（`clamp(0, 50, ...)` 与 `clamp("abc", 50, ...)` 结果不同）：
  // 能转成有限数就**夹到 [min,max]**，转不成才用 fallback。所以 chunk_size=0 得到 50（min）
  // 而不是 300（default）—— 审计时我一度以为是后者，实测 180 字符切出 4 块才确认。
  const safeConcurrency = clamp(concurrency, LIMITS.MIN_CONCURRENCY, LIMITS.MAX_CONCURRENCY, DEFAULT_CONCURRENCY);
  const safeChunkSize = clamp(chunk_size, LIMITS.MIN_CHUNK_SIZE, LIMITS.MAX_CHUNK_SIZE, DEFAULT_CHUNK_SIZE);
  // Only formats the cognitiveservices/v1 endpoint actually accepts. aac and flac
  // (every bitrate variant) return a bare 400 from upstream, so they are not offered —
  // listing them would surface as an opaque "tts_generation_error" instead of a clear
  // 400 here. Verified against the live endpoint on 2026-08-03.
  const FORMAT_MAP = {
    "mp3": "audio-24khz-48kbitrate-mono-mp3",
    "pcm": "raw-24khz-16bit-mono-pcm",
    "opus": "webm-24khz-16bit-mono-opus",
    "wav": "riff-24khz-16bit-mono-pcm"
  };
  if (!Object.hasOwn(FORMAT_MAP, response_format)) {
    return errorResponse(
      `不支持的 response_format：${JSON.stringify(response_format)}。可选 ${Object.keys(FORMAT_MAP).join(" | ")}`,
      400,
      "invalid_response_format"
    );
  }
  const outputFormat = FORMAT_MAP[response_format];
  const CONTENT_TYPE_MAP = {
    "mp3": "audio/mpeg",
    "pcm": "audio/pcm",
    "opus": "audio/webm",
    "wav": "audio/wav"
  };
  const contentType = CONTENT_TYPE_MAP[response_format];

  // 先用 O(1) 的下界短路，再决定要不要真的分块。smartChunkText 永不产生超过 chunk_size
  // 的块，所以 ceil(字符数 / chunk_size) 是分块数的**下界** —— 下界已超上限时结论必然成立，
  // 这个判据只会漏报、绝不误报。
  //
  // 为什么值得这么做：分块本身要遍历全部字符（50000 字符 / chunk_size=50 实测 4.8ms 切出
  // 1011 块），而这个请求注定被下面的 MAX_CHUNKS 拒绝。端到端实测 39.2ms —— 一个必然失败
  // 的请求就花掉 4 倍于 Workers 10ms CPU 预算的算力，等于给攻击者一条免费的消耗路径。
  const minChunks = Math.ceil(cleanedInput.length / safeChunkSize);
  // 给「把这段文本装进 45 块所需的 chunk_size」，而不是「45 × 当前 chunk_size 能装多少字符」。
  //
  // 后者是错的，而且会自相矛盾：50000 字符 + chunk_size=1124 被拒时，旧文案却说
  // 「当前 chunk_size 下最多约 50580 字符」—— 宣称 50580 可行，而 50000 已经被拒。
  // 根因是 45 × chunk_size 只是**乘积上界**，仅当每块都填满才成立；标点会让块提前收尾，
  // 实测填充率 88–100%，所以真实容量总是更小。这正是 v2.20.0 在 README 里修掉的
  // 「90000 字符不可达」同一类错误 —— 当时改了文档，**没改错误文案**。
  //
  // 另外 MAX_INPUT_CHARS 是硬上限且先于分块校验，所以任何超过它的数字都不可能达到。
  // 用**实际分块**二分出一个真的能过的 chunk_size，而不是拿系数去估。
  //
  // 估算行不通，试过了：ceil(len/45) 乘 1.05/1.15/1.25/1.4/1.6 各跑 88 个
  // (字符数 × 文本形态) 组合，**没有一个系数全通过**。原因是填充率不是常数，而是
  // 量化效应：当 chunk_size 略小于句长的整数倍时，每块都会浪费接近一整句。
  // 实测 chunk_size=125 下的填充率，「82 字符句」只有 65%、「44 字符句」71%，
  // 而无标点文本 100%。乘一个系数治不了这个。
  //
  // 二分最多 ~11 次 smartChunkText。只在**已经要返回 413** 的路径上跑，正常请求不受影响；
  // 而给出一个「照着改就能过」的数字，比一个算得快但会误导的乘积有用得多。
  const suggestChunkSize = () => {
    const lo0 = Math.ceil(cleanedInput.length / LIMITS.MAX_CHUNKS);
    let lo = Math.max(LIMITS.MIN_CHUNK_SIZE, lo0), hi = LIMITS.MAX_CHUNK_SIZE, best = null;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (smartChunkText(cleanedInput, mid).length <= LIMITS.MAX_CHUNKS) { best = mid; hi = mid - 1; }
      else lo = mid + 1;
    }
    // 向上取整到 25 的倍数，给调用方一个好记的数（区间单调，取整后必然仍然可行）。
    return best === null ? null : Math.min(LIMITS.MAX_CHUNK_SIZE, Math.ceil(best / 25) * 25);
  };
  const tooManyChunks = (count) => {
    const suggest = suggestChunkSize();
    const enough = suggest !== null;
    return errorResponse(
      `文本过长：按 chunk_size=${safeChunkSize} 会切成 ${count} 个分块，` +
        `超过上限 ${LIMITS.MAX_CHUNKS}（Cloudflare Workers 单请求最多 50 个子请求）。` +
        (enough
          ? `这段文本（${cleanedInput.length} 字符）请把 chunk_size 调到约 ${suggest} 以上` +
            `（上限 ${LIMITS.MAX_CHUNK_SIZE}）；块越粗则上游调用越少。`
          : `即使用最大的 chunk_size=${LIMITS.MAX_CHUNK_SIZE} 也装不下这段文本` +
            `（${cleanedInput.length} 字符），请拆成多次请求。`),
      413,
      "too_many_chunks"
    );
  };
  if (minChunks > LIMITS.MAX_CHUNKS) {
    // 报下界而不是真实块数：真实块数只会更大，而为了得到它就得付上面那笔算力。
    return tooManyChunks("至少 " + minChunks);
  }

  const textChunks = smartChunkText(cleanedInput, safeChunkSize);
  if (textChunks.length === 0) {
    return errorResponse("文本分块结果为空", 400, "input_empty_after_cleaning");
  }
  // 必须在这里拦：此时分块数已知，而响应头还没发出。放到流式循环里就来不及了。
  // 错误信息给出可执行的出路（调大 chunk_size 能显著减少分块数），而不是只说「太长」。
  // 下界没超但实际超了，是因为标点会让某些块提前收尾（分块数总是 >= 下界）。
  if (textChunks.length > LIMITS.MAX_CHUNKS) {
    return tooManyChunks(textChunks.length);
  }
  // 流式 + 容器格式 + 多分块 = 静默截断。streamVoice 边收边写，头部早已发出，事后无法回填
  // RIFF 的 data 长度、也无法把多个 WebM Segment 合成一个（非流式路径能做，是因为它先把
  // 所有分块收齐）。线上实测 901 字符 / 4 块的流式 wav：文件含 191.67s，但首个 RIFF 头只
  // 声明 61.46s —— 播放器在 32% 处停止，且响应是 200 + 合法 WAV，无法与正常结果区分。
  // opus 同样是 4 个独立容器。
  //
  // 这正是 README 里「容器格式无法增量解码」的直接后果，所以在发头之前明确拒绝，
  // 并指出 pcm 才是流式该用的格式（UI 已自动改写，直连 API 的调用方需要自己选）。
  if (stream && textChunks.length > 1 && (contentType === "audio/wav" || contentType === "audio/webm")) {
    return errorResponse(
      `流式不支持多分块的 ${response_format}：按 chunk_size=${safeChunkSize} 会切成 ` +
        `${textChunks.length} 块，而 ${response_format} 是带头部的容器格式，` +
        `边发边写无法把多个容器合成一个（播放器只认第一个，会静默截断）。` +
        `流式请用 response_format: "pcm"；若需要 ${response_format} 文件，请去掉 stream。`,
      400,
      "stream_format_not_chunkable"
    );
  }
  // 记在这里：此时所有参数都已校验并归一化（voice 解析过别名、format 已确认受支持、
  // 分块数已确定），而上游还没被调用。校验失败的请求走的是上面那些 return，它们的
  // 日志只有 status/code —— 那正是想要的：一个 400 的 voice 维度是没意义的。
  if (logCtx) {
    logCtx.voice = finalVoice;
    logCtx.format = response_format;
    logCtx.chunks = textChunks.length;
    logCtx.concurrency = safeConcurrency;
    logCtx.stream = stream;
    logCtx.inputChars = cleanedInput.length;
  }
  // ttsArgs 是位置参数、且调用点用 `...ttsArgs, label` 追加 label，所以**不能**往这个
  // 数组里塞新元素 —— 那会把 label 挤到后面一位。logCtx 作为独立参数单独传。
  const ttsArgs = [finalVoice, rate, finalPitch, style, outputFormat, contentType];
  if (stream) {
    return await streamVoice(textChunks, safeConcurrency, logCtx, ...ttsArgs);
  } else {
    return await getVoice(textChunks, safeConcurrency, logCtx, ...ttsArgs);
  }
}

// Coerce a numeric option into range; falls back to `fallback` for non-numeric input.
function clamp(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}
// 语音列表极少变动（连日核对均为 322 条），但此前每个请求都穿透到微软上游
// （实测 52KB / 最高 483ms）。这里加两层缓存：
//   1. 模块级内存缓存 —— 同一个 isolate 内的后续请求零上游调用
//   2. 响应头 Cache-Control —— 让浏览器与 CF 边缘也能缓存，不必每次开页面重拉 322 条
// 上游失败时若手上有过期缓存，宁可返回过期数据也不让调用方拿不到列表（留 warn 痕迹）。
var VOICES_URL = "https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list?trustedclienttoken=6A5AA1D4EAFF4E9FB37E23D68491D6F4";
var VOICES_TTL_MS = 6 * 60 * 60 * 1e3;      // 6 小时
var MODELS_CACHE_SECONDS = 21600;           // 与 TTL 一致，供 Cache-Control 使用
var voicesCache = { models: null, fetchedAt: 0 };
var voicesInFlight = null;

/**
 * 从上游的 FriendlyName 里取出人类可读的音色名。
 *
 * 上游字段没有 LocalName —— 322 条里一条都没有（2026-08-04 对线上列表核对过），实际字段是
 * FriendlyName，形如 "Microsoft Xiaoxiao Online (Natural) - Chinese (Mainland)"。原先读
 * voice.LocalName 使得每一条 description 都是字面量 "undefined - Female"。
 *
 * 只取中间那段名字（"Xiaoxiao"），因为语言和性别已经是独立字段，重复一遍没有信息量。
 * 上游若改了 FriendlyName 的格式，就退回整串原文而不是拼出 undefined。
 */
function voiceDisplayName(voice) {
  const friendly = voice.FriendlyName;
  if (typeof friendly !== "string" || !friendly) return voice.ShortName || "";
  const m = /^Microsoft\s+(.+?)\s+Online\b/.exec(friendly);
  return m ? m[1] : friendly;
}

// 语音列表是近乎静态的（连日核对都是同一批 322 个），所以 created 用一个固定值，
// 不用 Date.now()。OpenAI 的 models 语义里 created 是「模型创建时间」而不是「响应时间」，
// 而每次响应都变的后果很实际：322 条里每条都不同 → 响应体逐字节不同 → ETag 无从稳定、
// CF 边缘也无法复用（实测两次请求的 created 分别是 ...556724 和 ...519071）。
// 取值为上游语音列表首次被完整核对的日期，只是一个稳定的锚点，不代表微软那边的真实时间。
var MODELS_CREATED_AT = 1754265600;   // 2025-08-04T00:00:00Z，秒级（OpenAI 用秒）

function toModel(voice) {
  return {
    id: voice.ShortName,
    object: "model",
    created: MODELS_CREATED_AT,
    owned_by: "microsoft",
    language: voice.Locale,
    gender: voice.Gender,
    description: `${voiceDisplayName(voice)} - ${voice.Gender}`
  };
}

async function getModels() {
  const fresh = voicesCache.models && Date.now() - voicesCache.fetchedAt < VOICES_TTL_MS;
  if (fresh) return voicesCache.models;

  // 合并并发请求：冷启动时多个请求同时进来不应各打一次上游。
  if (!voicesInFlight) {
    voicesInFlight = (async () => {
      const response = await fetch(VOICES_URL);
      if (!response.ok) throw new Error("Failed to fetch voices from EdgeTTS");
      const voices = await response.json();
      const models = voices.map(toModel);
      voicesCache = { models, fetchedAt: Date.now() };
      return models;
    })().finally(() => { voicesInFlight = null; });
  }

  // 关键：降级逻辑必须包住**所有**调用方，而不只是发起那一次刷新的那个。
  // 原先跟随者在上面直接 `return voicesInFlight`，于是拒绝发生在这段 catch 之外，
  // 它们完全跳过了过期缓存回退。实测上游挂掉时 5 个并发请求里只有 1 个拿到完整的
  // 322 条，另外 4 个拿到 2 条兜底列表——UI 的音色选择器会随机只显示 2 个音色。
  try {
    return await voicesInFlight;
  } catch (error) {
    if (voicesCache.models) {
      // 降级留痕：明确区分「拿到的是过期缓存」与「拿到的是新鲜数据」
      console.warn("语音列表上游失败，返回过期缓存:", error.message);
      return voicesCache.models;
    }
    throw error;
  }
}

/**
 * 语音列表是只读的，但之前对 PUT/DELETE/PATCH 一律返回 200 + 完整列表 —— 调用方会以为
 * 自己的写操作成功了。405 必须带 Allow 头（RFC 9110 要求），否则客户端无从知道该用什么方法。
 */
function modelsMethodCheck(request) {
  if (request.method === "GET" || request.method === "HEAD") return null;
  return errorResponse("不允许的方法，语音列表是只读的", 405, "method_not_allowed", "api_error", {
    "Allow": "GET, HEAD, OPTIONS"
  });
}

function modelsHeaders(etag) {
  return {
    "Content-Type": "application/json",
    "Cache-Control": `public, max-age=${MODELS_CACHE_SECONDS}`,
    ...(etag ? { "ETag": etag } : {}),
    ...makeCORSHeaders()
  };
}

/**
 * 语音列表的弱 ETag。列表本身近乎静态，加上 created 已固定，同一份列表 + 同一组过滤参数
 * 就能得到稳定的标识，于是 304 与边缘复用才有意义（实测此前 cf-cache-status 一直是空）。
 *
 * 用长度 + 逐条 id 的 FNV-1a 哈希，而不是把整个 body 再算一遍 SHA：这里只需要「内容变了
 * 就一定变」，而 32 位碰撞的代价是一次多余的 200，不是错误响应。弱 ETag（W/ 前缀）正是
 * 表达这种语义等价而非字节相同的记法。
 */
function modelsEtag(models) {
  let h = 0x811c9dc5;
  for (const m of models) {
    const s = m.id;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = (h * 0x01000193) >>> 0;
    }
  }
  return `W/"${models.length}-${h.toString(16)}"`;
}

/** 请求带的 If-None-Match 命中当前 ETag 时，回 304（不带 body）。 */
function notModified(request, etag) {
  const inm = request.headers.get("if-none-match");
  if (!inm) return null;
  // 客户端可以带多个，也可能把弱标记去掉，逐个宽松比对。
  const wanted = etag.replace(/^W\//, "");
  const hit = inm.split(",").some((t) => t.trim().replace(/^W\//, "") === wanted);
  if (!hit) return null;
  return new Response(null, { status: 304, headers: modelsHeaders(etag) });
}

/**
 * 按查询参数过滤语音列表。两个端点共用，因为 README 承诺的过滤能力不该只在
 * 需要鉴权的那一个上生效 —— 内置 UI 的音色筛选走的正是公开端点。
 *
 * 注意 ?neural：上游 322 个音色**全部**含 "Neural"，所以这个参数恒为 no-op。
 * 保留它是为了向后兼容既有调用方（去掉会让 ?neural=true 的请求行为改变），
 * 但文档里已标注它没有实际作用，不要在此基础上做新设计。
 */
function filterModels(models, url) {
  const on = (v) => v === "true" || v === "1";
  let out = models;
  if (on(url.searchParams.get("neural"))) {
    out = out.filter((m) => m.id.includes("Neural"));
  }
  if (on(url.searchParams.get("multilingual"))) {
    out = out.filter((m) => m.id.includes("Multilingual"));
  }
  return out;
}

async function handlePublicModelsRequest(request) {
  const wrongMethod = modelsMethodCheck(request);
  if (wrongMethod) return wrongMethod;
  try {
    const models = filterModels(await getModels(), new URL(request.url));
    // ETag 按**过滤后**的列表算：?multilingual=true 与不带参数是两个不同的表示，
    // 若共用一个 ETag，带 If-None-Match 的第二个请求会拿到 304 而误用前一份内容。
    const etag = modelsEtag(models);
    const fresh = notModified(request, etag);
    if (fresh) return fresh;
    return new Response(JSON.stringify(models), {
      headers: modelsHeaders(etag)
    });
  } catch (error) {
    console.error("获取语音列表失败:", error);
    return errorResponse("Failed to fetch voices", 500, "fetch_error");
  }
}
async function handleModelsRequest(request) {
  const wrongMethod = modelsMethodCheck(request);
  if (wrongMethod) return wrongMethod;
  try {
    const models = filterModels(await getModels(), new URL(request.url));
    // ETag 按**过滤后**的列表算：?multilingual=true 与不带参数是两个不同的表示，
    // 若共用一个 ETag，带 If-None-Match 的第二个请求会拿到 304 而误用前一份内容。
    const etag = modelsEtag(models);
    const fresh = notModified(request, etag);
    if (fresh) return fresh;
    return new Response(JSON.stringify(models), {
      headers: modelsHeaders(etag)
    });
  } catch (error) {
    console.error("获取语音列表失败:", error);
    const fallbackModels = [
      { id: "zh-CN-XiaoxiaoNeural", object: "model", created: MODELS_CREATED_AT, owned_by: "microsoft", language: "zh-CN", gender: "Female", description: "晓晓 - 温柔女声" },
      { id: "zh-CN-YunxiNeural", object: "model", created: MODELS_CREATED_AT, owned_by: "microsoft", language: "zh-CN", gender: "Male", description: "云希 - 阳光男声" }
    ];
    // 兜底列表不缓存：它是降级产物，不该被边缘/浏览器当成 6 小时有效的正常结果
    return new Response(JSON.stringify(fallbackModels), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...makeCORSHeaders() }
    });
  }
}
async function streamVoice(textChunks, concurrency, logCtx, ...ttsArgs) {
  const { readable, writable } = new TransformStream();
  const contentType = ttsArgs[5] || "audio/mpeg";
  // 流式的响应头在第一个分块之前就发出，所以 handleRequest 里那次 emitLog 会在合成**还没
  // 开始**时就跑 —— 实测记出 `ms:6, upstream:0`，而这个请求实际打了 4 次上游、耗时 192ms。
  // 那种数据比没有更糟：它会把每个流式请求的 p99 和上游用量都算低。
  //
  // 所以流式自己负责在流真正结束（或失败）时再记一次，并让 handleRequest 那次跳过
  // （streamLogged 标记）。这也是 `ms` 对两条路径含义不同的地方，已在字段名注释里说明。
  if (logCtx) logCtx.streamLogged = true;
  pipeChunksToStream(writable.getWriter(), textChunks, concurrency, logCtx, ...ttsArgs)
    .then(() => {
      // 流式无法在发头之后改状态码，所以「上游给了 0 字节」这件事在流式路径上**只能**靠
      // 日志暴露（非流式已改为 502 upstream_empty_audio）。单独标记出来，这样
      // "phase=stream_empty" 可以直接聚合，而不必先算 bytes==0。
      const empty = !logCtx || !logCtx.bytes;
      emitLog(logCtx, null, { status: 200, phase: empty ? "stream_empty" : "stream_end" });
    })
    .catch((error) => {
      console.error("流式 TTS 失败:", error);
      // 头已发出，HTTP 状态无法再改，但日志必须体现「这条流是断的」——
      // 否则一个中途失败的流在聚合里与成功的流长得一样。
      emitLog(logCtx, null, { status: 200, phase: "stream_broken", err: error?.status || "error" });
    });
  return new Response(readable, {
    headers: { "Content-Type": contentType, ...makeCORSHeaders() }
  });
}
async function pipeChunksToStream(writer, chunks, concurrency, logCtx, ...ttsArgs) {
  // Sliding-window prefetch: keep `concurrency` synthesis requests in flight while
  // writing results strictly in order. The previous implementation awaited each chunk
  // sequentially, so the `concurrency` argument had no effect and long inputs were
  // bottlenecked on round-trip latency per chunk.
  const inFlight = new Map();
  let aborted = false;

  const schedule = (index) => {
    if (index >= chunks.length) return;
    const task = getAudioChunk(chunks[index], ...ttsArgs, `#${index + 1}/${chunks.length}`, logCtx)
      .then((blob) => blob.arrayBuffer());
    // 必须在这里就挂上 handler，不能等主循环结束后补。unhandledRejection 的判定是
    // 时序性的：V8 在 microtask 队列排空的那一刻检查「此刻有没有 handler」，事后
    // 补 .catch() 只会换来 PromiseRejectionHandledWarning，拦不住那次上报。
    // 滑动窗口正好制造这个窗口期——窗口内靠后的分块可能在主循环仍阻塞于靠前的
    // 分块时就已 reject（实测 concurrency=4、chunk0 慢 400ms 时必然触发）。在
    // Workers 运行时里这会被记成 runtime exception，让已被正确处理的错误看着像事故。
    task.catch(() => {});
    inFlight.set(index, task);
  };

  try {
    const window = Math.max(1, Math.min(concurrency, chunks.length));
    for (let i = 0; i < window; i++) schedule(i);

    for (let i = 0; i < chunks.length; i++) {
      const buffer = await inFlight.get(i);
      if (logCtx) logCtx.bytes = (logCtx.bytes || 0) + buffer.byteLength;
      inFlight.delete(i);
      schedule(i + window);
      await writer.write(new Uint8Array(buffer));
    }
    await writer.close();
  } catch (error) {
    aborted = true;
    console.error("流式 TTS 失败:", error);
    // Surface the failure to the client as a broken stream rather than a silently
    // short-but-valid audio file, which is indistinguishable from a complete result.
    await writer.abort(error).catch(() => {});
    throw error;
  } finally {
    // 被放弃的预取已在 schedule() 里挂过 handler，这里无需再兜一次；只清引用。
    // aborted 时保留 Map 不清，是为了让仍在飞的请求保有引用直到自然结束。
    if (!aborted) inFlight.clear();
  }
}
/**
 * 把多个完整的 WAV 分块合并成单个合法 WAV。
 *
 * 做法：保留第一块的头部（含它自己的 fmt 块，采样率/位深/声道数由 FORMAT_MAP 固定，
 * 所有分块必然一致），把每一块的 data 负载抽出来接在一起，再改写 RIFF 与 data 两处
 * 长度字段。头部长度不能假设是 44 字节 —— 上游可能插入 LIST/fact 等附加块，所以按
 * RIFF 的 (id, size) 结构真正遍历到 data 块为止。
 *
 * 任何一块不像 WAV（缺 RIFF/WAVE 魔数或找不到 data 块）就退回裸拼接：那说明上游换了
 * 格式，此时猜测比原样透传更危险，且降级会记进日志而不是静默发生。
 */
// ---------------------------------------------------------------- WebM / Opus 合并
//
// 上游对每个分块返回一个**完整独立**的 WebM 容器。裸拼接后 `<audio>` 只认第一个容器：
// 实测 3 容器的响应里 Chrome 报 65.14s，而文件实际含 162.91s 音频 —— 静默丢掉 60%。
// （早前用 decodeAudioData 测得「完整」是假象：它会一路读完所有容器，而 UI 用的是
// `<audio>`。两者结论相反时，以用户真实走的那条路径为准。另外 duration 要 seek 到
// 超末尾才会被 Chrome 解析出来，只看 loadedmetadata 时的 null 会误判成上游特性。）
//
// 合并是纯字节层的，因为上游的封装恰好省掉了所有需要回填长度的元素：Segment 与 Cluster
// 都是 UNKNOWN-size，且没有 SeekHead / Cues / 顶层 Duration。于是只需保留块 0 的头部，
// 后续块丢掉头部、把每个 Cluster 的 Timecode 改写成绝对时间即可，没有任何 size 字段要动。
// Timecode 固定写成 8 字节（0xE7 0x88 + uint64BE），长度恒定，父级的 UNKNOWN size 不受影响。
//
// 成本实测（真 workerd，45 块 / 2.7MB / 21240 个 SimpleBlock）：约 1.2ms，是 10ms CPU
// 预算的 12%，与 concatWavBlobs 同量级。本机对 10 块 / 601KB 复测为 2.42ms，且输出的 PCM
// 与裸拼接逐字节相同 —— 只有时间戳变了，音频无损。
var WEBM_FRAME_MS = 20;      // 上游恒定 20ms 一帧（实测每个 SimpleBlock 的相对步长都是 20）
var OPUS_CODEC_DELAY_MS = 10; // 加上它才能消掉 ffmpeg 的 non-monotonic dts 告警（44 -> 0）

var EBML_ID = {
  SEGMENT: 0x18538067,
  CLUSTER: 0x1f43b675,
  TIMECODE: 0xe7,
  SIMPLEBLOCK: 0xa3
};

/** 读一个 EBML 变长整数。keepMarker 时返回含前导标记位的原始 ID。 */
function readEbmlVint(b, p, keepMarker) {
  const first = b[p];
  if (first === undefined) return null;
  let len = 1;
  let mask = 0x80;
  while (len <= 8 && !(first & mask)) {
    mask >>= 1;
    len++;
  }
  if (len > 8) return null;
  let val = keepMarker ? first : first & (mask - 1);
  // size 字段全 1 表示「长度未知」，这正是上游流式封装的写法。
  let allOnes = (first & (mask - 1)) === mask - 1;
  for (let i = 1; i < len; i++) {
    val = val * 256 + b[p + i];
    if (b[p + i] !== 0xff) allOnes = false;
  }
  return { val, len, unknown: !keepMarker && allOnes };
}

/** 定位一个分块的首个 Cluster、每个 Cluster 的 Timecode 位置，以及该块的时长。 */
function parseWebmChunk(b) {
  let p = 0;
  let firstCluster = -1;
  const clusters = [];
  let lastAbs = -1;
  let base = 0;
  while (p < b.length) {
    const id = readEbmlVint(b, p, true);
    if (!id) break;
    const size = readEbmlVint(b, p + id.len, false);
    if (!size) break;
    const body = p + id.len + size.len;
    if (id.val === EBML_ID.SEGMENT) {
      p = body;                                   // 进入 Segment
      continue;
    }
    if (id.val === EBML_ID.CLUSTER) {
      if (firstCluster < 0) firstCluster = p;
      clusters.push({ start: p, headerEnd: body });
      p = body;                                   // Cluster 也是 UNKNOWN-size，直接进入
      continue;
    }
    if (id.val === EBML_ID.TIMECODE && clusters.length) {
      let n = 0;
      for (let i = 0; i < size.val; i++) n = n * 256 + b[body + i];
      base = n;
      const c = clusters[clusters.length - 1];
      c.tcStart = p;
      c.tcEnd = body + size.val;
      c.tc = n;
      p = body + size.val;
      continue;
    }
    if (id.val === EBML_ID.SIMPLEBLOCK) {
      // track 号占 1 字节 vint，随后是 int16BE 的块内相对时间戳。
      const rel = (((b[body + 1] << 8) | b[body + 2]) << 16) >> 16;
      lastAbs = base + rel;
      p = body + size.val;
      continue;
    }
    if (size.unknown) {
      p = body;
      continue;
    }
    p = body + size.val;
  }
  if (firstCluster < 0) return null;              // 不像 WebM，交给调用方降级
  return { firstCluster, clusters, duration: lastAbs + WEBM_FRAME_MS };
}

/** Cluster Timecode 定长编码：0xE7 + 0x88(8 字节) + uint64BE，改写后长度不变。 */
function encodeClusterTimecode(ms) {
  const out = new Uint8Array(10);
  out[0] = EBML_ID.TIMECODE;
  out[1] = 0x88;
  let v = BigInt(ms);
  for (let i = 9; i >= 2; i--) {
    out[i] = Number(v & 0xffn);
    v >>= 8n;
  }
  return out;
}

/**
 * 把 N 个独立 WebM 容器合并成一个。任一分块解析不出 Cluster 就返回 null，
 * 由调用方降级为裸拼接并留日志（与 concatWavBlobs 的降级方式一致）。
 */
/**
 * 往合并结果的 Info 元素里插入顶层 Duration，让浏览器在 loadedmetadata 时就知道总时长。
 *
 * 为什么值得做：上游的 Segment 是 UNKNOWN-size 且不声明 Duration，所以 `<audio>.duration`
 * 在 loadedmetadata 时是 null —— 原生进度条一片空白，要等用户 seek 过末尾浏览器才解析出
 * 时长。实测注入后 loadedmetadata 时 duration/seekable 直接是 28.35，ffprobe 也从 N/A 变成
 * 28.350000（零告警）。代价是 11 字节、0.177ms。
 *
 * 为什么能原地做：Info 的 size 是**已知长度**，所以插 11 字节必须同时改写它 —— 而上游把所有
 * size 都编成 8 字节 vint（实测 `01 00 00 00 00 00 00 56` = 86），能表示到 2^56-1，
 * 86 -> 97 只改值字节、编码宽度不变，因此后续字节一个都不用移动。
 * 只处理这种 8 字节编码；换成别的宽度就放弃注入（返回原样），因为那时改 size 会让字段变宽、
 * 需要整体搬移，收益不值得那个复杂度。
 */
function injectWebmDuration(bytes, durationMs) {
  let infoAt = -1;
  for (let i = 0; i + 4 <= bytes.length; i++) {
    if (bytes[i] === 0x15 && bytes[i + 1] === 0x49 && bytes[i + 2] === 0xa9 && bytes[i + 3] === 0x66) {
      infoAt = i;
      break;
    }
  }
  if (infoAt < 0) return bytes;                 // 没有 Info，放弃注入
  const sizeAt = infoAt + 4;
  if (bytes[sizeAt] !== 0x01) return bytes;     // 不是 8 字节 vint，放弃（见上）
  let size = 0;
  for (let i = sizeAt + 1; i < sizeAt + 8; i++) size = size * 256 + bytes[i];
  const bodyAt = sizeAt + 8;
  if (bodyAt + size > bytes.length) return bytes;   // size 与实际不符，别碰

  // Duration = 0x4489 + size 标记 0x88 + float64 BE，共 11 字节
  const dur = new Uint8Array(11);
  dur[0] = 0x44;
  dur[1] = 0x89;
  dur[2] = 0x88;
  new DataView(dur.buffer).setFloat64(3, durationMs, false);

  const out = new Uint8Array(bytes.length + dur.length);
  out.set(bytes.subarray(0, bodyAt), 0);
  out.set(dur, bodyAt);                         // 放在 Info body 开头
  out.set(bytes.subarray(bodyAt), bodyAt + dur.length);
  // 原地把 Info 的 size 加 11（编码宽度不变）
  let v = size + dur.length;
  for (let i = sizeAt + 7; i >= sizeAt + 1; i--) {
    out[i] = v & 0xff;
    v = Math.floor(v / 256);
  }
  return out;
}

function mergeWebmChunks(buffers) {
  // 空输入返回 null（降级）而不是抛。生产上进不来（调用点有 length > 1 的前提），
  // 但这是个**纯字节函数**、且经测试导出可被直接调用，按项目自己的规则
  // 「无法处理时要降级留痕，不要抛」它就该这么写 —— 模块审计里 fuzz 到的唯一一处会抛的输入。
  //
  // 注：这段注释刻意不写那个测试导出的**字面名字**。CI 有一步是
  // `grep -q "<那个名字>" dist/worker.js` 就报错，用来确认构建剥掉了测试专用导出；
  // 而构建只剥导出、保留注释，所以注释里提到它会让 CI 变红（我已经踩过一次）。
  if (!buffers || buffers.length === 0) return null;
  const parsed = [];
  for (const buf of buffers) {
    const bytes = new Uint8Array(buf);
    const info = parseWebmChunk(bytes);
    if (!info) return null;
    parsed.push({ bytes, info });
  }
  const pieces = [];
  // 块 0 的头部（EBML + Segment + Info + Tracks）原样保留，后续块的头部全部丢弃。
  pieces.push(parsed[0].bytes.subarray(0, parsed[0].info.firstCluster));
  let offset = 0;
  for (const { bytes, info } of parsed) {
    for (let i = 0; i < info.clusters.length; i++) {
      const c = info.clusters[i];
      const end = i + 1 < info.clusters.length ? info.clusters[i + 1].start : bytes.length;
      pieces.push(bytes.subarray(c.start, c.headerEnd));       // Cluster ID + UNKNOWN size
      pieces.push(encodeClusterTimecode(c.tc + offset));       // 改写成绝对时间
      pieces.push(bytes.subarray(c.tcEnd, end));               // SimpleBlock 原样透传
    }
    offset += info.duration + OPUS_CODEC_DELAY_MS;
  }
  let total = 0;
  for (const piece of pieces) total += piece.length;
  const out = new Uint8Array(total);
  let w = 0;
  for (const piece of pieces) {
    out.set(piece, w);
    w += piece.length;
  }
  // offset 此时正好等于所有分块的时长之和（含每块的 CodecDelay 尾），即合并后的总时长。
  return injectWebmDuration(out, offset);
}

async function concatWebmBlobs(blobs, contentType, logCtx = null) {
  const buffers = await Promise.all(blobs.map((b) => b.arrayBuffer()));
  const merged = mergeWebmChunks(buffers);
  if (!merged) {
    if (logCtx) logCtx.degraded = "webm_merge_declined";
    console.warn("WebM 合并：分块里找不到 Cluster，退回裸拼接");
    return new Blob(blobs, { type: contentType });
  }
  return new Blob([merged], { type: contentType });
}

async function concatWavBlobs(blobs, contentType, logCtx = null) {
  const buffers = await Promise.all(blobs.map((b) => b.arrayBuffer()));
  const parsed = [];
  for (const buf of buffers) {
    const view = new DataView(buf);
    const bytes = new Uint8Array(buf);
    const magic = (off) => String.fromCharCode(bytes[off], bytes[off + 1], bytes[off + 2], bytes[off + 3]);
    if (buf.byteLength < 12 || magic(0) !== "RIFF" || magic(8) !== "WAVE") {
      if (logCtx) logCtx.degraded = "wav_merge_declined_no_riff";
      console.warn("WAV 合并：分块缺少 RIFF/WAVE 魔数，退回裸拼接");
      return new Blob(blobs, { type: contentType });
    }
    // 遍历 RIFF 子块找到 data，而不是假设头部固定 44 字节。
    let offset = 12;
    let data = null;
    while (offset + 8 <= buf.byteLength) {
      const id = magic(offset);
      const size = view.getUint32(offset + 4, true);
      const body = offset + 8;
      if (id === "data") {
        // 上游可能把 size 写成 0 或超出实际长度（流式生成的 WAV 常见），
        // 以实际剩余字节为准，避免截断或越界。
        const usable = Math.min(size || buf.byteLength - body, buf.byteLength - body);
        data = { start: body, length: usable, headerEnd: body };
        break;
      }
      offset = body + size + (size % 2); // RIFF 块按偶数字节对齐
    }
    if (!data) {
      if (logCtx) logCtx.degraded = "wav_merge_declined_no_data";
      console.warn("WAV 合并：分块里找不到 data 块，退回裸拼接");
      return new Blob(blobs, { type: contentType });
    }
    parsed.push({ bytes, data });
  }

  const header = parsed[0].bytes.slice(0, parsed[0].data.headerEnd);
  const totalData = parsed.reduce((sum, p) => sum + p.data.length, 0);
  const out = new Uint8Array(header.length + totalData);
  out.set(header, 0);
  let write = header.length;
  for (const p of parsed) {
    out.set(p.bytes.subarray(p.data.start, p.data.start + p.data.length), write);
    write += p.data.length;
  }
  // 改写两处长度：RIFF size（不含前 8 字节）与 data size。
  const outView = new DataView(out.buffer);
  outView.setUint32(4, out.length - 8, true);
  outView.setUint32(header.length - 4, totalData, true);
  return new Blob([out], { type: contentType });
}

/**
 * 用固定大小的工作池并发合成所有分块，结果按原始下标归位。
 *
 * 取代原先的「每 concurrency 块 Promise.all 一批」：那种分批有栅栏，每批的耗时是
 * **该批最慢一块**，而不是平均值。上游延迟有长尾（多数 ~100ms，偶发 500ms+），
 * 于是一块慢就让同批另外 9 个槽位空转到批结束。
 *
 * 实测（真 worker + mock 上游，每 10 块里第 4 块 500ms、其余 100ms）：
 * 12 块/并发 10 = 645ms，而工作量下界是 160ms。工作池把槽位一空就立刻补下一块，
 * 总耗时收敛到 sum(work)/concurrency 附近。
 *
 * 流式路径（pipeChunksToStream）本来就是滑动窗口 —— 它必须按序输出，逼得它显式记
 * 下标，顺手就成了工作池。非流式靠 Promise.all 白拿顺序，分批写法看着对，就没人发现
 * 它在白扔延迟。这里补齐，两条路径的调度语义从此一致。
 */
async function synthesizeAllChunks(textChunks, concurrency, ttsArgs, logCtx) {
  const out = new Array(textChunks.length);
  const width = Math.max(1, Math.min(concurrency, textChunks.length));
  let next = 0;
  // 一块失败则整个响应必定失败，剩下的分块再合成也没人要。必须显式停：
  // 分批实现里栅栏**顺带**当了熔断（一批做完才开下一批，所以最多多花一批），
  // 工作池没有批边界，不设这个标志就会把整个数组抽干 —— 实测 45 块 / 并发 10、
  // 第 1 块就 400：分批只发 10 次上游调用，无标志的工作池发满 45 次。
  // 那 35 次既白烧 subrequest 配额（单次调用上限 50），又白打上游。
  let failed = false;
  const worker = async () => {
    while (!failed) {
      const i = next++;
      if (i >= textChunks.length) return;
      try {
        out[i] = await getAudioChunk(textChunks[i], ...ttsArgs, `#${i + 1}/${textChunks.length}`, logCtx);
      } catch (error) {
        failed = true; // 先置位再抛，让同伴 worker 在下一轮循环即退出
        throw error;
      }
    }
  };
  // 任一 worker 抛错就整体 reject（和 Promise.all 语义一致，调用方的 catch 不变）。
  await Promise.all(Array.from({ length: width }, worker));
  return out;
}

async function getVoice(textChunks, concurrency, logCtx, ...ttsArgs) {
  const contentType = ttsArgs[5] || "audio/mpeg";
  try {
    const allAudioBlobs = await synthesizeAllChunks(textChunks, concurrency, ttsArgs, logCtx);
    // WAV 是带头部的容器：裸拼接 N 个分块等于把 N 个完整 RIFF 文件首尾相接，
    // 播放器读到第一个头里的 data 长度就停了，后面全部音频被静默丢弃。默认
    // chunk_size=300，所以约 300 字符以上的输入就会触发——用户听到的是被截断的
    // 语音，且响应是 200 + 合法 WAV，无法与正常结果区分。opus/webm 有同样性质的问题
    // （`<audio>` 只认第一个容器，实测 3 容器时 65.14s / 实际 162.91s），见
    // mergeWebmChunks。mp3/pcm 不受影响：前者帧自同步、后者无头部。
    let audioBody;
    if (allAudioBlobs.length > 1 && contentType === "audio/wav") {
      audioBody = await concatWavBlobs(allAudioBlobs, contentType, logCtx);
    } else if (allAudioBlobs.length > 1 && contentType === "audio/webm") {
      audioBody = await concatWebmBlobs(allAudioBlobs, contentType, logCtx);
    } else {
      audioBody = new Blob(allAudioBlobs, { type: contentType });
    }
    if (logCtx) logCtx.bytes = audioBody.size;
    // 上游会对「文本的语种该音色完全不支持」返回 **200 + 0 字节**，而不是报错。
    // 线上实测（2026-08-06）：中文 / 日文 / 纯标点 送给 en-US-AvaNeural，5/5 次都是
    // `200 audio/mpeg, content-length: 0`；同一音色送英文正常（12240B），同一中文送
    // en-US-AvaMultilingualNeural 也正常（10656B）。zh-CN 音色读英文没问题，所以这不是
    // 「跨语种」而是「该音色对这套书写系统零覆盖」。
    //
    // 原样透传 = 又一次静默失败：调用方拿到的是格式合法的空音频，与成功无法区分
    // （本项目已经为 WAV / Opus 各修过一次同类问题）。UI 侧早已拒绝零字节流，但直连
    // API 的调用方没有这层保护。这里明确报错，并指出可执行的出路。
    if (audioBody.size === 0) {
      return errorResponse(
        "上游返回了空音频（0 字节）。最常见的原因是该 voice 完全不支持这段文本的书写系统 —— " +
          "例如把中文送给 en-US-AvaNeural。请换成对应语种的音色，或用带 Multilingual 的音色；" +
          "可用 id 见 GET /v1/models。",
        502,
        "upstream_empty_audio",
        "api_error",
        null,
        "voice"
      );
    }
    return new Response(audioBody, {
      headers: { "Content-Type": contentType, ...makeCORSHeaders() }
    });
  } catch (error) {
    // 完整错误(含堆栈)只进日志；回给调用方的是我们自己的措辞 + 机器码，
    // 避免任何内部实现细节(上游原文、路径、依赖名)顺着 message 泄漏出去。
    console.error("非流式 TTS 失败:", error);
    // 上游的 4xx 是**调用方**的错误，不该报成 500。最常见的情形是 voice 形状合法
    // （通得过 VOICE_RE）但上游没有这个音色 —— 报 500 会让调用方去查我们的服务状态，
    // 而真正该做的是换一个音色。上游原文仍然只进日志，不进响应（见 getAudioChunk）。
    if (error?.status >= 400 && error.status < 500) {
      return errorResponse(
        `上游拒绝了该请求（${error.status}）。最常见的原因是 voice 不存在 —— ` +
          "请用 GET /v1/models 里的 id；也可能是 style 不被该音色支持。",
        400,
        "upstream_rejected_request"
      );
    }
    return errorResponse("语音合成失败，请稍后重试", 500, "tts_generation_error");
  }
}
var MAX_CHUNK_ATTEMPTS = 3;

async function getAudioChunk(text, voiceName, rate, pitch, style, outputFormat, contentType, label = "", logCtx = null) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_CHUNK_ATTEMPTS; attempt++) {
    try {
      // A 401 means the cached token expired mid-request; force a refresh before retrying.
      const endpoint = await getEndpoint({ forceRefresh: attempt > 1 && lastError?.status === 401 });
      const url = `https://${endpoint.r}.tts.speech.microsoft.com/cognitiveservices/v1`;
      const ssml = getSsml(text, voiceName, rate, pitch, style);
      // 计在 fetch 之前：这一次尝试无论成败都消耗了一个 subrequest 配额（上限 50/次调用），
      // 所以「实际发出多少」才是要观测的量，不是「成功多少」。
      if (logCtx) logCtx.upstreamCalls++;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": endpoint.t,
          "Content-Type": "application/ssml+xml",
          "User-Agent": "okhttp/4.5.0",
          "X-Microsoft-OutputFormat": outputFormat
        },
        body: ssml
      });
      if (!response.ok) {
        const errorText = await response.text();
        // 上游的响应体只进日志，不进 Error.message —— 因为 getVoice 的 catch 会把
        // error.message 原样放进 HTTP 响应，等于把微软的错误原文(可能含订阅密钥片段、
        // 内部主机名、请求 ID)转发给任意调用方。实测泄漏过
        // "Subscription key sk-... rejected at /internal/host" 这种内容。
        // 带上分块序号与输出格式：多分块并发重试时，光看「第 2 次失败」分不清是同一个分块
        // 反复失败还是多个分块都在失败 —— 这两种情况的处置完全不同（前者多半是那段文本有
        // 问题，后者是上游整体在限流）。format 则让「只有 wav 出问题」这类模式看得见。
        console.error(
          `上游合成失败${label}[${outputFormat}]: ${response.status} ${response.statusText} - ` +
            errorText.slice(0, 500)
        );
        const err = new Error(`上游语音合成失败（${response.status}）`);
        err.status = response.status;
        throw err;
      }
      return response.blob();
    } catch (error) {
      lastError = error;
      // 4xx other than 401/408/429 are caller errors — retrying cannot help.
      const status = error?.status;
      const retryable = !status || status === 401 || status === 408 || status === 429 || status >= 500;
      if (!retryable || attempt === MAX_CHUNK_ATTEMPTS) throw error;
      if (logCtx) logCtx.retries++;
      console.warn(`分块${label}合成第 ${attempt} 次失败（${status ?? "network"}），重试中`);
      await new Promise((r) => setTimeout(r, 150 * attempt));
    }
  }
  throw lastError;
}
var tokenInfo = { endpoint: null, token: null, expiredAt: null };
var TOKEN_REFRESH_BEFORE_EXPIRY = 5 * 60;
var tokenRefreshInFlight = null;

async function getEndpoint({ forceRefresh = false } = {}) {
  const now = Date.now() / 1e3;
  if (!forceRefresh && tokenInfo.token && tokenInfo.expiredAt && now < tokenInfo.expiredAt - TOKEN_REFRESH_BEFORE_EXPIRY) {
    return tokenInfo.endpoint;
  }
  // Coalesce concurrent refreshes: with a sliding window of N in-flight chunk requests,
  // an expired token would otherwise trigger N simultaneous token fetches.
  if (tokenRefreshInFlight) return tokenRefreshInFlight;
  tokenRefreshInFlight = fetchEndpoint(now).finally(() => {
    tokenRefreshInFlight = null;
  });
  return tokenRefreshInFlight;
}

async function fetchEndpoint(now) {
  const endpointUrl = "https://dev.microsofttranslator.com/apps/endpoint?api-version=1.0";
  const clientId = crypto.randomUUID().replace(/-/g, "");
  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Accept-Language": "zh-Hans",
        "X-ClientVersion": "4.0.530a 5fe1dc6c",
        "X-UserId": "0f04d16a175c411e",
        "X-HomeGeographicRegion": "zh-Hans-CN",
        "X-ClientTraceId": clientId,
        "X-MT-Signature": await sign(endpointUrl),
        "User-Agent": "okhttp/4.5.0",
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": "0",
        "Accept-Encoding": "gzip"
      }
    });
    if (!response.ok) {
      throw new Error(`获取端点失败: ${response.status}`);
    }
    const data = await response.json();
    const jwt = data.t.split(".")[1];
    const decodedJwt = JSON.parse(atob(jwt));
    tokenInfo = {
      endpoint: data,
      token: data.t,
      expiredAt: decodedJwt.exp
    };
    console.log(`成功获取新 Token，有效期 ${((decodedJwt.exp - now) / 60).toFixed(1)} 分钟`);
    return data;
  } catch (error) {
    console.error("获取端点失败:", error);
    // 缓存 token 只有**还没到期**时才配得上当兜底。getEndpoint 提前 5 分钟就刷新，
    // 所以这里的缓存通常是「还有几分钟寿命」的，拿它顶过一次上游抖动是划算的。
    //
    // 但原来的判断只看 `tokenInfo.token` 存不存在，过期的照样返回。结果是一条谁都
    // 想不到的因果链：token 端点挂 + 缓存已过期 → 返回死 token → 上游 401 → 401 属
    // 可重试 → forceRefresh → token 端点还是挂 → 又返回同一个死 token → 三次耗尽 →
    // 抛出 status 401 → getVoice 把 4xx 当调用方错误 → 回给用户「voice 不存在，请用
    // GET /v1/models 里的 id」。真实原因是我们自己的 token 拿不到，却让调用方去换音色。
    // 实测复现：status=400 + 那句音色文案，token 端点被调用 3 次。
    // `tokenInfo.expiredAt &&` is redundant for behaviour — `n < null` is already false —
    // and a mutation run will flag dropping it as a surviving mutant. It is an equivalent
    // mutant, not a coverage gap: the guard is kept so the intent (both fields must be
    // populated) reads explicitly rather than resting on a coercion rule.
    if (tokenInfo.token && tokenInfo.expiredAt && Date.now() / 1e3 < tokenInfo.expiredAt) {
      const leftSec = tokenInfo.expiredAt - Date.now() / 1e3;
      console.warn(`token 刷新失败，改用仍有效的缓存 Token 兜底（剩余 ${(leftSec / 60).toFixed(1)} 分钟）`);
      return tokenInfo.endpoint;
    }
    if (tokenInfo.token) {
      // 有缓存但已过期：拿它去打上游是必然 401，只会把真实原因掩埋成音色错误。
      console.error("token 刷新失败且缓存 Token 已过期，不再用它兜底");
    }
    throw error;
  }
}
async function sign(urlStr) {
  const url = urlStr.split("://")[1];
  const encodedUrl = encodeURIComponent(url);
  const uuidStr = crypto.randomUUID().replace(/-/g, "");
  const formattedDate = (/* @__PURE__ */ new Date()).toUTCString().replace(/GMT/, "").trim() + " GMT";
  const bytesToSign = `MSTranslatorAndroidApp${encodedUrl}${formattedDate}${uuidStr}`.toLowerCase();
  const decode = await base64ToBytes("oik6PdDdMnOXemTbwvMn9de/h9lFnfBaCWbGMMZqqoSaQaqUOqjVGm5NqsmjcBI1x+sS9ugjB55HEJWRiFXYFw==");
  const signData = await hmacSha256(decode, bytesToSign);
  const signBase64 = await bytesToBase64(signData);
  return `MSTranslatorAndroidApp::${signBase64}::${formattedDate}::${uuidStr}`;
}
async function hmacSha256(key, data) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(data));
  return new Uint8Array(signature);
}
async function base64ToBytes(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
async function bytesToBase64(bytes) {
  return btoa(String.fromCharCode.apply(null, bytes));
}
// Escapes a value for use inside a double-quoted XML attribute.
function escapeXmlAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getSsml(text, voiceName, rate, pitch, style) {
  // <break> is the one tag callers may legitimately embed, so it is preserved verbatim
  // while everything else in the text is escaped. The placeholder includes a random
  // token so text that literally contains the placeholder string cannot forge a tag.
  const nonce = crypto.randomUUID().replace(/-/g, "");
  // 只保留**格式正确**的 <break>,其余(含未自闭合的 <break time="1s">、非法/负数 time)
  // 落到下面的转义分支,变成无害的正文,而不是原样透传给上游。
  //
  // 之前的正则太宽:time="[^"]*" 会吞下 "abc"、"-5s";末尾 /? 让 <break time="1s">(无斜杠)
  // 也被当标签保留。这三种上游都回 400,而调用方看到的却是「voice 不存在」那句误导性错误
  // (实测 voice 明明合法)。收紧后:必须自闭合(/>),time 若有则为可选负号后跟数字、
  // 可选小数、可选 s/ms 单位 —— 与实测上游接受的形态一致(接受 "1s"/"500ms"/"0.5s"/"1",
  // 拒绝 "abc"/"-5s"/无斜杠)。负号允许进正则、但值非法的交给上游判(这里只挡明显畸形)。
  const breakTagRegex = /<break(?:\s+time=(?:"[0-9]+(?:\.[0-9]+)?(?:ms|s)?"|'[0-9]+(?:\.[0-9]+)?(?:ms|s)?'))?\s*\/>/gi;
  const breakTags = [];
  const processedText = text.replace(breakTagRegex, (match) => {
    const placeholder = `__BREAK_${nonce}_${breakTags.length}__`;
    breakTags.push(match);
    return placeholder;
  });
  const sanitizedText = processedText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let finalText = sanitizedText;
  breakTags.forEach((tag, index) => {
    // Function replacement so `$&`, `$1`, etc. inside a break tag's attributes are
    // inserted literally rather than expanded as replacement patterns (which would
    // leak the internal nonce placeholder into the outgoing SSML).
    finalText = finalText.replace(`__BREAK_${nonce}_${index}__`, () => tag);
  });
  // voiceName/style are already whitelist-validated in handleSpeechRequest; escaping here
  // keeps getSsml safe on its own so a future caller can't reintroduce SSML injection.
  return `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" version="1.0" xml:lang="en-US">
    <voice name="${escapeXmlAttr(voiceName)}">
      <mstts:express-as style="${escapeXmlAttr(style)}">
        <prosody rate="${escapeXmlAttr(rate)}%" pitch="${escapeXmlAttr(pitch)}%">${finalText}</prosody>
      </mstts:express-as>
    </voice>
  </speak>`;
}
function smartChunkText(text, maxChunkLength) {
  if (!text) return [];
  const chunks = [];
  let currentChunk = "";

  const flush = () => {
    if (currentChunk.trim()) chunks.push(currentChunk.trim());
    currentChunk = "";
  };

  // SSML 标签必须整块保留。分隔符里含 `,` 和 `:`，而 `<break time="500ms"/>` 内部就有
  // 引号和数字后的单位，一旦按分隔符切开，两半各自进不同分块，getSsml 里再转义就变成
  // 字面量 &lt;break…，被当正文念出来（UI 的「插入停顿」按钮生成的正是这个标签）。
  // 先把标签整体切出来当作不可分割的原子片段，再对其余文本做正常的标点切分。
  const SSML_TAG = /<\/?[a-zA-Z][^<>]*\/?>/g;
  const atoms = [];
  let cursor = 0;
  for (const tag of text.matchAll(SSML_TAG)) {
    if (tag.index > cursor) atoms.push({ text: text.slice(cursor, tag.index), splittable: true });
    atoms.push({ text: tag[0], splittable: false });
    cursor = tag.index + tag[0].length;
  }
  if (cursor < text.length) atoms.push({ text: text.slice(cursor), splittable: true });

  // 展开成 (片段, 是否可切) 的序列。splittable 必须一路带到下面的硬切分支：一个
  // `<break time="500ms"/>` 有 21 字符，只要 chunk_size 比它小，硬切照样会把它劈成两半。
  const sentences = atoms.flatMap((a) =>
    a.splittable
      ? a.text.split(/([.?!,;:\n。？！，；：\r]+)/g).map((t) => ({ text: t, splittable: true }))
      : [{ text: a.text, splittable: false }]
  );
  for (const { text: part, splittable } of sentences) {
    if (currentChunk.length + part.length <= maxChunkLength) {
      currentChunk += part;
      continue;
    }
    flush();
    // 标签宁可超出 chunk_size 也不能切开：超长一点上游能接受，标签断裂则一定被念出来。
    if (!splittable) {
      currentChunk = part;
      continue;
    }
    // A single segment with no usable break point (e.g. a long unpunctuated paragraph)
    // still has to be split, otherwise it goes upstream over the length limit.
    if (part.length > maxChunkLength) {
      for (let i = 0; i < part.length; i += maxChunkLength) {
        const slice = part.slice(i, i + maxChunkLength);
        if (slice.length === maxChunkLength) {
          if (slice.trim()) chunks.push(slice.trim());
        } else {
          currentChunk = slice; // keep the tail open for the next segment
        }
      }
    } else {
      currentChunk = part;
    }
  }
  flush();
  return chunks.filter((chunk) => chunk.length > 0);
}
function cleanText(text, options) {
  let cleanedText = text;
  // Markdown must run before URL stripping: the URL regex is greedy over non-space, so
  // on `[docs](https://x.com/a)` it would swallow the closing paren and leave `[docs](`,
  // which reads aloud as bracket noise. Extracting the link text first turns it into
  // `docs`, and any bare URL left over is removed in the URL pass below.
  if (options.remove_markdown) {
    // 定界符用「排除自身的字符类」而不是 .*? / .+? —— 这是 ReDoS 防线，不是风格偏好。
    // 懒量词并不免疫灾难性回溯：`\[(.*?)\]\(.*?\)` 遇到 "![](" 重复 N 次这种畸形输入时，
    // 每个 `[` 都是一个候选起点，而 `.*?` 会为每个起点逐字符扩张去找 `](`，匹配到了 `\)`
    // 又失败、回溯再扩张，复杂度是超线性的。实测 4KB 输入 656ms、8KB 4.7s、16KB 36s，
    // 而 Workers 的 CPU 上限是 10ms —— 一个远小于 MAX_BODY_BYTES 的请求就能打爆 Worker。
    // 换成 [^\]]* / [^)]* 后引擎无法跨越定界符扩张，16KB 从 36156ms 降到 42ms（863 倍），
    // 且对合法 Markdown 的输出逐例一致（见 test/unit/redos.test.mjs 的等价性断言）。
    // URL 部分允许**一层配平括号**：`[^)]*` 会在第一个 `)` 就停，于是
    // `[铝](https://zh.wikipedia.org/wiki/铝_(元素))` 只吃到 `..._(元素`，
    // 剩下的 `)` 漏出来被念成「右括号」—— 维基百科链接是最常见来源，实测 4/4 都残留。
    // `(?:[^()]|\([^()]*\))*` 表示「非括号字符，或一整对不含嵌套的括号」，仍是线性的
    // （每个位置只有一种匹配方式，没有可回溯的歧义），不引入 ReDoS。
    // 一层就够：CommonMark 的裸 URL 里两层以上括号极罕见，而层数无上限的写法要用递归。
    const URL_PART = "\\((?:[^()]|\\([^()]*\\))*\\)";
    cleanedText = cleanedText.replace(new RegExp("!\\[[^\\]]*\\]" + URL_PART, "g"), "");
    cleanedText = cleanedText.replace(new RegExp("\\[([^\\]]*)\\]" + URL_PART, "g"), "$1");
    // ** 与 __ 分开处理，且**两条都要 \w 边界**。原来共用 /(\*\*|__)(.*?)\1/，于是两者都
    // 拿不到保护，而下面单 `_` 那条早就有了 —— 同一份代码对同类输入两种待遇，这是漏了。
    // 实测受害的都是真实文本：
    //   my__temp__value -> mytempvalue    MAX__SIZE__LIMIT -> MAXSIZELIMIT
    //   x**2**y         -> x2y            file**name**.txt -> filename.txt
    //
    // 加 \w 边界对**中文粗体零影响**，因为 JS 的 `\w` 只等价 [A-Za-z0-9_]，中文字符不在其中
    // （实测 /\w/.test("重") === false）。我一度以为「中文没有词边界，加了会打破中文粗体」，
    // 那是错的 —— 变异测试发现这条注释与代码不符时才查出来：把边界加上，
    // `这是**重点**内容` 依然正确得到 `这是重点内容`。
    //
    // 已知残留歧义：`__init__ 方法`（前后都是空格）与真粗体 `__粗体__` 在语法上**无法区分**，
    // 仍会被当粗体处理。这是 markdown 本身的歧义，不是可修的 bug —— CommonMark 也这么判。
    // 同理 `**a**b**c**` 这种连续写法只处理首尾一组。
    cleanedText = cleanedText.replace(/(^|[^\w])\*\*(?!\s)(.+?)\*\*(?![\w])/g, "$1$2");
    cleanedText = cleanedText.replace(/(^|[^\w])__(?!\s)([^_]+)__(?![\w])/g, "$1$2");
    // 单 `*` 与单 `_` 同样要 \w 边界，理由与上面 **/__ 一致，且这条能救回**算式与标识符**：
    //   2*3*4 -> 234（乘法被当斜体）    a*b*c -> abc
    // 中文斜体不受影响（中文不是 \w）：`这是*重点*内容` 仍得到 `这是重点内容`。
    // 也排除 `*` 本身，避免与上面的 ** 规则相互啃咬 —— 这是端到端验证才发现的：
    // 给 ** 加边界后 `x**2**y` 被这条接手成了 `x*2*y`，修一条却被下一条抵消。
    cleanedText = cleanedText.replace(/(^|[^\w*])\*(?!\s)([^*]+)\*(?![\w*])/g, "$1$2");
    // 同上：(.+?) 换成 ([^_]+)，否则 " _a" 重复 N 次时 48KB 要 322ms。
    cleanedText = cleanedText.replace(/(^|[^\w])_(?!\s)([^_]+)_(?![\w])/g, "$1$2");
    // 首尾反引号数量必须**一致**（反向引用 \1），否则 `` `a``b` `` 会被贪婪地吃成 "ab`"，
    // 留一个反引号被念出来。实测 `用 `a``b` 表示` -> `用 ab` 表示`。
    cleanedText = cleanedText.replace(/(`{1,3})([^`]*)\1/g, "$2");
    cleanedText = cleanedText.replace(/#{1,6}\s/g, "");
  }
  if (options.remove_urls) {
    // 脏数据来源：LLM 输出、网页正文、聊天记录粘贴 —— 这些是本服务最主要的输入。
    // 裸 URL 念出来是「h-t-t-p-s 冒号 斜杠 斜杠…」几十秒噪音，用户几乎从不想听。
    // 只吃 http(s)：`www.x.com` 这类无协议前缀的写法读起来是正常单词，不该删。
    cleanedText = cleanedText.replace(/(https?:\/\/[^\s]+)/g, "");
  }
  if (options.custom_keywords) {
    // 脏数据来源：调用方自己的模板噪音 —— 典型是「本文由 AI 生成」「点赞关注」「广告」
    // 这类每篇都出现、又不该念的固定串。所以由调用方给列表，服务端不猜。
    // filter((k) => k) 挡的是空串：`"a,,b"` 或 `" , "` 会产生空项，拼出 `/a||b/` ——
    // 中间那个空分支在**每个位置都先匹配成功**，于是后面的分支被遮蔽、永远轮不到。
    // 实测 `"banana".replace(/a||b/g, "")` 得到 `"bnn"`（b 没被删），而正确的
    // `/a|b/g` 得到 `"nn"`。因为替换成空串，肉眼看不出「少删了」，只有逐例比对才发现 ——
    // 用 `-` 替换就能看清空分支的存在：`"hello".replace(/a||b/g, "-")` = `"-h-e-l-l-o-"`。
    const keywords = options.custom_keywords.split(",").map((k) => k.trim()).filter((k) => k);
    if (keywords.length > 0) {
      const escapedKeywords = keywords.map(
        (k) => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
      );
      const regex = new RegExp(escapedKeywords.join("|"), "g");
      cleanedText = cleanedText.replace(regex, "");
    }
  }
  if (options.remove_emoji) {
    // 两条规则，缺一不可：
    //
    // 1. `\p{Emoji_Presentation}` —— 默认就以图形呈现的 emoji（😀 ✅ 👍🏽 👨‍👩‍👧）。
    // 2. `\p{Extended_Pictographic}️` —— **默认是文本样式、靠 VS16(U+FE0F) 变成
    //    emoji** 的那批。它们不在 Emoji_Presentation 里，所以此前会残留下来被念出来：
    //    实测「我❤️你」清理后仍是「我❤️你」，「天气☀️晴」仍带 ☀️。
    //
    // 为什么不干脆整个换成 `\p{Extended_Pictographic}`：那会连 **© 和 ™ 一起删掉**
    // （实测两者 Extended_Pictographic=true、Emoji_Presentation=false）。它们是正常文本，
    // 「©2026」念成「2026」是另一种数据损坏 —— 拿一个 bug 换另一个 bug 不算修好。
    // 加 `️` 限定后，只命中「明确被标记为要当 emoji 显示」的那些。
    //
    // VS16 规则要放在前面：先吃掉「图形+VS16」的整体，再让规则 1 处理剩下的，
    // 否则 Emoji_Presentation 那条可能先删掉基字符、留下一个孤立的 U+FE0F。
    cleanedText = cleanedText.replace(/\p{Extended_Pictographic}️/gu, "");
    cleanedText = cleanedText.replace(/\p{Emoji_Presentation}/gu, "");
  }
  if (options.remove_citation_numbers) {
    // 目标是「如前所述 1。」这类**引用编号**：一个空格 + 1-2 位数字 + 紧跟标点。
    //
    // 原来的 `(?=[.。，,;；:：]|$)` 把 ASCII 句点也算作结束标点，于是分不清「句号」和
    // 「小数点」—— " 3.14159" 里的 " 3" 后面紧跟 "."，被当成编号删掉，只剩 ".14159"。
    // 实测 7/7 个含小数的句子被破坏：
    //   圆周率 3.14159 -> 圆周率.14159      价格 12.50 元 -> 价格.50 元
    //   温度 36.5 度   -> 温度.5 度         涨了 8.5%     -> 涨了.5%
    // 用户听到「点一四一五九」而不是「三点一四一五九」，而响应是 200 + 合法音频，
    // 数字却是错的 —— 又一个静默失败。而 `removeCitation` 是 **UI 默认开启**的。
    //
    // 修法：ASCII 句点后面**不能紧跟数字**（那是小数），全角句号 `。` 不受影响
    // （它不做小数点，`36。5` 不是合法写法）。逗号同理：`1,234` 是千分位分隔符。
    cleanedText = cleanedText.replace(
      /\s\d{1,2}(?=。|[.](?![0-9])|[,](?![0-9])|[，;；:：]|$)/g,
      ""
    );
  }
  if (options.remove_line_breaks) {
    // 脏数据来源：PDF / 代码块 / 邮件引用里的硬换行，以及上面几条清理留下的连续空白
    // （删掉 URL 或图片后原地会留下空隙）。上游把换行当停顿处理，逐行朗读会变得断断续续。
    // 必须放在**最后**：前面每一条清理都可能产生新的连续空白，先归一化就白做了。
    cleanedText = cleanedText.replace(/\s+/g, " ");
  }
  return cleanedText.trim();
}
/**
 * code -> 出错的请求字段。OpenAI 的错误结构里 param 就是干这个的，而我们此前 26 个错误
 * 出口全都硬写 `param: null`。
 *
 * 为什么用映射而不是给 errorResponse 加第 6 个参数：有两个 code 各自服务两种不同原因
 * （`invalid_request_error` = body 不是 JSON / input 字段缺失；`invalid_cleaning_options`
 * = 容器类型错 / custom_keywords 类型错），调用方光看 code 分辨不出该改哪个字段。改 code
 * 会破坏既有调用方（测试也钉着它们），而补 param 是**纯新增**：老调用方读不到就当没有，
 * 新调用方能精确定位。一处映射即可，26 个调用点一行都不用动。
 *
 * 没有对应字段的（如 internal_server_error、not_found）留空 -> 仍然是 null。
 */
var ERROR_PARAM = {
  input_too_long: "input",
  invalid_voice: "voice",
  invalid_speed: "speed",
  invalid_pitch: "pitch",
  invalid_style: "style",
  invalid_response_format: "response_format",
  invalid_stream: "stream",
  invalid_cleaning_options: "cleaning_options",
  input_empty_after_cleaning: "input",
  too_many_chunks: "chunk_size",
  stream_format_not_chunkable: "response_format",
  opus_requires_single_chunk: "response_format",
  payload_too_large: "input",
  invalid_api_key: "Authorization",
  upstream_rejected_request: "voice",
};

// extraHeaders 供个别状态码补必需的响应头（如 405 的 Allow，RFC 9110 要求）。
// 放在最后一个参数是为了不动既有的 (message, status, code) 三参调用点。
function errorResponse(message, status, code, type = "api_error", extraHeaders = null, param = undefined) {
  return new Response(
    JSON.stringify({
      // 显式传入的 param 优先：ERROR_PARAM 是按 code 查的，而有两个 code 各服务两种原因
      // （见上），那时只有调用点自己知道是哪个字段。
      error: { message, type, param: param ?? ERROR_PARAM[code] ?? null, code }
    }),
    {
      status,
      headers: { "Content-Type": "application/json", ...makeCORSHeaders(), ...(extraHeaders || {}) }
    }
  );
}
function makeCORSHeaders(extraHeaders = "Content-Type, Authorization") {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": extraHeaders,
    "Access-Control-Max-Age": "86400"
  };
}
// HTML UI is injected at build time from ui/index.html
function getHtmlContent() {
  return UI_HTML;
}




const VOICES={fa:['fa-IR-DilaraNeural','fa-IR-FaridNeural'],en:['en-US-JennyNeural','en-US-GuyNeural'],de:['de-DE-KatjaNeural','de-DE-ConradNeural'],ar:['ar-SA-ZariyahNeural','ar-SA-HamedNeural'],tr:['tr-TR-EmelNeural','tr-TR-AhmetNeural'],ru:['ru-RU-SvetlanaNeural','ru-RU-DmitryNeural'],fr:['fr-FR-DeniseNeural','fr-FR-HenriNeural'],es:['es-ES-ElviraNeural','es-ES-AlvaroNeural'],it:['it-IT-ElsaNeural','it-IT-DiegoNeural'],zh:['zh-CN-XiaoxiaoNeural','zh-CN-YunxiNeural'],nl:['nl-NL-ColetteNeural','nl-NL-MaartenNeural']};
export default { async fetch(request,env,ctx){
 const u=new URL(request.url);
 if (u.pathname==='/' || u.pathname==='/index.html') return new Response(UI_HTML,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
 if (u.pathname==='/api/health') return Response.json({ok:true,neural_tts:true});
 if (u.pathname==='/api/tts' && request.method==='GET') {
   const lang=u.searchParams.get('lang')||'fa', text=(u.searchParams.get('q')||'').trim(), gender=u.searchParams.get('gender');
   if (!VOICES[lang] || !text || text.length>500) return new Response('Invalid text or language',{status:400});
   const voice=VOICES[lang][gender==='male'?1:0];
   const number=Number(u.searchParams.get('rate'))||0; const speed=Math.min(1.3,Math.max(0.7,1+number/100));
   const req=new Request(new URL('/v1/audio/speech',request.url),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({input:text,voice,speed,response_format:'mp3'})});
   try {const response=await handleSpeechRequest(req);return response;}catch(e){console.error('speech failed',String(e));return new Response('Speech service unavailable',{status:503});}
 }
 return new Response('Not found',{status:404});
}};
