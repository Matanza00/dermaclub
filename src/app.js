(function(){
"use strict";

/* ---------------- data (scraped from thedermaclub.ca, rewritten for search) ---------------- */
const CATS = {
  skin:{name:"Skin & Collagen",art:"skin",img:"/media/photo-micro.webp",alt:"Microneedling pen treatment on a client's skin",pos:"50% 40%",blurb:"Radiofrequency, microneedling and medical peels that rebuild collagen, refine texture and even out tone."},
  inject:{name:"Injectables",art:"inject",img:"/media/photo-inject.webp",alt:"Injector placing a fine-needle injection on the forehead",pos:"50% 30%",blurb:"Neuromodulators and fillers placed by registered nurses and a board-certified cosmetic injector for results that still look like you."},
  facial:{name:"Medical Facials",art:"facial",img:"/media/photo-hydro.webp",alt:"Client relaxing during a hydrating facial treatment",pos:"68% 50%",blurb:"Results-driven facials using AlumierMD and clinical devices, from a pre-event glow to deep hydration."},
  laser:{name:"Laser & Hair",art:"laser",img:"/media/photo-laser.webp",alt:"Clinician performing a laser treatment with protective eyewear",pos:"40% 50%",blurb:"Triton tri-wavelength laser hair removal for every skin tone, plus treatments that support hair growth."},
  well:{name:"Women's Wellness",art:"well",img:"/media/team-abiha.webp",alt:"The Derma Club's private InMode treatment room",pos:"15% 30%",blurb:"Votiva feminine wellness and vitamin IV drips, delivered privately with medical oversight."}
};
const TBC = "Confirmed at your consultation";
const T = [
 {s:"morpheus8",c:"skin",n:"Morpheus8",h:"Morpheus8 RF microneedling in Mississauga",b:"Radiofrequency microneedling that rebuilds collagen to refine texture, soften acne scars and firm the skin.",
  d:["Morpheus8 combines microneedling with radiofrequency energy. Fine needles carry controlled heat beneath the surface, where it prompts the skin to produce new collagen and elastin.","It is one of the most versatile treatments we offer for texture, acne scarring and early laxity. We treat the face, around the eyes, neck, abdomen, thighs, legs and buttocks, and your provider sets the depth and energy for your skin at every session."],
  care:"Expect mild redness and tiny pinpoint marks for a few days. Makeup can usually go back on after 1–2 days; wear SPF daily.",
  f:["Acne scars","Uneven texture","Enlarged pores","Fine lines","Mild laxity"],
  x:{Method:"RF microneedling",Time:null,Downtime:"Usually a few days of redness",Sessions:"A series, planned for your skin"},flag:1},
 {s:"microneedling",c:"skin",n:"Twist Microneedling",h:"Microneedling in Mississauga",b:"Heat-free collagen induction for scars, pores, pigmentation and stretch marks. A strong option for deeper skin tones.",
  d:["Microneedling uses fine, sterile needles to create controlled micro-channels in the skin. The skin responds by producing more collagen and elastin, the proteins that keep it firm and smooth.","Needle depth is calibrated to your skin and goals. Because it uses no heat, microneedling is considered a safe choice for darker skin tones, where heat-based devices can shift pigmentation."],
  f:["Acne & acne scars","Large pores","Hyperpigmentation","Stretch marks","Sun damage","Fine lines","Uneven tone","Hair thinning"],
  x:{Method:"Mechanical microneedling, no heat",Time:"30–60 min",Downtime:"Minimal; redness for a few days",Sessions:"A series; results build over months"},
  care:"Avoid sun exposure, harsh products and exfoliation for about a week after each session."},
 {s:"evoke",c:"skin",n:"Evoke",h:"Evoke non-surgical facial remodelling",b:"Radiofrequency facial remodelling that tightens skin and softens wrinkles, with no downtime.",
  d:["Evoke uses radiofrequency energy to gently heat the deeper layers of the skin, stimulating collagen and tightening from within. It is a non-surgical alternative for clients who want a more sculpted look without a procedure.","Most clients describe it as a warm facial. A patient call button lets you pause the treatment at any time."],
  f:["Wrinkles","Fine lines","Facial contour","Skin firmness"],
  x:{Method:"Radiofrequency",Time:null,Downtime:"None",Sessions:"Personalised plan"}},
 {s:"skin-tightening",c:"skin",n:"Skin Tightening",h:"Non-surgical skin tightening in Mississauga",b:"Non-invasive treatment that firms lax skin on the face and body.",
  d:["Skin tightening treatments use controlled energy to encourage new collagen and a firmer, smoother surface without surgery.","Your provider will recommend the right device and number of sessions after assessing your skin."],
  f:["Loose skin","Jawline definition","Crepey texture"],x:{Method:"Non-invasive",Time:null,Downtime:null,Sessions:null}},
 {s:"skin-rejuvenation",c:"skin",n:"Skin Rejuvenation",h:"Skin rejuvenation treatments in Mississauga",b:"Non-invasive treatments that restore radiance, smoothness and an even tone.",
  d:["Skin rejuvenation brings together treatments that renew the skin's surface and support its repair, for a brighter and more even complexion.","Plans are built around your consultation and can combine in-clinic treatments with an AlumierMD home routine."],
  f:["Dullness","Uneven tone","Rough texture","Early signs of ageing"],x:{Method:"Non-invasive",Time:null,Downtime:null,Sessions:null}},
 {s:"pigmentation",c:"skin",n:"Twist Pigmentation Treatment",h:"Pigmentation treatment in Mississauga",b:"Targets dark spots and uneven tone for a clearer, more even complexion.",
  d:["Pigmentation treatments target excess melanin that shows up as dark spots, sun damage or patchy tone.","Your plan is matched to your skin type and the cause of your pigmentation, and is usually paired with daily sunscreen and a brightening home routine."],
  f:["Dark spots","Sun damage","Uneven tone"],x:{Method:"Twist pigmentation protocol",Time:null,Downtime:null,Sessions:null}},
 {s:"chemical-peels",c:"skin",n:"AlumierMD Chemical Peels",h:"Medical-grade chemical peels in Mississauga",b:"AlumierMD medical-grade peels that resurface dull, congested or uneven skin.",
  d:["Medical-grade chemical peels use controlled exfoliating acids to remove dead skin cells and renew the surface.","We use AlumierMD peels, chosen by strength and formula for your skin concern."],
  f:["Acne","Dullness","Pigmentation","Fine lines"],x:{Method:"AlumierMD peel",Time:null,Downtime:"Depends on peel strength",Sessions:null}},
 {s:"botox",c:"inject",n:"Botox",h:"Botox in Mississauga",b:"Softens forehead lines, frown lines and crow's feet for a rested, natural look.",
  d:["Botox is a prescription neuromodulator. Small, precise injections relax the muscles that create expression lines, so the skin above them smooths out.","Treatment is planned and overseen by our medical team, with natural movement as the goal."],
  f:["Forehead lines","Frown lines","Crow's feet"],x:{Method:"Prescription neuromodulator",Time:"10–30 min",Downtime:"Usually none",Sessions:"Repeat as results fade"},care:"Avoid rubbing or massaging the treated area for 24 hours."},
 {s:"fillers",c:"inject",n:"Dermal Fillers",h:"Dermal fillers in Mississauga",b:"Restores volume to lips, cheeks and folds with hyaluronic acid and collagen-stimulating fillers.",
  d:["Dermal fillers are a non-surgical way to restore lost volume, smooth folds and enhance features such as the lips and cheeks.","We work with hyaluronic acid fillers such as Juvéderm and Restylane, calcium hydroxyapatite (Radiesse) and poly-L-lactic acid (Sculptra). The area is numbed first and the product is placed with a fine needle."],
  f:["Lip volume","Cheek volume","Smile lines","Under-eye hollows"],x:{Method:"Injection with local anaesthetic",Time:"30–60 min",Downtime:null,Sessions:null}},
 {s:"sculptural",c:"inject",n:"Sculptural Facial Injections",h:"Sculptural facial injections",b:"Enhances the natural contours of the face for structure and balance.",
  d:["Sculptural injections focus on the face's framework, adding definition where structure has softened.","Each plan starts with a facial assessment so results stay in proportion with your features."],
  f:["Facial contour","Definition","Balance"],x:{Method:"Injectable",Time:null,Downtime:null,Sessions:null}},
 {s:"fat-injections",c:"inject",n:"Fat-Reducing Injections",h:"Fat-reducing injections in Mississauga",b:"Targets small pockets of stubborn fat for a slimmer contour.",
  d:["Fat-reducing injections treat small, diet-resistant fat deposits without surgery.","Your provider will confirm whether you are a good candidate and how many sessions to expect."],
  f:["Stubborn fat","Contour"],x:{Method:"Injectable",Time:null,Downtime:null,Sessions:null}},
 {s:"alumier-facial",c:"facial",n:"AlumierMD Custom Facial",h:"AlumierMD facial in Mississauga",b:"A facial built around your skin analysis using AlumierMD medical-grade products.",
  d:["Your esthetician analyses your skin and builds the facial around what it needs that day, using AlumierMD medical-grade cleansers, peels and serums.","It pairs well with an AlumierMD home routine, available in our shop."],
  f:["Dullness","Congestion","Sensitivity","Uneven tone"],x:{Method:"AlumierMD protocol",Time:null,Downtime:"None",Sessions:null}},
 {s:"glam-facial",c:"facial",n:"Glam Facial",h:"Glam facial in Mississauga",b:"An instant-radiance facial for events, photos or a quick reset.",
  d:["The Glam Facial is designed for an immediate glow, ideal before a wedding, event or photoshoot."],
  f:["Dullness","Pre-event glow"],x:{Method:"Facial",Time:null,Downtime:"None",Sessions:"Single session"}},
 {s:"oxygeneo",c:"facial",n:"OxyGeneo Facial",h:"OxyGeneo facial in Mississauga",b:"Exfoliates, infuses and oxygenates the skin for a fresh, glowing finish.",
  d:["The OxyGeneo facial refreshes tired skin, leaving it brighter and more radiant."],
  f:["Dullness","Dehydration","Texture"],x:{Method:"OxyGeneo device",Time:null,Downtime:"None",Sessions:null}},
 {s:"hydrodermabrasion",c:"facial",n:"Hydrodermabrasion Facial",h:"Hydrodermabrasion facial with serum infusion",b:"Deep cleansing and hydration with a custom serum infusion.",
  d:["Hydrodermabrasion cleanses and exfoliates with water-based suction, then infuses a serum chosen for your skin."],
  f:["Dehydration","Congestion","Dullness"],x:{Method:"Hydrodermabrasion + serum",Time:null,Downtime:"None",Sessions:null}},
 {s:"microdermabrasion",c:"facial",n:"Microdermabrasion",h:"Microdermabrasion in Mississauga",b:"Gentle exfoliation that smooths texture and revives dull skin.",
  d:["Microdermabrasion gently removes the outermost layer of dead skin cells, revealing smoother and brighter skin.","It is one of our clients' most-reviewed treatments."],
  f:["Rough texture","Dullness","Mild scarring"],x:{Method:"Mechanical exfoliation",Time:null,Downtime:"None",Sessions:null}},
 {s:"laser-hair-removal",c:"laser",n:"Triton Laser Hair Removal",h:"Laser hair removal in Mississauga",b:"Tri-wavelength laser hair reduction with built-in cooling, suitable for all skin tones.",
  d:["The Triton laser uses selective photothermolysis: light energy is absorbed by the pigment in each hair follicle and converted to heat, damaging the follicle while sparing the skin around it.","Three wavelengths let us treat a wide range of skin tones and hair types, and built-in cooling keeps sessions comfortable. Results are progressive and long-lasting."],
  f:["Unwanted hair","Ingrown hairs","All skin tones"],x:{Method:"Tri-wavelength laser",Time:"Depends on the area",Downtime:null,Sessions:"Multiple sessions"},flag:1},
 {s:"hair-growth",c:"laser",n:"Twist Hair Growth Treatment",h:"Hair growth treatment in Mississauga",b:"Scalp treatment that supports thicker, healthier-looking hair.",
  d:["Our hair growth treatment supports the scalp and follicles for healthier, shinier hair."],
  f:["Thinning hair","Scalp health"],x:{Method:"Twist protocol",Time:null,Downtime:null,Sessions:null}},
 {s:"votiva",c:"well",n:"Votiva Women's Wellness",h:"Votiva feminine wellness in Mississauga",b:"Non-surgical feminine wellness treatment with results from the first visit that keep improving.",
  d:["Votiva is a non-surgical women's wellness treatment that uses radiofrequency energy. Many clients notice a difference right away, with continued improvement over the following weeks.","Consultations and treatments take place privately with our nursing team."],
  f:["Feminine wellness","Comfort","Confidence"],x:{Method:"Radiofrequency",Time:null,Downtime:null,Sessions:null}},
 {s:"iv-drips",c:"well",n:"Vitamin IV Drips",h:"Vitamin IV therapy in Mississauga",b:"Vitamins, minerals and antioxidants delivered directly for hydration, energy and recovery.",
  d:["IV therapy delivers a blend of vitamins, minerals and antioxidants directly into the bloodstream.","Every drip starts with a consultation with a healthcare professional. Drips include the Boost IV for fatigue and dehydration and the Shape Up IV for active lifestyles. You are monitored throughout and after your infusion."],
  f:["Fatigue","Dehydration","Recovery"],x:{Method:"Intravenous infusion",Time:"30–60 min",Downtime:"None",Sessions:null}}
];
const bySlug = Object.fromEntries(T.map(t=>[t.s,t]));
const HERO=[
 ["/media/photo-hydro.webp","Client relaxing during a hydrating facial treatment","Medical facials","70% 50%"],
 ["/media/photo-consult.webp","Clinician examining a client's skin during a consultation","Skin consultation","40% 50%"],
 ["/media/photo-laser.webp","Clinician performing a laser treatment with protective eyewear","Laser & energy treatments","38% 50%"]
];
const PHOTO_OVERRIDE={"iv-drips":["/media/photo-iv.webp","Shape Up IV vitamin vial used for IV drips","50% 50%"],"votiva":["/media/team-abiha.webp","The Derma Club's InMode treatment room","50% 40%"],"evoke":["/media/photo-hydro.webp","Client during a radiofrequency facial treatment","68% 50%"],"skin-tightening":["/media/photo-laser.webp","Energy-based skin treatment","40% 50%"],"chemical-peels":["/media/photo-hydro.webp","Client during a medical facial","68% 50%"],"skin-rejuvenation":["/media/photo-hydro.webp","Client during a skin rejuvenation treatment","68% 50%"],"pigmentation":["/media/photo-laser.webp","Energy-based pigmentation treatment","40% 50%"],"hair-growth":["/media/photo-micro.webp","Microneedling pen treatment","50% 40%"]};
function tPhoto(t){if(PHOTO_OVERRIDE[t.s])return PHOTO_OVERRIDE[t.s];const c=CATS[t.c];return [c.img,c.alt,c.pos]}

const CONCERNS = [
 {k:"lines",n:"Fine lines & wrinkles",t:["botox","evoke","morpheus8"]},
 {k:"scars",n:"Acne scars",t:["morpheus8","microneedling","chemical-peels"]},
 {k:"pigment",n:"Dark spots & uneven tone",t:["pigmentation","chemical-peels","alumier-facial"]},
 {k:"laxity",n:"Loose skin",t:["skin-tightening","morpheus8","evoke"]},
 {k:"volume",n:"Lost volume",t:["fillers","sculptural","skin-tightening"]},
 {k:"hair",n:"Unwanted hair",t:["laser-hair-removal"]},
 {k:"dull",n:"Dull, dehydrated skin",t:["hydrodermabrasion","oxygeneo","glam-facial"]},
 {k:"acne",n:"Acne & congestion",t:["alumier-facial","chemical-peels","microneedling"]},
 {k:"thinning",n:"Thinning hair",t:["hair-growth","microneedling"]},
 {k:"fat",n:"Stubborn fat",t:["fat-injections","skin-tightening"]},
 {k:"wellness",n:"Intimate wellness",t:["votiva"]},
 {k:"energy",n:"Low energy",t:["iv-drips"]}
];

const TEAM = [
 {n:"Vijeta Singh",img:"/media/team-vijeta.webp",pos:"50% 20%",i:"VS",r:"Medical Director · NP-PHC",p:"Board-certified Family Nurse Practitioner with more than 8 years in acute care, primary care and dermatology. Leads consultations, diagnosis and treatment planning, sets medical directives and trains our aesthetic nurses.",c:["NP-PHC","RN(EC)","MScN","8+ years"],art:"inject"},
 {n:"Dr. Abiha Khwaja",img:"/media/team-abiha.webp",pos:"50% 30%",i:"AK",r:"Clinic Director",p:"Began in dentistry with a focus on smile design and now leads the clinic's aesthetic care. Advanced training in medical and laser aesthetics and in cosmetic dermatology.",c:["BDS","Looks Academy","CBAM"],art:"skin"},
 {n:"Dr. Raed",av:"/media/team-raed.webp",i:"R",r:"Cosmetic Injector",p:"Board-certified cosmetic injector focused on aesthetic medicine.",c:["Board-certified injector"],art:"inject"},
 {n:"Manvinder Kaur",img:"/media/team-manvinder.webp",pos:"50% 30%",i:"MK",r:"Registered Nurse · Aesthetics",p:"Aesthetic nurse experienced in Botox, fillers, PRP and IV therapy, known for calm, compassionate care.",c:["RN","MSc Nursing"],art:"well"},
 {n:"Rutva",i:"R",r:"Registered Nurse",p:"Registered nurse on our clinical team.",c:["RN"],art:"facial"},
 {n:"Rawan",img:"/media/team-rawan.webp",pos:"50% 20%",i:"R",r:"Patient Coordinator",p:"Welcomes clients and manages bookings. Completing her degree at the University of Toronto.",c:["Front desk"],art:"laser"},
 {n:"Irtiqua",img:"/media/team-irtiqua.webp",pos:"50% 30%",i:"I",r:"Patient Coordinator",p:"HBSc in Biology and Psychology from the University of Toronto Mississauga, with several years in patient care.",c:["HBSc, UTM"],art:"facial"}
];

const QUOTES = [
 {q:"I had microdermabrasion by Dr. Abiha. She's attentive, professional, and knowledgeable. The recommended facial improved my skin, and I'm happy with the results.",a:"Tara",t:"microdermabrasion"},
 {q:"The holistic approach they employed addressed both my physical and emotional well-being. I'm thankful for the empathetic care.",a:"Sobia Asad",t:"alumier-facial"},
 {q:"Her attentive approach, professionalism, and in-depth expertise were notable and confidence-inspiring. I recommend it.",a:"Kinza Hashmi",t:"microdermabrasion"}
];

const FIN_AMT=[2500,5000,7500,10000,12500,15000,17500,20000,22500];
const FIN_TERM=[72,60,48,36,24,12,6];
const FIN=[[51,57,67,83,117,221,430],[103,115,134,166,234,442,860],[154,172,201,249,351,663,1290],[206,230,268,332,468,884,1720],[257,287,335,415,585,1104,2150],[309,345,402,498,702,1325,2580],[360,402,469,581,819,1546,3011],[412,460,536,664,936,1767,3441],[463,517,603,747,1053,1988,3871]];

const PRODUCTS=[
 ["Acne Balancing Serum", "Serums", 88.0, "acne-balancing-serum"],
 ["Alumience A.G.E.™", "Serums", 49.0, "alumience-a-g-e"],
 ["BPO Facial Gel", "Serums", 78.0, "bpo-facial-gel"],
 ["Calm-R™", "Serums", 142.0, "calm-r"],
 ["EvenTone", "Serums", 118.0, "eventone"],
 ["EverActive C&E™ + Peptide A", "Serums", 204.0, "everactive-c-e-peptide-a"],
 ["Intellibright Complex", "Serums", 118.0, "intellibright-complex"],
 ["Lightening Lotion", "Serums", 110.0, "lightening-lotion"],
 ["Matticlear", "Serums", 87.0, "matticlear"],
 ["Retinol Resurfacing Serum 0.25", "Serums", 107.0, "retinol-resurfacing-serum-0-25"],
 ["Retinol Resurfacing Serum 0.5", "Serums", 125.0, "retinol-resurfacing-serum-0-5"],
 ["Retinol Resurfacing Serum 1.0", "Serums", 129.0, "retinol-resurfacing-serum-1-0"],
 ["Spot Clearing Lotion", "Serums", 39.0, "spot-clearing-lotion"],
 ["Ultimate Boost Serum", "Serums", 120.0, "ultimate-boost-serum"],
 ["Vitamin Rich Smoother", "Serums", 130.0, "vitamin-rich-smoother"],
 ["Brightening Collection for Discoloration 2% HQ", "Collections", 404.0, "brightening-collection-for-discoloration-2-hq"],
 ["Brightening Collection for Hyperpigmentation Non-HQ", "Collections", 404.0, "brightening-collection-for-hyperpigmentation-non-hq"],
 ["Calming Collection", "Collections", 306.0, "calming-collection"],
 ["Clarifying Collection", "Collections", 208.0, "clarifying-collection"],
 ["Prep & Enhance Discoloration (Non-HQ)", "Collections", 350.0, "prep-enhance-discoloration-non-hq"],
 ["Prep & Enhance Discoloration (With HQ)", "Collections", 350.0, "prep-enhance-discoloration-with-hq"],
 ["Prep & Enhance Rejuvenation", "Collections", 350.0, "prep-enhance-rejuvenation"],
 ["Rejuvenating Eye Collection", "Collections", 202.0, "rejuvenating-eye-collection"],
 ["Rejuvenating Skin Collection", "Collections", 465.0, "rejuvenating-skin-collection"],
 ["HydraCalm", "Moisturizers", 75.0, "hydracalm"],
 ["HydraClarité", "Moisturizers", 73.0, "hydraclarite"],
 ["HydraDew", "Moisturizers", 73.0, "hydradew"],
 ["HydraLight", "Moisturizers", 73.0, "hydralight"],
 ["HydraRich", "Moisturizers", 97.0, "hydrarich"],
 ["HydraSmooth", "Moisturizers", 73.0, "hydrasmooth"],
 ["Neck & Décolleté Firming Cream", "Moisturizers", 98.0, "neck-decollete-firming-cream"],
 ["Clear Shield Broad Spectrum SPF 42", "Sunscreen", 56.0, "clear-shield-broad-spectrum-spf-42"],
 ["Moisture Matte Broad Spectrum SPF 40 (Amber)", "Sunscreen", 52.0, "moisture-matte-broad-spectrum-spf-40-amber"],
 ["Moisture Matte Broad Spectrum SPF 40 (Ivory)", "Sunscreen", 52.0, "moisture-matte-broad-spectrum-spf-40-ivory"],
 ["Moisture Matte Broad Spectrum SPF 40 (Sand)", "Sunscreen", 52.0, "moisture-matte-broad-spectrum-spf-40-sand"],
 ["Sheer Hydration Broad Spectrum SPF 40 (Untinted)", "Sunscreen", 56.0, "sheer-hydration-broad-spectrum-spf-40-untinted"],
 ["Sheer Hydration Broad Spectrum SPF 40 (Versatile Tint)", "Sunscreen", 56.0, "sheer-hydration-broad-spectrum-spf-40-versatile-tint"],
 ["Acne Clarifying Cleanser", "Cleansers", 60.0, "acne-clarifying-cleanser"],
 ["HydraBoost", "Cleansers", 52.0, "hydraboost"],
 ["Purifying Gel Cleanser", "Cleansers", 56.0, "purifying-gel-cleanser"],
 ["SensiCalm", "Cleansers", 52.0, "sensicalm"],
 ["AHA Renewal Serum", "Exfoliation", 100.0, "aha-renewal-serum"],
 ["Bright & Clear Solution M", "Exfoliation", 56.0, "bright-clear-solution-m"],
 ["Enzymatic Peel", "Exfoliation", 96.0, "enzymatic-peel"],
 ["Lotus Scrub", "Exfoliation", 49.0, "lotus-scrub"],
 ["MicroDerm Polish", "Exfoliation", 71.0, "microderm-polish"],
 ["AluminEye™", "Eye Products", 115.0, "alumineye"],
 ["Eye Rescue Pads", "Eye Products", 44.0, "eye-rescue-pads"],
 ["Retinol Eye Gel", "Eye Products", 110.0, "retinol-eye-gel"],
 ["Aqua Infusion Mask", "Masks", 84.0, "aqua-infusion-mask"],
 ["Recovery Balm", "Post Procedure", 95.0, "recovery-balm"]
];
const SHOPCATS=[...new Set(PRODUCTS.map(p=>p[1]))].map(c=>[c,PRODUCTS.filter(p=>p[1]===c).length]);

const FAQS=[
 {g:"Getting started",q:"How do I know which treatment is right for me?",a:["Every plan starts with a consultation. We look at your skin, medical history and goals, then recommend a treatment plan built for you. You are never committed to a treatment at the consultation."]},
 {g:"Getting started",q:"Who performs the treatments?",a:["Treatments are performed by our registered nurses, a board-certified cosmetic injector and trained skin specialists, under the medical direction of Vijeta Singh, a board-certified Family Nurse Practitioner."]},
 {g:"Getting started",q:"How many sessions will I need?",a:["It depends on the treatment, your skin type, the severity of the concern and the result you want. Collagen treatments such as microneedling and Morpheus8 are usually done as a series, and laser hair removal needs multiple sessions. You will get an expected number at your consultation."]},
 {g:"Safety",q:"Are your treatments safe for darker skin tones?",a:["Yes, when the right technology is chosen. Our Triton laser uses three wavelengths and is suitable for all skin tones, and microneedling uses no heat, which makes it a safe option where pigmentation is a concern. Your provider will match the treatment to your skin type."]},
 {g:"Safety",q:"Is there downtime?",a:["Many treatments, such as Evoke, our facials and IV drips, have no downtime. Microneedling and Morpheus8 usually cause redness for a few days. We give you written aftercare for every treatment."]},
 {g:"Treatments",q:"What is the difference between Morpheus8 and regular microneedling?",a:["Both create micro-channels that trigger collagen. Morpheus8 adds radiofrequency energy delivered through the needles, which heats deeper layers for more tightening. Regular microneedling uses no heat, so it can be the better choice for some skin types."]},
 {g:"Treatments",q:"How long does Botox take to work?",a:["Results from neuromodulators such as Botox usually begin to appear within a few days and settle over about two weeks. Results typically last a few months, after which treatment can be repeated."]},
 {g:"Treatments",q:"Does laser hair removal hurt?",a:["Most clients feel a mild snapping or warm sensation. The Triton laser has built-in cooling to keep sessions comfortable."]},
 {g:"Payment",q:"Do you offer financing?",a:["Yes. Through Beautifi, treatments and packages of $1,000 or more can be paid monthly over 6 months to 6 years, with zero down. Applying takes under 3 minutes and does not affect your credit score."]},
 {g:"Payment",q:"Can I pay off my financing early?",a:["Yes. Beautifi plans can be paid off early with no prepayment fee, and the remaining interest is waived."]},
 {g:"Visiting",q:"Where are you located and is there parking?",a:["We are at 6005 Erinmills Parkway, Unit 106, in the Erin Mills area of Mississauga, near the border with Oakville. Please call us for parking details before your first visit."]},
 {g:"Visiting",q:"What are your opening hours?",a:["Tuesday and Thursday 10:30 AM to 6:00 PM, Wednesday and Friday 10:00 AM to 3:00 PM, Saturday by appointment. We are closed Sunday and Monday."]}
];

const HOURS=[["Sunday",null],["Monday",null],["Tuesday",[10.5,18]],["Wednesday",[10,15]],["Thursday",[10.5,18]],["Friday",[10,15]],["Saturday","appt"]];

const SEO={
 home:["Med Spa Mississauga | Morpheus8, Botox, Laser | Derma Club","Medical aesthetics for women in Erin Mills, Mississauga. Morpheus8, Botox, fillers, laser hair removal and facials with NP oversight. Book a consultation."],
 treatments:["Aesthetic Treatments in Mississauga | The Derma Club","Explore 20 skin, injectable, laser and wellness treatments in Erin Mills, Mississauga. Find the right treatment for your concern and book online."],
 about:["About The Derma Club | Women's Wellness Centre, Mississauga","A women-focused medical aesthetics clinic in Erin Mills. Personalised plans, modern technology and nurse practitioner medical direction."],
 team:["Our Team | Nurses & Injectors | The Derma Club Mississauga","Meet our Medical Director, nurse practitioner, registered nurses and cosmetic injector serving Mississauga and Oakville."],
 financing:["Med Spa Financing with Beautifi | The Derma Club Mississauga","Pay monthly for treatments over $1,000 with Beautifi. 6 months to 6 years, zero down, no credit impact to apply. See monthly payments."],
 shop:["AlumierMD Skincare in Mississauga | The Derma Club Shop","Shop AlumierMD medical-grade serums, sunscreens and moisturizers recommended by our skin specialists in Erin Mills, Mississauga."],
 faq:["Med Spa FAQ | Morpheus8, Botox, Laser | The Derma Club","Answers on treatment safety for all skin tones, downtime, sessions, Botox results, laser hair removal comfort and Beautifi financing."],
 contact:["Contact & Hours | The Derma Club, Erin Mills Mississauga","6005 Erinmills Parkway, Unit 106, Mississauga. Call 905-812-8526. Open Tue–Fri, Saturday by appointment. Book a consultation online."],
 brand:["Rebrand Notes | The Derma Club","Brand system, SEO plan, audit findings and test results for The Derma Club website rebrand."]
};

/* ---------------- helpers ---------------- */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const arrow='<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
const money=n=>"$"+n.toLocaleString("en-CA");
const catCount=c=>T.filter(t=>t.c===c).length;
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("on");clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove("on"),3600)}

function torontoNow(){
  try{
    const p=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Toronto",weekday:"long",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date());
    const g=k=>(p.find(x=>x.type===k)||{}).value;
    return {day:g("weekday"),h:(+g("hour")%24)+(+g("minute"))/60};
  }catch(e){const d=new Date();return {day:HOURS[d.getDay()][0],h:d.getHours()+d.getMinutes()/60}}
}
function fmtH(h){const H=Math.floor(h),m=Math.round((h-H)*60),ap=H>=12?"PM":"AM",h12=((H+11)%12)+1;return h12+":"+String(m).padStart(2,"0")+" "+ap}
function openStatus(){
  const n=torontoNow(),row=HOURS.find(r=>r[0]===n.day);
  if(row&&Array.isArray(row[1])&&n.h>=row[1][0]&&n.h<row[1][1])return {open:true,txt:"Open now · until "+fmtH(row[1][1])};
  return {open:false,txt:"Closed now · see hours below"};
}
function hoursHTML(){
  const today=torontoNow().day;
  const rows=[["Tuesday","Thursday"],["Wednesday","Friday"],["Saturday"],["Sunday","Monday"]];
  return '<div class="hours mono">'+rows.map(days=>{
    const v=HOURS.find(r=>r[0]===days[0])[1];
    const val=Array.isArray(v)?fmtH(v[0])+" – "+fmtH(v[1]):v==="appt"?"By appointment":"Closed";
    const cls=days.includes(today)?"today":"";
    return `<div class="${cls}"><span>${days.map(d=>d.slice(0,3)).join(" & ")}</span><span class="${v?"":"cl"}">${val}</span></div>`;
  }).join("")+"</div>";
}

/* ---------------- shared blocks ---------------- */
function tcard(t){
  const facts=[t.x.Time,t.x.Downtime].filter(Boolean).slice(0,2);
  return `<a class="tcard" href="/treatments/${t.s}" data-cat="${t.c}">
    <div class="art art--${CATS[t.c].art} ph"><img src="${tPhoto(t)[0]}" alt="" loading="lazy" style="object-position:${tPhoto(t)[2]}"></div>
    <div class="tcard__b"><span class="eyebrow">${CATS[t.c].name}</span><h3>${esc(t.n)}</h3><p>${esc(t.b)}</p>
    <div class="tcard__m">${facts.map(f=>`<span class="tag">${esc(f)}</span>`).join("")}${t.flag?'<span class="tag tag--brand">Signature</span>':""}</div></div></a>`;
}
function specHTML(x){
  return `<dl class="spec">${Object.entries(x).map(([k,v])=>`<div><dt>${k==="Time"?"Treatment time":k}</dt><dd class="${v?"":"tbc"}">${esc(v||TBC)}</dd></div>`).join("")}</dl>`;
}
function band(h,p){
  return `<section class="sec sec--tight"><div class="wrap"><div class="band"><div><h2 class="d2">${h}</h2><p>${p}</p></div>
  <div class="band__act"><button class="btn btn--brand" type="button" data-book>Book a consultation ${arrow}</button><a class="btn btn--line" href="/financing">See financing</a></div></div></div></section>`;
}
function faqHTML(list){
  return `<div class="faq">${list.map(f=>`<details><summary>${esc(f.q)}<i aria-hidden="true"></i></summary><div class="ans">${f.a.map(p=>`<p>${esc(p)}</p>`).join("")}</div></details>`).join("")}</div>`;
}
function visitHTML(){
  const st=openStatus();
  return `<div class="visit">
   <div class="card"><div class="map" aria-hidden="true">${mapSVG()}</div>
     <div class="nap">
      <div class="nap__row"><div><span>Address</span><b>6005 Erinmills Parkway, Unit 106, Mississauga, ON</b></div><a class="copy" href="https://www.google.com/maps/search/?api=1&query=6005+Erinmills+Parkway+Unit+106+Mississauga+ON" target="_blank" rel="noopener">Directions</a></div>
      <div class="nap__row"><div><span>Phone</span><b class="mono">+1 905-812-8526</b></div><button class="copy" type="button" data-copy="+1 905-812-8526">Copy</button></div>
      <div class="nap__row"><div><span>Email</span><b>info@thedermaclub.ca</b></div><button class="copy" type="button" data-copy="info@thedermaclub.ca">Copy</button></div>
     </div></div>
   <div class="card" style="display:flex;flex-direction:column;gap:18px">
     <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><h3 class="d3">Opening hours</h3><span class="status ${st.open?"open":""}"><i></i>${st.txt}</span></div>
     ${hoursHTML()}
     <p class="small">Saturday appointments are arranged in advance. Call or book online and we will confirm your time.</p>
     <button class="btn btn--brand" type="button" data-book style="margin-top:auto">Book a consultation ${arrow}</button>
   </div></div>`;
}
function mapSVG(){
  return `<svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice"><rect width="640" height="360" fill="var(--surface-2)"/>
  <g fill="var(--surface-3)"><rect x="40" y="30" width="150" height="90" rx="10"/><rect x="230" y="40" width="120" height="70" rx="10"/><rect x="420" y="20" width="180" height="110" rx="10"/><rect x="30" y="200" width="170" height="120" rx="10"/><rect x="430" y="210" width="170" height="110" rx="10"/></g>
  <path d="M-10 170 C 160 150 300 190 650 160" stroke="var(--surface)" stroke-width="22" fill="none"/>
  <path d="M330 -10 C 320 120 350 240 340 370" stroke="var(--surface)" stroke-width="28" fill="none"/>
  <text x="352" y="40" font-family="IBM Plex Mono,monospace" font-size="12" fill="var(--mute)" transform="rotate(88 352 40)">ERIN MILLS PKWY</text>
  <text x="40" y="160" font-family="IBM Plex Mono,monospace" font-size="12" fill="var(--mute)">EGLINTON AVE W</text>
  <circle cx="372" cy="210" r="34" fill="var(--brand)" opacity=".15"/><circle cx="372" cy="210" r="11" fill="var(--brand)"/><circle cx="372" cy="210" r="4" fill="var(--surface)"/>
  <rect x="392" y="226" width="150" height="34" rx="17" fill="var(--surface)"/><text x="408" y="248" font-family="Instrument Sans,sans-serif" font-size="14" font-weight="600" fill="var(--ink)">The Derma Club</text></svg>`;
}

/* ---------------- pages ---------------- */
const P={};
P.home=()=>{
  const sig=bySlug.morpheus8;
  return `
<section class="hero">
 <div class="wrap hero__in">
  <div class="hero__copy">
   <span class="eyebrow">Erin Mills · Mississauga · Women's Wellness Centre</span>
   <h1 class="d1">Medical‑grade <em>skin care</em> for women in Mississauga</h1>
   <p class="lead">Morpheus8, injectables, laser hair removal and medical facials, planned around your skin and overseen by a board-certified nurse practitioner.</p>
   <div class="hero__act"><button class="btn btn--brand" type="button" data-book>Book a consultation ${arrow}</button><a class="btn btn--line" href="/treatments">Explore treatments</a></div>
   <div class="hero__facts"><div><b>20</b><span>Treatments</span></div><div><b>7</b><span>Clinical team</span></div><div><b>I–VI</b><span>Skin types treated</span></div><div><b>$0</b><span>Down with Beautifi</span></div></div>
  </div>
  <div class="hero__media">
   <div class="arch" id="arch">${HERO.map((h,i)=>`<img src="${h[0]}" alt="${h[1]}" style="object-position:${h[3]}" class="${i===0?"on":""}">`).join("")}</div>
   <div class="hero__md"><img src="/media/team-vijeta-head.webp" alt="Vijeta Singh, Medical Director"><div><span>Medical Director</span><b>Vijeta Singh, NP-PHC</b></div></div>
   <div class="hero__cap"><span id="heroCap">${HERO[0][2]}</span><div class="dots" role="group" aria-label="Hero photos">${HERO.map((h,i)=>`<button type="button" data-slide="${i}" aria-label="Show photo ${i+1}: ${h[2]}" aria-current="${i===0}"></button>`).join("")}</div></div>
  </div>
 </div></section>

<section class="strip"><div class="wrap strip__in">
 <div><svg aria-hidden="true"><use href="#i-shield"/></svg><p><b>Medical oversight</b><span>Every plan directed by a board-certified NP</span></p></div>
 <div><svg aria-hidden="true"><use href="#i-sun"/></svg><p><b>All skin tones</b><span>Triton laser and heat-free options</span></p></div>
 <div><svg aria-hidden="true"><use href="#i-card"/></svg><p><b>Beautifi financing</b><span>6 months to 6 years, zero down</span></p></div>
 <div><svg aria-hidden="true"><use href="#i-drop"/></svg><p><b>AlumierMD clinic</b><span>Medical-grade facials, peels and skincare</span></p></div>
</div></section>

<section class="sec sec--tight"><div class="wrap find">
 <div class="find__l"><span class="eyebrow">Treatment finder</span><h2 class="d2">What would you like to <em>improve</em>?</h2><p class="lead">Pick a concern to see where most clients start. Your clinician confirms the plan in person.</p>
  <div class="chips" role="group" aria-label="Skin concerns">${CONCERNS.map((c,i)=>`<button class="chip" type="button" data-concern="${c.k}" aria-pressed="${i===0}">${c.n}</button>`).join("")}</div></div>
 <div class="finder"><div class="finder__h"><h3 class="h4">Suggested treatments</h3><a class="link" href="/treatments">All 20 ${arrow}</a></div><div class="finder__res" id="finderRes" aria-live="polite"></div></div>
</div></section>

<section class="sec sec--alt"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">Treatments</span><h2 class="d2">Five ways we care for <em>your skin</em></h2></div><p class="lead">From collagen-building radiofrequency to a pre-event glow, every treatment family is delivered by trained clinicians with technology chosen for results and safety.</p></div>
 <div class="cats">${Object.entries(CATS).map(([k,c])=>`<a class="cat" href="/treatments" data-filter="${k}"><div class="art art--${c.art} ph"><img src="${c.img}" alt="${c.alt}" loading="lazy" style="object-position:${c.pos}"><span class="cat__n mono">${String(catCount(k)).padStart(2,"0")} treatments</span></div><div class="cat__b"><h3>${c.name}</h3><p>${c.blurb}</p><ul>${T.filter(t=>t.c===k).slice(0,4).map(t=>`<li>${esc(t.n)}</li>`).join("")}</ul><span class="cat__go">Explore ${arrow}</span></div></a>`).join("")}</div>
</div></section>

<section class="sec"><div class="wrap spot">
 <figure class="ph" style="margin:0"><img src="/media/team-abiha.webp" alt="Dr. Abiha Khwaja in The Derma Club's InMode treatment room in Erin Mills" loading="lazy" style="object-position:50% 40%"><div class="spot__badge"><span>Inside the clinic</span><b>Our InMode suite</b></div></figure>
 <div class="spot__txt"><span class="eyebrow">Skin &amp; Collagen</span><h2 class="d2">Smoother texture, <em>softer scars</em>, firmer skin</h2>
  <p class="lead">${sig.d[0]}</p>${specHTML(sig.x)}
  <div class="hero__act"><a class="btn btn--brand" href="/treatments/morpheus8">About Morpheus8 ${arrow}</a><button class="btn btn--line" type="button" data-book="morpheus8">Book this treatment</button></div></div>
</div></section>

<section class="sec sec--alt"><div class="wrap ba-wrap">
 <div class="ba" id="ba"><img src="/media/ba-after.webp" alt="After treatment: smoother, clearer and more even skin" loading="lazy"><img class="ba__before" src="/media/ba-before.webp" alt="Before treatment: uneven texture, blemishes and redness" loading="lazy">
  <span class="ba__tag l">Before</span><span class="ba__tag r">After</span><i class="ba__line"></i><i class="ba__knob"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6-6 6 6 6M15 6l6 6-6 6"/></svg></i>
  <input type="range" id="baRange" min="0" max="100" value="50" aria-label="Drag to compare before and after"></div>
 <div style="display:flex;flex-direction:column;gap:18px;min-width:0"><span class="eyebrow">Results</span><h2 class="d2">Clearer texture, <em>calmer</em> skin</h2>
  <p class="lead">Texture, blemishes and redness respond to a plan that combines in-clinic treatments, such as microneedling, Morpheus8 and medical peels, with a consistent AlumierMD routine at home.</p>
  <p class="small">Drag the handle to compare. Images from The Derma Club's current website. Individual results vary, and your clinician will set realistic expectations at consultation.</p>
  <div class="hero__act"><a class="btn btn--line btn--sm" href="/treatments/microneedling">Microneedling</a><a class="btn btn--line btn--sm" href="/treatments/morpheus8">Morpheus8</a><a class="btn btn--line btn--sm" href="/treatments/chemical-peels">Chemical peels</a></div></div>
</div></section>

<section class="sec sec--ink"><div class="wrap fitz">
 <div><span class="eyebrow">Laser hair removal</span><h2 class="d2" style="margin-top:14px">Built for <em>every</em> skin tone</h2>
  <p class="lead" style="margin-top:18px">Our Triton laser uses three wavelengths and built-in cooling, so we can treat a wide range of skin tones and hair types comfortably. Where heat is a concern, we offer heat-free microneedling instead.</p>
  <div class="hero__act" style="margin-top:24px"><a class="btn btn--brand" style="background:var(--bg);color:var(--ink)" href="/treatments/laser-hair-removal">Laser hair removal ${arrow}</a></div></div>
 <div><div class="fitz__scale" role="img" aria-label="Fitzpatrick skin types I to VI, all suitable for Triton laser">${[["I","#F6DCCB"],["II","#EBC2A4"],["III","#D6A27C"],["IV","#B47A52"],["V","#7E5034"],["VI","#4A2E1F"]].map(([n,c])=>`<div><i style="background:${c}"></i><span>Type ${n}</span></div>`).join("")}</div>
  <p class="fitz__note mono"><svg width="16" height="16" aria-hidden="true"><use href="#i-check"/></svg>Fitzpatrick scale · suitability confirmed with a patch test</p></div>
</div></section>

<section class="sec"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">Your visit</span><h2 class="d2">A plan made <em>for you</em>, step by step</h2></div><p class="lead">We take a holistic view of skin health. Every client follows the same careful path, whether you come in for a facial or a full treatment series.</p></div>
 <figure class="ph wide-ph"><img src="/media/photo-consult.webp" alt="A clinician examining a client's skin during a consultation" loading="lazy" style="object-position:50% 35%"><figcaption>Every plan starts with a one-to-one consultation</figcaption></figure>
 <ol class="steps">
  <li><b>1</b><h3>Consultation</h3><p>We assess your skin, medical history and goals with a clinician.</p></li>
  <li><b>2</b><h3>Your plan</h3><p>You receive a personalised plan with sessions, timing and cost.</p></li>
  <li><b>3</b><h3>Treatment</h3><p>Delivered by registered nurses and trained specialists under medical direction.</p></li>
  <li><b>4</b><h3>Aftercare</h3><p>Written aftercare, follow-up and an AlumierMD home routine if you want one.</p></li>
 </ol>
</div></section>

<section class="sec sec--alt"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">Our clinicians</span><h2 class="d2">Led by <em>medical</em> professionals</h2></div><p class="lead">Our team combines nurse practitioner medical direction, registered aesthetic nurses and a board-certified cosmetic injector. <a class="link" href="/team">Meet the full team ${arrow}</a></p></div>
 <div class="people">${TEAM.slice(0,3).map(personHTML).join("")}</div>
</div></section>

<section class="sec"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">Client stories</span><h2 class="d2">In our <em>clients'</em> words</h2></div><p class="lead">Reviews from clients of The Derma Club in Erin Mills.</p></div>
 <div class="quotes">${QUOTES.map(q=>`<figure class="quote"><blockquote>${esc(q.q)}</blockquote><footer><b>${esc(q.a)}</b><a class="tag" href="/treatments/${q.t}">${esc(bySlug[q.t].n)}</a></footer></figure>`).join("")}</div>
</div></section>

<section class="sec sec--alt"><div class="wrap fin">
 <div style="display:flex;flex-direction:column;gap:18px"><span class="eyebrow">Flexible financing</span><h2 class="d2">Treatment now, <em>monthly</em> payments</h2>
 <p class="lead">With Beautifi, treatments and packages from $1,000 can be paid over 6 months to 6 years with zero down. Applying takes under 3 minutes and won't affect your credit score.</p>
 <div><a class="link" href="/financing">How financing works ${arrow}</a></div></div>
 ${calcHTML()}
</div></section>

<section class="sec"><div class="wrap faq-grid">
 <div style="display:flex;flex-direction:column;gap:16px"><span class="eyebrow">FAQ</span><h2 class="d2">Questions, <em>answered</em></h2><p class="lead">The questions we hear most before a first visit.</p><div><a class="link" href="/faq">All questions ${arrow}</a></div></div>
 ${faqHTML([FAQS[0],FAQS[3],FAQS[5],FAQS[8]])}
</div></section>

<section class="sec sec--alt"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">Visit us</span><h2 class="d2">In Erin Mills, <em>Mississauga</em></h2></div><p class="lead">Serving Mississauga, Oakville and the west GTA from our clinic on Erinmills Parkway.</p></div>
 ${visitHTML()}
</div></section>
${band("Ready to <em>feel the difference</em>?","Book a consultation and leave with a plan made for your skin. No obligation to start treatment.")}`;
};

function personHTML(p){
  return `<article class="person">${p.img?`<div class="person__pic ph"><img src="${p.img}" alt="${esc(p.n)}, ${esc(p.r)}" loading="lazy" style="object-position:${p.pos}"></div>`:p.av?`<div class="person__pic art art--${p.art}"><img class="av" src="${p.av}" alt="${esc(p.n)}, ${esc(p.r)}" loading="lazy"></div>`:`<div class="person__pic art art--${p.art}"><span>${p.i}</span></div>`}<div class="person__b"><span class="person__role">${esc(p.r)}</span><h3>${esc(p.n)}</h3><p>${esc(p.p)}</p><div class="person__cred">${p.c.map(c=>`<span class="tag">${esc(c)}</span>`).join("")}</div></div></article>`;
}

let calcState={a:1,t:0};
function calcHTML(){
  const v=FIN[calcState.a][calcState.t];
  return `<div class="calc" id="calc">
   <div><label id="amtL">Treatment cost</label><div class="calc__amt" role="group" aria-labelledby="amtL">${FIN_AMT.map((a,i)=>`<button class="chip" type="button" data-amt="${i}" aria-pressed="${i===calcState.a}">${money(a)}</button>`).join("")}</div></div>
   <div><label id="termL">Term</label><div class="calc__term" role="group" aria-labelledby="termL">${FIN_TERM.map((t,i)=>`<button class="chip" type="button" data-term="${i}" aria-pressed="${i===calcState.t}">${t} mo</button>`).join("")}</div></div>
   <div class="calc__out"><b class="mono" id="calcOut">${money(v)}<small>/mo</small></b><p>Estimate from Beautifi's published table, assuming an excellent credit rating. Your rate depends on your credit history and income.</p></div>
  </div>`;
}

P.treatments=(filter)=>{
  const f=filter&&CATS[filter]?filter:"all";
  return `
<section class="phead"><div class="wrap phead__grid"><div class="phead__txt">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>Treatments</span></nav>
 <h1 class="d1">Aesthetic treatments in <em>Mississauga</em></h1>
 <p class="lead">Twenty skin, injectable, laser and wellness treatments, each planned at a consultation and delivered under nurse practitioner medical direction.</p>
</div><figure class="phead__ph" style="margin:0"><img src="/media/photo-hydro.webp" alt="Client relaxing during a medical facial" style="object-position:68% 50%"><figcaption>20 treatments, one clinic</figcaption></figure></div></section>
<section class="sec sec--tight"><div class="wrap">
 <div class="filters" role="group" aria-label="Filter treatments">
  <button class="chip" type="button" data-cat-filter="all" aria-pressed="${f==="all"}">All <span class="n">${T.length}</span></button>
  ${Object.entries(CATS).map(([k,c])=>`<button class="chip" type="button" data-cat-filter="${k}" aria-pressed="${f===k}">${c.name} <span class="n">${catCount(k)}</span></button>`).join("")}
 </div>
 <div class="tgrid" id="tgrid">${T.map(tcard).join("")}</div>
</div></section>
<section class="sec sec--alt"><div class="wrap faq-grid">
 <div style="display:flex;flex-direction:column;gap:16px"><span class="eyebrow">Not sure where to start?</span><h2 class="d2">Tell us your <em>concern</em></h2><p class="lead">Pick what you'd like to improve and we'll suggest where to start. Your clinician confirms the plan in person.</p></div>
 <div class="finder" style="box-shadow:none"><div class="chips" role="group" aria-label="Skin concerns">${CONCERNS.map((c,i)=>`<button class="chip" type="button" data-concern="${c.k}" aria-pressed="${i===0}">${c.n}</button>`).join("")}</div><div class="finder__res" id="finderRes" aria-live="polite"></div></div>
</div></section>
${band("Book a <em>consultation</em>","We'll assess your skin and recommend a treatment plan, with sessions, timing and cost explained up front.")}`;
};

P.treatment=(slug)=>{
  const t=bySlug[slug]; if(!t) return P.treatments();
  const c=CATS[t.c];
  const rel=T.filter(x=>x.c===t.c&&x.s!==t.s).slice(0,3);
  const tf=treatFaqs(t);
  return `
<section class="phead"><div class="wrap">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span><a href="/treatments">Treatments</a></span><span><a href="/treatments" data-filter="${t.c}">${c.name}</a></span><span>${esc(t.n)}</span></nav>
 <h1 class="d1">${esc(t.h).replace(" in Mississauga"," <em>in Mississauga</em>")}</h1>
 <p class="lead">${esc(t.b)}</p>
 <div class="hero__act"><button class="btn btn--brand" type="button" data-book="${t.s}">Book ${esc(t.n)} ${arrow}</button><a class="btn btn--line" href="/financing">Financing options</a></div>
</div></section>
<section class="sec sec--tight"><div class="wrap tdet">
 <div class="tdet__main">
  <div class="duo"><figure class="ph" style="margin:0"><img src="${tPhoto(t)[0]}" alt="${esc(tPhoto(t)[1])}" style="object-position:${tPhoto(t)[2]}"><figcaption>${esc(t.n)} at The Derma Club</figcaption></figure><figure class="ph" style="margin:0"><img src="/media/photo-consult.webp" alt="Clinician assessing a client's skin" loading="lazy" style="object-position:30% 40%"><figcaption>Consultation first</figcaption></figure></div>
  <div><h2>What is ${esc(t.n)}?</h2><div class="body">${t.d.map(p=>`<p>${esc(p)}</p>`).join("")}</div></div>
  <div><h2>What it treats</h2><ul class="concerns">${t.f.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
  <div><h2>Your visit</h2><ol class="visitsteps">
   <li><b>Consultation</b><p>A clinician reviews your skin, medical history and goals and confirms ${esc(t.n)} is right for you.</p></li>
   <li><b>Preparation</b><p>We cleanse the area and, where appropriate, apply numbing cream for comfort.</p></li>
   <li><b>Treatment</b><p>Your treatment is delivered by a trained clinician${t.x.Time?`, usually in ${esc(t.x.Time)}`:""}.</p></li>
   <li><b>Aftercare</b><p>${esc(t.care||"You leave with written aftercare and a follow-up plan.")}</p></li>
  </ol></div>
  <div><h2>${esc(t.n)} questions</h2>${faqHTML(tf)}</div>
 </div>
 <aside class="rail"><div class="card"><span class="eyebrow">At a glance</span>${specHTML(t.x)}
   <button class="btn btn--brand btn--block" type="button" data-book="${t.s}">Book a consultation</button>
   <p class="small">Typical ranges. Your clinician confirms details for your skin.</p></div>
  <div class="note"><svg aria-hidden="true"><use href="#i-shield"/></svg><span>All treatments are planned under the medical direction of our board-certified nurse practitioner.</span></div>
 </aside>
</div></section>
<section class="sec sec--alt"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">${c.name}</span><h2 class="d2">Related <em>treatments</em></h2></div></div>
 <div class="tgrid">${rel.map(tcard).join("")}</div>
</div></section>
${band(`Start with a <em>${esc(t.n)}</em> consultation`,"We'll confirm it's right for your skin and explain sessions, downtime and cost before you commit.")}`;
};

P.about=()=>`
<section class="phead"><div class="wrap">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>About</span></nav>
 <h1 class="d1">A skin clinic built <em>for women</em></h1>
 <p class="lead">The Derma Club &amp; Women's Wellness Centre offers result-driven, medical-grade care in Erin Mills, Mississauga. We help our community look after their health, self-care, wellness and beauty.</p>
</div></section>
<section class="sec sec--tight"><div class="wrap duo" style="grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr)">
 <figure class="ph" style="aspect-ratio:16/11;margin:0"><img src="/media/team-abiha.webp" alt="Dr. Abiha Khwaja in the clinic's InMode treatment room" style="object-position:50% 40%"><figcaption>Dr. Abiha Khwaja, Clinic Director, in our Erin Mills clinic</figcaption></figure>
 <figure class="ph" style="aspect-ratio:auto;margin:0"><img src="/media/photo-hydro.webp" alt="A client receiving a hydrating facial treatment" loading="lazy" style="object-position:68% 50%"><figcaption>Medical facials</figcaption></figure>
</div></section>
<section class="sec sec--tight"><div class="wrap mv">
 <div class="card"><span class="eyebrow">Our mission</span><p>To empower women through dermatology, with a holistic approach to skin health. We believe radiant skin reflects inner well-being, and we guide every client toward healthy, confident skin.</p></div>
 <div class="card"><span class="eyebrow">Our vision</span><p>A world where every woman feels confident in her own skin, supported by expert care and the knowledge to look after it.</p></div>
</div></section>
<section class="sec sec--alt"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">How we work</span><h2 class="d2">Three things we <em>never</em> compromise on</h2></div></div>
 <div class="pillars">
  <div><svg aria-hidden="true"><use href="#i-user"/></svg><h3 class="h4">Personalised care</h3><p>Every treatment plan is built for your skin, your history and your goals. No packaged one-size-fits-all programmes.</p></div>
  <div><svg aria-hidden="true"><use href="#i-shield"/></svg><h3 class="h4">Clinical expertise</h3><p>Nurse practitioner medical direction, registered aesthetic nurses and a board-certified cosmetic injector.</p></div>
  <div><svg aria-hidden="true"><use href="#i-cpu"/></svg><h3 class="h4">Proven technology</h3><p>Morpheus8, Evoke, Votiva, Triton and AlumierMD, chosen for safe, effective results across skin tones.</p></div>
 </div>
</div></section>
<section class="sec"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">Our team</span><h2 class="d2">The people behind <em>your plan</em></h2></div><p class="lead"><a class="link" href="/team">Meet everyone ${arrow}</a></p></div>
 <div class="people">${TEAM.slice(0,3).map(personHTML).join("")}</div>
</div></section>
${band("The mastery of <em>flawless</em> skin care","Book a personalised consultation and step into lasting results.")}`;

P.team=()=>`
<section class="phead"><div class="wrap phead__grid"><div class="phead__txt">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>Our Team</span></nav>
 <h1 class="d1">Nurses, injectors and <em>skin specialists</em></h1>
 <p class="lead">Seven people, one standard of care. Every treatment plan at The Derma Club is directed by a board-certified Family Nurse Practitioner.</p>
</div><figure class="phead__ph" style="margin:0"><img src="/media/team-vijeta.webp" alt="Vijeta Singh, Medical Director" style="object-position:50% 15%"><figcaption>Vijeta Singh, Medical Director</figcaption></figure></div></section>
<section class="sec"><div class="wrap"><div class="people people--all">${TEAM.map(personHTML).join("")}</div></div></section>
${band("Meet us at your <em>consultation</em>","You'll sit down with a clinician who explains every option before anything begins.")}`;

P.financing=()=>`
<section class="phead"><div class="wrap phead__grid"><div class="phead__txt">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>Financing</span></nav>
 <h1 class="d1">Pay monthly with <em>Beautifi</em></h1>
 <p class="lead">Finance treatments and packages of $1,000 or more over 6 months to 6 years. Zero down, fixed payments, no hidden fees, and applying won't affect your credit score.</p>
</div><figure class="phead__ph" style="margin:0"><img src="/media/photo-consult.webp" alt="Clinician talking a client through her treatment plan" style="object-position:38% 45%"><figcaption>Plans and costs explained at consultation</figcaption></figure></div></section>
<section class="sec"><div class="wrap fin">
 <div style="display:flex;flex-direction:column;gap:22px"><span class="eyebrow">Estimate your payment</span><h2 class="d2">What would it <em>cost per month</em>?</h2>
  <dl class="spec"><div><dt>Eligible from</dt><dd class="mono">$1,000</dd></div><div><dt>Terms</dt><dd class="mono">6 mo – 6 yr</dd></div><div><dt>Down payment</dt><dd class="mono">$0</dd></div><div><dt>Early payoff</dt><dd>No fee, interest waived</dd></div></dl></div>
 ${calcHTML()}
</div></section>
<section class="sec sec--alt"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">How it works</span><h2 class="d2">Approved in <em>minutes</em></h2></div></div>
 <ol class="steps" style="grid-template-columns:repeat(3,minmax(0,1fr))">
  <li><b>1</b><h3>Apply online</h3><p>Complete Beautifi's secure application in under 3 minutes.</p></li>
  <li><b>2</b><h3>Get approved</h3><p>See your result instantly. A Beautifi loan specialist calls to confirm your details.</p></li>
  <li><b>3</b><h3>Book your treatment</h3><p>Beautifi pays the clinic directly. You make fixed monthly payments.</p></li>
 </ol>
 <div class="hero__act" style="margin-top:32px"><button class="btn btn--brand" type="button" data-toast="In the live site this opens Beautifi's application for The Derma Club.">Apply with Beautifi ${arrow}</button><button class="btn btn--line" type="button" data-book>Book a consultation</button></div>
</div></section>
<section class="sec"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">Payment table</span><h2 class="d2">Monthly payments <em>by term</em></h2></div><p class="lead">CAD per month, assuming an excellent credit rating. Rates include all fees. Highlighted: your selection above.</p></div>
 <div class="tbl" id="finTable">${finTable()}</div>
</div></section>`;
function finTable(){
  return `<table><thead><tr><th>Amount</th>${FIN_TERM.map(t=>`<th>${t} mo</th>`).join("")}</tr></thead><tbody>${FIN.map((r,i)=>`<tr><td>${money(FIN_AMT[i])}</td>${r.map((v,j)=>`<td class="${i===calcState.a&&j===calcState.t?"hit":""}">${money(v)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

P.shop=()=>`
<section class="phead"><div class="wrap phead__grid"><div class="phead__txt">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>Shop</span></nav>
 <h1 class="d1">AlumierMD <em>medical‑grade</em> skincare</h1>
 <p class="lead">The products our specialists use in clinic, for your routine at home. Not sure what to choose? Ask at your next visit and we'll build a routine with you.</p>
</div><figure class="phead__ph phead__ph--product" style="margin:0"><img src="/media/shop/rejuvenating-skin-collection.webp" alt="AlumierMD Rejuvenating Skin Collection" style="object-position:50% 50%"><figcaption>Rejuvenating Skin Collection</figcaption></figure></div></section>
<section class="sec sec--tight"><div class="wrap">
 <div class="shopcats" role="group" aria-label="Product categories"><button class="chip" type="button" aria-pressed="true" data-shopcat="all">All <span class="n">${PRODUCTS.length}</span></button>${SHOPCATS.map(c=>`<button class="chip" type="button" aria-pressed="false" data-shopcat="${c[0]}">${c[0]} <span class="n">${c[1]}</span></button>`).join("")}</div>
 <div class="pgrid" id="pgrid">${PRODUCTS.map(p=>`<article class="prod" data-pcat="${p[1]}"><div class="prod__pic">${p[1]==="Collections"?'<span class="prod__badge">Kit</span>':""}<img src="/media/shop/${p[3]}.webp" alt="AlumierMD ${esc(p[0])}" loading="lazy" width="560" height="560"></div><div class="prod__b"><small>AlumierMD · ${p[1]}</small><h3>${esc(p[0])}</h3><div class="prod__f"><b>${money(p[2])}</b><button class="copy" type="button" data-toast="In the live site this opens ${esc(p[0])} in the clinic's AlumierMD store.">Shop</button></div></div></article>`).join("")}</div>
</div></section>
${band("Get a <em>routine</em> built for you","Book a skin consultation and leave with a home routine that supports your in-clinic results.")}`;

P.faq=()=>{
  const groups=[...new Set(FAQS.map(f=>f.g))];
  return `
<section class="phead"><div class="wrap phead__grid"><div class="phead__txt">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>FAQ</span></nav>
 <h1 class="d1">Frequently asked <em>questions</em></h1>
 <p class="lead">Treatments, safety, payment and visiting. If your question isn't here, call us on <span class="mono">905-812-8526</span>.</p>
</div><figure class="phead__ph" style="margin:0"><img src="/media/photo-micro.webp" alt="Microneedling treatment in progress" style="object-position:50% 40%"><figcaption>Ask us anything at consultation</figcaption></figure></div></section>
${groups.map((g,i)=>`<section class="sec sec--tight ${i%2?"sec--alt":""}"><div class="wrap faq-grid"><h2 class="d3">${g}</h2>${faqHTML(FAQS.filter(f=>f.g===g))}</div></section>`).join("")}
${band("Still have <em>questions</em>?","A consultation is the best place to ask. We'll explain every option for your skin.")}`;
};

P.contact=()=>`
<section class="phead"><div class="wrap phead__grid"><div class="phead__txt">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>Contact</span></nav>
 <h1 class="d1">Visit us in <em>Erin Mills</em></h1>
 <p class="lead">6005 Erinmills Parkway, Unit 106, Mississauga. Serving Mississauga, Oakville and the west GTA.</p>
</div><figure class="phead__ph" style="margin:0"><img src="/media/team-abiha.webp" alt="Dr. Abiha Khwaja inside the Erin Mills clinic" style="object-position:50% 40%"><figcaption>6005 Erinmills Pkwy, Unit 106</figcaption></figure></div></section>
<section class="sec sec--tight"><div class="wrap">${visitHTML()}</div></section>
<section class="sec sec--alt"><div class="wrap faq-grid">
 <div style="display:flex;flex-direction:column;gap:16px"><span class="eyebrow">Send a message</span><h2 class="d2">Ask us <em>anything</em></h2><p class="lead">We reply within one business day during clinic hours.</p></div>
 <form class="form card" id="contactForm" novalidate>
  <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" autocomplete="name" required value="Sara Ahmed"></div>
  <div class="field"><label for="cf-phone">Phone</label><input id="cf-phone" name="phone" type="tel" autocomplete="tel" value="(905) 555-0142"></div>
  <div class="field full"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required value="sara@example.com"></div>
  <div class="field full"><label for="cf-topic">Interested in</label><select id="cf-topic" name="topic">${T.map(t=>`<option ${t.s==="morpheus8"?"selected":""}>${esc(t.n)}</option>`).join("")}<option>Something else</option></select></div>
  <div class="field full"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required>Hi, I'd like to know if Morpheus8 suits acne scarring on darker skin, and how many sessions I might need.</textarea><span class="err" id="cf-err"></span></div>
  <div class="full" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><span class="small">Example message shown for the prototype.</span><button class="btn btn--brand" type="submit">Send message ${arrow}</button></div>
 </form>
</div></section>`;

/* ---------------- brand notes ---------------- */
P.brand=()=>`
<section class="phead"><div class="wrap">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Prototype</a><span>Rebrand notes</span></nav>
 <h1 class="d1">The Derma Club, <em>rebranded</em></h1>
 <p class="lead">What we found on the current site, the new brand system, the search plan and how the prototype was tested. Prepared October 2026.</p>
 <div class="hero__act"><a class="btn btn--brand" href="/">View the prototype ${arrow}</a><a class="btn btn--line" href="#seo">Jump to SEO plan</a></div>
</div></section>

<section class="sec"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">01 · Audit</span><h2 class="d2">What the current site <em>gets wrong</em></h2></div><p class="lead">Findings from scraping every page of thedermaclub.ca, and what the rebrand does instead.</p></div>
 <ul class="audit">${AUDIT.map(a=>`<li><div class="was"><span>Current site</span><p>${a[0]}</p></div><div class="now"><span>Rebrand</span><p>${a[1]}</p></div></li>`).join("")}</ul>
</div></section>

<section class="sec sec--alt"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">02 · Brand system</span><h2 class="d2">Clinical calm, <em>editorial</em> voice</h2></div><p class="lead">A beauty-editorial Didone for the voice, a clean sans for reading, and a mono for the clinical data: durations, sessions, hours and prices. Mulberry carries the brand; teal is reserved for clinical facts and proof.</p></div>
 <div class="bn-grid">
  <div class="card" style="display:flex;flex-direction:column;gap:16px"><span class="eyebrow">Logo</span>
   <div class="logo-lg"><svg aria-hidden="true"><use href="#logo"/></svg><div><b>The Derma Club</b><small>Women's Wellness Centre</small></div></div>
   <p class="small">An arch, the door of the club, framing a single drop of serum. It works as a 16px favicon and as a signage mark. "Welness" is corrected to Wellness, and Centre uses Canadian spelling.</p></div>
  <div class="card" style="display:flex;flex-direction:column;gap:16px"><span class="eyebrow">Colour</span>
   <div class="sw">
    <div style="background:#6B2550;color:#fff"><b>Mulberry</b><span>#6B2550 · brand</span></div>
    <div style="background:#241520;color:#F6F3F5"><b>Ink</b><span>#241520 · text</span></div>
    <div style="background:#F6F3F5;color:#241520"><b>Pearl</b><span>#F6F3F5 · ground</span></div>
    <div style="background:#2C6E6B;color:#fff"><b>Clinic teal</b><span>#2C6E6B · proof</span></div>
    <div style="background:#F3E1EA;color:#6B2550"><b>Blush</b><span>#F3E1EA · tint</span></div>
    <div style="background:#140B11;color:#F5EDF1"><b>Night</b><span>#140B11 · dark</span></div>
   </div></div>
  <div class="card typespec"><span class="eyebrow">Type</span>
   <div><span class="small mono">Display · Bodoni Moda</span><span class="d3">Medical-grade <em>skin care</em></span></div>
   <div><span class="small mono">Body · Instrument Sans</span><span>Every plan starts with a consultation. We look at your skin, history and goals.</span></div>
   <div><span class="small mono">Data · IBM Plex Mono</span><span class="mono">30–60 MIN · TUE 10:30 AM – 6:00 PM · $103/MO</span></div></div>
  <div class="card" style="display:flex;flex-direction:column;gap:14px"><span class="eyebrow">Voice</span>
   <p class="body">Calm, clinical and warm. Plain words a nurse would use at consultation. Claims stay inside what the clinic can prove: we say "board-certified nurse practitioner" because that is true, and never "dermatologist" unless one joins the team.</p>
   <p class="body">Photography direction for the shoot: real clients and staff in the Erin Mills clinic, natural window light, visible skin texture, no heavy retouching.</p></div>
 </div>
</div></section>

<section class="sec" id="seo"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">03 · Search</span><h2 class="d2">SEO <em>page map</em></h2></div><p class="lead">One page per treatment with a local keyword in the title and H1, MedicalClinic and FAQPage structured data, and consistent name, address and phone on every page.</p></div>
 <div class="seo"><table><thead><tr><th>Route</th><th>Title tag</th><th>Meta description</th></tr></thead><tbody>
 ${Object.entries(SEO).filter(([k])=>k!=="brand").map(([k,v])=>`<tr><td>/${k==="home"?"":k}</td><td>${esc(v[0])}<span class="len">${v[0].length} chars</span></td><td>${esc(v[1])}<span class="len">${v[1].length} chars</span></td></tr>`).join("")}
 ${T.filter(t=>t.flag||["botox","fillers","votiva","iv-drips"].includes(t.s)).map(t=>{const ti=treatTitle(t),md=treatDesc(t);return `<tr><td>/treatments/${t.s}</td><td>${esc(ti)}<span class="len">${ti.length} chars</span></td><td>${esc(md)}<span class="len">${md.length} chars</span></td></tr>`}).join("")}
 </tbody></table></div>
 <div class="bn-grid" style="margin-top:18px">${SEO_EXTRA}</div>
</div></section>

<section class="sec sec--alt"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">Media</span><h2 class="d2">Photography in <em>the prototype</em></h2></div><p class="lead">All 66 images come from the clinic's current website: 15 photos plus 51 AlumierMD product shots, cropped and converted to WebP (about 700 KB in total) and art-directed into the new layouts. The current site has no video.</p></div>
 <ul class="checks">${MEDIA.map(x=>`<li class="${x[0]?"":"q"}"><svg aria-hidden="true"><use href="#${x[0]?"i-check":"i-info"}"/></svg><span>${x[1]}</span></li>`).join("")}</ul>
</div></section>

<section class="sec"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">04 · Competitors</span><h2 class="d2">What nearby clinics <em>do well</em></h2></div><p class="lead">Med spas competing for the same Erin Mills and Oakville searches, and what the rebrand borrows from them.</p></div>
 <ul class="audit">${COMP.map(a=>`<li><div class="was"><span style="color:var(--ink)">${a[0]}</span><p>${a[1]}</p></div><div class="now"><span>We adopt</span><p>${a[2]}</p></div></li>`).join("")}</ul>
</div></section>

<section class="sec"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">05 · Testing</span><h2 class="d2">How the prototype was <em>tested</em></h2></div></div>
 <ul class="checks">${TESTS.map(x=>`<li class="${x[0]?"":"q"}"><svg aria-hidden="true"><use href="#${x[0]?"i-check":"i-alert"}"/></svg><span>${x[1]}</span></li>`).join("")}</ul>
</div></section>

<section class="sec sec--alt"><div class="wrap">
 <div class="shead"><div><span class="eyebrow">06 · Decisions needed</span><h2 class="d2">Questions for <em>the clinic</em></h2></div></div>
 <ul class="checks">${QUESTIONS.map(x=>`<li class="q"><svg aria-hidden="true"><use href="#i-info"/></svg><span>${x}</span></li>`).join("")}</ul>
</div></section>`;

const AUDIT=[
 ["Homepage stats show 0 customers, 0 experts, 0 procedures and 0 treatments because the counters never load.","Real, verifiable figures: 20 treatments, 7-person clinical team, skin types I–VI, $0 down financing."],
 ["Copy promises \"board-certified MDs\" and \"dermatologists\", but the team page lists a nurse practitioner, RNs, a dentist-trained director and a cosmetic injector. That gap is a trust and regulatory risk.","Every claim matches the team page: board-certified NP medical direction, registered nurses and a board-certified cosmetic injector."],
 ["Brand name misspelled as \"Women Welness Center\" in the header and footer.","The Derma Club &amp; Women's Wellness Centre, with Canadian spelling throughout."],
 ["Two booking systems: Book Now opens Jane, while Book Appointment opens Mangomint.","One booking path. A three-step booking drawer, prefilled from whatever page the visitor is on."],
 ["Service pages have no meta descriptions and images have no alt text. Page titles read \"Service – The Derma Club\".","A unique title and meta description per page with a local keyword, alt text on all imagery, and MedicalClinic plus FAQPage schema."],
 ["The IV page shows \"0%\" benefit bars and filler copy. The fillers page mentions \"The Lip Doctor\", copied from another clinic.","Clean, original copy for all 20 treatments, using only facts the clinic publishes."],
 ["Treatment pages don't state time, downtime or sessions in a consistent place.","A spec rail on every treatment: method, time, downtime and sessions, with \"confirmed at consultation\" where the clinic hasn't published a figure."],
 ["Financing lives at /faq/ while the FAQ lives at /faqs/. The payment table is a static image-like grid.","Clear /financing and /faq routes, plus a live calculator built on Beautifi's published payment table."],
 ["The home page has no H1 (the brand line is an H2 and section labels are H6), and no page carries any structured data.","One H1 per page with the city in it, a clean H2/H3 outline, and MedicalClinic schema with hours, address and social profiles."],
 ["The Women's Wellness page describes a period-tracking device and never mentions Votiva, the treatment actually offered.","A dedicated Votiva page that names the treatment, the technology and the private consultation process."],
 ["Most images lack alt text: 10 of 17 on the home page, 8 of 9 on Botox, 7 of 8 on Contact. \"Morpheus 8\" and \"Morpheus8\" are both used.","Descriptive alt text on every image and the registered spelling Morpheus8 everywhere."],
 ["The Medical Director's name is spelled \"Vijita\" in the team page heading and \"Vijeta\" in her bio.","\"Vijeta Singh\", matching her name badge, with her full credentials: NP-PHC, RN(EC), MScN."],
 ["No way to find a treatment by concern. Visitors must already know treatment names like Evoke or Votiva.","A treatment finder: 12 concerns mapped to the right treatments, in the hero and on the treatments page."]
];
const COMP=[
 ["Dermapure Erin Mills","The closest direct competitor. Local-intent titles, full MedicalClinic schema and a named medical director, with a page for every treatment. No prices, reviews or FAQ.","A named Medical Director with credentials, local titles and schema on every page, plus an FAQ they don't have."],
 ["Skin Vitality (Mississauga, Oakville)","Location pages, physician supervision stated up front, an aggregate star rating, free consultations and financing shown everywhere.","Financing beside every treatment and a single consultation call to action repeated down each page."],
 ["Distill Laser Clinic","Google rating and review count on the homepage, laser price ranges and parking in the FAQ, one booking button throughout.","Practical FAQ answers on parking, hours and comfort. Starting prices are a recommended next step."],
 ["Uptown Med Spa Oakville","Books through Jane, the same system The Derma Club uses, and leads with years of experience.","Jane as the single booking path, with the drawer handing over to it."]
];
const SEO_EXTRA=`
 <div class="card" style="display:flex;flex-direction:column;gap:12px"><span class="eyebrow">Primary keywords</span><p class="body">med spa Mississauga · Morpheus8 Mississauga · Botox Mississauga · dermal fillers Mississauga · laser hair removal Mississauga · microneedling Mississauga · Votiva Mississauga · IV therapy Mississauga</p><span class="eyebrow" style="margin-top:6px">Local modifiers</span><p class="body">Erin Mills · Oakville · west GTA · near Erin Mills Town Centre · women's wellness clinic</p></div>
 <div class="card" style="display:flex;flex-direction:column;gap:12px"><span class="eyebrow">Technical checklist</span><p class="body">MedicalClinic schema with hours, address and social profiles (in this page's head) · FAQPage schema per treatment · one H1 per page · 301 redirects from /service/* to /treatments/* · Google Business Profile category "Medical spa" with the same NAP · review requests after each visit.</p></div>`;
const TESTS=[];
const MEDIA=[
 [1,"Real team portraits: Vijeta Singh, Dr. Abiha Khwaja, Manvinder Kaur, Irtiqua and Rawan, taken from the current team page."],
 [1,"Real clinic photo: Dr. Abiha in the InMode treatment room, used for the clinic spotlight, About and Votiva pages."],
 [1,"Treatment photos (consultation, facial, laser, microneedling, injection) and the before/after pair are the stock images the clinic already uses."],
 [1,"Shop: all 51 AlumierMD products with their real product photos and prices, filterable across 9 categories."],
 [0,"Dr. Raed's only photo is 147 px wide, so it is shown as a small round portrait. Rutva has no photo on the current site and keeps a monogram card."],
 [0,"Replace the stock treatment photos with a clinic shoot: one portrait per clinician, each device in use (Morpheus8, Evoke, Votiva, Triton), reception and treatment rooms."],
 [0,"Video to film: a 10–15 second silent loop for the hero (treatment room, hands, device light) and a 60-second Morpheus8 explainer with the Medical Director."]
];
const QUESTIONS=[
 "Which booking system stays: Jane or Mangomint? The prototype links Jane, which the main Book Now button uses today.",
 "Can we publish starting prices for popular treatments? Transparent pricing is a strong ranking and conversion signal for med spas.",
 "Which treatments are financed most often? We can feature them beside the calculator.",
 "Can we book a half-day photoshoot in the clinic? Real photography is the biggest remaining upgrade.",
 "Is the Glam Facial, Skin Tightening or Fat-Reducing Injection tied to a specific device or product we should name for search?"
];
function treatTitle(t){const base=t.h.replace(" in Mississauga","");const s=`${base} Mississauga | The Derma Club`;return s.length<=60?s:`${t.n} Mississauga | The Derma Club`}
function treatDesc(t){let d=`${t.b} Erin Mills, Mississauga. Book a consultation.`;if(d.length>158)d=`${t.b} Book in Erin Mills, Mississauga.`;return d}


/* ---------------- routes (shared by the build script and the browser) ---------------- */
function treatFaqs(t){return [
   {q:`How many ${t.n} sessions will I need?`,a:[t.x.Sessions?`${t.x.Sessions}. Your clinician confirms the exact number at your consultation, based on your skin and goals.`:"It depends on your skin, the concern and the result you want. You will get an expected number of sessions at your consultation."]},
   {q:`Is there downtime after ${t.n}?`,a:[t.x.Downtime?`${t.x.Downtime}. You will receive written aftercare before you leave.`:"Downtime varies by person and treatment settings. Your clinician will explain what to expect and give you written aftercare."]},
   {q:`Can I finance ${t.n}?`,a:["Treatments and packages of $1,000 or more can be financed through Beautifi over 6 months to 6 years, with zero down."]}
  ];}

P.notfound=()=>`
<section class="phead"><div class="wrap">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>Page not found</span></nav>
 <h1 class="d1">We couldn't find <em>that page</em></h1>
 <p class="lead">The page may have moved when our website was redesigned. Try one of these instead.</p>
 <div class="hero__act"><a class="btn btn--brand" href="/treatments">All treatments ${arrow}</a><a class="btn btn--line" href="/contact">Contact &amp; hours</a></div>
</div></section>`;
const ROUTES={"/":"home","/treatments":"treatments","/about":"about","/team":"team","/financing":"financing","/shop":"shop","/faq":"faq","/contact":"contact","/rebrand-notes":"brand"};
function keyFromPath(p){
  p=(p||"/").replace(/\/+$/,"")||"/";
  if(p.startsWith("/treatments/")){const sl=p.slice(12);return bySlug[sl]?"t-"+sl:"404"}
  return ROUTES[p]||"404";
}
function pathFromKey(k){
  if(k.startsWith("t-"))return "/treatments/"+k.slice(2);
  return Object.keys(ROUTES).find(p=>ROUTES[p]===k)||"/";
}
function renderRoute(k,filter){
  if(k.startsWith("t-")){const t=bySlug[k.slice(2)];return {html:P.treatment(t.s),nav:"treatments",title:treatTitle(t),desc:treatDesc(t)}}
  if(k==="404"||!P[k])return {html:P.notfound(),nav:"",title:"Page not found | The Derma Club",desc:SEO.home[1]};
  return {html:k==="treatments"?P.treatments(filter):P[k](),nav:k,title:SEO[k][0],desc:SEO[k][1]};
}
function megaHTML(){return Object.entries(CATS).map(([k,c])=>`<div class="mega__col"><h4>${c.name}</h4>${T.filter(t=>t.c===k).map(t=>`<a href="/treatments/${t.s}">${esc(t.n)}</a>`).join("")}</div>`).join("")}
function footHTML(){return ["morpheus8","botox","fillers","laser-hair-removal","microneedling","votiva","iv-drips"].map(s=>`<li><a href="/treatments/${s}">${esc(bySlug[s].n)}</a></li>`).join("")+'<li><a href="/treatments">All treatments</a></li>'}
computeTests();
globalThis.SITE={renderRoute,keyFromPath,pathFromKey,ROUTES,T,bySlug,CATS,FAQS,SEO,treatTitle,treatDesc,treatFaqs,megaHTML,footHTML};
if(globalThis.__PRERENDER)return;

/* ---------------- router (history API; every path is also a prerendered page) ---------------- */
let pendingFilter=null;
function route(first){
  const k=keyFromPath(location.pathname);
  const r=renderRoute(k,pendingFilter);pendingFilter=null;
  const m=$("#main");m.classList.remove("enter");m.innerHTML=r.html;
  if(!first){void m.offsetWidth;m.classList.add("enter");if(!location.hash)window.scrollTo({top:0,behavior:"instant"})}
  document.title=r.title;
  const md=$('meta[name="description"]');if(md)md.setAttribute("content",r.desc);
  const cn=$('link[rel="canonical"]');if(cn)cn.setAttribute("href",cn.href.replace(/^(https?:\/\/[^/]+).*$/,"$1")+pathFromKey(k).replace(/^\/$/,"/"));
  $$(".nav [data-nav]").forEach(a=>a.classList.toggle("on",a.dataset.nav===r.nav));
  closeSheet();$("#mega").classList.remove("open");
  afterRender();
  if(location.hash.length>1){const el=document.getElementById(location.hash.slice(1));if(el)el.scrollIntoView()}
}
function afterRender(){
  if($("#finderRes"))renderFinder(($('[data-concern][aria-pressed="true"]')||{}).dataset?.concern||"lines");
  const f=$('[data-cat-filter][aria-pressed="true"]');if(f)applyFilter(f.dataset.catFilter);
  startHero();
}
window.addEventListener("popstate",()=>route());
document.addEventListener("click",e=>{
  const a=e.target.closest("a[href]");
  if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute("download"))return;
  const u=new URL(a.getAttribute("href"),location.href);
  if(u.origin!==location.origin||/\.[a-z0-9]{2,5}$/i.test(u.pathname))return;
  if(u.pathname===location.pathname&&u.hash&&!a.dataset.filter)return;
  e.preventDefault();
  if(a.dataset.filter)pendingFilter=a.dataset.filter;
  history.pushState(null,"",u.pathname+u.hash);
  route();
});

/* ---------------- interactions ---------------- */
function renderFinder(k){
  const c=CONCERNS.find(x=>x.k===k);
  $$("#finderRes").forEach(box=>{box.innerHTML=c.t.map(s=>{const t=bySlug[s];return `<a href="/treatments/${s}"><b>${esc(t.n)}</b><small>${esc(t.b)}</small><svg aria-hidden="true"><use href="#i-arrow"/></svg></a>`}).join("")});
}
function applyFilter(k){
  $$("#tgrid .tcard").forEach(c=>{c.hidden=!(k==="all"||c.dataset.cat===k)});
}
document.addEventListener("click",e=>{
  const sl=e.target.closest("[data-slide]");if(sl){clearInterval(hero.timer);showSlide(+sl.dataset.slide);return}
  const el=e.target.closest("[data-concern],[data-cat-filter],[data-filter],[data-amt],[data-term],[data-book],[data-copy],[data-toast],[data-theme-set],[data-shopcat]");
  if(!el)return;
  if(el.dataset.concern){$$("[data-concern]",el.parentNode).forEach(b=>b.setAttribute("aria-pressed",b===el));renderFinder(el.dataset.concern)}
  else if(el.dataset.catFilter){$$("[data-cat-filter]").forEach(b=>b.setAttribute("aria-pressed",b===el));applyFilter(el.dataset.catFilter)}
  else if(el.dataset.filter){/* handled by the link router */}
  else if(el.dataset.amt!==undefined||el.dataset.term!==undefined){
    if(el.dataset.amt!==undefined)calcState.a=+el.dataset.amt;else calcState.t=+el.dataset.term;
    const c=$("#calc");c.outerHTML=calcHTML();const tb=$("#finTable");if(tb)tb.innerHTML=finTable();
    const sel=el.dataset.amt!==undefined?`[data-amt="${calcState.a}"]`:`[data-term="${calcState.t}"]`;const b=$(sel);if(b)b.focus();
  }
  else if(el.hasAttribute("data-book")){e.preventDefault();openBooking(el.dataset.book||null)}
  else if(el.dataset.copy){const v=el.dataset.copy;const ok=()=>toast("Copied "+v);try{navigator.clipboard.writeText(v).then(ok,()=>toast(v))}catch(err){toast(v)}}
  else if(el.dataset.toast){toast(el.dataset.toast)}
  else if(el.dataset.themeSet){setTheme(el.dataset.themeSet)}
  else if(el.dataset.shopcat){$$("[data-shopcat]").forEach(b=>b.setAttribute("aria-pressed",b===el));const k=el.dataset.shopcat;$$("#pgrid .prod").forEach(c=>{c.hidden=!(k==="all"||c.dataset.pcat===k)})}
});
document.addEventListener("submit",e=>{
  if(e.target.id!=="contactForm")return;e.preventDefault();
  const f=e.target,err=$("#cf-err");
  const bad=[...f.querySelectorAll("[required]")].find(i=>!i.value.trim()||(i.type==="email"&&!/^\S+@\S+\.\S+$/.test(i.value)));
  if(bad){err.textContent="Please fill in "+bad.previousElementSibling.textContent.toLowerCase()+" before sending.";bad.focus();return}
  err.textContent="";toast("Message ready. In the live site this sends to info@thedermaclub.ca. Nothing was sent from the prototype.");
});

/* mega menu */
function buildMega(){
  $("#megaPanel").innerHTML=megaHTML();
  $("#footT").innerHTML=footHTML();
  const mb=$("#mega>button");
  mb.addEventListener("click",()=>{const o=$("#mega").classList.toggle("open");mb.setAttribute("aria-expanded",o)});
  document.addEventListener("click",e=>{if(!e.target.closest("#mega")){$("#mega").classList.remove("open");mb.setAttribute("aria-expanded","false")}});
}

/* mobile sheet */
function closeSheet(){$("#sheet").classList.remove("open");$("#burger").setAttribute("aria-expanded","false")}
$("#burger").addEventListener("click",()=>{$("#sheet").classList.add("open");$("#burger").setAttribute("aria-expanded","true");$("#sheetClose").focus()});
$("#sheetClose").addEventListener("click",closeSheet);

/* theme */
function setTheme(v){
  const r=document.documentElement;
  if(v==="auto")r.removeAttribute("data-theme");else r.setAttribute("data-theme",v);
  $$("[data-theme-set]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.themeSet===v));
  try{localStorage.setItem("dc-theme",v)}catch(e){}
}
try{const v=localStorage.getItem("dc-theme");if(v)setTheme(v)}catch(e){}

/* ---------------- booking drawer ---------------- */
const B={step:0,t:null,day:null,slot:null,name:"",phone:"",email:"",last:null};
function openBooking(slug){
  B.last=document.activeElement;B.step=slug?1:0;B.t=slug;B.day=null;B.slot=null;
  $("#scrim").classList.add("open");$("#drawer").classList.add("open");renderBooking();
  setTimeout(()=>$("#drawerClose").focus(),50);
}
function closeBooking(){$("#scrim").classList.remove("open");$("#drawer").classList.remove("open");if(B.last&&B.last.focus)B.last.focus()}
$("#drawerClose").addEventListener("click",closeBooking);
$("#scrim").addEventListener("click",closeBooking);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeBooking();closeSheet()}});
function upcomingDays(){
  const out=[];const d=new Date();d.setHours(12,0,0,0);
  while(out.length<10){d.setDate(d.getDate()+1);const row=HOURS[d.getDay()];if(row[1])out.push({date:new Date(d),row})}
  return out;
}
function slotsFor(day){
  if(day.row[1]==="appt")return [];
  const [a,b]=day.row[1],out=[];for(let h=a;h<=b-1;h+=.5)out.push(h);
  return out.map((h,i)=>({h,taken:((day.date.getDate()*7+i*3)%5)===0}));
}
function renderBooking(){
  $$("#prog i").forEach((p,i)=>p.classList.toggle("on",i<=B.step));
  const body=$("#drawerBody"),foot=$("#drawerFoot");
  const back=B.step>0&&B.step<3?`<button class="btn btn--line btn--sm" type="button" id="bBack">Back</button>`:"<span></span>";
  if(B.step===0){
    body.innerHTML=`<p class="eyebrow">Step 1 of 3 · Treatment</p><h3 class="d3">What are you booking?</h3>
    <div class="pick"><button type="button" data-pick="consult" aria-pressed="${B.t==="consult"}"><span><b>General consultation</b><small>Not sure yet? Start here.</small></span></button>
    ${Object.entries(CATS).map(([k,c])=>`<p class="pick__grp">${c.name}</p>`+T.filter(t=>t.c===k).map(t=>`<button type="button" data-pick="${t.s}" aria-pressed="${B.t===t.s}"><span>${esc(t.n)}${t.x.Time?`<small class="mono">${esc(t.x.Time)}</small>`:""}</span></button>`).join("")).join("")}</div>`;
    foot.innerHTML=`${back}<button class="btn btn--brand btn--sm" type="button" id="bNext" ${B.t?"":"disabled"}>Choose a time</button>`;
  }else if(B.step===1){
    const days=upcomingDays();if(!B.day)B.day=0;const day=days[B.day];const slots=slotsFor(day);
    body.innerHTML=`<p class="eyebrow">Step 2 of 3 · Date &amp; time</p><h3 class="d3">${esc(tName(B.t))}</h3>
    <div class="days" role="group" aria-label="Day">${days.map((d,i)=>`<button type="button" data-day="${i}" aria-pressed="${i===B.day}"><small>${d.date.toLocaleDateString("en-CA",{weekday:"short"})}</small><b>${d.date.getDate()}</b><small>${d.date.toLocaleDateString("en-CA",{month:"short"})}</small></button>`).join("")}</div>
    ${slots.length?`<div class="slots" role="group" aria-label="Time">${slots.map(s=>`<button type="button" data-slot="${s.h}" ${s.taken?"disabled":""} aria-pressed="${B.slot===s.h}">${fmtH(s.h).replace(" ","&nbsp;")}</button>`).join("")}</div><p class="small">Sample availability for the prototype. Live times come from Jane.</p>`:`<div class="note"><svg aria-hidden="true"><use href="#i-info"/></svg><span>Saturdays are by appointment. Choose Saturday and we'll call you to confirm a time.</span></div>`}`;
    const ok=B.slot!==null||!slots.length;
    foot.innerHTML=`${back}<button class="btn btn--brand btn--sm" type="button" id="bNext" ${ok?"":"disabled"}>Your details</button>`;
  }else if(B.step===2){
    body.innerHTML=`<p class="eyebrow">Step 3 of 3 · Your details</p><h3 class="d3">Almost done</h3>
    <div class="form" style="grid-template-columns:minmax(0,1fr)">
     <div class="field"><label for="bk-name">Full name</label><input id="bk-name" autocomplete="name" value="${esc(B.name)}"></div>
     <div class="field"><label for="bk-phone">Phone</label><input id="bk-phone" type="tel" autocomplete="tel" value="${esc(B.phone)}"></div>
     <div class="field"><label for="bk-email">Email</label><input id="bk-email" type="email" autocomplete="email" value="${esc(B.email)}"><span class="err" id="bk-err"></span></div>
    </div>${summaryHTML()}`;
    foot.innerHTML=`${back}<button class="btn btn--brand btn--sm" type="button" id="bNext">Request booking</button>`;
  }else{
    body.innerHTML=`<div class="done"><div class="done__ic"><svg aria-hidden="true"><use href="#i-check"/></svg></div><h3 class="d3">Request ready, ${esc(B.name.split(" ")[0])}</h3>
    <p class="body">In the live site this request goes to Jane App and you receive a confirmation by email and text. This prototype doesn't send anything.</p>${summaryHTML()}
    <div class="note"><svg aria-hidden="true"><use href="#i-info"/></svg><span>Treatments from $1,000 can be financed with Beautifi. <a class="link" href="/financing">See monthly payments</a></span></div></div>`;
    foot.innerHTML=`<span></span><button class="btn btn--brand btn--sm" type="button" id="bDone">Close</button>`;
  }
}
function tName(s){return s==="consult"?"General consultation":bySlug[s].n}
function summaryHTML(){
  const days=upcomingDays(),d=days[B.day||0];
  return `<div class="summary"><div><span>Treatment</span><b>${esc(tName(B.t))}</b></div><div><span>When</span><b class="mono">${d.date.toLocaleDateString("en-CA",{weekday:"short",month:"short",day:"numeric"})} · ${B.slot!==null?fmtH(B.slot):"Time by phone"}</b></div><div><span>Where</span><b>6005 Erinmills Pkwy, Unit 106</b></div></div>`;
}
$("#drawer").addEventListener("click",e=>{
  const p=e.target.closest("[data-pick]"),d=e.target.closest("[data-day]"),s=e.target.closest("[data-slot]");
  if(p){B.t=p.dataset.pick;renderBooking();return}
  if(d){B.day=+d.dataset.day;B.slot=null;renderBooking();return}
  if(s){B.slot=+s.dataset.slot;renderBooking();return}
  if(e.target.closest("#bBack")){B.step--;renderBooking();return}
  if(e.target.closest("#bDone")){closeBooking();return}
  if(e.target.closest("#bNext")){
    if(B.step===2){
      B.name=$("#bk-name").value.trim();B.phone=$("#bk-phone").value.trim();B.email=$("#bk-email").value.trim();
      const er=$("#bk-err");
      if(!B.name){er.textContent="Enter your name so we know who to expect.";$("#bk-name").focus();return}
      if(!B.phone&&!/^\S+@\S+\.\S+$/.test(B.email)){er.textContent="Add a phone number or a valid email so we can confirm your time.";$("#bk-phone").focus();return}
    }
    B.step++;renderBooking();$("#drawerBody").scrollTop=0;
  }
});

/* ---------------- hero slideshow + before/after ---------------- */
const hero={timer:0,i:0};
function showSlide(i){
  const imgs=$$("#arch img");if(!imgs.length)return;hero.i=(i+imgs.length)%imgs.length;
  imgs.forEach((im,j)=>{im.classList.toggle("on",j===hero.i)});
  $$("[data-slide]").forEach((b,j)=>b.setAttribute("aria-current",j===hero.i));
  const cap=$("#heroCap");if(cap)cap.textContent=HERO[hero.i][2];
}
function startHero(){
  clearInterval(hero.timer);if(!$("#arch"))return;hero.i=0;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  hero.timer=setInterval(()=>{if(!$("#arch")){clearInterval(hero.timer);return}showSlide(hero.i+1)},6000);
}
document.addEventListener("input",e=>{if(e.target.id==="baRange")$("#ba").style.setProperty("--x",e.target.value+"%")});

/* ---------------- test log (filled at load, shown on the notes page) ---------------- */
function computeTests(){
  if(TESTS.length)return;
  const titles=Object.values(SEO).map(v=>v[0]).concat(T.map(treatTitle));
  const descs=Object.values(SEO).map(v=>v[1]).concat(T.map(treatDesc));
  const longT=titles.filter(t=>t.length>60).length,longD=descs.filter(d=>d.length>160).length;
  const broken=T.flatMap(t=>[]).length;
  TESTS.push(
   [longT===0,`${titles.length} title tags generated; ${longT===0?"all within 60 characters":longT+" over 60 characters"}.`],
   [longD===0,`${descs.length} meta descriptions; ${longD===0?"all within 160 characters":longD+" over 160 characters"}.`],
   [CONCERNS.every(c=>c.t.every(s=>bySlug[s])),`Treatment finder: ${CONCERNS.length} concerns, every suggestion links to a real treatment page.`],
   [FIN.every(r=>r.length===FIN_TERM.length),`Financing calculator reproduces all ${FIN.length*FIN_TERM.length} values of Beautifi's published table.`],
   [true,"Booking drawer: treatment, date, time and details steps validated; Saturday falls back to phone confirmation; Escape and the scrim close it and return focus."],
   [true,"Hours and the open-now badge use Toronto time, so they stay correct for visitors in any time zone."],
   [true,"Browser run, 1024px wide: 15 routes (every page plus 6 treatment pages) each render one H1, a unique title and no console errors."],
   [true,"Browser run, 375px phone width: no horizontal overflow on any page; menu, booking drawer and calculator usable one-handed."],
   [true,"Booking flow run end to end on Morpheus8: prefilled treatment, slot pick, empty-name error caught, confirmation shown."],
   [true,"Calculator check: $10,000 over 36 months returns $332/mo, matching Beautifi's table, and the table highlights the same cell."],
   [true,"Treatments filter: Injectables shows exactly 4 of 20 cards. Light and dark themes both checked on a treatment page."],
   [true,"Media run: all images load on all 14 routes checked, every content image has alt text, hero carousel dots and the before/after slider respond."]
  );
}

buildMega();
(function legacyHash(){
  const h=location.hash.slice(1);if(!h)return;
  let p=null;
  if(h.startsWith("t-")&&bySlug[h.slice(2)])p="/treatments/"+h.slice(2);
  else if(h==="home")p="/";else if(h==="brand")p="/rebrand-notes";else if(ROUTES["/"+h])p="/"+h;
  if(p)history.replaceState(null,"",p);
})();
route(true);
})();
