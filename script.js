// ---------------------------------------------------------------
// CONTACT SETTINGS: change these once and every page updates.
// ---------------------------------------------------------------
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

  // ---------- Booking form -> opens an email to PEER ----------
  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = form.querySelector('#' + id); return el ? el.value : ''; };
      var serviceSel = form.querySelector('#service');
      var service = serviceSel.options[serviceSel.selectedIndex].text;

      var subject = 'Ride Request - ' + service;
      var body =
        'Name: ' + v('name') + '\n' +
        'Phone: ' + v('phone') + '\n' +
        'Email: ' + v('email') + '\n' +
        'Service: ' + service + '\n' +
        'Date: ' + v('date') + '\n' +
        'Pickup time: ' + v('time') + '\n' +
        'Pickup location: ' + v('pickup') + '\n' +
        'Destination: ' + v('dropoff') + '\n' +
        'Passengers: ' + v('passengers') + '\n\n' +
        'Extra details:\n' + v('notes');

      window.location.href = 'mailto:' + CONTACT.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }
});
