// =============================================
// VIDAL — Complete Script (clean rebuild v2)
// =============================================

// --- NAV ---
var nav = document.getElementById('nav');

// --- HAMBURGER ---
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMobile() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// --- HERO LOADED ---
window.addEventListener('load', function() {
  document.querySelector('.hero').classList.add('loaded');
});

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// --- FORM SUBMIT ---
function handleFormSubmit() {
  var form = document.querySelector('.contact-form');
  var inputs = form.querySelectorAll('input, textarea');
  var btn = form.querySelector('button');
  var filled = true;

  inputs.forEach(function(input) {
    if (input.required && !input.value.trim()) {
      input.style.borderColor = '#c0392b';
      filled = false;
      setTimeout(function() { input.style.borderColor = ''; }, 2000);
    }
  });

  if (!filled) return;

  var data = {};
  inputs.forEach(function(input) {
    if (input.name) data[input.name] = input.value.trim();
  });

  btn.disabled = true;
  btn.textContent = (i18n[currentLang] && i18n[currentLang].form_sending) || 'Wysyłanie...';

  fetch('send-mail.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(function(res) { return res.json(); })
  .then(function(result) {
    if (result.success) {
      var msg = 'Dziękujemy za wiadomość. Odpowiemy najszybciej jak to możliwe.';
      if (currentLang === 'en') msg = 'Thank you for your message. We will reply as soon as possible.';
      if (currentLang === 'de') msg = 'Vielen Dank für Ihre Nachricht. Wir antworten so schnell wie möglich.';
      alert(msg);
      inputs.forEach(function(input) { input.value = ''; });
    } else {
      alert(result.message || ((i18n[currentLang] && i18n[currentLang].form_error) || 'Wystąpił błąd. Spróbuj ponownie.'));
    }
  })
  .catch(function() {
    alert((i18n[currentLang] && i18n[currentLang].form_network_error) || 'Błąd połączenia. Sprawdź internet i spróbuj ponownie.');
  })
  .finally(function() {
    btn.disabled = false;
    btn.textContent = (i18n[currentLang] && i18n[currentLang].contact_submit) || 'Wyślij wiadomość';
  });
}

// --- WALL TABS ---
function switchWall(index) {
  var panels = document.querySelectorAll('.wall-panel');
  var tabs = document.querySelectorAll('button.wall-tab');
  panels.forEach(function(p, i) {
    p.style.display = (i === index) ? 'flex' : 'none';
  });
  tabs.forEach(function(t, i) {
    if (i === index) t.classList.add('active');
    else t.classList.remove('active');
  });
}
document.querySelectorAll('button.wall-tab').forEach(function(tab, idx) {
  tab.addEventListener('click', function() { switchWall(idx); });
});

// --- I18N ---
const i18n = {
  pl: {
    nav_about: "O nas", nav_models: "Modele", nav_tech: "Technologia",
    nav_realizations: "Realizacje", nav_factory: "Fabryka", nav_contact: "Kontakt",
    hero_subtitle: "Domy prefabrykowane \u00b7 Poznań \u00b7 od 1988",
    hero_title: 'Dom<br><em>z duszy</em><br>drewna',
    hero_desc: "Projektujemy i budujemy prefabrykowane domy szkieletowe – precyzyjnie, szybko i na pokolenia.",
    btn_models: "Poznaj modele", btn_consult: "Bezpłatna konsultacja",
    hero_trust: "Zaufali nam klienci z 8 krajów Europy",
    stat_years: "Lat doświadczenia", stat_homes: "Zrealizowanych domów", stat_days: "Dni – czas realizacji",
    about_label: "O firmie",
    about_title: 'Budujemy domy<br><em>od ponad 35 lat</em>',
    about_text1: "VIDAL to firma rodzinna z ponad 35-letnią tradycją w budownictwie drewnianym. Nasz ojciec był jednym z pierwszych w Polsce, który w 1988 roku rozpoczął produkcję prefabrykowanych domów w technologii szkieletu drewnianego — w czasach, gdy nikt jeszcze nie wierzył w tę metodę budowania.",
    about_text2: "Dziś firma jest w rękach drugiego pokolenia. Kontynuujemy dzieło ojca, łącząc dziesiątki lat doświadczenia z nowoczesną technologią produkcji. Każdy dom powstaje w naszej fabryce pod pełną kontrolą jakości — precyzyjnie, w kontrolowanych warunkach, z materiałów najwyższej klasy.",
    about_text3: "Ponad 1000 zrealizowanych domów w 8 krajach Europy. Nie budujemy domów seryjnie — projektujemy je z myślą o ludziach, którzy oczekują więcej.",
    about_countries_label: "Nasze realizacje znajdziesz w:",
    process_label: "Jak budujemy",
    process_title: 'Proces budowy <em>domu</em>',
    process_desc: "Od projektu do odbioru kluczy – każdy etap jest precyzyjnie zaplanowany.",
    process_1_title: "Projekt domu", process_1_desc: "Indywidualny projekt dopasowany do potrzeb inwestora i wymagań działki.",
    process_2_title: "Produkcja w fabryce", process_2_desc: "Prefabrykowane ściany i elementy konstrukcyjne powstają w kontrolowanych warunkach.",
    process_3_title: "Transport", process_3_desc: "Gotowe elementy dostarczane na plac budowy – sprawnie i bezpiecznie.",
    process_4_title: "Montaż domu", process_4_desc: "Montaż konstrukcji na placu budowy – dom powstaje w zaledwie kilka tygodni.",
    tech_label: "Technologia",
    tech_title: 'Przekrój <em>ściany zewnętrznej</em>',
    tech_desc: "Przedstawiamy nasze sprawdzone konfiguracje ścian – od standardowej po pasywną. To punkty wyjścia, nie ograniczenia. Każdy przekrój dostosowujemy do wymagań projektu, zaleceń architekta lub indywidualnych preferencji inwestora.",
    tech_u_label: "Współczynnik przenikania ciepła",
    wall_tab_1: "Ściana wewnętrzna", wall_tab_2: "Elewacja drewniana", wall_tab_3: "Energooszczędna", wall_tab_4: "Standardowa",
    kvh_label: "Materiał",
    kvh_title: 'Konstrukcja z drewna <em>KVH C24</em>',
    models_label: "Oferta",
    models_title: 'Modele <em>domów</em>',
    models_desc: "Wybierz gotowy projekt lub dostosuj go do swoich potrzeb.",
    gallery_label: "Portfolio",
    gallery_title: 'Nasze <em>realizacje</em>',
    gallery_desc: "Zrealizowane w Polsce i za granicą.",
    testimonials_label: "Opinie",
    testimonials_title: 'Co mówią nasi <em>klienci</em>',
    testimonial_1_text: "Dom postawiony w 3 miesiące — od fundamentu do odbioru kluczy. Jakość wykonania przekroczyła nasze oczekiwania. Profesjonalizm na każdym etapie.",
    testimonial_1_name: "Marek i Anna Kowalscy",
    testimonial_1_loc: "Poznań, Polska",
    testimonial_2_text: "Wybraliśmy VIDAL do budowy domu letniskowego w Szwajcarii. Jakość konstrukcji drewnianej jest doskonała. Wszystko dostarczone na czas.",
    testimonial_2_name: "Thomas und Petra Weber",
    testimonial_2_loc: "Zürich, Szwajcaria",
    testimonial_3_text: "Fantastyczna jakość prosto z fabryki w Polsce. Dom zmontowany w niecałe dwa tygodnie. Polecamy VIDAL każdemu, kto szuka solidnego domu drewnianego.",
    testimonial_3_name: "Erik og Ingrid Larsen",
    testimonial_3_loc: "Bergen, Norwegia",
    factory_label: "Produkcja",
    factory_title: 'Nasza <em>fabryka</em>',
    factory_desc: "Domy powstają w naszej fabryce, gdzie produkowane są gotowe elementy ścian i konstrukcji. Pozwala to skrócić czas budowy i zwiększyć precyzję wykonania.",
    factory_f1_title: "Kontrolowane warunki", factory_f1_desc: "Produkcja w hali eliminuje wpływ pogody na jakość elementów.",
    factory_f2_title: "Krótszy czas budowy", factory_f2_desc: "Prefabrykacja pozwala skrócić czas realizacji nawet o 50%.",
    factory_f3_title: "Wysoka precyzja", factory_f3_desc: "Każdy element jest wykonany z dokładnością do milimetra.",
    contact_label: "Kontakt",
    contact_title: 'Porozmawiajmy o Twoim <em>domu</em>',
    contact_desc: "Skontaktuj się z nami – doradzimy i pomożemy wybrać najlepsze rozwiązanie.",
    contact_submit: "Wyślij wiadomość",
    scroll: "Scroll",
    footer_nav: "Nawigacja",

    country_pl: "Polska", country_de: "Niemcy", country_ch: "Szwajcaria", country_no: "Norwegia",
    model_see: "Zobacz projekt", model_area: "m² powierzchni", model_rooms: "pokoje",
    kvh_text1: "W konstrukcji naszych domów stosujemy certyfikowane drewno konstrukcyjne KVH w klasie wytrzymałości C24 – materiał wykorzystywany w nowoczesnym budownictwie drewnianym w całej Europie.",
    kvh_text2: "KVH (Konstruktionsvollholz) to specjalnie przygotowane drewno konstrukcyjne, które przechodzi kontrolowany proces suszenia komorowego oraz precyzyjnej obróbki przemysłowej. Dzięki temu osiąga stabilną wilgotność około 15%, co znacząco ogranicza ryzyko późniejszych odkształceń i pęknięć konstrukcji.",
    kvh_text3: "Elementy KVH są czterostronnie strugane i dokładnie kalibrowane – idealnie proste, z milimetrową precyzją wymiarów.",
    kvh_badge_label: "Klasa wytrzymałości",
    kvh_stat1: "Wilgotność po suszeniu komorowym", kvh_stat2: "Strony strugane i kalibrowane",
    kvh_why: "Dlaczego KVH C24",
    kvh_f1_title: "Wytrzymałość konstrukcyjna", kvh_f1_desc: "Klasa C24 oznacza wysoką wytrzymałość zgodną z normą europejską PN-EN 338. Materiał przeznaczony do elementów przenoszących duże obciążenia.",
    kvh_f2_title: "Stabilność wymiarowa", kvh_f2_desc: "Suszenie komorowe i selekcja eliminują wady materiału, znacząco zmniejszając ryzyko skręcania czy pękania elementów konstrukcji.",
    kvh_f3_title: "Precyzja i jakość wykonania", kvh_f3_desc: "Czterostronne struganie zapewnia idealnie gładką powierzchnię oraz wysoką dokładność, co przekłada się na trwałość całego domu.",
    kvh_f4_title: "Europejski standard", kvh_f4_desc: "Drewno KVH jest standardem w budownictwie drewnianym w Niemczech, Austrii i krajach skandynawskich – wszędzie, gdzie liczy się trwałość i bezpieczeństwo.",
    footer_tagline: "Projektujemy i budujemy prefabrykowane domy szkieletowe od 1988 roku. Ponad 35 lat doświadczenia, setki zrealizowanych domów.",
    footer_privacy: "Polityka prywatności", footer_terms: "Regulamin",
    footer_models: "Modele domów",
    contact_address: "Adres", contact_phone: "Telefon", contact_email: "Email",
    contact_map: "Mapa lokalizacji – Poznań",

    map_label: "Zasięg", map_title: 'Budujemy w całej <em>Europie</em>',
    map_desc: "Nasze domy stoją w 8 krajach europejskich. Każdy projekt realizujemy z tą samą precyzją – niezależnie od lokalizacji.",
    map_poland: "Polska", map_germany: "Niemcy", map_switzerland: "Szwajcaria",
    map_spain: "Hiszpania", map_norway: "Norwegia", map_england: "Anglia", map_austria: "Austria", map_france: "Francja",

    // Wall tab short labels
    wall_tab_u_1: "Wewnętrzna", wall_tab_u_2: "Drewniana",

    // Wall panel 0 – internal wall
    wall0_title: "Ściana wewnętrzna", wall0_subtitle: "Izolacja akustyczna",
    wall0_l1: "Płyta kartonowo-gipsowa", wall0_l2: "Płyta OSB", wall0_l3: "Wełna akustyczna",
    wall0_l4: "Płyta OSB", wall0_l5: "Płyta gipsowo-kartonowa",

    // Wall panel 1 – wooden facade
    wall1_card1: "W/m²K · spełnia KfW 40", wall1_card2: "Rezerwa wysychania · 8,6× DIN", wall1_card3: "Przesunięcie fazowe · tłumienie 23×",
    wall1_l1: "Drewno profilowane (elewacja)", wall1_l2: "Szczelina wentylacyjna KVH 40×60",
    wall1_l3: "ROCKWOOL Fixrock 035 VS", wall1_l4: "pro clima SOLITEX FRONTA® WA",
    wall1_l5: "Płyta OSB/3", wall1_l6: "Wełna mineralna λ=0,035 w konstrukcji KVH 120×60",
    wall1_l7: "pro clima INTELLO® PLUS", wall1_l8: "Ruszt instalacyjny KVH 60×60 + wełna",
    wall1_l9: "Płyta OSB/3", wall1_l10: "Płyta gipsowo-kartonowa",

    // Wall panel 2 – energy-efficient U=0.13
    wall2_card1: "W/m²K · spełnia KfW 40", wall2_card2: "Rezerwa wysychania · 5,3× DIN", wall2_card3: "Przesunięcie fazowe · tłumienie 29×",
    wall2_l1: "Tynk silikonowy", wall2_l2: "EPS grafitowy 032 WDV",
    wall2_l3: "Płyta OSB/3", wall2_l4: "Wełna mineralna λ=0,035 w konstrukcji KVH 120×60",
    wall2_l5: "pro clima INTELLO®", wall2_l6: "Wełna mineralna w ruszcie instalacyjnym KVH 60×60",
    wall2_l7: "Płyta OSB/3", wall2_l8: "Płyta gipsowo-kartonowa",

    // Wall panel 3 – standard U=0.25
    wall3_l1: "Tynk silikonowy", wall3_l2: "Styropian fasadowy grafitowy",
    wall3_l3: "Płyta OSB", wall3_l4: "Wełna mineralna w konstrukcji",
    wall3_l5: "Intello (inteligentna paroizolacja)", wall3_l6: "Płyta gipsowo-kartonowa",

    // Certification
    cert_label: "Dokumentacja i certyfikacja",
    cert_din_title: "Certyfikat DIN 1052",
    cert_din_desc: "Zgodność paneli ściennych z normą budowlaną. MPA Dresden.",
    cert_cochran_desc: "Szkolenie USDA w budownictwie drewnianym, USA 1995.",
    cert_wood_desc: "International Technology Transfer – budownictwo drewniane.",

    // Offer section
    offer_title: 'Budujemy <em>każdy typ</em> domu',
    offer_desc: "Realizujemy domy na podstawie projektów wybranych przez naszych klientów — zarówno z gotowych katalogów, jak i indywidualnych pracowni architektonicznych. Niezależnie od stylu i wielkości, każdy projekt dostosowujemy do technologii prefabrykowanej konstrukcji drewnianej.",
    offer_single_title: "Domy parterowe",
    offer_single_desc: "Funkcjonalne układy na jednym poziomie. Idealne dla rodzin ceniących wygodę i bezprogowy komfort.",
    offer_two_title: "Domy piętrowe",
    offer_two_desc: "Więcej przestrzeni na mniejszej działce. Oddzielna strefa dzienna i nocna dla większych rodzin.",
    offer_mezzanine_title: "Domy z antresolą",
    offer_mezzanine_desc: "Otwarta przestrzeń z wysokim sufitem. Nowoczesna forma, popularna w stylu stodoła i loft.",
    offer_twin_title: "Domy bliźniacze",
    offer_twin_desc: "Dwa niezależne segmenty w jednej bryle. Ekonomiczne rozwiązanie dla dwóch rodzin lub inwestorów.",
    offer_rec_title: "Domy rekreacyjne",
    offer_rec_desc: "Kompaktowe domy letniskowe i całoroczne. Szybka realizacja, wysoka jakość wykończenia.",
    offer_how_title: "Jak to działa?",
    offer_step_1: "Dostarczasz projekt domu — z katalogu lub od architekta",
    offer_step_2: "Analizujemy i dostosowujemy do technologii szkieletowej",
    offer_step_3: "Produkujemy prefabrykowane elementy w naszej fabryce",
    offer_step_4: "Montujemy dom na Twojej działce — nawet w 90 dni",

    // Gallery toggle
    gallery_more: "Zobacz więcej realizacji", gallery_less: "Zwiń",

    // Factory overlays
    factory_ov_1: "Podnoszenie ściany OSB", factory_ov_2: "Montaż ramy ściennej",
    factory_ov_3: "Szkielet ściany z otworami", factory_ov_4: "Montaż płyt g-k",
    factory_ov_5: "Izolacja wełną mineralną", factory_ov_6: "Montaż styropianu fasadowego",
    factory_ov_7: "Gotowa ściana z izolacją", factory_ov_8: "Klejenie styropianu",
    factory_ov_9: "Ściana z płytą OSB", factory_ov_10: "Układanie wełny mineralnej",
    factory_ov_11: "Pakowanie ściany do transportu", factory_ov_12: "Drewno konstrukcyjne",

    // Footer
    footer_contact: "Kontakt",
    footer_copy: "Wszelkie prawa zastrzeżone.",

    // JS messages
    form_sending: "Wysyłanie...",
    form_error: "Wystąpił błąd. Spróbuj ponownie.",
    form_network_error: "Błąd połączenia. Sprawdź internet i spróbuj ponownie.",
  },
  en: {
    nav_about: "About", nav_models: "Models", nav_tech: "Technology",
    nav_realizations: "Projects", nav_factory: "Factory", nav_contact: "Contact",
    hero_subtitle: "Prefabricated homes \u00b7 Poznań \u00b7 since 1988",
    hero_title: 'Home<br><em>from the soul</em><br>of wood',
    hero_desc: "We design and build prefabricated timber frame houses – precisely, quickly, and for generations.",
    btn_models: "Discover models", btn_consult: "Free consultation",
    hero_trust: "Trusted by clients from 8 European countries",
    stat_years: "Years of experience", stat_homes: "Houses completed", stat_days: "Days – construction time",
    about_label: "About us",
    about_title: 'Building homes<br><em>for over 35 years</em>',
    about_text1: "VIDAL is a family company with over 35 years of tradition in timber construction. Our father was one of the first in Poland to start manufacturing prefabricated timber frame houses in 1988 — at a time when no one yet believed in this building method.",
    about_text2: "Today the company is in the hands of the second generation. We continue our father's legacy, combining decades of experience with modern production technology. Every house is built in our factory under full quality control — precisely, in controlled conditions, using the highest quality materials.",
    about_text3: "Over 1,000 houses completed in 8 European countries. We don't build houses in series — we design them with people in mind who expect more.",
    about_countries_label: "Our projects can be found in:",
    process_label: "How we build",
    process_title: 'Construction <em>process</em>',
    process_desc: "From design to handover – every stage is precisely planned.",
    process_1_title: "House design", process_1_desc: "Custom design tailored to the investor's needs and site requirements.",
    process_2_title: "Factory production", process_2_desc: "Prefabricated walls and structural elements are produced in controlled conditions.",
    process_3_title: "Transport", process_3_desc: "Finished elements delivered to the construction site – efficiently and safely.",
    process_4_title: "Assembly", process_4_desc: "On-site assembly of the structure – the house is built in just a few weeks.",
    tech_label: "Technology",
    tech_title: 'Wall <em>cross-section</em>',
    tech_desc: "These are our proven wall configurations – from standard to passive. They serve as a starting point, not a limitation. We customize every cross-section to match project requirements, architect recommendations, or individual investor preferences.",
    tech_u_label: "Heat transfer coefficient",
    wall_tab_1: "Internal wall", wall_tab_2: "Wooden facade", wall_tab_3: "Energy-efficient", wall_tab_4: "Standard",
    kvh_label: "Material",
    kvh_title: 'Construction with <em>KVH C24</em> timber',
    models_label: "Offer",
    models_title: 'House <em>models</em>',
    models_desc: "Choose a ready project or customize it to your needs.",
    gallery_label: "Portfolio",
    gallery_title: 'Our <em>projects</em>',
    gallery_desc: "Completed in Poland and abroad.",
    testimonials_label: "Testimonials",
    testimonials_title: 'What our <em>clients</em> say',
    testimonial_1_text: "House built in 3 months — from foundation to key handover. The quality of workmanship exceeded our expectations. Professionalism at every stage.",
    testimonial_1_name: "Marek & Anna Kowalski",
    testimonial_1_loc: "Poznań, Poland",
    testimonial_2_text: "We chose VIDAL for our holiday home in Switzerland. The quality of the timber construction is outstanding. Everything was delivered on time.",
    testimonial_2_name: "Thomas & Petra Weber",
    testimonial_2_loc: "Zürich, Switzerland",
    testimonial_3_text: "Fantastic quality straight from the factory in Poland. The house was assembled in under two weeks. We recommend VIDAL to anyone looking for a solid timber home.",
    testimonial_3_name: "Erik & Ingrid Larsen",
    testimonial_3_loc: "Bergen, Norway",
    factory_label: "Production",
    factory_title: 'Our <em>factory</em>',
    factory_desc: "Our houses are built in our factory, where complete wall and structural elements are produced. This shortens construction time and increases precision.",
    factory_f1_title: "Controlled conditions", factory_f1_desc: "Indoor production eliminates weather impact on element quality.",
    factory_f2_title: "Shorter build time", factory_f2_desc: "Prefabrication reduces construction time by up to 50%.",
    factory_f3_title: "High precision", factory_f3_desc: "Every element is manufactured with millimeter accuracy.",
    contact_label: "Contact",
    contact_title: 'Let\u2019s talk about your <em>home</em>',
    contact_desc: "Get in touch – we will advise and help you choose the best solution.",
    contact_submit: "Send message",
    scroll: "Scroll",
    footer_nav: "Navigation",

    country_pl: "Poland", country_de: "Germany", country_ch: "Switzerland", country_no: "Norway",
    model_see: "See project", model_area: "m² area", model_rooms: "rooms",
    kvh_text1: "In the construction of our houses we use certified KVH structural timber in strength class C24 – a material used in modern timber construction throughout Europe.",
    kvh_text2: "KVH (Konstruktionsvollholz) is specially prepared structural timber that undergoes a controlled kiln-drying process and precision industrial processing. This achieves a stable moisture content of approximately 15%, significantly reducing the risk of subsequent deformation and cracking.",
    kvh_text3: "KVH elements are planed on all four sides and precisely calibrated – perfectly straight, with millimeter dimensional accuracy.",
    kvh_badge_label: "Strength class",
    kvh_stat1: "Moisture after kiln drying", kvh_stat2: "Sides planed and calibrated",
    kvh_why: "Why KVH C24",
    kvh_f1_title: "Structural strength", kvh_f1_desc: "Class C24 indicates high strength compliant with European standard EN 338. This material is designed for structural elements bearing heavy loads.",
    kvh_f2_title: "Dimensional stability", kvh_f2_desc: "Kiln drying and selection eliminate material defects, significantly reducing the risk of twisting or cracking of structural elements.",
    kvh_f3_title: "Precision and quality", kvh_f3_desc: "Four-sided planing ensures a perfectly smooth surface and high accuracy, resulting in durability of the entire house.",
    kvh_f4_title: "European standard", kvh_f4_desc: "KVH timber is the standard in timber construction in Germany, Austria and Scandinavian countries – wherever durability and safety matter.",
    footer_tagline: "We design and build prefabricated timber frame houses since 1988. Over 35 years of experience, hundreds of houses completed.",
    footer_privacy: "Privacy policy", footer_terms: "Terms & conditions",
    footer_models: "House models",
    contact_address: "Address", contact_phone: "Phone", contact_email: "Email",
    contact_map: "Location map – Poznań",

    map_label: "Reach", map_title: 'We build across <em>Europe</em>',
    map_desc: "Our houses stand in 8 European countries. Every project is delivered with the same precision – regardless of location.",
    map_poland: "Poland", map_germany: "Germany", map_switzerland: "Switzerland",
    map_spain: "Spain", map_norway: "Norway", map_england: "England", map_austria: "Austria", map_france: "France",

    // Wall tab short labels
    wall_tab_u_1: "Internal", wall_tab_u_2: "Wooden",

    // Wall panel 0 – internal wall
    wall0_title: "Internal wall", wall0_subtitle: "Acoustic insulation",
    wall0_l1: "Plasterboard", wall0_l2: "OSB board", wall0_l3: "Acoustic wool",
    wall0_l4: "OSB board", wall0_l5: "Gypsum plasterboard",

    // Wall panel 1 – wooden facade
    wall1_card1: "W/m²K · meets KfW 40", wall1_card2: "Drying reserve · 8.6× DIN standard", wall1_card3: "Phase shift · damping 23×",
    wall1_l1: "Profiled timber cladding", wall1_l2: "Ventilation gap KVH 40×60",
    wall1_l3: "ROCKWOOL Fixrock 035 VS", wall1_l4: "pro clima SOLITEX FRONTA® WA",
    wall1_l5: "OSB/3 board", wall1_l6: "Mineral wool λ=0.035 in KVH 120×60 frame",
    wall1_l7: "pro clima INTELLO® PLUS", wall1_l8: "Service void KVH 60×60 + insulation",
    wall1_l9: "OSB/3 board", wall1_l10: "Gypsum plasterboard",

    // Wall panel 2 – energy-efficient U=0.13
    wall2_card1: "W/m²K · meets KfW 40", wall2_card2: "Drying reserve · 5.3× DIN standard", wall2_card3: "Phase shift · damping 29×",
    wall2_l1: "Silicone render", wall2_l2: "Graphite EPS 032 ETICS",
    wall2_l3: "OSB/3 board", wall2_l4: "Mineral wool λ=0.035 in KVH 120×60 frame",
    wall2_l5: "pro clima INTELLO®", wall2_l6: "Mineral wool in KVH 60×60 service void",
    wall2_l7: "OSB/3 board", wall2_l8: "Plasterboard",

    // Wall panel 3 – standard U=0.25
    wall3_l1: "Silicone render", wall3_l2: "Graphite facade polystyrene",
    wall3_l3: "OSB board", wall3_l4: "Mineral wool in frame",
    wall3_l5: "Intello (smart vapour control layer)", wall3_l6: "Gypsum plasterboard",

    // Certification
    cert_label: "Documentation and certification",
    cert_din_title: "DIN 1052 Certificate",
    cert_din_desc: "Wall panel compliance with building standard. MPA Dresden.",
    cert_cochran_desc: "USDA training in timber construction, USA 1995.",
    cert_wood_desc: "International Technology Transfer – timber construction.",

    // Offer section
    offer_title: 'We build <em>every type</em> of home',
    offer_desc: "We build houses based on designs chosen by our clients — from ready-made catalogues as well as individual architectural studios. Regardless of style and size, we adapt every design to prefabricated timber frame technology.",
    offer_single_title: "Single-storey houses",
    offer_single_desc: "Functional layouts on one level. Ideal for families who value convenience and barrier-free comfort.",
    offer_two_title: "Two-storey houses",
    offer_two_desc: "More space on a smaller plot. Separate living and sleeping zones for larger families.",
    offer_mezzanine_title: "Homes with mezzanine",
    offer_mezzanine_desc: "Open space with high ceilings. Modern form, popular in barn and loft styles.",
    offer_twin_title: "Semi-detached houses",
    offer_twin_desc: "Two independent units in one structure. An economical solution for two families or investors.",
    offer_rec_title: "Holiday homes",
    offer_rec_desc: "Compact holiday and year-round houses. Fast construction, high-quality finish.",
    offer_how_title: "How does it work?",
    offer_step_1: "You provide a house design — from a catalogue or architect",
    offer_step_2: "We analyse and adapt it to timber frame technology",
    offer_step_3: "We manufacture prefabricated elements in our factory",
    offer_step_4: "We assemble the house on your plot — in as little as 90 days",

    // Gallery toggle
    gallery_more: "See more projects", gallery_less: "Show less",

    // Factory overlays
    factory_ov_1: "Lifting OSB wall panel", factory_ov_2: "Wall frame assembly",
    factory_ov_3: "Wall frame with openings", factory_ov_4: "Plasterboard installation",
    factory_ov_5: "Mineral wool insulation", factory_ov_6: "Facade polystyrene installation",
    factory_ov_7: "Finished insulated wall", factory_ov_8: "Polystyrene bonding",
    factory_ov_9: "Wall with OSB board", factory_ov_10: "Laying mineral wool",
    factory_ov_11: "Packaging wall for transport", factory_ov_12: "Structural timber",

    // Footer
    footer_contact: "Contact",
    footer_copy: "All rights reserved.",

    // JS messages
    form_sending: "Sending...",
    form_error: "An error occurred. Please try again.",
    form_network_error: "Connection error. Check your internet and try again.",
  },
  de: {
    nav_about: "Über uns", nav_models: "Modelle", nav_tech: "Technologie",
    nav_realizations: "Projekte", nav_factory: "Fabrik", nav_contact: "Kontakt",
    hero_subtitle: "Fertighäuser \u00b7 Poznań \u00b7 seit 1988",
    hero_title: 'Haus<br><em>aus der Seele</em><br>des Holzes',
    hero_desc: "Wir entwerfen und bauen vorgefertigte Holzrahmenhäuser – präzise, schnell und für Generationen.",
    btn_models: "Modelle entdecken", btn_consult: "Kostenlose Beratung",
    hero_trust: "Vertrauen von Kunden aus 8 europäischen Ländern",
    stat_years: "Jahre Erfahrung", stat_homes: "Gebaute Häuser", stat_days: "Tage – Bauzeit",
    about_label: "Über uns",
    about_title: 'Wir bauen Häuser<br><em>seit über 35 Jahren</em>',
    about_text1: "VIDAL ist ein Familienunternehmen mit über 35-jähriger Tradition im Holzbau. Unser Vater war einer der Ersten in Polen, der 1988 mit der Herstellung von vorgefertigten Holzrahmenhäusern begann — zu einer Zeit, als noch niemand an diese Baumethode glaubte.",
    about_text2: "Heute liegt das Unternehmen in den Händen der zweiten Generation. Wir setzen das Werk unseres Vaters fort und verbinden Jahrzehnte an Erfahrung mit moderner Produktionstechnologie. Jedes Haus entsteht in unserer Fabrik unter voller Qualitätskontrolle — präzise, unter kontrollierten Bedingungen, aus Materialien höchster Klasse.",
    about_text3: "Über 1.000 fertiggestellte Häuser in 8 europäischen Ländern. Wir bauen keine Serienhäuser — wir entwerfen sie für Menschen, die mehr erwarten.",
    about_countries_label: "Unsere Projekte finden Sie in:",
    process_label: "Wie wir bauen",
    process_title: 'Bau<em>prozess</em>',
    process_desc: "Vom Entwurf bis zur Schlüsselübergabe – jeder Schritt ist präzise geplant.",
    process_1_title: "Hausentwurf", process_1_desc: "Individueller Entwurf, angepasst an die Bedürfnisse des Bauherrn und die Grundstücksanforderungen.",
    process_2_title: "Produktion in der Fabrik", process_2_desc: "Vorgefertigte Wände und Konstruktionselemente entstehen unter kontrollierten Bedingungen.",
    process_3_title: "Transport", process_3_desc: "Fertige Elemente werden sicher und effizient zur Baustelle geliefert.",
    process_4_title: "Montage", process_4_desc: "Montage der Konstruktion auf der Baustelle – das Haus steht in nur wenigen Wochen.",
    tech_label: "Technologie",
    tech_title: 'Wand<em>querschnitt</em>',
    tech_desc: "Hier zeigen wir unsere bewährten Wandkonfigurationen – von Standard bis Passiv. Sie sind Ausgangspunkte, keine Einschränkungen. Jeden Wandaufbau passen wir an die Projektanforderungen, Architektenempfehlungen oder individuellen Wünsche des Bauherrn an.",
    tech_u_label: "Wärmedurchgangskoeffizient",
    wall_tab_1: "Innenwand", wall_tab_2: "Holzfassade", wall_tab_3: "Energieeffizient", wall_tab_4: "Standard",
    kvh_label: "Material",
    kvh_title: 'Konstruktion aus <em>KVH C24</em> Holz',
    models_label: "Angebot",
    models_title: 'Haus<em>modelle</em>',
    models_desc: "Wählen Sie ein fertiges Projekt oder passen Sie es an Ihre Bedürfnisse an.",
    gallery_label: "Portfolio",
    gallery_title: 'Unsere <em>Projekte</em>',
    gallery_desc: "Realisiert in Polen und im Ausland.",
    testimonials_label: "Bewertungen",
    testimonials_title: 'Was unsere <em>Kunden</em> sagen',
    testimonial_1_text: "Haus in 3 Monaten gebaut — vom Fundament bis zur Schlüsselübergabe. Die Qualität der Ausführung hat unsere Erwartungen übertroffen. Professionalität in jeder Phase.",
    testimonial_1_name: "Marek & Anna Kowalski",
    testimonial_1_loc: "Poznań, Polen",
    testimonial_2_text: "Wir haben VIDAL für unser Ferienhaus in der Schweiz gewählt. Die Qualität der Holzkonstruktion ist hervorragend. Alles wurde termingerecht geliefert.",
    testimonial_2_name: "Thomas & Petra Weber",
    testimonial_2_loc: "Zürich, Schweiz",
    testimonial_3_text: "Fantastische Qualität direkt aus der Fabrik in Polen. Das Haus wurde in weniger als zwei Wochen montiert. Wir empfehlen VIDAL jedem, der ein solides Holzhaus sucht.",
    testimonial_3_name: "Erik & Ingrid Larsen",
    testimonial_3_loc: "Bergen, Norwegen",
    factory_label: "Produktion",
    factory_title: 'Unsere <em>Fabrik</em>',
    factory_desc: "Unsere Häuser entstehen in unserer Fabrik, wo fertige Wand- und Konstruktionselemente produziert werden. Das verkürzt die Bauzeit und erhöht die Präzision.",
    factory_f1_title: "Kontrollierte Bedingungen", factory_f1_desc: "Die Hallenproduktion eliminiert den Wettereinfluss auf die Elementqualität.",
    factory_f2_title: "Kürzere Bauzeit", factory_f2_desc: "Vorfertigung verkürzt die Bauzeit um bis zu 50%.",
    factory_f3_title: "Hohe Präzision", factory_f3_desc: "Jedes Element wird millimetergenau gefertigt.",
    contact_label: "Kontakt",
    contact_title: 'Sprechen wir über Ihr <em>Haus</em>',
    contact_desc: "Kontaktieren Sie uns – wir beraten Sie und helfen Ihnen, die beste Lösung zu finden.",
    contact_submit: "Nachricht senden",
    scroll: "Scroll",
    footer_nav: "Navigation",

    country_pl: "Polen", country_de: "Deutschland", country_ch: "Schweiz", country_no: "Norwegen",
    model_see: "Projekt ansehen", model_area: "m² Fläche", model_rooms: "Zimmer",
    kvh_text1: "Bei der Konstruktion unserer Häuser verwenden wir zertifiziertes KVH-Konstruktionsholz in der Festigkeitsklasse C24 – ein Material, das im modernen Holzbau in ganz Europa eingesetzt wird.",
    kvh_text2: "KVH (Konstruktionsvollholz) ist speziell aufbereitetes Konstruktionsholz, das einen kontrollierten Kammertrockungsprozess und präzise industrielle Bearbeitung durchläuft. Dadurch wird eine stabile Holzfeuchte von ca. 15% erreicht, was das Risiko späterer Verformungen und Risse deutlich reduziert.",
    kvh_text3: "KVH-Elemente sind vierseitig gehobelt und präzise kalibriert – perfekt gerade, mit millimetergenauer Maßhaltigkeit.",
    kvh_badge_label: "Festigkeitsklasse",
    kvh_stat1: "Feuchte nach Kammertrocknung", kvh_stat2: "Seiten gehobelt und kalibriert",
    kvh_why: "Warum KVH C24",
    kvh_f1_title: "Konstruktive Festigkeit", kvh_f1_desc: "Klasse C24 steht für hohe Festigkeit gemäß europäischer Norm EN 338. Dieses Material ist für tragende Bauteile mit hoher Belastung vorgesehen.",
    kvh_f2_title: "Maßhaltigkeit", kvh_f2_desc: "Kammertrocknung und Selektion beseitigen Materialfehler und reduzieren das Risiko von Verdrehungen oder Rissen erheblich.",
    kvh_f3_title: "Präzision und Qualität", kvh_f3_desc: "Vierseitiges Hobeln sorgt für eine perfekt glatte Oberfläche und hohe Genauigkeit, was sich in der Langlebigkeit des gesamten Hauses niederschlägt.",
    kvh_f4_title: "Europäischer Standard", kvh_f4_desc: "KVH-Holz ist Standard im Holzbau in Deutschland, Österreich und Skandinavien – überall dort, wo Langlebigkeit und Sicherheit zählen.",
    footer_tagline: "Wir entwerfen und bauen Fertighäuser in Holzrahmenbauweise seit 1988. Über 35 Jahre Erfahrung, Hunderte gebaute Häuser.",
    footer_privacy: "Datenschutz", footer_terms: "AGB",
    footer_models: "Hausmodelle",
    contact_address: "Adresse", contact_phone: "Telefon", contact_email: "E-Mail",
    contact_map: "Standortkarte – Poznań",

    map_label: "Reichweite", map_title: 'Wir bauen in ganz <em>Europa</em>',
    map_desc: "Unsere Häuser stehen in 8 europäischen Ländern. Jedes Projekt wird mit der gleichen Präzision umgesetzt – unabhängig vom Standort.",
    map_poland: "Polen", map_germany: "Deutschland", map_switzerland: "Schweiz",
    map_spain: "Spanien", map_norway: "Norwegen", map_england: "England", map_austria: "Österreich", map_france: "Frankreich",

    // Wall tab short labels
    wall_tab_u_1: "Innen", wall_tab_u_2: "Holz",

    // Wall panel 0 – internal wall
    wall0_title: "Innenwand", wall0_subtitle: "Schalldämmung",
    wall0_l1: "Gipskartonplatte", wall0_l2: "OSB-Platte", wall0_l3: "Akustikwolle",
    wall0_l4: "OSB-Platte", wall0_l5: "Gipskartonplatte",

    // Wall panel 1 – wooden facade
    wall1_card1: "W/m²K · erfüllt KfW 40", wall1_card2: "Trocknungsreserve · 8,6× DIN-Norm", wall1_card3: "Phasenverschiebung · Dämpfung 23×",
    wall1_l1: "Profilholz (Fassade)", wall1_l2: "Belüftungsspalt KVH 40×60",
    wall1_l3: "ROCKWOOL Fixrock 035 VS", wall1_l4: "pro clima SOLITEX FRONTA® WA",
    wall1_l5: "OSB/3-Platte", wall1_l6: "Mineralwolle λ=0,035 im KVH 120×60 Rahmen",
    wall1_l7: "pro clima INTELLO® PLUS", wall1_l8: "Installationsebene KVH 60×60 + Dämmung",
    wall1_l9: "OSB/3-Platte", wall1_l10: "Gipskartonplatte",

    // Wall panel 2 – energy-efficient U=0.13
    wall2_card1: "W/m²K · erfüllt KfW 40", wall2_card2: "Trocknungsreserve · 5,3× DIN-Norm", wall2_card3: "Phasenverschiebung · Dämpfung 29×",
    wall2_l1: "Silikonputz", wall2_l2: "EPS-grau 032 WDV",
    wall2_l3: "OSB/3-Platte", wall2_l4: "Mineralwolle λ=0,035 im KVH 120×60 Rahmen",
    wall2_l5: "pro clima INTELLO®", wall2_l6: "Mineralwolle in KVH 60×60 Installationsebene",
    wall2_l7: "OSB/3-Platte", wall2_l8: "Gipskartonplatte",

    // Wall panel 3 – standard U=0.25
    wall3_l1: "Silikonputz", wall3_l2: "Graphit-Fassadenstyropor",
    wall3_l3: "OSB-Platte", wall3_l4: "Mineralwolle im Rahmen",
    wall3_l5: "Intello (intelligente Dampfbremse)", wall3_l6: "Gipskartonplatte",

    // Certification
    cert_label: "Dokumentation und Zertifizierung",
    cert_din_title: "DIN 1052 Zertifikat",
    cert_din_desc: "Konformität der Wandpaneele mit der Baunorm. MPA Dresden.",
    cert_cochran_desc: "USDA-Schulung im Holzbau, USA 1995.",
    cert_wood_desc: "International Technology Transfer – Holzbau.",

    // Offer section
    offer_title: 'Wir bauen <em>jeden Typ</em> von Haus',
    offer_desc: "Wir bauen Häuser auf Grundlage von Entwürfen unserer Kunden — sowohl aus fertigen Katalogen als auch von individuellen Architekturbüros. Unabhängig von Stil und Größe passen wir jeden Entwurf an die vorgefertigte Holzrahmenbauweise an.",
    offer_single_title: "Einstöckige Häuser",
    offer_single_desc: "Funktionale Grundrisse auf einer Ebene. Ideal für Familien, die Komfort und barrierefreies Wohnen schätzen.",
    offer_two_title: "Zweistöckige Häuser",
    offer_two_desc: "Mehr Raum auf kleinerem Grundstück. Getrennte Wohn- und Schlafbereiche für größere Familien.",
    offer_mezzanine_title: "Häuser mit Empore",
    offer_mezzanine_desc: "Offener Raum mit hohen Decken. Moderne Form, beliebt im Scheunen- und Loftstil.",
    offer_twin_title: "Doppelhaushälften",
    offer_twin_desc: "Zwei unabhängige Einheiten in einem Baukörper. Eine wirtschaftliche Lösung für zwei Familien oder Investoren.",
    offer_rec_title: "Ferienhäuser",
    offer_rec_desc: "Kompakte Ferien- und Ganzjahreshäuser. Schnelle Realisierung, hochwertige Ausführung.",
    offer_how_title: "Wie funktioniert es?",
    offer_step_1: "Sie liefern einen Hausentwurf — aus dem Katalog oder vom Architekten",
    offer_step_2: "Wir analysieren und passen ihn an die Holzrahmenbauweise an",
    offer_step_3: "Wir fertigen vorgefertigte Elemente in unserer Fabrik",
    offer_step_4: "Wir montieren das Haus auf Ihrem Grundstück — in nur 90 Tagen",

    // Gallery toggle
    gallery_more: "Mehr Projekte anzeigen", gallery_less: "Weniger anzeigen",

    // Factory overlays
    factory_ov_1: "Anheben der OSB-Wandplatte", factory_ov_2: "Montage des Wandrahmens",
    factory_ov_3: "Wandrahmen mit Öffnungen", factory_ov_4: "Gipskartonmontage",
    factory_ov_5: "Mineralwolldämmung", factory_ov_6: "Fassadenstyropormontage",
    factory_ov_7: "Fertige gedämmte Wand", factory_ov_8: "Styroporverklebung",
    factory_ov_9: "Wand mit OSB-Platte", factory_ov_10: "Verlegen der Mineralwolle",
    factory_ov_11: "Verpacken der Wand für den Transport", factory_ov_12: "Konstruktionsholz",

    // Footer
    footer_contact: "Kontakt",
    footer_copy: "Alle Rechte vorbehalten.",

    // JS messages
    form_sending: "Wird gesendet...",
    form_error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    form_network_error: "Verbindungsfehler. Überprüfen Sie Ihr Internet und versuchen Sie es erneut.",
  }
};

var currentLang = 'pl';

function setLang(lang) {
  currentLang = lang;
  var t = i18n[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  var placeholders = {
    pl: { name: "Imię i nazwisko", phone: "Telefon", email: "Adres email", subject: "Temat", message: "Twoja wiadomość..." },
    en: { name: "Full name", phone: "Phone", email: "Email address", subject: "Subject", message: "Your message..." },
    de: { name: "Vor- und Nachname", phone: "Telefon", email: "E-Mail-Adresse", subject: "Betreff", message: "Ihre Nachricht..." }
  };
  var ph = placeholders[lang];
  var formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  var phKeys = ['name', 'phone', 'email', 'subject', 'message'];
  formInputs.forEach(function(input, i) {
    if (phKeys[i] && ph[phKeys[i]]) input.placeholder = ph[phKeys[i]];
  });
  // Gallery toggle labels
  var gallerySpan = document.querySelector('#galleryToggle span');
  if (gallerySpan && t.gallery_more && t.gallery_less) {
    gallerySpan.setAttribute('data-label-more', t.gallery_more);
    gallerySpan.setAttribute('data-label-less', t.gallery_less);
    var isExpanded = document.querySelector('.proj-grid') && document.querySelector('.proj-grid').classList.contains('expanded');
    gallerySpan.textContent = isExpanded ? t.gallery_less : t.gallery_more;
  }
  // Footer copyright
  var copyEl = document.querySelector('.footer-copy');
  if (copyEl && t.footer_copy) {
    copyEl.innerHTML = '&copy; 2026 VIDAL. ' + t.footer_copy;
  }
  document.querySelectorAll('.lang-btn').forEach(function(btn, i) {
    var langs = ['pl', 'en', 'de'];
    if (langs[i] === lang) btn.classList.add('active');
    else btn.classList.remove('active');
  });
  document.documentElement.lang = lang;
}
document.querySelector('.lang-btn').classList.add('active');

// --- MODEL DETAIL ---
function openModelDetail(id) {
  var modal = document.getElementById(id);
  if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModelDetail() {
  document.querySelectorAll('.model-modal').forEach(function(m) { m.classList.remove('open'); });
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModelDetail(); closeCertLB(); }
});

// --- CERT LIGHTBOX ---
var certImages = [
  "img/asset-034.jpg",
  "img/asset-035.jpg",
  "img/asset-036.jpg"
];
function openCertLB(idx) {
  document.getElementById('certLBImg').src = certImages[idx];
  document.getElementById('certLightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCertLB() {
  document.getElementById('certLightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.cert-preview[data-cert]').forEach(function(el) {
  el.addEventListener('click', function() {
    openCertLB(parseInt(el.getAttribute('data-cert')));
  });
});


// --- GALLERY TOGGLE ---
var galleryToggle = document.getElementById('galleryToggle');
var projGrid = document.querySelector('.proj-grid');
if (galleryToggle && projGrid) {
  var labelSpan = galleryToggle.querySelector('span');
  galleryToggle.addEventListener('click', function() {
    var isExpanding = !projGrid.classList.contains('expanded');
    projGrid.classList.toggle('expanded');
    galleryToggle.classList.toggle('active');
    // Update button text
    if (labelSpan) {
      labelSpan.textContent = isExpanding
        ? (labelSpan.getAttribute('data-label-less') || 'Zwiń')
        : (labelSpan.getAttribute('data-label-more') || 'Zobacz więcej realizacji');
    }
    // GSAP animation for revealed cards
    if (isExpanding && typeof gsap !== 'undefined') {
      var hiddenCards = projGrid.querySelectorAll('.proj-card:nth-child(n+7)');
      gsap.fromTo(hiddenCards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }
      );
    }
  });
}

// =============================================
// MOTION ENGINE (IIFE)
// =============================================
(function() {
  'use strict';

  // document.body.classList.add('js-ready'); // Disabled: GSAP handles reveals

  var PROGRESS = document.getElementById('scrollProgress');
  var NAV_EL = document.getElementById('nav');
  var HERO_BG = document.querySelector('.hero-bg');
  var HERO_CONTENT = document.querySelector('.hero-content');
  var HERO_STATS = document.querySelector('.hero-stats');

  // Reveal observer
  var revealSelector = '.reveal-up, .reveal-scale, .reveal-scale-soft, .reveal-up-scale, .reveal-left, .reveal-right, .reveal-blur, .reveal-zoom, .reveal-clip-left, .stagger-group, .gold-divider, .section-label';
  var revealElements = document.querySelectorAll(revealSelector);

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.classList.contains('stagger-group')) {
          entry.target.querySelectorAll('.reveal-up, .reveal-scale, .reveal-scale-soft, .reveal-up-scale, .reveal-left, .reveal-right, .reveal-blur, .reveal-zoom').forEach(function(child) {
            child.classList.add('active');
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  requestAnimationFrame(function() {
    revealElements.forEach(function(el) { observer.observe(el); });
  });

  setTimeout(function() {
    revealElements.forEach(function(el) {
      if (!el.classList.contains('active')) {
        el.classList.add('active');
        el.querySelectorAll('.reveal-up, .reveal-scale, .reveal-scale-soft, .reveal-up-scale, .reveal-left, .reveal-right, .reveal-blur, .reveal-zoom').forEach(function(c) { c.classList.add('active'); });
      }
    });
  }, 3500);

  // Scroll handler
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      var y = window.scrollY;
      var wh = window.innerHeight;
      var docH = document.documentElement.scrollHeight - wh;
      if (PROGRESS) PROGRESS.style.width = ((y / docH) * 100) + '%';
      if (NAV_EL) {
        NAV_EL.classList.toggle('scrolled', y > 50);
        NAV_EL.classList.toggle('nav-deep', y > 400);
      }
      if (y < wh * 1.2) {
        var p = Math.min(y / wh, 1);
        if (HERO_BG) HERO_BG.style.transform = 'translateY(' + (y * 0.28) + 'px) scale(' + (1.02 - p * 0.02) + ')';
        if (HERO_CONTENT) { HERO_CONTENT.style.opacity = 1 - p * 1.4; HERO_CONTENT.style.transform = 'translateY(' + (y * 0.1) + 'px)'; }
        if (HERO_STATS) HERO_STATS.style.opacity = 1 - p * 1.4;
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Counter animation
  var counterObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('[data-target]').forEach(function(c) {
        if (c.dataset.done) return;
        c.dataset.done = '1';
        var target = parseInt(c.dataset.target);
        var suffix = c.textContent.indexOf('+') >= 0 ? '+' : '';
        var t0 = performance.now();
        function tick(now) {
          var p = Math.min((now - t0) / 1800, 1);
          c.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
      counterObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  if (HERO_STATS) counterObs.observe(HERO_STATS);

  // Wall layers stagger
  var wallEl = document.querySelector('.wall-section');
  if (wallEl) {
    var wallObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.wall-layer').forEach(function(el, i) {
          el.style.opacity = '0';
          el.style.transform = 'translateX(14px)';
          el.style.transition = 'opacity 0.4s var(--ease-out) ' + (i * 0.06) + 's, transform 0.4s var(--ease-out) ' + (i * 0.06) + 's';
          requestAnimationFrame(function() { el.style.opacity = '1'; el.style.transform = 'none'; });
        });
        wallObs.unobserve(e.target);
      });
    }, { threshold: 0.25 });
    wallObs.observe(wallEl);
  }

  // Reach map interaction
  var reachItems = document.querySelectorAll('.reach-item[data-country]');
  var reachHotspots = document.querySelectorAll('.reach-hotspot[data-country]');
  function setActiveCountry(id) {
    reachItems.forEach(function(el) { el.classList.toggle('is-active', el.dataset.country === id); });
    reachHotspots.forEach(function(el) { el.classList.toggle('is-active', el.dataset.country === id); });
  }
  function clearActiveCountry() {
    reachItems.forEach(function(el) { el.classList.remove('is-active'); });
    reachHotspots.forEach(function(el) { el.classList.remove('is-active'); });
  }
  reachItems.forEach(function(el) {
    el.addEventListener('mouseenter', function() { setActiveCountry(el.dataset.country); });
    el.addEventListener('mouseleave', clearActiveCountry);
  });
  reachHotspots.forEach(function(el) {
    el.addEventListener('mouseenter', function() { setActiveCountry(el.dataset.country); });
    el.addEventListener('mouseleave', clearActiveCountry);
  });
  if ('ontouchstart' in window) {
    var activeId = null;
    var allReach = [];
    reachItems.forEach(function(el) { allReach.push(el); });
    reachHotspots.forEach(function(el) { allReach.push(el); });
    allReach.forEach(function(el) {
      el.addEventListener('click', function(ev) {
        ev.preventDefault();
        var id = el.dataset.country;
        if (activeId === id) { clearActiveCountry(); activeId = null; }
        else { setActiveCountry(id); activeId = id; }
      });
    });
  }

})();
