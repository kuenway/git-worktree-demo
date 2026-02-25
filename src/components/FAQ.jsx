import { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';

function FAQ() {
    // 預設第一則展開（index 0），其餘收合
    const [openId, setOpenId] = useState(FAQ_ITEMS[0].id);

    const toggle = (id) => {
        // 點擊已開啟的則關閉，否則切換到該則
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">常見問題</span>
                    <h2 id="faq-title" className="section-header__title">
                        您最想知道的事
                    </h2>
                    <p className="section-header__desc">
                        找不到答案？隨時透過右下角的聊天與我們聯絡，通常在幾分鐘内回覆。
                    </p>
                </div>

                <div className="faq__list" role="list">
                    {FAQ_ITEMS.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`faq__item${isOpen ? ' faq__item--open' : ''}`}
                                role="listitem"
                            >
                                <button
                                    id={`${item.id}-btn`}
                                    className="faq__question"
                                    aria-expanded={isOpen}
                                    aria-controls={`${item.id}-panel`}
                                    onClick={() => toggle(item.id)}
                                >
                                    <span className="faq__question-text">{item.question}</span>
                                    <span className="faq__arrow" aria-hidden="true">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5 7.5L10 12.5L15 7.5"
                                                stroke="currentColor"
                                                strokeWidth="1.75"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    id={`${item.id}-panel`}
                                    className="faq__answer"
                                    role="region"
                                    aria-labelledby={`${item.id}-btn`}
                                    aria-hidden={!isOpen}
                                >
                                    <p className="faq__answer-text">{item.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
