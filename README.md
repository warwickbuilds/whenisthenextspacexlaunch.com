# whenisthenextspacexlaunch.com

Development Repo and Documentation for <a href="https://whenisthenextspacexlaunch.com" target="_blank" alt="spacex launch">When is the next SpaceX launch</a>

## Development

#### Code

- HTML: :nut_and_bolt:
- CSS: :sparkles:
- Javascript: :icecream:
- Database: .json files :floppy_disk:

- Fonts: Google Fonts: Open Sans

- Browser Support: Any Modern Browser (not Internet Explorer at all)

#### Design & Development

Full Page Image inspiration from Brad Traversy: https://www.youtube.com/watch?v=Gx_7GQtSdpc
Ken Burns Effect - https://www.youtube.com/watch?v=XiEiVZFUfa8
Flickr - SpaceX https://www.flickr.com/photos/spacex
Page Scrolling - https://www.youtube.com/watch?v=oUSvlrDTLi4
Easing - http://gizma.com/easing/
Font-Awesome - https://cdnjs.com/libraries/font-awesome
Google-Font -
https://htmlhead.dev/
Sitemaps - https://ahrefs.com/blog/how-to-create-a-sitemap/
robots.txt - https://moz.com/learn/seo/robotstxt
noscript - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript
Favicon Generator - https://realfavicongenerator.net/
Browser Configuration Schema - https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/dn320426(v=vs.85)
Apple Web Applications - https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
Google Browser Configuration - https://developers.google.com/web/fundamentals/design-and-ux/browser-customization
PWA Setup - https://codelabs.developers.google.com/codelabs/your-first-pwapp/#5
https://medium.com/dev-channel/learn-how-to-build-a-pwa-in-under-5-minutes-c860ad406ed
Dark MOde - https://dev.to/dcodeyt/add-dark-mode-to-your-websites-with-css-5bh4

Optimisation Tools
TinyPNG.com -

#### Hosting & Deployment

- Hosting: GitHub Pages w/ custom URL
- Domain Register: Namecheap
- Analytics: Google Analytics - https://analytics.google.com/analytics

- Optimisation Testing

  - Search: Google Search Console, URL Inspection, Index Report - https://search.google.com/search-console
  - Google URL Inspection Tool - https://support.google.com/webmasters
  - Google Page Speed Insights - https://developers.google.com/speed
  - Google Lighthouse (Web page quality tester)- https://developers.google.com/web/tools/lighthouse/
  - Mobile Friendly Test - https://search.google.com/test/mobile-friendly
  - Web Page Test - https://www.webpagetest.org/
  - Pingdom Website Speed Test - https://tools.pingdom.com/
  - SS Labs
  - Site checker
  - Facebook Sharing Debugger - https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fwhenisthenextspacexlaunch.com%2F

- Promotion
  - SpaceX Data App List -
  - Reddit /r/spacexlounge -
  - Reddit /r/webdev -
  - Youtube, Instagram and Facebook Comments
  - Whirlpool Thread - https://forums.whirlpool.net.au/thread/97m0xpm9

## Deploy

#### Git Commands to update master branch

```
git add .
git commit -m "updates"
git push -u origin master
```

#### Push assets from /dist to gh-pages branch

- gh-pages - https://www.npmjs.com/package/gh-pages
  npm package installs a command line utility, which published everything in dist folder to gh-pages branch

```
npm run deploy
```

## Releases

- Planned Featues

  - Local storage
  - Only poll api if updates or per period
  - PWA Compatibility and Configuration
  - Use flickr image from response if avilable

- Testing

  - Lighthouse
  - SS Labs
  - Site checker

- Version 2 Major Upgrade
  - Switch to using GraphQL API
  - Switch to a framework Vue or React

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

## References

- https://www.flickr.com/photos/spacex/
- https://spacexmissionwatch.com/about
- https://docs.spacexdata.com/?version=latest#02badaab-e03e-40c8-ab20-3bc76d95d401
- https://github.com/r-spacex/SpaceX-API/blob/master/docs/clients.md
- https://api.spacex.land/graphql/
- https://www.rawpixel.com/image/2229667/official-space-photos
- https://www.kylegalbraith.com/learn-by-doing/volume/16/the-spacex-api-is-now-released-to-the-public.html
- https://medium.com/open-graphql/launching-spacex-graphql-api-b3d7029086e0
- https://api.spacex.njk;bjbiujuhjiland/rest
- https://docs.spacexdata.com/?version=latest
- https://www.rocketlaunch.live/premium
- https://api.spacexdata.com/
- https://launchlibrary.net/docs/1.4.1/api.html
- https://github.com/r-spacex/SpaceX-API
- https://api.spacex.land/graphql/
- https://dev.to/dcodeyt/add-dark-mode-to-your-websites-with-css-5bh4
