import './progress.pres.js';

// Month-by-month record of what shipped across the TSR platform. Linked from the nav and the
// footer, so a venue asking "what am I getting for my monthly fee?" can be pointed here.
// Public, trimmed version: customer outcomes only, no internals or build infrastructure.
// The full internal report is _docs/TSR_PROGRESS_REPORT_APR_NOV_2026.html (meta-repo).
// To add a month, append a block to `months`; tag keys map to labels in `tags`.
// The footer builds its Progress column from this list too (progressMonthLinks).
const months = [
  {
    id: 'apr',
    name: 'April 2026',
    subtitle: 'Laying the groundwork',
    theme:
      'Receiver setup moved off Bluetooth-first pairing and onto Wi-Fi, and receivers became packaged, distributable software.',
    items: [
      ['rx', 'Wi-Fi receiver registration', 'Receivers now register over Wi-Fi instead of relying on Bluetooth pairing. The mobile app and receiver were updated together to share the new registration path and fields.'],
      ['rx', 'Receiver access-point setup', 'Added the first version of setting up a new receiver through its own temporary Wi-Fi access point, plus a dedicated "register receiver" screen in the app.'],
      ['rx', 'Distributable receiver packaging', 'Started packaging the receiver software for distribution, the foundation for over-the-air updates later in the year.'],
      ['app', 'Favorites refinements', 'Cleaned up how favorite teams and games are stored and shown in the mobile app.'],
    ],
  },
  {
    id: 'may',
    name: 'May 2026',
    subtitle: 'A new app and a new website',
    theme:
      'The installable TSR web app (PWA) was born, the marketing site was rebuilt, and the Prism and live-scores projects started.',
    items: [
      ['app', 'TSR PWA App Started', 'Built a new installable web app with the events list, favorites, scheduling, profile and a scrollable toolbar. It works on any phone, tablet or desktop without an app store.'],
      ['app', 'Repeatable schedules and macros', 'Venues can build schedules that repeat and save multi-step macros, so the same game-day setup can be reused every week.'],
      ['app', 'QR code staff onboarding', 'Managers can add staff by having them scan a QR code. New users give their name and the venue passphrase, and download instructions are built in.'],
      ['app', 'Google and Apple sign-in', 'Replaced the old registration flow with Google and Apple sign-in, including sign-out and automatic sign-in for returning users.'],
      ['app', 'Follow a team', 'Users can follow teams, and any game a followed team plays that day always shows in Favorites.'],
      ['app', 'Remote control of receivers from anywhere', "The app can now control a receiver from outside the venue's network, with commands relayed through the cloud."],
      ['app', 'In-app help system', 'Added the first version of contextual help and demo instructions inside the app.'],
      ['cloud', 'Live score notifier', 'Launched a dedicated service that watches live games and pushes score updates straight to the app.'],
      ['prism', 'Prism project started', 'Began Prism, the media-streaming companion that "beams" content such as score tickers and ads onto TVs.'],
      ['web', 'New thesportsremote.com', 'Rebuilt the marketing site with customer testimonials, instructional videos, router install guides and privacy-respecting analytics.'],
    ],
  },
  {
    id: 'jun',
    name: 'June 2026',
    subtitle: 'PWA launch, security, Prism beams and Starting Lineup',
    theme:
      'The TSR PWA went live, receivers got a security overhaul and encrypted local connections, Prism beams came to the remote, and the app learned which games matter most each day.',
    items: [
      ['app', 'TSR PWA App Launched', 'The TSR web app went live for venues, bringing scheduling, favorites and remote control to any phone, tablet or desktop.'],
      ['rx', 'Receiver security overhaul', 'Receivers were locked down to run with only the access they need, and their controls can require authentication with a single switch.'],
      ['rx', 'Encrypted connections to receivers', 'The app now talks to receivers on the venue network over encrypted connections.'],
      ['app', 'Starting Lineup', "A daily \"Starting Lineup\" of the biggest games, customizable per venue, so staff don't have to hunt for tonight's marquee matchups. It can also drive schedules and presets."],
      ['prism', 'Prism beams in the remote', 'Staff can create, manage and send Prism beams to TVs from the remote control. The app only offers receivers that can actually play a beam.'],
      ['app', 'Printable channel lineups', "Print the day's games and channels from any phone or desktop, either everything or just the Starting Lineup. The website started advertising the free printouts."],
      ['cloud', 'Channel suggestions that match your packages', 'TSR knows which base and add-on packages each venue subscribes to, so it only suggests channels the venue actually gets.'],
      ['cloud', 'Streaming events', 'Began importing games that are on streaming services, alongside the regular TV listings.'],
      ['app', 'Real-time sync across devices', 'Every action in the app, including Prism, now broadcasts an event so every staff device stays in sync instantly.'],
      ['app', 'Tablet mode', 'Added a first version of a tablet layout for wall-mounted and front-of-house tablets.'],
      ['app', 'Free tier sign-up', 'New venues can sign themselves up on a free tier straight from the app.'],
      ['cloud', 'Billing emails with invoice links', 'Billing emails now include invoice links and are styled to match the website.'],
      ['cloud', 'Receiver reset, deregister and self-cleanup', 'Receivers can be reset and deregistered remotely, and they clean up stale registrations by themselves.'],
      ['rx', 'Remote receiver updates', 'Receivers can be updated remotely, so new features arrive without a visit to the venue.'],
      ['web', 'Products, payments and SEO', 'Added product pages, payment links, an install spotlight and SEO improvements, plus a "try the app" callout.'],
    ],
  },
  {
    id: 'jul',
    name: 'July 2026',
    subtitle: 'Snap-n-Sync, the Public app and smart plugs',
    theme:
      'Taking a photo of a TV started setting the channel, a free consumer edition of the app launched, and receivers took control of smart plugs.',
    items: [
      ['app', 'Snap-n-Sync (Snap-to-Mirror)', 'Snap a photo of any TV and TSR identifies the game and tunes another TV to match. It includes a consent flow for image processing.'],
      ['app', 'Public edition and Snap-n-Find', 'Launched a free consumer edition of the app. Fans can snap a TV to find out what game is on and follow along, with Snap Packs available as in-app purchases.'],
      ['app', 'Feature gating and paywall', 'Added entitlements so premium features can be switched on per venue or per user, with a paywall where needed.'],
      ['rx', 'Smart plug integration', 'Receivers can control smart plugs to power TVs on and off reliably. The app gained plug management and energy reports.'],
      ['rx', 'Custom splash screens', "Each receiver shows the venue's own logo on screen, delivered from the cloud and hardened against failure."],
      ['rx', 'HDMI-CEC power control', 'Improved how receivers turn TVs on and off over HDMI, both on boot and during normal use. A per-TV wake method can now be chosen.'],
      ['app', 'Multi-venue accounts', 'One user can belong to several venues and switch between them.'],
      ['app', 'In-app updates', 'The app announces when an update is ready and can force an update when needed.'],
      ['app', 'Apple Shortcuts pairing', 'Added a pair/claim flow so iPhone Shortcuts can open the app directly into Snap-n-Find or Snap-n-Sync.'],
      ['app', 'Terms of Service and swipe navigation', 'Added legal terms and swipe gestures between tabs, events and receivers.'],
      ['cloud', 'Live score matching', 'Improved how TV listings are matched to live ESPN scores so the right score shows on the right game.'],
      ['prism', 'Prism stable release', 'Prism reached a stable working version, ready for venue installs.'],
      ['web', 'Snap-n-Sync promotion', 'Added a Snap-n-Sync callout and new client logos to the website.'],
    ],
  },
  {
    id: 'aug',
    name: 'August 2026',
    subtitle: 'Auto-Tune and richer game cards',
    theme:
      'TSR started changing channels for entire seasons on its own, game cards got richer, and scores and listings got faster and more reliable.',
    items: [
      ['app', 'Full-season Auto-Tune', "Schedule a team's whole season once and TSR tunes the right TVs to every game automatically, including series and channel fallbacks."],
      ['app', 'Screensaver Buster', 'Keeps idle TVs from falling into cable-box screensavers by nudging them back to a live channel on a schedule.'],
      ['app', 'Richer game cards', 'Event cards now show channels, betting odds, batter counts and football down-and-distance with game visuals.'],
      ['app', 'One-off schedules and manual presets', 'Alongside repeating schedules, staff can schedule a single game or build a preset by hand, with streaming badges shown throughout.'],
      ['cloud', 'New providers on the fly', "When a user picks a TV provider that isn't in the system yet, TSR provisions its channel lineup automatically."],
      ['cloud', 'Streaming services in listings', "Games on streaming services are ingested with the service they're on and shown on screen and on printed sheets."],
      ['cloud', 'Custom networks and team aliases', 'Venues can add their own custom channels. Team-name aliases keep games matched when sources disagree on spelling.'],
      ['cloud', 'Multiple DirecTV base packages', 'Venues with more than one DirecTV base package are now handled correctly.'],
      ['cloud', 'Faster, more reliable scores and listings', 'Live scores and nightly TV listings run on rebuilt services that use fewer resources and fail less often, with better timezone handling.'],
      ['rx', 'Fire TV control', 'Receivers can control Fire TV devices for input selection and power.'],
      ['web', 'Hero videos', 'Added marketing hero videos and a TSR icon for browser tabs and bookmarks.'],
    ],
  },
  {
    id: 'sep',
    name: 'September 2026',
    subtitle: 'Smarter scheduling and split screens',
    theme:
      'Scheduling got smarter, and Prism learned split screens and deep links.',
    items: [
      ['app', 'Macros and the scheduled Shuffler', 'Staff can create macros that run several commands at once, and the channel Shuffler can now be put on a schedule.'],
      ['cloud', 'Smarter scheduling', 'Added per-event start buffers, series-aware tuning (start the next game when the previous one ends), a lateness ceiling and event priorities.'],
      ['app', 'Score watching for any game', "Follow scores for games that aren't in the venue's TV listings."],
      ['app', 'Customizable Favorites', 'Favorites became a set of modules users can show, hide and reorder. A day switcher stays in sync between Favorites and Events.'],
      ['app', 'Event search with suggested channels', 'Search for any game and get the channel to tune to.'],
      ['app', 'Guided tour and install-as-app', 'Added a guided tour for Pro, contextual hints for Public, and a smoother install-to-home-screen flow.'],
      ['rx', 'Input mapping', 'TV inputs are mapped by name, so venues no longer have to wire everything to a specific HDMI port.'],
      ['prism', 'Deep links to content', 'The app can open a specific streaming channel or piece of content directly on a Prism media stick.'],
      ['prism', 'Split-screen composite beams', 'Prism can combine multiple sources into one split-screen beam. Capture inputs register themselves automatically on install.'],
      ['rx', 'Beta release channel', 'Added a beta channel for receiver software so new versions can be tested at selected venues first.'],
    ],
  },
  {
    id: 'oct',
    name: 'October 2026',
    subtitle: 'Signage, voice control and energy savings',
    theme:
      'The busiest month of the year: Prism became a full ad and signage studio, venues without Prism got signage too, TSR learned to take voice commands, and TV power and energy use became measurable.',
    items: [
      ['prism', 'Multi-view layouts (1×2 and 2×2)', 'Show two or four games on one TV, with seamless sound switching between panels.'],
      ['prism', 'Ad Studio with AI generation', "A built-in studio for creating ads and score tickers, including AI-generated ads built from the venue's own photos."],
      ['prism', 'Menu boards from a photo', 'Snap a photo of a printed menu and TSR turns it into an on-screen menu board, or type one in manually.'],
      ['prism', 'Trivia night', 'A trivia scoreboard with an announcer role, timed and themed questions, ads between rounds, and importing questions by scanning a sheet.'],
      ['prism', 'Guest casting and beam nudging', 'Guests can share content to a TV, and staff can fine-tune where a beam sits on screen.'],
      ['signage', 'Signage without Prism', 'Venues without Prism can run ads, menus and boards straight from their receivers. The app talks to them directly over the local network.'],
      ['app', 'Voice control', 'Control the whole app by voice from a phone, Android shortcut or smartwatch. Change channels, build schedules, create groups, add users and ask basic questions.'],
      ['cloud', 'Voice that understands sports-bar slang', 'Voice commands understand sports-bar slang and sound-alike words, and get better as staff use them.'],
      ['rx', 'TV power tracking', 'Receivers track whether each TV is actually on. The 3 AM maintenance reboot no longer wakes TVs, and screens that need an HDMI fix are flagged.'],
      ['rx', 'Dual power methods and smarter plugs', 'TVs can use a smart plug plus a fallback wake method with configurable delays, and plugs can be renamed and moved between Wi-Fi networks.'],
      ['app', 'Energy savings reports', 'Reports show energy used by TVs and accessories against venue hours, with historical electricity rates for real dollar savings.'],
      ['rx', 'Hello/goodbye and input-help screens', "Friendly on-screen messages appear when TVs power on or off. An input-help screen shows staff how to get back to TSR's input."],
      ['rx', '"TV ON" lands on a game', "Turning a TV on through TSR tunes it straight to a game from the venue's shuffle list. Turning a TV off cleanly handles anything scheduled for it."],
      ['app', 'Light theme and custom themes', 'Added a full light theme, venue-defined custom themes, and a "What\'s New" dialog.'],
      ['app', 'Self-test and schedule disable', "A one-tap self-test checks a venue's TSR setup. Schedules can be paused instead of deleted."],
      ['cloud', 'More accurate game matching', 'Games are matched more reliably between TV listings and live scores, and conference realignment is kept up to date.'],
      ['rx', 'Venue update seeding', 'One receiver at a venue can act as a local update server for the rest, so updates download once per venue and roll out in waves.'],
      ['rx', 'TV compatibility fixes', 'Fixed HDMI-CEC control for LG TVs, older receiver OS versions and Fire TV wake behavior.'],
      ['web', 'Website feature refresh', 'Updated the website with the new features and Prism messaging, and added full-size images for marketing emails.'],
    ],
  },
  {
    id: 'nov',
    name: 'November 2026',
    subtitle: 'To date (through Nov 9)',
    theme:
      'Football Sundays, after-hours power savings, visibility into what every TV is showing, and a faster, more secure platform.',
    items: [
      ['rx', 'After-hours auto-off', 'TVs that turn themselves on outside business hours are switched back off automatically, for one TV or the whole venue.'],
      ['cloud', 'Power-on football pick', 'On Saturdays and Sundays, turning a TV on tunes it to the best available football game based on tiered priorities.'],
      ['app', 'Venue host teams', 'Venues can list the teams they host watch parties for, to draw in fan crowds.'],
      ['app', 'Current channels at a glance', 'See what every TV at a venue is tuned to right now, the likely game on it, and when the channel last changed.'],
      ['app', 'Sound receiver', "Mark the receiver that controls the venue's audio so scheduling and auto-tuning keep sound on the right game."],
      ['app', 'Voice: whole seasons and custom phrases', "Schedule a team's entire season by voice, and map custom phrases to macros and commands."],
      ['app', 'Cleaner controls and auto-save', 'Checkboxes were replaced with toggles and pill buttons, a receiver/group picker is used throughout, and venue details save automatically without overwriting each other.'],
      ['cloud', 'More accurate DirecTV channel numbers', 'Fixed shifted channel numbers, including NFL Sunday Ticket, so TSR tunes to the right channel.'],
      ['cloud', 'Faster, more secure data', 'The systems behind TSR were made faster and more secure.'],
      ['web', 'Signage and voice control pages', 'New website pages for Signage and Voice Control, plus tap-to-text links in marketing emails.'],
    ],
  },
];

// Footer links: month name only, pointing at that month's panel on /progress.
export const progressMonthLinks = months.map(({ id, name }) => ({
  label: name.split(' ')[0],
  href: `/progress#progress-${id}`,
}));

const loadProgressProps = async () => ({
  eyebrow: 'The Sports Remote · Progress Report',
  headline: 'April – November 2026: what shipped',
  intro:
    'Eight months of work across the whole TSR platform: the receivers on every TV, the TSR app, Prism media beams, signage, voice control, energy savings and more.',
  stats: [
    { value: '8', label: 'months of releases' },
    { value: '90+', label: 'features & improvements' },
    { value: '2', label: 'app editions (Pro + Public)' },
  ],
  tags: {
    app: 'TSR PWA App',
    rx: 'Receiver',
    prism: 'Prism',
    signage: 'Signage',
    cloud: 'Cloud',
    web: 'Website',
  },
  months,
  footnote:
    'The Sports Remote is built by Soda Pop Systems. This report covers work from April 1 through November 9, 2026, across the TSR receivers, app, Prism, signage and cloud services.',
});

export class TsrProgress extends HTMLElement {
  async connectedCallback() {
    const props = await loadProgressProps();
    const el = document.createElement('tsr-progress-pres');
    el.props = props;
    this.replaceChildren(el);
    // Footer month links arrive as /progress#progress-<id>: open that month and scroll to it.
    const id = window.location.hash.replace('#progress-', '');
    if (id && id !== window.location.hash) el.openMonth(id);
  }
}

customElements.define('tsr-progress', TsrProgress);
