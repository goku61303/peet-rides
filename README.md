# Prestige Electric Elective Transportation (PEET) — Website

A 3-page static site (Home, Services & Rates, Book a Ride) in black, gold and navy to match the PEER logo.
Plain HTML/CSS/JS with no build step, so it deploys to Vercel with zero configuration.

## Contact info

Open **script.js** and edit the block at the top:

```js
const CONTACT = {
  email: 'ridewithpeer@gmail.com',
  phoneDisplay: '(203) 223-8811',
  phoneDigits: '12032238811',   // digits only, with country code (US = 1)
  businessName: 'Prestige Electric Elective Transportation'
};
```

That one block updates the call, text, and email links that are marked in the HTML,
and sets where the booking form sends its email. The phone number and email also
appear as plain text in a few places in the HTML files, so search for them if they change.

## Rates

All prices are written directly into **services.html** (and the "From" prices on
the home page in **index.html**). Search for the dollar amount to change it.

## Photos

The dashed "Add a photo" box on the home page is a photo spot. To use a real picture,
put it in **images/** and replace the `<span>...</span>` inside the box with
`<img src="images/trust.jpg" alt="Describe the photo">`.

The logo files in **images/** are logo-full.jpg (home page), emblem.png (header), and
favicon.png (browser tab).

## How booking works

The booking form and the "Email for a Quote" button open the visitor's email app
with the ride details filled in, addressed to PEER. The visitor presses send.
Nothing is sent automatically, and it needs an email app set up on their device.
If you want requests delivered straight to the PEER inbox, a form service such as
Formspree can replace this later.

## Deploy to Vercel

1. Push these files to a GitHub repo.
2. In Vercel: Add New Project, import the repo, leave all settings default, Deploy.
3. Add the domain under Settings → Domains.

## Files

```
index.html      Home
services.html   Services, rates, and add-ons
book.html       Booking steps, contact options, and request form
styles.css      Black, gold and navy theme
script.js       Contact settings, mobile menu, booking form
images/         Put photos here
```
