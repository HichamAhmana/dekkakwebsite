"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMobile } from "../hooks/useMobile";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const TIMELINE = [
  { year: "1987–1991", text: "Studies at European University (MBA in International Business & Marketing)" },
  { year: "1992", text: "Founds Adgeco Group in Abu Dhabi, UAE" },
  { year: "2007", text: "Founds Anouar Association (January 5) in Morocco" },
  { year: "2010", text: "Adgeco launches major strategic alliance with Valoriza/Sacyr (Spain)" },
  { year: "2012", text: "Adgeco completes Civil Works for Oil Terminal 2, Port Fujairah & Khalifa Port project" },
  { year: "2021", text: "Anouar Association runs art workshops for children with disabilities in Ait Faska" },
  { year: "2022", text: "Participates in SBCC Summit, Marrakech (partnered with UNICEF, USAID, Save the Children)" },
  { year: "Present", text: "Active across UAE, Morocco, Europe, Latin America, Africa, Vietnam, Korea" },
];

export default function AboutPageClient() {
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        position: "relative",
        padding: isMobile ? "130px 20px 60px" : "180px 40px 100px",
        minHeight: isMobile ? "auto" : "80vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 70% 30%, rgba(201,168,76,0.05) 0%, transparent 60%)",
          pointerEvents: "none"
        }} />

        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "40px" : "80px",
          alignItems: "center"
        }}>
          {/* Left: Text */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 0.2s"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
              <div style={{ width: "40px", height: "1px", background: GOLD }} />
              <span style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "10px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD
              }}>Biography</span>
            </div>
            
            <h1 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(48px, 6vw, 96px)",
              fontWeight: 300, color: CREAM,
              margin: "0 0 40px", lineHeight: 1.05,
              letterSpacing: "-0.01em"
            }}>
              From Marrakech to Abu Dhabi to <i style={{ color: GOLD }}>the World.</i>
            </h1>

            <p style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px", fontWeight: 300, lineHeight: 1.8,
              color: CREAM, opacity: 0.7, margin: "0"
            }}>
              Mohamed Dekkak is a Moroccan businessman, investor, and philanthropist, best known as the Chairman and Founder of Adgeco Group. Multilingual in English, Arabic, and French, he has spent over three decades building cross-continental enterprises across UAE, Morocco, Europe and beyond.
            </p>
          </div>

          {/* Right: Portrait */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(20px)",
            transition: "all 1s ease 0.4s",
            position: "relative"
          }}>
            <div style={{
              width: "100%", aspectRatio: "3/4",
              border: `1px solid rgba(201,168,76,0.2)`,
              position: "relative",
              overflow: "hidden"
            }}>
              <Image
                src="/dekkak-cinema-marrakech-festival.png"
                alt="Mohamed Dekkak"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
              {/* Cinematic gold overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to bottom, transparent 50%, var(--bg-color) 100%), linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)`,
              }} />
              {/* Bottom label */}
              <div style={{
                position: "absolute", bottom: "20px", left: "20px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em",
                textTransform: "uppercase", color: GOLD,
              }}>
                AmCham Abu Dhabi
              </div>
            </div>
            {/* Accent lines */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", width: "calc(100% + 20px)", height: "calc(100% + 20px)", left: "-20px", top: "-20px" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "100px", height: "1px", background: GOLD }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "1px", height: "100px", background: GOLD }} />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: isMobile ? "60px 20px" : "120px 40px", background: "var(--bg-secondary)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: isMobile ? "36px" : "48px", fontWeight: 300, color: CREAM,
            margin: isMobile ? "0 0 40px" : "0 0 80px", textAlign: "center"
          }}>The Journey</h2>

          <div style={{ position: "relative" }}>
            {/* Vertical Line — hide on mobile */}
            {!isMobile && <div style={{
              position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px",
              background: `linear-gradient(to bottom, transparent, ${GOLD}44, transparent)`,
              transform: "translateX(-50%)"
            }} />}

            {TIMELINE.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: isMobile ? "flex-start" : (i % 2 === 0 ? "flex-start" : "flex-end"),
                marginBottom: "32px",
                position: "relative",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.8s ease ${0.6 + i * 0.1}s`
              }}>
                {/* Dot — hide on mobile for cleanliness */}
                {!isMobile && <div style={{
                  position: "absolute", left: "50%", top: "50%",
                  width: "12px", height: "12px", borderRadius: "50%",
                  background: GOLD, transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 0 4px var(--bg-secondary), 0 0 0 5px ${GOLD}66`
                }} />}

                <div style={{
                  width: isMobile ? "100%" : "calc(50% - 60px)",
                  textAlign: isMobile ? "left" : (i % 2 === 0 ? "right" : "left"),
                  padding: isMobile ? "16px" : "24px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  position: "relative"
                }}>
                  <div style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em",
                    color: GOLD, marginBottom: "12px"
                  }}>{item.year}</div>
                  <p style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px", fontWeight: 300, lineHeight: 1.6,
                    color: CREAM, margin: 0, opacity: 0.8
                  }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence (As Seen In) */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px", background: "var(--bg-color)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "flex-end", 
            marginBottom: "60px", 
            borderBottom: `1px solid rgba(201,168,76,0.3)`, 
            paddingBottom: "24px",
            opacity: loaded ? 1 : 0, 
            transition: "opacity 1s ease 0.2s"
          }}>
            <h2 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: isMobile ? "32px" : "40px", 
              fontWeight: 300, 
              color: CREAM,
              margin: 0,
            }}>
              Global Presence
            </h2>
            <span style={{ 
              fontFamily: "var(--font-dm-sans), sans-serif", 
              fontSize: "10px", 
              fontWeight: 600,
              letterSpacing: "0.2em", 
              textTransform: "uppercase", 
              color: GOLD,
              marginBottom: "6px"
            }}>
              Press & Partnerships
            </span>
          </div>

          {/* Clean Index List */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { name: "SBCC SUMMIT", role: "Speaker & Partner", location: "Global" },
              { name: "IBN BATTUTA FESTIVAL", role: "Honorary President", location: "Global" },
              { name: "CARLAC", role: "Founding Member", location: "International" },
              { name: "GITEX", role: "Investor / Participant", location: "UAE" },
              { name: "ARAB PEACE CORPS", role: "Chairman", location: "Global" },
              { name: "AMCHAM ABU DHABI", role: "Member", location: "UAE" },
              { name: "SAHARA SPIRIT", role: "Executive President", location: "International" },
              { name: "ADGECO GROUP", role: "Chairman & Founder", location: "UAE" }
            ].map((org, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "2fr 2fr 1fr",
                alignItems: "center",
                padding: "24px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                transition: "all 0.4s ease",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(10px)",
                transitionDelay: `${0.3 + (i * 0.05)}s`
              }}>
                <div style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: isMobile ? "20px" : "24px",
                  color: CREAM,
                  letterSpacing: "0.05em",
                  transition: "color 0.4s ease",
                }} className="pr-name">
                  {org.name}
                </div>
                <div style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "12px",
                  color: "var(--text-color)",
                  letterSpacing: "0.1em",
                  opacity: 0.7,
                  marginTop: isMobile ? "8px" : "0",
                  textTransform: "uppercase"
                }} className="pr-role">
                  {org.role}
                </div>
                {!isMobile && (
                  <div style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    color: GOLD,
                    letterSpacing: "0.15em",
                    textAlign: "right",
                    opacity: 0.8,
                    textTransform: "uppercase"
                  }} className="pr-loc">
                    {org.location}
                  </div>
                )}
              </div>
            ))}
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .presence-row:hover {
              border-bottom-color: rgba(201,168,76,0.6) !important;
              padding-left: 16px !important;
              padding-right: 16px !important;
              background: rgba(255,255,255,0.01);
            }
            .presence-row:hover .pr-name {
              color: #C9A84C !important;
            }
            .presence-row:hover .pr-role, .presence-row:hover .pr-loc {
              opacity: 1 !important;
            }
          `}} />
        </div>
      </section>

      {/* Awards & Memberships Section */}
      <section style={{ padding: isMobile ? "50px 20px 60px" : "80px 40px 120px", background: "var(--bg-color)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(400px, 1fr))", gap: isMobile ? "48px" : "80px" }}>
          
          {/* Awards */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.6s"
          }}>
            <h2 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "36px", fontWeight: 300, color: CREAM,
              margin: "0 0 40px", borderBottom: `1px solid rgba(201,168,76,0.2)`, paddingBottom: "16px"
            }}>Awards & <i style={{ color: GOLD }}>Honors.</i></h2>
            
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "24px" }}>
              {[
                { title: "Medal from King Abdullah University of Science and Technology", date: "January 2009" },
                { title: "CHONMA-CHONG Gold Crown — Korean Ministry of Foreign Affairs", date: "2006" },
                { title: "BRIGADE DE REPRESSION DU BANDITISME — French Police", date: "2005" },
                { title: "Gold Star Award — Institute for Professional Excellence, Spain", date: "October 2015" },
                { title: "Recognition/Certificate of Gratitude — Intellectual Property Arab IP Forum, Abu Dhabi UAE", date: "2008" }
              ].map((award, i) => (
                <li key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", color: CREAM, opacity: 0.85 }}>{award.title}</span>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: GOLD }}>{award.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Memberships */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.8s"
          }}>
            <h2 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "36px", fontWeight: 300, color: CREAM,
              margin: "0 0 40px", borderBottom: `1px solid rgba(201,168,76,0.2)`, paddingBottom: "16px"
            }}>Global <i style={{ color: GOLD }}>Memberships.</i></h2>
            
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "16px" }}>
              {[
                { text: "Chairman & Founder of Adgeco Group", url: "http://adgeco.com", label: "adgeco.com" },
                { text: "President of Gate One Properties", url: "http://gateone.ae", label: "gateone.ae" },
                { text: "Chairman & Founder of Orchid Island Real Estate Agency", url: "https://orchidisland.immo", label: "orchidisland.immo" },
                { text: "Chairman of Arab Peace Corps Foundation" },
                { text: "Chief Financial Officer and Founding Member of CARLAC" },
                { text: "President/Executive Director of New Arab Foundation" },
                { text: "Honorary President – Ibn Battuta Association" },
                { text: "Chairman of Anouar Association" },
                { text: "Executive President of Sahara Spirit Foundation" },
                { text: "Member of AmCham Abu Dhabi", url: "https://amchamabudhabi.org", label: "amchamabudhabi.org" },
                { text: "Member of Australian Business Council Dubai", url: "https://www.abcduae.com", label: "abcduae.com" },
                { text: "Member of Singapore Business Council" },
                { text: "Member of Danish Business Council Dubai", url: "https://danishbusinesscouncil.com", label: "danishbusinesscouncil.com" },
                { text: "Member of Netherlands Business Council", url: "https://www.nlbcuae.com", label: "nlbcuae.com" },
                { text: "Member of Canadian Business Council", url: "https://www.cbc-dubai.com", label: "cbc-dubai.com" },
                { text: "Member of German Emirati Joint Council for Industry & Commerce", url: "https://vae.ahk.de/en", label: "vae.ahk.de" },
                { text: "Member of British Business Group Abu Dhabi" },
                { text: "Member of Benelux Business Council" },
                { text: "Member of Arab Business Club", url: "https://arabbusinessclub.org", label: "arabbusinessclub.org" },
                { text: "Member of Chambre Française de Commerce et d'Industrie du Maroc", url: "https://www.cfcim.org", label: "cfcim.org" },
                { text: "Member of Spanish Business Council", url: "http://spanishbusinesscouncil.ae/en", label: "spanishbusinesscouncil.ae" },
                { text: "Member of Swiss Business Council", url: "https://www.swissbcuae.com", label: "swissbcuae.com" },
              ].map((membership, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ marginTop: "6px", minWidth: "4px", height: "4px", background: GOLD, borderRadius: "50%" }} />
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", color: CREAM, opacity: 0.75, lineHeight: 1.5 }}>
                    {membership.text}{membership.url ? (
                      <> — <a href={membership.url} target="_blank" rel="noreferrer" style={{ color: GOLD, opacity: 1, textDecoration: "none", borderBottom: `1px solid ${GOLD}44` }}>{membership.label}</a></>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </section>

      <Footer />
    </main>
  );
}
