import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cookie-consent';

function CookieConsent() {
    // null = 尚未決定；'accepted' / 'declined' = 已決定
    const [consent, setConsent] = useState(null);
    // 控制動畫 class
    const [visible, setVisible] = useState(false);
    // unmount 旗標（動畫結束後才卸載）
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            // 未有紀錄：先 mount，再 500ms 後觸發 slide-in
            setMounted(true);
            const timer = setTimeout(() => setVisible(true), 500);
            return () => clearTimeout(timer);
        }
        // 已有紀錄：不渲染
        setConsent(stored);
    }, []);

    const handleChoice = (choice) => {
        localStorage.setItem(STORAGE_KEY, choice);
        setConsent(choice);
        // 觸發 slide-out
        setVisible(false);
    };

    // 監聽 slide-out 動畫結束後 unmount
    const handleTransitionEnd = () => {
        if (!visible && consent !== null) {
            setMounted(false);
        }
    };

    if (!mounted || consent !== null) return null;

    return (
        <div
            id="cookie-consent-banner"
            className={`cookie-consent${visible ? ' cookie-consent--visible' : ''}`}
            onTransitionEnd={handleTransitionEnd}
            role="region"
            aria-label="Cookie 同意通知"
        >
            <div className="cookie-consent__inner">
                <div className="cookie-consent__content">
                    <span className="cookie-consent__icon" aria-hidden="true">🍪</span>
                    <div className="cookie-consent__text">
                        <p className="cookie-consent__title">我們使用 Cookie</p>
                        <p className="cookie-consent__desc">
                            我們使用 Cookie 來改善您的瀏覽體驗、提供個人化內容，並分析網站流量。
                            您可以選擇接受所有 Cookie，或僅接受必要的功能性 Cookie。
                        </p>
                    </div>
                </div>
                <div className="cookie-consent__actions">
                    <button
                        id="cookie-consent-accept"
                        className="btn btn--sm btn--primary cookie-consent__btn"
                        onClick={() => handleChoice('accepted')}
                    >
                        接受所有 Cookie
                    </button>
                    <button
                        id="cookie-consent-decline"
                        className="btn btn--sm btn--outline cookie-consent__btn"
                        onClick={() => handleChoice('declined')}
                    >
                        僅接受必要
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieConsent;
