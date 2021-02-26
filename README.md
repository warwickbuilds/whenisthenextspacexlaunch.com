# whenisthenextspacexlaunch.com

:rocket: Development Repo and Documentation for <a href="https://whenisthenextspacexlaunch.com" target="_blank" alt="spacex launch">When is the next SpaceX launch</a>

#### Features

- Next upcoming launch large display panel with countdown timer and links to media
- List of up coming launches below fold
- Ken burns effect full screen launch image
- Theme selection (dark mode)

#### Technical Functionality

- Data from the unofficial [SpaceX-API v4](https://github.com/r-spacex/SpaceX-API)
- Theme set from system mode (dark/light)
- Browser Support: Any Modern Browser (Not Internet Explorer, or Edge v1)
- PWA Support (Desktop app install, mobile app install, static file cache)
- Data Caching using IndexedDB (min time between refresh 30mins)
- Image and asset caching using CacheAPI
- LocalStorage to store settings

## Development

- Static Site
- Vanilla Javascipt (fetch for API calls)
- Library Addins
  - Moment(Dates and Times)
  - FontAwesome(Icons)
  - Google Fonts(font styles)
- Data from public API ([SpaceX-API v4](https://github.com/r-spacex/SpaceX-API))
- Cacheing
  - Static files using Cache API (Service Worker / PWA)
  - API Data using IndexedDB
  - Theme preference using LocalStorage
- Browser storage using Local Storage
- NPM Modules: (Dev) gh-pages(github pages deployment)

* Source Control: GitHub
* Hosting: GitHub Pages with custom domain
* Analytics: Google Analytics, Microsoft Clarity

## Releases

#### Version 2.1

- Features
  - Added Microsoft Clarity Snippet

- Fixes
  - Fixed New Year Date Comparison for Cache Refresh

#### Version 2.0

- Features
  - Converted to v4 of spaceX API
  - Static file caching using CacheAPI for PWA offine support
  - Image caching using CacheAPI for performance and offline support
  - Modified display for TBA launch dates (countdown will only show for confirmed launch time)
  - API Response data cached in IndexedDB with max min refresh time of 30mins
  - Various interface tweaks, fixes and improvements

#### Version 1.6

- Features

  - Dark mode switch button
  - Various layout updates and changes

- Fixes
  - Updates titles
  - Various other fixes and mistakes
  - Moved JS and CSS files into folders

#### Version 1.5

- Features

  - Allow selection of theme, remember selection on page refresh
  - Award Digital logo now text to support dark mode

- Fixes
  - No next mission patch use placeholder
  - Updated Title Text for launch times

#### Version 1.4

- Features

  - Dark Mode, System detected
  - No patch available use a placeholder

- Fixes
  - Missing Mission details check (hide)

#### Version 1.3

- Features
  - Favicons
    - Chrome
    - Apple
    - Windows Pinned Site (Browser Configuration)
    - Favicon
  - Facebook Metadata
  - Start of PWA Configuration
    - Install as App in Windows

#### Version 1.2

- Features
  - Sitemap.xml
  - robots.txt
  - Scrollbar styling
  - Noscript notice
- Fixes
  - Keywords
  - Single SpaceX-API call rather than 2 as upcoming also contains next launch

#### Version 1.1

- Features

  - Mobile optimisted layout
  - Header meta tags

- Fixes
  - AD Logo clarity

#### Version 1.0

- Features
  - SpaceX API Data for Next Launch
  - SpaceX API Data for upcoming launches
  - Deployment to gh-pages
  - Custom URL https://whenisthenextspacexlaunch.com
