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
  var inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  var filled = true;
  inputs.forEach(function(input) {
    if (input.required && !input.value.trim()) {
      input.style.borderColor = '#c0392b';
      filled = false;
      setTimeout(function() { input.style.borderColor = ''; }, 2000);
    }
  });
  if (filled) {
    var msg = 'Dziękujemy! Wiadomość została wysłana. Skontaktujemy się wkrótce.';
    if (typeof currentLang !== 'undefined') {
      if (currentLang === 'en') msg = 'Thank you! Your message has been sent.';
      if (currentLang === 'de') msg = 'Vielen Dank! Ihre Nachricht wurde gesendet.';
    }
    alert(msg);
    inputs.forEach(function(input) { input.value = ''; });
  }
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
    about_text1: "Firma VIDAL od ponad 35 lat zajmuje się projektowaniem i budową prefabrykowanych domów szkieletowych. Domy powstają w naszej fabryce, co pozwala uzyskać wysoką jakość i precyzję wykonania.",
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
    gallery_desc: "Ponad 300 domów zrealizowanych w Polsce i za granicą.",
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
    footer_tagline: "Projektujemy i budujemy prefabrykowane domy szkieletowe od 1988 roku. Ponad 35 lat doświadczenia, ponad 300 zrealizowanych domów.",
    footer_privacy: "Polityka prywatności", footer_terms: "Regulamin",
    footer_models: "Modele domów",
    contact_address: "Adres", contact_phone: "Telefon", contact_email: "Email",
    contact_map: "Mapa lokalizacji – Poznań",

    map_label: "Zasięg", map_title: 'Budujemy w całej <em>Europie</em>',
    map_desc: "Nasze domy stoją w 8 krajach europejskich. Każdy projekt realizujemy z tą samą precyzją – niezależnie od lokalizacji.",
    map_poland: "Polska", map_germany: "Niemcy", map_switzerland: "Szwajcaria",
    map_spain: "Hiszpania", map_norway: "Norwegia", map_england: "Anglia", map_austria: "Austria", map_france: "Francja",
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
    about_text1: "VIDAL has been designing and building prefabricated timber frame houses for over 35 years. Our homes are manufactured in our own factory, ensuring the highest quality and precision.",
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
    gallery_desc: "Over 300 houses built in Poland and abroad.",
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
    footer_tagline: "We design and build prefabricated timber frame houses since 1988. Over 35 years of experience, over 300 houses completed.",
    footer_privacy: "Privacy policy", footer_terms: "Terms & conditions",
    footer_models: "House models",
    contact_address: "Address", contact_phone: "Phone", contact_email: "Email",
    contact_map: "Location map – Poznań",

    map_label: "Reach", map_title: 'We build across <em>Europe</em>',
    map_desc: "Our houses stand in 8 European countries. Every project is delivered with the same precision – regardless of location.",
    map_poland: "Poland", map_germany: "Germany", map_switzerland: "Switzerland",
    map_spain: "Spain", map_norway: "Norway", map_england: "England", map_austria: "Austria", map_france: "France",
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
    about_text1: "VIDAL entwirft und baut seit über 35 Jahren vorgefertigte Holzrahmenhäuser. Unsere Häuser werden in unserer eigenen Fabrik hergestellt, was höchste Qualität und Präzision gewährleistet.",
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
    gallery_desc: "Über 300 gebaute Häuser in Polen und im Ausland.",
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
    footer_tagline: "Wir entwerfen und bauen Fertighäuser in Holzrahmenbauweise seit 1988. Über 35 Jahre Erfahrung, über 300 gebaute Häuser.",
    footer_privacy: "Datenschutz", footer_terms: "AGB",
    footer_models: "Hausmodelle",
    contact_address: "Adresse", contact_phone: "Telefon", contact_email: "E-Mail",
    contact_map: "Standortkarte – Poznań",

    map_label: "Reichweite", map_title: 'Wir bauen in ganz <em>Europa</em>',
    map_desc: "Unsere Häuser stehen in 8 europäischen Ländern. Jedes Projekt wird mit der gleichen Präzision umgesetzt – unabhängig vom Standort.",
    map_poland: "Polen", map_germany: "Deutschland", map_switzerland: "Schweiz",
    map_spain: "Spanien", map_norway: "Norwegen", map_england: "England", map_austria: "Österreich", map_france: "Frankreich",
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
  galleryToggle.addEventListener('click', function() {
    projGrid.classList.toggle('closed');
    galleryToggle.classList.toggle('active');
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
