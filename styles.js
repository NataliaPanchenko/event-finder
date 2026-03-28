import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --title-color: rgb(64, 63, 63);
    --text-color: #888;
    --black-color: #000000;
    --delete-color: red;
    --main-color: #61544B;
    --main-hover-color: #9d8a7c;
    --white-color: #ffffff;
    --item-title-color: #222;
    --icon-background: #ecebeb;
    --icon-color: #555;
    --info-color: #666;
    --date-color: #222;
    --descr-color: #333;
    --date-row-color: #777;
    --price-row-color: #888;
    --delete-bg: #bdc3c7;
    --border-color: #ccc;
    --cart-controls-bg: #f0f0f0;
    --overlay-color: rgba(0, 0, 0, 0.7);
    --overlay-checkout: rgba(0, 0, 0, 0.4);
    --logout-text: #999;
    --success-text-color: #444;
    --success-bg: #d1f5d3;
    --success-title: #29bd67;
    --no-results: #9aa0a6;
    --no-results-bg: #f2f3f5;
    --no-elements-icon: #9aa0a6;
    --no-elem-desc: #6b7280;
    --card-bg: #faf5ff;
    --message-color: #3a3a3a;
    --secondary-button-bg: #24292e;

    --dark-mode: #ffffff;
    --dark-mode-bg: #000000;

    --subtitile-color: #d3d3d3;
    --search-outline: #d5d5d5;
    --search-bachground: #eeecec;
    --search-input-bg: #f9fafb;
    --category-button-hover: #e2e5e8;
    --category-button-bg: #f1f3f5;
    --category-button-color: #333;
    --gray-color: gray;
    --order-status-bg: #e6f7ec;
    --order-color: #2e7d32;

    --delete-color: #e74c3c;
    --success-color: #4caf50;
    --delete-bg: #ddd;

    --category-background: rgba(255, 255, 255, 0.8);
    --category-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    --header-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    --input-border: 1px solid #e5e7eb;
    --sidebar-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
    --button-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);

    --card-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    --footer-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
    --confirm-box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);

    --loading-background: repeating-linear-gradient(135deg, #e8d2b7 0 10px, var(--main-color) 0 20px)
      0 / 0% no-repeat,
    repeating-linear-gradient(135deg, #ddd 0 10px, #eee 0 20px) 0 / 100%;
    --hero-gradient: linear-gradient(90deg, #ddccb6, var(--main-color));
  }

  .dark {
    --title-color: #e0e0e0;
    --text-color: #aaa;
    --black-color: #ffffff;
    --item-title-color: #e0e0e0;
    --icon-background: #2a2a2a;
    --icon-color: #ccc;
    --info-color: #aaa;
    --date-color: #e0e0e0;
    --descr-color: #ccc;
    --date-row-color: #999;
    --price-row-color: #999;
    --delete-bg: #444;
    --border-color: #444;
    --cart-controls-bg: #2a2a2a;
    --logout-text: #777;
    --success-text-color: #ccc;
    --no-results: #777;
    --no-results-bg: #2a2a2a;
    --no-elements-icon: #777;
    --no-elem-desc: #999;
    --card-bg: #1a1a2e;
    --message-color: #e0e0e0;
    --secondary-button-bg: #333;

    --subtitile-color: #444;
    --search-outline: #444;
    --search-bachground: #2a2a2a;
    --search-input-bg: #121212;
    --category-button-hover: #3a3a3a;
    --category-button-bg: #2a2a2a;
    --category-button-color: #e0e0e0;
    --gray-color: #aaa;
    --order-status-bg: #1a3a1a;
    --order-color: #4caf50;

    --category-background: rgba(20, 20, 20, 0.95);
    --category-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
    --header-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
    --input-border: 1px solid #444;
    --sidebar-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
    --button-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4);

    --card-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
    --footer-shadow: 0 -4px 12px rgba(0, 0, 0, 0.5);
    --confirm-box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
    --hero-gradient: linear-gradient(90deg, #2f2d2b, var(--main-color));

    --surface-color: #1e1e1e;

    --dark-mode: #000000;
    --dark-mode-bg: #ffffff;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }
`;
