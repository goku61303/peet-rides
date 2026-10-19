// ---------------------------------------------------------------
// CONTACT SETTINGS: change these once and every page updates.
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// BOOKING FORM SETTINGS
// WEB3FORMS_KEY: free key from https://web3forms.com. Enter the email
// that should receive ride requests and they email you the key.
// It is safe to leave in the page (it only lets people send TO that inbox).
// ---------------------------------------------------------------
const WEB3FORMS_KEY = 'cf5312b1-c45a-4bd8-89b7-8980d0995435';

const CONTACT = {
  email: 'peetrides@gmail.com',   // where booking requests are sent
  phoneDisplay: '(203) 223-8811',    // how the number looks on the page
  phoneDigits: '12032238811',        // digits only, with country code (US = 1)
  businessName: 'Prestige Electric Elective Rides'
};

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Fill contact details everywhere ----------
  document.querySelectorAll('[data-contact]').forEach(function (el) {
    var type = el.getAttribute('data-contact');
    if (type === 'email') {
      el.setAttribute('href', 'mailto:' + CONTACT.email);
      if (el.hasAttribute('data-show')) el.textContent = CONTACT.email;
    } else if (type === 'phone') {
      el.setAttribute('href', 'tel:+' + CONTACT.phoneDigits);
      if (el.hasAttribute('data-show')) el.textContent = CONTACT.phoneDisplay;
    } else if (type === 'text') {
      el.setAttribute('href', 'sms:+' + CONTACT.phoneDigits);
    } else if (type === 'whatsapp') {
      el.setAttribute('href', 'https://wa.me/' + CONTACT.phoneDigits);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    }
  });

  // ---------- Mobile nav ----------
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ---------- Booking form -> sent by Web3Forms (no email app opens) ----------
  var form = document.getElementById('booking-form');
  if (form) {
    var statusEl = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    var show = function (msg, ok) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.className = 'form-status ' + (ok ? 'ok' : 'err');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (WEB3FORMS_KEY === 'YOUR_ACCESS_KEY_HERE') {
        show('The form is not connected yet. Add the Web3Forms access key in script.js.', false);
        return;
      }

      var v = function (id) { var el = form.querySelector('#' + id); return el ? el.value : ''; };
      var serviceSel = form.querySelector('#service');
      var service = serviceSel.options[serviceSel.selectedIndex].text;
      var botcheck = form.querySelector('#botcheck');

      var payload = {
        access_key: WEB3FORMS_KEY,
        subject: 'Ride Request - ' + service,
        from_name: CONTACT.businessName + ' Website',
        name: v('name'),
        phone: v('phone'),
        service: service,
        date: v('date'),
        pickup_time: v('time'),
        pickup_location: v('pickup'),
        destination: v('dropoff'),
        passengers: v('passengers'),
        details: v('notes'),
        botcheck: botcheck ? botcheck.checked : false
      };
      if (v('email')) payload.email = v('email');

      submitBtn.disabled = true;
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      show('', true);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            form.reset();
            show('Thank you! Your ride request was sent. We will contact you shortly to confirm your price.', true);
          } else {
            show('Something went wrong sending your request. Please call or text us instead.', false);
          }
        })
        .catch(function () {
          show('Could not send your request. Please check your connection or call or text us.', false);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }
});
