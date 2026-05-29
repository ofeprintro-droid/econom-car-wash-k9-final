document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('.mobile-menu');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', mobile.classList.contains('open') ? 'true' : 'false');
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el) => observer.observe(el));
});


// Formular ridicare auto - FINAL V12
// Prețurile afișate în formular includ 10 lei pentru deplasare.
function k9UseLocation() {
  var status = document.getElementById('locatieStatus');
  var coordsInput = document.getElementById('coordonate');
  var mapsInput = document.getElementById('linkHarta');
  var mapsVisible = document.getElementById('linkHartaVizibil');

  if (!navigator.geolocation) {
    if (status) status.textContent = 'Telefonul sau browserul nu permite detectarea locației. Completează adresa manual.';
    return;
  }

  if (status) status.textContent = 'Se caută locația...';

  navigator.geolocation.getCurrentPosition(
    function (pos) {
      var lat = pos.coords.latitude.toFixed(7);
      var lng = pos.coords.longitude.toFixed(7);
      var link = 'https://www.google.com/maps?q=' + lat + ',' + lng;

      if (coordsInput) coordsInput.value = lat + ', ' + lng;
      if (mapsInput) mapsInput.value = link;
      if (mapsVisible) {
        mapsVisible.href = link;
        mapsVisible.textContent = 'Deschide locația detectată';
        mapsVisible.style.display = 'inline-flex';
      }
      if (status) status.textContent = 'Locația a fost adăugată și va fi trimisă împreună cu formularul.';
    },
    function () {
      if (status) status.textContent = 'Nu s-a putut detecta locația. Completează adresa cât mai exact.';
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

function k9ActualizeazaPret() {
  var tip = document.getElementById('tipVehicul') ? document.getElementById('tipVehicul').value : '';
  var serviciu = document.getElementById('serviciu') ? document.getElementById('serviciu').value : '';
  var box = document.getElementById('pretServiciu');
  var hidden = document.getElementById('pretEstimat');

  if (!box) return;

  var deplasare = 10;

  var preturi = {
    'Mașină mică (limuzină)': { interior: 25, exterior: 25 },
    'Jeep / SUV': { interior: 25, exterior: 30 },
    'Camionetă': { interior: 25, exterior: 25 },
    'Microbuz persoane': { interior: 30, exterior: 30 },
    'Microbuz 3 locuri + dubă': { interior: 20, exterior: 30 },
    'Tractor / Buldo': { interior: 30, exterior: 100 },
    'Motor': { interior: null, exterior: 20 },
    'ATV': { interior: null, exterior: 20 }
  };

  var text = '';

  if (!tip || !serviciu) {
    box.style.display = 'none';
    if (hidden) hidden.value = '';
    return;
  }

  if (serviciu === 'Curățare tapițerie') {
    text = 'Preț: de la 210 până la 510 lei';
  } else if (serviciu === 'Alt serviciu / discutăm telefonic') {
    text = 'Prețul se stabilește telefonic, cu deplasarea inclusă.';
  } else {
    var p = preturi[tip];

    if (!p) {
      text = 'Prețul se stabilește telefonic.';
    } else if (serviciu === 'Spălare interior') {
      if (p.interior === null) text = 'Pentru ' + tip + ', prețul se stabilește telefonic.';
      else text = 'Preț: ' + (p.interior + deplasare) + ' lei';
    } else if (serviciu === 'Spălare exterior') {
      text = 'Preț: ' + (p.exterior + deplasare) + ' lei';
    } else if (serviciu === 'Interior + Exterior') {
      if (p.interior === null) text = 'Pentru ' + tip + ', prețul se stabilește telefonic.';
      else text = 'Preț: ' + (p.interior + p.exterior + deplasare) + ' lei';
    }
  }

  if (text) {
    box.innerHTML =
      '<span class="main-price">' + text + '</span>' +
      '<small>Prețul afișat include deplasarea pentru ridicarea și returnarea mașinii. Plata se face la preluarea mașinii de la client.</small>';
    box.style.display = 'block';
    if (hidden) hidden.value = text + ' / deplasare inclusă / ' + tip + ' / ' + serviciu;
  } else {
    box.style.display = 'none';
    if (hidden) hidden.value = '';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var mobile = document.querySelector('.mobile-menu');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', mobile.classList.contains('open') ? 'true' : 'false');
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    reveals.forEach(function(el){ observer.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('visible'); });
  }

  var tip = document.getElementById('tipVehicul');
  var serviciu = document.getElementById('serviciu');

  if (tip) tip.addEventListener('change', k9ActualizeazaPret);
  if (serviciu) serviciu.addEventListener('change', k9ActualizeazaPret);
});


// FINAL V13 - meniu hamburger robust
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var mobile = document.querySelector('.mobile-menu');

  if (toggle && mobile) {
    toggle.onclick = function (e) {
      e.preventDefault();
      mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', mobile.classList.contains('open') ? 'true' : 'false');
    };
  }
});


// FINAL VERIFICAT - hamburger
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var mobile = document.querySelector('.mobile-menu');
  if (toggle && mobile) {
    toggle.onclick = function (e) {
      e.preventDefault();
      mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', mobile.classList.contains('open') ? 'true' : 'false');
    };
  }
});
