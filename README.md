<div align="center">
  <img src="public/icon-128.png" alt="logo"/>
  <h1>Afffilly</h1>
  <h5>Support your favourite creators while saving money with Afffilly</h5>
</div>

## Table of Contents

- [About](#about)
- [Features](#features)
- [Usage](#usage)
  - [Getting Started](#gettingStarted)
  - [Customization](#customization)
- [Tech Docs](#tech)
- [Credit](#credit)
- [Contributing](#contributing)

## About <a name="about"></a>

Afffilly is **first and foremost an open source tool for supporting our favourite creators**. By automatically applying the affiliate codes you choose, the creators you want to support receive a commission when you shop online, as if you had clicked on their affiliate link for your purchase.

Second, Afffilly crowdsources and applies coupon codes to help you save money **without steal your data**. Your data stays on your device, and you stay in control.

If you’d like, you may at any time explicitly share a _snapshot_ of your coupon data with the maintainers of Afffilly by opening the Afffilly extension settings menu, clicking the share coupon data button, and following the provided instructions.


## Features <a name="features"></a>

### Extension Features
- Automatically applies your chosen affiliate codes when you shop online.
- Crowdsources and applies working coupon codes to save money.
- Keeps all data private and stored locally on your device.
- Allows you to import and export all your data.
- Allows you to add and manage your own coupons.
- Removes all expired coupons with a single click.
- Offers a clean, minimal design.

### Development Features
- See [JohnBra's vite-web-extension features](https://github.com/JohnBra/vite-web-extension?tab=readme-ov-file#features-).


## Usage <a name="usage"></a>

### Getting Started <a name="gettingStarted"></a>
1. Install the Afffilly extension.
2. Launch the extension and select a creator to support from the settings menu to automatically apply their affiliate codes when you shop or enter your affiliate codes manually. 
3. Start shopping! Afffilly will handle affiliate codes and coupons for supported sites.

### Settings & Customization <a name="customization"></a>
- **Choose a Creator**: Select a creator from the list to automatically apply their affiliate codes.
- **Manage Coupons**: Add, edit, or remove coupons manually or let Afffilly prompt you to update new or expired coupons.
- **Import and Export**: Import or export all your data, including coupons, affiliate codes, and creator preferences. Remember to make regular backups, all data stays private and securely stored on your device.
- **Send Feedback**: Send feedback via email.
- **Share Your Coupons**: Review and share your coupon data (`coupons.json`) directly and transparently via email.

### Development Usage
- See [JohnBra's vite-web-extension usage](https://github.com/JohnBra/vite-web-extension?tab=readme-ov-file#usage-).


# Tech Docs <a name="tech"></a>

- [Vite](https://vitejs.dev/)
- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [Chrome Extension with manifest 3](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome Extension i18n](https://developer.chrome.com/docs/extensions/reference/api/i18n#description)
- [Cross browser development with webextension-polyfill](https://github.com/mozilla/webextension-polyfill?tab=readme-ov-file#webextension-browser-api-polyfill)
- [Rollup](https://rollupjs.org/guide/en/)
- [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin)
- [Tailwind CSS](https://tailwindcss.com/docs/configuration)
- [shadcn/ui](https://ui.shadcn.com/docs)


# Credit <a name="credit"></a>

Afffilly is maintained by [Kevin Gonzalez](https://typekev.com) and was bootstrapped using [JohnBra's vite-web-extension](https://github.com/JohnBra/vite-web-extension) boilerplate which was inspired by [Jonghakseo's vite chrome extension boilerplate](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite).


# Contributing <a name="contributing"></a>

Feel free to open PRs or raise issues!
