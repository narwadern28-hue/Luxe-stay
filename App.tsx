import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

const imagePath = "/images/luxe-stay/";

type Room = {
  name: string;
  image: string;
  description: string;
  details: string;
  amenities: string[];
  price: string;
  bed: string;
  capacity: string;
  gallery: string[];
};

type Experience = {
  name: string;
  image: string;
  description: string;
  detail: string;
};

type BookingDetails = {
  checkIn: string;
  checkOut: string;
  guests: string;
  rooms: string;
};

type EnquiryDetails = {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
};

const navigation = [
  { label: "Stay", href: "#stay" },
  { label: "Dining", href: "#dining" },
  { label: "Wellness", href: "#wellness" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
];

const rooms: Room[] = [
  {
    name: "Luxe Deluxe",
    image: `${imagePath}room-deluxe.jpg`,
    description: "A quietly considered room with tactile finishes, soft morning light and room to slow down.",
    details: "Softly layered textures and thoughtful details set the tone for a restorative stay. A generous king bed, a calm palette and considered bathroom finishes make this an easy place to arrive and unwind.",
    amenities: ["King bed", "City or garden views", "Spacious bathroom"],
    price: "£220",
    bed: "One king bed",
    capacity: "Up to 2 guests",
    gallery: [`${imagePath}room-deluxe.jpg`, `${imagePath}lobby.jpg`, `${imagePath}room-suite.jpg`],
  },
  {
    name: "Signature Room",
    image: `${imagePath}room-signature.jpg`,
    description: "A light-filled retreat with a private lounge and a wider perspective on the city.",
    details: "A little more room to settle in. The Signature Room pairs panoramic city views with a private lounge corner, tailored joinery and the quietly luxurious details of a considered city escape.",
    amenities: ["King bed", "Private lounge area", "Panoramic views"],
    price: "£320",
    bed: "One king bed",
    capacity: "Up to 2 guests",
    gallery: [`${imagePath}room-signature.jpg`, `${imagePath}room-deluxe.jpg`, `${imagePath}lobby.jpg`],
  },
  {
    name: "Luxe Suite",
    image: `${imagePath}room-suite.jpg`,
    description: "A separate living space, a private balcony and an inviting sense of room to breathe.",
    details: "Made for a longer pause, the Luxe Suite brings together a separate living area, a beautifully finished bathroom and a private balcony. A generous, light-led layout leaves space for both quiet mornings and late evenings.",
    amenities: ["Separate living area", "Luxury bathroom", "Private balcony"],
    price: "£480",
    bed: "One king bed",
    capacity: "Up to 3 guests",
    gallery: [`${imagePath}room-suite.jpg`, `${imagePath}room-signature.jpg`, `${imagePath}room-deluxe.jpg`],
  },
  {
    name: "Penthouse",
    image: `${imagePath}room-penthouse.jpg`,
    description: "An expansive private world with an open living space and a terrace above the city.",
    details: "An elegant, open-plan retreat designed for unhurried days. The Penthouse has a generous living area, a private terrace and a carefully selected collection of premium amenities, all framed by the city beyond.",
    amenities: ["Expansive living space", "Private terrace", "Premium amenities"],
    price: "£750",
    bed: "One king bed",
    capacity: "Up to 4 guests",
    gallery: [`${imagePath}room-penthouse.jpg`, `${imagePath}experience.jpg`, `${imagePath}room-suite.jpg`],
  },
];

const experiences: Experience[] = [
  {
    name: "Private city tour",
    image: `${imagePath}hero-hotel.jpg`,
    description: "See familiar streets through a more personal lens.",
    detail: "A made-for-you city itinerary is the starting point for this concept experience, shaped around architecture, neighbourhood character and the places you would most like to see.",
  },
  {
    name: "Sunset dining",
    image: `${imagePath}experience.jpg`,
    description: "An unhurried table as the city turns to gold.",
    detail: "A rooftop table, a considered seasonal menu and the last of the evening light. This experience imagines a more intimate way to mark the end of the day.",
  },
  {
    name: "Cultural experiences",
    image: `${imagePath}lobby.jpg`,
    description: "Find the galleries, makers and stories worth lingering over.",
    detail: "A thoughtful cultural guide connects the city’s architecture, independent galleries and creative neighbourhoods into a day that feels entirely your own.",
  },
  {
    name: "Weekend escape",
    image: `${imagePath}room-suite.jpg`,
    description: "A change of pace, with nowhere else you need to be.",
    detail: "A slower weekend concept built around a late morning, a little time to reset and a city evening without a strict plan. The best details are the ones you choose for yourself.",
  },
];

const galleryImages = [
  { src: `${imagePath}hero-hotel.jpg`, alt: "Warmly lit contemporary hotel exterior at dusk", caption: "An evening arrival" },
  { src: `${imagePath}lobby.jpg`, alt: "Sculptural stone desk and staircase in the hotel lobby", caption: "A considered welcome" },
  { src: `${imagePath}room-deluxe.jpg`, alt: "Deluxe guest room in soft morning light", caption: "The Luxe Deluxe" },
  { src: `${imagePath}room-suite.jpg`, alt: "Suite bedroom opening towards a private balcony", caption: "Room to exhale" },
  { src: `${imagePath}dining.jpg`, alt: "Candlelit dining room and a seasonal plated dish", caption: "An evening at the table" },
  { src: `${imagePath}experience.jpg`, alt: "Rooftop table set for sunset dining", caption: "Golden hour, above the city" },
  { src: `${imagePath}spa.jpg`, alt: "Still water in a softly lit stone spa pool", caption: "A moment of stillness" },
  { src: `${imagePath}room-penthouse.jpg`, alt: "Penthouse living room opening to a private terrace", caption: "The Penthouse" },
  { src: `${imagePath}room-signature.jpg`, alt: "Signature room with a king bed and city view", caption: "Light, space, perspective" },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 18 18" fill="none">
      <path d="M4.5 13.5 13.2 4.8M5.2 4.8h8v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 22 12" fill="none">
      <path d="M.8 6h19.8M15.5 1.3 20.2 6l-4.7 4.7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="m4 4 12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      {open ? (
        <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      ) : (
        <path d="M3.5 8h17M3.5 16h17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      )}
    </svg>
  );
}

function SocialIcon({ name }: { name: "Instagram" | "Facebook" | "Pinterest" }) {
  if (name === "Instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
        <rect x="2.3" y="2.3" width="15.4" height="15.4" rx="4.1" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="14.9" cy="5.3" r=".9" fill="currentColor" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
        <path d="M11.4 17v-6.1h2.1l.3-2.4h-2.4V7c0-.7.2-1.2 1.2-1.2h1.3V3.7a16 16 0 0 0-1.9-.1c-1.9 0-3.2 1.1-3.2 3.3v1.6H6.7v2.4h2.1V17h2.6Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M10.2 2.2c-4 0-6.1 2.8-6.1 5.2 0 1.5.6 2.8 1.9 3.3.2.1.5 0 .6-.3l.2-.9c.1-.3.1-.4-.1-.6-.4-.5-.7-1.1-.7-2 0-2.6 1.9-4.9 4.9-4.9 2.7 0 4.2 1.7 4.2 4 0 3-1.3 5.5-3.2 5.5-1.1 0-1.9-.9-1.6-2l.7-2.8c.4-1.5-.2-2.7-1.6-2.7-1.2 0-2.2 1.2-2.2 2.9 0 1 .3 1.7.3 1.7L6.2 14c-.4 1.7-.1 3.8 0 4.1.1.2.3.2.4.1.2-.2 1-1.3 1.3-3 .1-.5.6-2.2.6-2.2.3.7 1.4 1.3 2.5 1.3 3.3 0 5.5-3 5.5-7 0-3-2.6-5.1-6.3-5.1Z" fill="currentColor" />
    </svg>
  );
}

function formatDate(value: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [roomImageIndex, setRoomImageIndex] = useState(0);
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [booking, setBooking] = useState<BookingDetails>({ checkIn: "", checkOut: "", guests: "2", rooms: "1" });
  const [bookingMessage, setBookingMessage] = useState("");
  const [directionsMessage, setDirectionsMessage] = useState("");
  const [inquiryRoom, setInquiryRoom] = useState<Room | null>(null);
  const [enquiry, setEnquiry] = useState<EnquiryDetails>({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
  });
  const [formMessage, setFormMessage] = useState("");
  const [formSent, setFormSent] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hasOverlay = Boolean(activeRoom || activeExperience || lightboxIndex !== null);
    if (!hasOverlay) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveRoom(null);
        setActiveExperience(null);
        setLightboxIndex(null);
      }
      if (lightboxIndex !== null && event.key === "ArrowRight") {
        setLightboxIndex((index) => (index === null ? 0 : (index + 1) % galleryImages.length));
      }
      if (lightboxIndex !== null && event.key === "ArrowLeft") {
        setLightboxIndex((index) => (index === null ? 0 : (index - 1 + galleryImages.length) % galleryImages.length));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeRoom, activeExperience, lightboxIndex]);

  const handleBookingChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setBooking((current) => ({ ...current, [name]: value }));
    setBookingMessage("");
  };

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!booking.checkIn || !booking.checkOut) {
      setBookingMessage("Choose your arrival and departure dates to continue.");
      return;
    }
    if (booking.checkOut <= booking.checkIn) {
      setBookingMessage("Departure must be later than arrival.");
      return;
    }

    setBookingMessage(`Demo search for ${booking.guests} ${booking.guests === "1" ? "guest" : "guests"}, ${booking.rooms} ${booking.rooms === "1" ? "room" : "rooms"}, ${formatDate(booking.checkIn)} to ${formatDate(booking.checkOut)}. No reservation will be made.`);
    setEnquiry((current) => ({
      ...current,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
    }));
    window.setTimeout(() => document.getElementById("stay")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  };

  const updateEnquiry = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEnquiry((current) => ({ ...current, [name]: value }));
    setFormMessage("");
    setFormSent(false);
  };

  const startEnquiry = (message: string) => {
    setInquiryRoom(null);
    setEnquiry((current) => ({ ...current, message }));
    setFormMessage("");
    setFormSent(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const bookRoom = (room: Room) => {
    setInquiryRoom(room);
    setEnquiry((current) => ({
      ...current,
      checkIn: current.checkIn || booking.checkIn,
      checkOut: current.checkOut || booking.checkOut,
      guests: booking.guests || current.guests,
      message: `I would like to enquire about the ${room.name}.`,
    }));
    setActiveRoom(null);
    setFormMessage("");
    setFormSent(false);
    window.setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  };

  const handleEnquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enquiry.checkIn || !enquiry.checkOut) {
      setFormMessage("Please add both arrival and departure dates.");
      setFormSent(false);
      return;
    }
    if (enquiry.checkOut <= enquiry.checkIn) {
      setFormMessage("Departure must be later than arrival.");
      setFormSent(false);
      return;
    }
    setFormMessage("Thank you. This demo enquiry has been completed in your browser; no message was sent and no booking was created.");
    setFormSent(true);
  };

  const navLinkClicked = () => setMenuOpen(false);

  return (
    <div className="page-shell" id="top">
      <header className={`site-header${scrolled || menuOpen ? " is-solid" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Luxe Stay home" onClick={navLinkClicked}>
            <span className="brand-name">LUXE</span>
            <span className="brand-sub"><span>STAY</span><span>DEMO PROJECT</span></span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <a className="header-book" href="#booking">
            <span>Book your stay</span>
            <ArrowIcon diagonal />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
        <nav className={`mobile-nav${menuOpen ? " is-open" : ""}`} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={navLinkClicked} style={{ transitionDelay: menuOpen ? `${index * 35}ms` : "0ms" }}>
              <span>{item.label}</span><ArrowIcon diagonal />
            </a>
          ))}
          <a className="mobile-book" href="#booking" onClick={navLinkClicked}>Book your stay <ArrowIcon diagonal /></a>
          <span className="mobile-concept">Concept website / demo project</span>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src={`${imagePath}hero-hotel.jpg`}
              alt="Contemporary hotel exterior glowing warmly at dusk"
              fetchPriority="high"
              width="1800"
              height="1200"
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-content page-width">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-mark" />Concept hotel / demo project</p>
            <h1 id="hero-title">Stay somewhere<br /><em>extraordinary</em></h1>
            <p className="hero-intro">A refined retreat designed around comfort, character and unforgettable moments.</p>
            <div className="hero-actions">
              <a className="button button-light" href="#stay">Explore Luxe Stay <ArrowIcon /></a>
              <a className="text-link text-link-light" href="#booking">Book your stay <ArrowIcon diagonal /></a>
            </div>
          </div>
          <a className="scroll-cue" href="#booking" aria-label="Scroll to booking search">
            <span>Scroll to discover</span><span className="scroll-line" />
          </a>
          <p className="hero-caption">A study in thoughtful hospitality <span>01 / 09</span></p>
        </section>

        <section className="booking-section" id="booking" aria-label="Demo availability search">
          <form className="booking-bar" onSubmit={handleBookingSubmit}>
            <div className="booking-field date-field">
              <label htmlFor="search-checkin">Check-in</label>
              <input id="search-checkin" name="checkIn" type="date" min={today} value={booking.checkIn} onChange={handleBookingChange} required />
            </div>
            <div className="booking-field date-field">
              <label htmlFor="search-checkout">Check-out</label>
              <input id="search-checkout" name="checkOut" type="date" min={booking.checkIn || today} value={booking.checkOut} onChange={handleBookingChange} required />
            </div>
            <div className="booking-field select-field">
              <label htmlFor="search-guests">Guests</label>
              <select id="search-guests" name="guests" value={booking.guests} onChange={handleBookingChange}>
                {[1, 2, 3, 4, 5, 6].map((value) => <option value={value} key={value}>{value} {value === 1 ? "guest" : "guests"}</option>)}
              </select>
            </div>
            <div className="booking-field select-field">
              <label htmlFor="search-rooms">Rooms</label>
              <select id="search-rooms" name="rooms" value={booking.rooms} onChange={handleBookingChange}>
                {[1, 2, 3, 4].map((value) => <option value={value} key={value}>{value} {value === 1 ? "room" : "rooms"}</option>)}
              </select>
            </div>
            <button className="button button-dark booking-submit" type="submit">Check availability <ArrowIcon /></button>
          </form>
          <div className="booking-note-row">
            <span>Concept booking search</span>
            <span className="booking-feedback" aria-live="polite">{bookingMessage}</span>
            <span>Demo only / no reservations are made</span>
          </div>
        </section>

        <section className="rooms-section section-pad" id="stay" aria-labelledby="rooms-title">
          <div className="page-width">
            <div className="section-heading rooms-heading" data-reveal>
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" />The art of staying</p>
                <h2 id="rooms-title">Rooms <em>&amp; suites</em></h2>
              </div>
              <div className="section-heading-aside">
                <p>Thoughtfully designed spaces where modern luxury meets effortless comfort.</p>
                <span>Every room, a considered retreat.</span>
              </div>
            </div>

            <div className="room-grid">
              {rooms.map((room, index) => (
                <article className="room-card" key={room.name} data-reveal style={{ transitionDelay: `${(index % 2) * 100}ms` }}>
                  <button className="room-photo image-button" type="button" onClick={() => { setActiveRoom(room); setRoomImageIndex(0); }} aria-label={`View ${room.name} details`}>
                    <img src={room.image} alt={`${room.name} at Luxe Stay`} loading="lazy" decoding="async" width="1200" height="900" />
                    <span className="image-corner-label">0{index + 1} / 04</span>
                    <span className="image-open"><ArrowIcon diagonal /></span>
                  </button>
                  <div className="room-card-content">
                    <div className="room-title-row">
                      <h3>{room.name}</h3>
                      <p className="room-price"><span>Starting from</span> {room.price}<small> / night</small></p>
                    </div>
                    <p className="room-description">{room.description}</p>
                    <ul className="amenity-line" aria-label="Room amenities">
                      {room.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}
                    </ul>
                    <div className="room-card-footer">
                      <span>Illustrative demo price</span>
                      <button className="text-link" type="button" onClick={() => { setActiveRoom(room); setRoomImageIndex(0); }}>View room <ArrowIcon diagonal /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="demo-price-note">All prices shown are illustrative demo prices only and are not available for purchase.</p>
          </div>
        </section>

        <section className="dining-section section-pad" id="dining" aria-labelledby="dining-title">
          <div className="page-width">
            <div className="section-heading dining-heading" data-reveal>
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" />A taste of the good life</p>
                <h2 id="dining-title">Dining, <em>refined.</em></h2>
              </div>
              <p className="dining-intro">Good food has a way of making time stand still. Find your own rhythm, from first coffee to the last candle.</p>
            </div>

            <div className="dining-feature" data-reveal>
              <div className="dining-image image-frame">
                <img src={`${imagePath}dining.jpg`} alt="Candlelit dining room with a seasonal dish" loading="lazy" decoding="async" width="1200" height="900" />
                <span className="image-caption">The pleasure of taking your time</span>
              </div>
              <div className="dining-copy">
                <p className="eyebrow eyebrow-muted">Dining concept</p>
                <h3>Gather around<br /><em>something lovely.</em></h3>
                <p className="dining-body">A collection of intimate spaces, shaped for long lunches, unhurried evenings and those little in-between moments.</p>
                <div className="dining-offerings" id="dining-offerings">
                  {[
                    ["01", "Fine dining restaurant", "Seasonal plates, thoughtfully composed."],
                    ["02", "Rooftop lounge", "A softer landing at the end of the day."],
                    ["03", "Afternoon tea", "A familiar ritual, seen in a new light."],
                    ["04", "Private dining", "A more personal table for gathering."],
                  ].map(([number, name, copy]) => (
                    <div className="dining-offering" key={name}>
                      <span className="offering-number">{number}</span><strong>{name}</strong><span>{copy}</span>
                    </div>
                  ))}
                </div>
                <button className="text-link dining-link" type="button" onClick={() => startEnquiry("I would like to enquire about the dining concept.")}>Explore dining <ArrowIcon diagonal /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="wellness-section section-pad" id="wellness" aria-labelledby="wellness-title">
          <div className="page-width wellness-layout">
            <div className="wellness-copy" data-reveal>
              <p className="eyebrow"><span className="eyebrow-mark" />Space to find your balance</p>
              <h2 id="wellness-title">Rest. Reset.<br /><em>Recharge.</em></h2>
              <p className="wellness-intro">Make a little room for yourself. Our imagined wellness retreat brings together gentle rituals, warm water and quieter moments.</p>
              <ul className="wellness-list">
                {[
                  ["01", "Spa treatments"],
                  ["02", "Heated pool"],
                  ["03", "Fitness studio"],
                  ["04", "Sauna"],
                  ["05", "Relaxation lounge"],
                ].map(([number, name]) => <li key={name}><span>{number}</span>{name}<ArrowIcon diagonal /></li>)}
              </ul>
              <button className="text-link wellness-link" type="button" onClick={() => startEnquiry("I would like to enquire about the wellness concept.")}>Discover wellness <ArrowIcon diagonal /></button>
            </div>
            <figure className="wellness-image image-frame" data-reveal>
              <img src={`${imagePath}spa.jpg`} alt="Still water in a warmly lit stone spa pool" loading="lazy" decoding="async" width="1200" height="900" />
              <figcaption><span>01</span> A quieter kind of energy</figcaption>
            </figure>
          </div>
        </section>

        <section className="experiences-section section-pad" id="experiences" aria-labelledby="experiences-title">
          <div className="page-width">
            <div className="section-heading experiences-heading" data-reveal>
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" />Little moments, thoughtfully made</p>
                <h2 id="experiences-title">Your stay, <em>your way.</em></h2>
              </div>
              <p>Make the city your own, or let the afternoon find its own pace. A few ideas to begin with.</p>
            </div>
            <div className="experience-grid">
              {experiences.map((experience, index) => (
                <article className="experience-item" key={experience.name} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
                  <button className="experience-photo image-button" type="button" onClick={() => setActiveExperience(experience)} aria-label={`Explore ${experience.name}`}>
                    <img src={experience.image} alt={experience.name} loading="lazy" decoding="async" width="900" height="700" />
                    <span className="experience-number">0{index + 1}</span>
                    <span className="image-open"><ArrowIcon diagonal /></span>
                  </button>
                  <div className="experience-content">
                    <h3>{experience.name}</h3>
                    <p>{experience.description}</p>
                    <button className="text-link" type="button" onClick={() => setActiveExperience(experience)}>Explore <ArrowIcon diagonal /></button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section section-pad" id="gallery" aria-labelledby="gallery-title">
          <div className="page-width">
            <div className="gallery-heading" data-reveal>
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" />A sense of place</p>
                <h2 id="gallery-title">A closer <em>look.</em></h2>
              </div>
              <p>Spaces, details and moments from the world of Luxe Stay.</p>
            </div>
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <button
                  className={`gallery-item gallery-item-${index + 1}`}
                  key={image.caption}
                  type="button"
                  aria-label={`Open image: ${image.caption}`}
                  onClick={() => setLightboxIndex(index)}
                  data-reveal
                >
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async" width="1200" height="900" />
                  <span className="gallery-overlay"><span>{image.caption}</span><span className="gallery-open"><ArrowIcon diagonal /></span></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-layout page-width">
            <div className="about-copy" data-reveal>
              <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />The thinking behind the stay</p>
              <h2 id="about-title">More than<br /><em>a hotel.</em></h2>
              <p>Luxe Stay is a concept created around the idea that luxury is not about excess. It is about thoughtful details, beautiful spaces and experiences that feel effortless.</p>
              <a className="text-link text-link-light" href="#location">Discover our point of view <ArrowIcon diagonal /></a>
              <span className="about-signature">A considered hospitality concept</span>
            </div>
            <figure className="about-image image-frame" data-reveal>
              <img src={`${imagePath}lobby.jpg`} alt="Contemporary hotel lobby with sculptural staircase and warm natural light" loading="lazy" decoding="async" width="1200" height="900" />
              <figcaption>Spaces designed to make room for you.</figcaption>
            </figure>
          </div>
        </section>

        <section className="location-section section-pad" id="location" aria-labelledby="location-title">
          <div className="page-width location-layout">
            <div className="location-copy" data-reveal>
              <p className="eyebrow"><span className="eyebrow-mark" />A place imagined for the city</p>
              <h2 id="location-title">Find your way<br />to <em>Luxe Stay.</em></h2>
              <p className="location-lead">Luxe Stay, Central London</p>
              <p className="location-disclaimer">A fictional destination created for this demo. Luxe Stay is not a real hotel and has no physical address.</p>
              <div className="location-facts">
                <div>
                  <span>Address</span>
                  <p>Central London, United Kingdom<br /><small>Illustrative location only</small></p>
                </div>
                <div>
                  <span>Getting around</span>
                  <p>Central London transport connections<br /><small>Details shown for concept purposes</small></p>
                </div>
                <div>
                  <span>In the neighbourhood</span>
                  <p>Mayfair, Hyde Park and the West End<br /><small>Illustrative area references</small></p>
                </div>
              </div>
              <button className="text-link location-directions" type="button" onClick={() => setDirectionsMessage("This is a fictional demo location. Real-world directions are not available.")}>Get directions <ArrowIcon diagonal /></button>
              <p className="directions-message" aria-live="polite">{directionsMessage}</p>
            </div>
            <div className="location-visual" data-reveal>
              <svg className="location-map" viewBox="0 0 660 620" role="img" aria-label="Illustrative abstract map marking a fictional Central London concept location">
                <rect width="660" height="620" fill="#e8e4db" />
                <g className="map-blocks" fill="#f1eee7" stroke="#ded9cf" strokeWidth="1.5">
                  <path d="M35 54 177 37l44 104-146 21z" /><path d="m255 26 117 36-19 112-126-33z" /><path d="m418 44 169 23-28 106-150-18z" />
                  <path d="m52 204 143-24 17 117-153 26z" /><path d="m251 204 122-12 32 115-137 30z" /><path d="m426 202 149-15 42 110-160 35z" />
                  <path d="m33 376 147-36 45 114-163 48z" /><path d="m255 364 146-39 37 126-152 38z" /><path d="m462 365 139-25 26 117-151 32z" />
                  <path d="m112 533 128-40 49 91-165 25z" /><path d="m338 500 112-35 50 111-132 23z" />
                </g>
                <g fill="none" stroke="#c9c3b7" strokeWidth="9" strokeLinecap="round">
                  <path d="M-20 154c92 10 134 81 211 90 93 11 141-53 232-39 85 13 132 82 259 63" />
                  <path d="M-15 341c104-41 170-8 234 37 64 45 121 46 182 4 73-49 157-36 285-7" />
                  <path d="M204-18c14 99 67 152 66 237-1 88-31 145-12 234 12 57 47 110 85 181" />
                  <path d="M447-10c-26 98-11 162 30 228 45 74 74 117 50 203-13 46-46 102-32 205" />
                </g>
                <g fill="none" stroke="#f7f5f0" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M-20 154c92 10 134 81 211 90 93 11 141-53 232-39 85 13 132 82 259 63" />
                  <path d="M-15 341c104-41 170-8 234 37 64 45 121 46 182 4 73-49 157-36 285-7" />
                  <path d="M204-18c14 99 67 152 66 237-1 88-31 145-12 234 12 57 47 110 85 181" />
                  <path d="M447-10c-26 98-11 162 30 228 45 74 74 117 50 203-13 46-46 102-32 205" />
                </g>
                <path d="M192 391c39-68 97-104 165-114 69-10 123 12 176 57" fill="none" stroke="#aa9871" strokeWidth="1.6" strokeDasharray="5 9" />
                <circle cx="354" cy="276" r="28" fill="#aa9871" fillOpacity=".16" />
                <circle cx="354" cy="276" r="9" fill="#a28d63" />
                <circle cx="354" cy="276" r="3" fill="#f8f6f1" />
                <g className="map-label" fill="#44463f" fontFamily="Arial, sans-serif">
                  <text x="354" y="237" textAnchor="middle" fontSize="10" letterSpacing="2.4">CONCEPT LOCATION</text>
                  <text x="53" y="582" fontSize="10" letterSpacing="2">CENTRAL LONDON / ILLUSTRATIVE MAP</text>
                </g>
              </svg>
              <span className="map-note"><span className="map-pin" />Fictional location</span>
            </div>
          </div>
        </section>

        <section className="escape-cta" aria-labelledby="escape-title">
          <img src={`${imagePath}experience.jpg`} alt="Sunset falling over a quiet rooftop dining terrace" loading="lazy" decoding="async" width="1600" height="1100" />
          <div className="escape-shade" />
          <div className="escape-content page-width" data-reveal>
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />A thoughtful stay, imagined</p>
            <h2 id="escape-title">Your next escape<br /><em>starts here.</em></h2>
            <p>Discover a stay designed around you.</p>
            <a className="button button-light" href="#booking">Book your stay <ArrowIcon /></a>
          </div>
          <span className="escape-index">LUXE STAY / A HOTEL CONCEPT</span>
        </section>

        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
          <div className="page-width contact-layout">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow"><span className="eyebrow-mark" />Begin a conversation</p>
              <h2 id="contact-title">Make it<br /><em>your own.</em></h2>
              <p>Share the shape of a stay you have in mind. This concept enquiry form is for demonstration only and does not send or store personal information.</p>
              <div className="contact-aside">
                <span>Looking for the right room?</span>
                <a href="#stay">Return to rooms &amp; suites <ArrowIcon diagonal /></a>
              </div>
            </div>

            <form className="enquiry-form" onSubmit={handleEnquirySubmit} data-reveal>
              <div className="form-topline">
                <span>01 / 02</span>
                <span>Enquiry details</span>
              </div>
              {inquiryRoom && (
                <div className="selected-room-note">
                  <span>Room of interest</span>
                  <strong>{inquiryRoom.name} <small>From {inquiryRoom.price} / night, demo price</small></strong>
                  <button type="button" onClick={() => setInquiryRoom(null)} aria-label="Remove selected room"><CloseIcon /></button>
                </div>
              )}
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="enquiry-name">Name</label>
                  <input id="enquiry-name" name="name" type="text" autoComplete="name" value={enquiry.name} onChange={updateEnquiry} placeholder="Your name" minLength={2} required />
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-email">Email</label>
                  <input id="enquiry-email" name="email" type="email" autoComplete="email" value={enquiry.email} onChange={updateEnquiry} placeholder="you@example.com" required />
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-phone">Phone <span>Optional</span></label>
                  <input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" value={enquiry.phone} onChange={updateEnquiry} placeholder="+44" />
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-guests">Number of guests</label>
                  <select id="enquiry-guests" name="guests" value={enquiry.guests} onChange={updateEnquiry} required>
                    {[1, 2, 3, 4, 5, 6].map((value) => <option value={value} key={value}>{value} {value === 1 ? "guest" : "guests"}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-checkin">Check-in</label>
                  <input id="enquiry-checkin" name="checkIn" type="date" min={today} value={enquiry.checkIn} onChange={updateEnquiry} required />
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-checkout">Check-out</label>
                  <input id="enquiry-checkout" name="checkOut" type="date" min={enquiry.checkIn || today} value={enquiry.checkOut} onChange={updateEnquiry} required />
                </div>
              </div>
              <div className="form-field form-message-field">
                <label htmlFor="enquiry-message">Message <span>Optional</span></label>
                <textarea id="enquiry-message" name="message" rows={3} value={enquiry.message} onChange={updateEnquiry} placeholder="Tell us what would make your stay feel special." />
              </div>
              <div className="form-submit-row">
                <p className={`form-feedback${formSent ? " is-success" : ""}`} aria-live="polite">{formMessage}</p>
                <button className="button button-dark" type="submit">Send enquiry <ArrowIcon /></button>
              </div>
              <p className="form-privacy">Concept form only. No data is transmitted, stored or used to create a booking.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main page-width">
          <div className="footer-brand-block">
            <a className="brand footer-brand" href="#top" aria-label="Luxe Stay home">
              <span className="brand-name">LUXE</span>
              <span className="brand-sub"><span>STAY</span><span>CONCEPT HOTEL</span></span>
            </a>
            <p>Thoughtful spaces.<br />A little more room to be.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <span className="footer-label">Explore</span>
            {[
              ["Stay", "#stay"], ["Dining", "#dining"], ["Wellness", "#wellness"], ["Experiences", "#experiences"], ["Gallery", "#gallery"], ["About", "#about"], ["Contact", "#contact"],
            ].map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="footer-socials">
            <span className="footer-label">Social</span>
            {(["Instagram", "Facebook", "Pinterest"] as const).map((name) => (
              <a key={name} href={`https://www.${name.toLowerCase()}.com/`} target="_blank" rel="noreferrer" aria-label={`${name} (opens platform homepage)`}>
                <SocialIcon name={name} /><span>{name}</span><ArrowIcon diagonal />
              </a>
            ))}
          </div>
          <div className="footer-signoff">
            <span className="footer-label">A note on this project</span>
            <p>DEMO PROJECT<br />CONCEPT WEBSITE</p>
            <a href="#top">Back to top <ArrowIcon diagonal /></a>
          </div>
        </div>
        <div className="footer-bottom page-width">
          <span>© LUXE STAY / CONCEPT PROJECT</span>
          <span>Imagined for a portfolio, not a real hotel.</span>
          <a href="#top">London / United Kingdom <span>↑</span></a>
        </div>
      </footer>

      {activeRoom && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveRoom(null); }}>
          <section className="room-modal" role="dialog" aria-modal="true" aria-labelledby="room-modal-title">
            <button className="modal-close" type="button" aria-label="Close room details" onClick={() => setActiveRoom(null)}><CloseIcon /></button>
            <div className="room-modal-gallery">
              <div className="room-modal-main-image">
                <img key={activeRoom.gallery[roomImageIndex]} src={activeRoom.gallery[roomImageIndex]} alt={`${activeRoom.name} detail ${roomImageIndex + 1}`} />
                <span className="modal-image-count">0{roomImageIndex + 1} / 0{activeRoom.gallery.length}</span>
              </div>
              <div className="room-thumbnails" aria-label="Room image gallery">
                {activeRoom.gallery.map((image, index) => (
                  <button className={roomImageIndex === index ? "is-active" : ""} type="button" key={image} onClick={() => setRoomImageIndex(index)} aria-label={`Show room image ${index + 1}`} aria-pressed={roomImageIndex === index}>
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            </div>
            <div className="room-modal-content">
              <p className="eyebrow"><span className="eyebrow-mark" />Room / suite concept</p>
              <h2 id="room-modal-title">{activeRoom.name}</h2>
              <p className="modal-room-description">{activeRoom.details}</p>
              <div className="room-specs">
                <div><span>Capacity</span><strong>{activeRoom.capacity}</strong></div>
                <div><span>Bed</span><strong>{activeRoom.bed}</strong></div>
              </div>
              <span className="modal-label">Room details</span>
              <ul className="modal-amenities">{activeRoom.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul>
              <div className="modal-price-row"><span>Illustrative demo price</span><strong>{activeRoom.price}<small> / night</small></strong></div>
              <button className="button button-dark modal-book-button" type="button" onClick={() => bookRoom(activeRoom)}>Book this room <ArrowIcon /></button>
              <p className="modal-demo-note">Concept only. This action opens a demo enquiry form, not a reservation.</p>
            </div>
          </section>
        </div>
      )}

      {activeExperience && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveExperience(null); }}>
          <section className="experience-modal" role="dialog" aria-modal="true" aria-labelledby="experience-modal-title">
            <button className="modal-close" type="button" aria-label="Close experience details" onClick={() => setActiveExperience(null)}><CloseIcon /></button>
            <div className="experience-modal-image"><img src={activeExperience.image} alt={activeExperience.name} /></div>
            <div className="experience-modal-copy">
              <p className="eyebrow"><span className="eyebrow-mark" />An idea for your stay</p>
              <h2 id="experience-modal-title">{activeExperience.name}</h2>
              <p>{activeExperience.detail}</p>
              <button className="button button-dark" type="button" onClick={() => { const message = `I would like to enquire about ${activeExperience.name.toLowerCase()}.`; setActiveExperience(null); startEnquiry(message); }}>Enquire about this experience <ArrowIcon /></button>
              <span className="modal-demo-note">An illustrative experience concept. No service is being sold.</span>
            </div>
          </section>
        </div>
      )}

      {lightboxIndex !== null && (
        <div className="lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxIndex(null); }}>
          <button className="lightbox-close" type="button" aria-label="Close gallery" onClick={() => setLightboxIndex(null)}><CloseIcon /></button>
          <span className="lightbox-count">{String(lightboxIndex + 1).padStart(2, "0")} <span>/</span> {String(galleryImages.length).padStart(2, "0")}</span>
          <button className="lightbox-arrow lightbox-prev" type="button" aria-label="Previous image" onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}><ArrowIcon /></button>
          <figure className="lightbox-figure">
            <img key={galleryImages[lightboxIndex].src} className="lightbox-image" src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].alt} />
            <figcaption>{galleryImages[lightboxIndex].caption}</figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" aria-label="Next image" onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}><ArrowIcon /></button>
          <span className="lightbox-caption-note">Luxe Stay / concept gallery</span>
        </div>
      )}
    </div>
  );
}