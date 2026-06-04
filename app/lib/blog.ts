export type BlogLocale = "en" | "sr";

export type BlogTagId =
  | "beginners"
  | "crew"
  | "tips"
  | "together"
  | "events"
  | "philosophy";

export const BLOG_TAGS: Record<
  BlogTagId,
  { label: Record<BlogLocale, string> }
> = {
  beginners: { label: { en: "First run", sr: "Prvi trening" } },
  crew: { label: { en: "Crew & races", sr: "Ekipa i trke" } },
  tips: { label: { en: "Tips", sr: "Saveti" } },
  together: { label: { en: "Together", sr: "Zajedno" } },
  events: { label: { en: "Events", sr: "Događaji" } },
  philosophy: { label: { en: "Philosophy", sr: "Filozofija" } },
};

export type BlogInlineImage = {
  src: string;
  /** Insert after this body block index (0-based) */
  afterIndex: number;
  alt: Record<BlogLocale, string>;
  /** Intrinsic size for `SiteImage` (defaults 1200×800) */
  width?: number;
  height?: number;
  /** Extra class on mid-article figure (blog post page only) */
  figureClass?: string;
};

export type BlogPost = {
  slug: string;
  date: string;
  tags: BlogTagId[];
  /** Hero image on post page */
  image?: string;
  /** Card thumbnail on blog list (defaults to `image`) */
  imageCover?: string;
  /** Show hero at natural height (portrait), not 16:10 crop */
  heroFullHeight?: boolean;
  /** Optional second image mid-article */
  imageMid?: BlogInlineImage;
  title: Record<BlogLocale, string>;
  excerpt: Record<BlogLocale, string>;
  /** Paragraphs for detail page; lines starting with `## ` render as h2 */
  body: Record<BlogLocale, string[]>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "prvi-put",
    date: "2026-03-01",
    tags: ["beginners"],
    image: "/media/blog-prvi-put-hero.webp",
    imageCover: "/media/blog-prvi-put-mid.webp",
    imageMid: {
      src: "/media/blog-prvi-put-mid.webp",
      afterIndex: 5,
      alt: {
        sr: "36Soma Runners — ekipa na stazi",
        en: "36Soma Runners — the crew on the track",
      },
    },
    title: {
      sr: "Prvi put sa 36Soma?",
      en: "First time with 36Soma?",
    },
    excerpt: {
      sr: "Utorak 20h, Gradska terasa, prostor kluba za stvari, dva programa — vodič korak po korak.",
      en: "Tuesday 8 pm, City Terrace, club room for your gear, two programmes — a step-by-step guide.",
    },
    body: {
      sr: [
        "Donositi odluku o ulasku u novu ekipu uvek pokreće gomilu pitanja u glavi. Gde da ostavim ključeve i telefon? Šta ako budem najsporiji? Kakva mi oprema treba? Da li moram da se prijavim negde?",
        "Želimo da tvoj prvi korak sa nama bude što opušteniji, pa smo odlučili da skinemo taj veo misterije. Nema nikakve klupske birokratije, članarina niti tajnih protokola. Evo tačnog, korak-po-korak vodiča kako izgleda tvoj prvi trening sa 36Soma.",
        "## Korak 1: Izaberi utorak",
        "Iako treniramo tri puta nedeljno, utorak u 20:00h je naš zvanični dan za prijem novih članova i probijanje leda. Utorkom je atmosfera svesno prilagođena ljudima koji dolaze prvi put. Sve što treba da uradiš jeste da nam pustiš kratku poruku na Instagramu, WhatsApp-u ili Stravi u stilu: „Ćao ekipo, ja bih došao/došla u utorak“, čisto da znamo da te čekamo. A i ako se samo pojaviš bez poruke – nikakav problem.",
        "## Korak 2: Gde se nalazimo i gde idu stvari?",
        "Naša baza je Gradska terasa u Kraljevu. Tamo se skupljamo petnaestak minuta pre osam uveče. Prepoznaćeš nas po trkačkoj opremi, prepoznatljivim klupskim majicama i glasnom smehu.",
        "Prvo pitanje novajlija je skoro uvek isto: gde sa jaknom i telefonom? Ne trčiš sa rancem niti sa ključevima koji zveckaju u džepu — na stazu ideš samo u onome što ti treba za trčanje. Imamo naš prostor kluba odmah pored Terase gde svi bezbedno ostavljamo stvari pre starta. Svaki utorak je ista rutina; ako dolaziš prvi put, samo reci ekipi i neko će te odvesti da ostaviš jaknu. Nakon rute uzmeš svoje stvari i odmah se priključuješ ekipi – jer pravo druženje tek tada počinje.",
        "## Korak 3: Izaberi svoj program",
        "Kada se zagrejemo (jer, kao što znaš, zagrevanje se ne preskače!), ekipa se deli u dva glavna programa:",
        "Program za početnike: Ako tek ulaziš u svet trčanja ili se vraćaš posle duge pauze, ovo je tvoja zona. Ovde kombinujemo lagani kas i šetnju (run-walk). Nema forsiranja — pejs prilagođavamo tebi. Uvek je tu neko od iskusnijih trkača da trči sa tobom i skrene ti misli sa umora — bez straha da ćeš ostati sam na stazi.",
        "Program za iskusnije: Ako već imaš neku klupsku kilometražu u nogama i želiš jači trening, ovde te čekaju dugačke deonice, intervali ili brži pejs na ruti kroz grad, u zavisnosti od toga šta je na planu za tu nedelju.",
        "## Korak 4: Finiš i treće poluvreme",
        "Kada satovi zapište kraj i odradimo obavezno istezanje, trening se zapravo ne završava. Tada počinje ono što najviše volimo – druženje. Sedamo na kafu, čaj ili hladno piće da saberemo utiske. Tu ćeš shvatiti da smo mi zapravo samo grupa pozitivnih ljudi iz Kraljeva koja je odlučila da spoji zdrav život i dobro zezanje.",
        "Sve što ti treba za prvi utorak su obične patike za trčanje, udobna trenerka ili šorc, i dobra volja. Izgovori ostaju kod kuće — ekipa te čeka u utorak na okupljanju. Vidimo se!",
      ],
      en: [
        "Joining a new crew always raises a pile of questions. Where do I leave keys and phone? What if I am the slowest? What gear do I need? Do I have to register somewhere?",
        "We want your first step with us to feel relaxed, so we are lifting the mystery veil. No club bureaucracy, membership fee, or secret protocols. Here is a step-by-step guide to your first 36Soma session.",
        "## Step 1: Pick Tuesday",
        "We train three times a week, but Tuesday at 8 pm is our official day for new members and breaking the ice. Tuesday is deliberately tuned for first-timers. Send a short message on Instagram, WhatsApp, or Strava — „Hi crew, I would like to come on Tuesday“ — so we know to expect you. Show up without messaging? Also fine.",
        "## Step 2: Where we meet and where stuff goes",
        "Our base is City Terrace in Kraljevo. We gather about fifteen minutes before eight in the evening. Spot us by running gear, club shirts, and loud laughter.",
        "Newcomers almost always ask the same thing: what about my jacket and phone? You do not run with a backpack or keys jingling in your pocket — on the route you wear only what you need to run. We have our club room right beside the Terrace where everyone leaves their things before the start. Same routine every Tuesday; if it is your first time, tell the crew and someone will walk you over to drop off your jacket. After the run you grab your stuff and join the group straight away — because the real hangout starts then.",
        "## Step 3: Choose your programme",
        "After the warm-up (yes, warm-up is not optional!), the crew splits into two main tracks:",
        "Beginners programme: If you are new to running or coming back after a long break, this is your zone. Easy jog and walk (run-walk). No forcing pace — we adapt to you and you will not be left alone at the back. An experienced runner always stays with you.",
        "Experienced programme: If you already have kilometres in your legs and want a harder session — longer segments, intervals, or a faster city loop depending on the week’s plan.",
        "## Step 4: Finish and the third half",
        "When watches beep done and we finish mandatory stretching, training is not really over. Then comes what we love most — hanging out. Coffee, tea, or something cold to debrief. You will see we are just positive people from Kraljevo who combined healthy life and good banter.",
        "For your first Tuesday you need regular running shoes, comfortable kit, and good will. Leave excuses at home — the crew waits at meet-up. See you Tuesday!",
      ],
    },
  },
  {
    slug: "isti-ritam",
    date: "2026-03-05",
    tags: ["philosophy"],
    image: "/media/blog-isti-ritam-hero.webp",
    imageMid: {
      src: "/media/blog-isti-ritam-mid.webp",
      afterIndex: 7,
      alt: {
        sr: "36Soma Runners — podrška i druženje posle treninga",
        en: "36Soma Runners — support and crew connection after the run",
      },
    },
    title: {
      sr: "Ista ruta, različit ritam: Manifest protiv trkačkog ega",
      en: "Same route, different pace: A manifest against running ego",
    },
    excerpt: {
      sr: "Dobri ljudi važniji od brzih splitova — pejs za priču, šetnja i osmesi posle treninga.",
      en: "Good people over fast splits — talk pace, walking, and smiles after the run.",
    },
    body: {
      sr: [
        "Ako pitaš prosečnu osobu koja ne trči kako zamišlja trkački klub, verovatno će ti opisati grupu strogo zategnutih tipova sa gledanjem na sat bez prestanka, koji broje svaku kaloriju i gledaju te koso ako zaostaneš makar jednu sekundu. Zbog te pogrešne slike, mnogi nikada i ne skupe hrabrost da dođu na svoj prvi trening. Plaše se osude, plaše se da će usporiti grupu i da jednostavno „nisu dovoljno dobri“.",
        "U 36Soma klupski ego je zakonom zabranjen. Naš manifest na stazi staje u jednu jednostavnu rečenicu: dobri ljudi su važniji od brzih splitova.",
        "## Razbijanje mita o brojkama",
        "Živimo u svetu gde nas aplikacije stalno teraju da se sa nekim poredimo. Ko je brži na Stravi, ko je pretrčao više kilometara ovog meseca, čiji je pejs pao ispod 5:00/km. To je zamka u kojoj trčanje prestaje da bude sloboda i postaje izvor stresa. Mi smo tu da to poništimo.",
        "Kada se utorkom ili četvrtkom okupimo — kod nas na Gradskoj terasi, pre starta — tu stoje ljudi koji maraton trče za tri sata, ali i oni koji su pre mesec dana jedva spajali dva kilometra bez stajanja. I znaš šta? Svi krećemo u isto vreme i svi idemo na istu rutu. Naša snaga nije u tome koliko brzo pojedinac može da pobegne napred, nego u tome koliko uspešno možemo da ostanemo zajedno.",
        "## Šta znači „Ista ruta, različit ritam“ u praksi?",
        "U praksi, to znači da na stazi nema elitizma. Naša ekipa se prirodno podeli u nekoliko grupa, zavisno od toga ko se kako oseća tog dana. Jedna grupa će povući jači ritam jer se sprema za polumaraton. Druga grupa drži zlatnu sredinu – takozvani „pejs za priču“ (oko 6:00 min/km), gde se razmenjuju lokalne klupske anegdote i planovi za vikend. Treća grupa kombinuje lagani kas i šetnju, uvodeći nove članove polako, bez pritiska.",
        "Ali ključ je u tome što niko ne trči sam. Čak i ako si najsporiji tog dana, pored tebe će uvek biti neko iskusniji da te isprati, pruži ti podršku kada ti ponestane vazduha i pomogne ti da stigneš do cilja. Mi ne merimo uspeh brzinom, već po broju osmeha i pruženih ruku kada se vratimo sa staze.",
        "## Trčanje prilagođeno tebi, a ne ti trčanju",
        "Ovaj klub je nastao iz baze, sa kraljevačkog asfalta, i kreiran je za stvarne ljude. Ljude koji imaju poslove, porodice, fakultete i gomilu svakodnevnih briga. Zato tvoj trening kod nas ne sme da bude još jedna obaveza na kojoj moraš nekom nešto da dokazuješ. Dođi da prodišeš. Dođi da izbaciš stres. Ako ti se danas trči brzo – trči. Ako ti se danas šeta i priča o kafi koja nas čeka posle – i to je sasvim u redu.",
        "Tvoj jedini protivnik na stazi je tvoj sopstveni ego koji ti šapuće da nisi dovoljno brz. Utišaj ga, obuj patike i dođi u ekipu. Tvoj ritam je naš ritam.",
      ],
      en: [
        "Ask someone who does not run how they picture a running club. You will probably hear about stern faces chasing the stopwatch, counting every calorie, judging you if you fall behind one second. Because of that image, many never gather the courage for a first session. They fear judgment, slowing the group, not being „good enough“.",
        "At 36Soma club ego is banned by law. Our manifest on the road fits one line: Good people matter more than fast splits.",
        "## Breaking the numbers myth",
        "Apps constantly push us to compare. Who is faster on Strava, who ran more kilometres this month, whose pace dropped below 5:00/km. Running stops being freedom and becomes stress. We exist to undo that.",
        "When we meet Tuesday or Thursday — at City Terrace before the start — there are marathon runners and people who a month ago could barely link two kilometres without stopping. And guess what? We start together and run the same route. Our strength is not how fast one person can escape ahead — it is how well we stay together.",
        "## What „same route, different pace“ means in practice",
        "On the road there is no elitism. The crew naturally splits into groups by how everyone feels that day. One group pushes harder for half-marathon prep. Another holds the golden middle — „talk pace“ around 6:00/km, swapping club stories and weekend plans. A third mixes easy jogging and walking, onboarding new members without pressure.",
        "The key: nobody runs alone. Even on your slowest day, someone experienced runs beside you, supports you when breath runs out, helps you reach the finish. We do not measure success by speed — we measure smiles and hands shaken when we return from the route.",
        "## Running fits you, not the other way around",
        "This club grew from the base — Kraljevo asphalt — for real people with jobs, families, lectures, and daily noise. Your session must not be another place to prove yourself. Come to breathe out. Come to drop stress. Run fast if today allows. Walk and talk about post-run coffee if that is today — that is fine too.",
        "Your only rival on the route is your own ego whispering you are not fast enough. Quiet it, lace up, come to the crew. Your pace is our pace.",
      ],
    },
  },
  {
    slug: "za-balsu",
    date: "2026-05-14",
    tags: ["together", "events"],
    image: "/media/blog-za-balsu-hero.webp",
    imageMid: {
      src: "/media/blog-za-balsu-mid.webp",
      afterIndex: 6,
      width: 1024,
      height: 680,
      figureClass: "blog-post__figure--za-balsu-mid",
      alt: {
        sr: "Humanitarni krug za Balšu — reka ljudi kroz Kraljevo",
        en: "Humanitarian loop for Balša — a river of people through Kraljevo",
      },
    },
    title: {
      sr: "Četvrtak za Balšu: Grad puna srca, 230.000 dinara",
      en: "A Thursday for Balša: A city full of heart, 230,000 RSD",
    },
    excerpt: {
      sr: "Humanitarni majski četvrtak — od okupljanja do kruga kroz grad, stotine ljudi i neverovatna solidarnost.",
      en: "A May charity Thursday — from meet-up to a loop through town, hundreds of people, incredible solidarity.",
    },
    body: {
      sr: [
        "Kada smo osnivali 36Soma Runners, pričali smo o pejsu, o Garmin satovima, o rutama kroz grad i o tome kako da pokrenemo ljude iz Kraljeva da se aktiviraju. Ali negde duboko u sebi, znali smo da ovaj kolektiv ne sme da bude samo grupa ljudi koja juri kilometre i medalje. Znali smo da trčanje mora da ima dublju svrhu. Taj smisao se u potpunosti pokazao jednog toplog majskog četvrtka, kada je ceo grad podržao našu humanitarnu akciju.",
        "Događaj „Četvrtak za Balšu“ podsetio nas je na to zašto smo zapravo tu i šta znači kada se zajednica drži zajedno.",
        "## Toliko nas je bilo da je okupljanje postalo pretesno",
        "Sve je počelo jednostavnim planom: organizovati humanitarni trening, pozvati ljude dobre volje, pretrčati ili prošetati naših standardnih 5 kilometara i prikupiti novac za lečenje našeg malog sugrađanina Balše. Nadali smo se da će odziv biti dobar, ali ono što se desilo te večeri prevazišlo je sva naša očekivanja.",
        "Već oko 18:45h, na našem uobičajenom mestu okupljanja na Gradskoj terasi, ljudi je bilo sve više. I to nisu bili samo trkači u skupoj opremi. Došli su roditelji sa decom u kolicima, bake i deke, ekipa iz kraja u običnim patikama, ljudi koji verovatno godinama nisu potrčali, ali su osetili potrebu da budu tu. Mesto starta izgledalo je veličanstveno – šarena, glasna i preplavljena čistom, pozitivnom energijom. Te večeri niko nije gledao u sat. Niko nije pitao koji je pejs. Jedino je bilo važno da budemo tu jedni za druge.",
        "## 5 kilometara čiste podrške",
        "Kada je označen start, reka ljudi je krenula kroz Kraljevo. Bio je to najlepši krug koji smo ikada istrčali. Nismo trčali za lične rekorde, trčali smo sa porukom da Balša nije sam u svojoj borbi. Oni brži su svesno usporili, oni koji su planirali samo da šetaju su dobili vetar u leđa da pruže korak, a razgovori i podrška su odjekivali ulicama grada.",
        "Prolaznici su zastajali, vozači su svirali u znak podrške – Kraljevo je te večeri disalo kao jedno. Ta atmosfera na stazi, gde vidiš stotine ljudi kako se kreću sa istim, plemenitim ciljem, podsetila nas je na onu rečenicu iz našeg manifesta: pristup bez ega, dobri ljudi iznad svega.",
        "## Brojka koja ponosno svedoči: 230.000 dinara",
        "Kada smo završili krug i ponovo se okupili na startu uz osveženje, usledio je trenutak istine. Otvorili smo humanitarnu kutiju i prebrojali donacije. Rezultat? Neverovatnih 230.000 dinara prikupljenih u samo jednoj večeri, od srca, od ljudi koji su došli da podrže akciju.",
        "Taj novac je odmah uplaćen za Balšino lečenje, ali ono što je ostalo te večeri — u ekipi i u gradu — neprocenjivo je. Dokazali smo da 36Soma nije samo trkački klub – mi smo porodica i pokret koji može da pokrene grad kada je to najpotrebnije. Hvala svakome ko je te večeri obuo patike, ostavio donaciju, prošetao sa nama ili samo podelio priču. Pokazali smo šta znači trčati srcem.",
      ],
      en: [
        "When we founded 36Soma Runners, we talked about pace, Garmin watches, routes through the city, and getting Kraljevo moving. Deep down we knew this crew could not be only kilometres and medals. Running had to mean more. That showed fully one warm May Thursday when the whole town backed our charity run.",
        "„A Thursday for Balša“ reminded us why we are here and what it means when a community holds together.",
        "## So many people the meet-up ran out of space",
        "It started with a simple plan: a charity session, invite kind people, run or walk our usual 5 kilometres, raise money for little Balša’s treatment. We hoped for a good turnout — what happened that evening exceeded everything.",
        "By around 7:45 pm our usual meet-up spot at City Terrace was filling fast. Not only runners in fancy kit. Parents with strollers, grandparents, neighbours in ordinary trainers, people who may not have run for years but needed to be there. The start zone looked magnificent — colourful, loud, flooded with clean positive energy. That evening nobody watched the clock. Nobody asked pace. Only being there for each other mattered.",
        "## Five kilometres of pure support",
        "At the start, a river of people moved through Kraljevo. The most beautiful loop we ever ran. Not for personal records — with the message that Balša is not alone. Faster runners consciously slowed; walkers got wind in their backs; support echoed in the streets.",
        "Passers-by stopped, drivers honked in solidarity — Kraljevo breathed as one that evening. Hundreds moving for the same noble goal brought back our manifesto: no ego, good people above all.",
        "## The number we are proud of: 230,000 RSD",
        "When we finished the loop and met again at the start with refreshments, the moment of truth came. We opened the donation box and counted. The result? An incredible 230,000 RSD in one evening, from the heart, from people who came to support the cause.",
        "The money went straight to Balša’s treatment, but what remained that evening — in the crew and across the city — is priceless. We proved 36Soma is not only a running club — we are family and a movement that can move a city when it matters most. Thank you to everyone who laced up, donated, walked with us, or simply shared the story. We showed what it means to run with heart.",
      ],
    },
  },
  {
    slug: "ktj-mirka",
    date: "2026-05-13",
    tags: ["crew", "events"],
    image: "/media/blog-ktj-mirka-hero.webp",
    imageCover: "/media/blog-ktj-mirka-mid.webp",
    imageMid: {
      src: "/media/blog-ktj-mirka-mid.webp",
      afterIndex: 5,
      alt: {
        sr: "36Soma Runners — KTJ tim posle januarskog izazova",
        en: "36Soma Runners — KTJ team after the January challenge",
      },
    },
    title: {
      sr: "KTJ izazov: Mirka, 25 trkača i 5.720 km",
      en: "KTJ challenge: Mirka, 25 runners, and 5,720 km",
    },
    excerpt: {
      sr: "31 dan januara, klupski inat i 5.720 km — zima u Kraljevu nije uspela da nas zaustavi.",
      en: "31 January days, crew stubbornness, and 5,720 km — Kraljevo winter did not stop us.",
    },
    body: {
      sr: [
        "Januar je tradicionalno najteži mesec za svakog trkača. Dani su kratki, praznična trpeza te vuče da ostaneš kod kuće, a minus, sneg i zaleđen kraljevački asfalt te stalno testiraju. U tom periodu je najlakše odložiti patike do proleća. Ali, u svetu trčanja postoji jedno pravilo: kada je najteže, tada se prepoznaje prava ekipa. Mi smo odlučili da praznični januar pretvorimo u priču o zajedništvu i klupskom inatu.",
        "Kada je otvoren regionalni KTJ (Koliko Trčiš) zimski izazov, cilj nije bio jurenje poena niti takmičenje sa drugima – cilj je bio da pobedimo sopstvenu lenjost, okupimo tim i izađemo na stazu zajedno tokom trideset i jednog dana januara. Naša kapitenka Mirka je preuzela kormilo, sastavila ekipu od 25 trkača i zimska mašina iz Kraljeva je zvanično upaljena.",
        "## 31 dan bez izgovora: 25 trkača i jedna zajednička misija",
        "Ući u ovakav izazov usred zime značilo je da nema mesta za izgovore. Trčali smo kroz snežne nanose, po košavi koja ledi lice i kasno noću posle napornih smena na poslu. Nije bilo važno ko je brži, a ko sporiji – svaki kilometar svakog člana tima se računao podjednako.",
        "Mirka je radila ono što najbolji kapiteni rade – držala nas je na okupu kada je energija padala. Viber grupa je bukvalno gorela od snimaka sa Strave i Garmin satova. Kada bi neko u devet uveče objavio fotografiju sa rute kroz smrznuti grad, to bi automatski pokrenulo još troje da obuju patike i izađu napolje, uprkos minusu. Iz dana u dan tabela se punila, a naša zajednička brojka je rasla.",
        "## Rezultat koji inspiriše: 5.720 kilometara!",
        "Kada je 31. januara u ponoć izazov završen i kada su se svodili konačni računi, pogled na našu klupsku statistiku nas je ostavio bez teksta. Naših 25 trkača je zajedno skupilo neverovatnih 5.720 kilometara!",
        "Za nas ova brojka nije statistika – to je svedočanstvo o karakteru ove ekipe. To su kilometri ispisani kroz rane jutarnje startove, teške noge i stotine ispijenih kafa nakon smrzavanja na stazi. Nismo jurili zlato niti prva mesta, jer u 36Soma vrednost nije u trofejima, već u ljudima. Najveća pobeda ovog januara je to što niko nije odustao i što smo dokazali da kada trčimo jedni za druge, kraljevačka zima nam ne može ništa. Izgurali smo januar kao pravi tim, spremni za sve staze koje nas čekaju u ostatku godine.",
      ],
      en: [
        "January is traditionally the hardest month for any runner. Short days, holiday food pulling you to stay home, minus temperatures, snow, and icy Kraljevo asphalt testing you constantly. Easiest to postpone shoes until spring. But in running there is a rule: when it is hardest, you see the real crew. We turned holiday January into a story of solidarity and club stubbornness.",
        "When the regional KTJ (How Much Do You Run) winter challenge opened, the goal was not chasing points or beating others — it was beating our own laziness, building a team, and hitting the road together for thirty-one January days. Captain Mirka took the helm, assembled a squad of 25 runners, and Kraljevo’s winter machine officially switched on.",
        "## 31 days, no excuses: 25 runners, one mission",
        "Entering a challenge mid-winter meant no room for excuses. We ran through snowdrifts, into wind that freezes your face, and late at night after hard shifts at work. Fast or slow did not matter — every team member’s kilometre counted equally.",
        "Mirka did what the best captains do — kept us together when energy dropped. The Viber group burned with Garmin and Strava screenshots. When someone posted a frozen city route at nine in the evening, three others laced up despite the cold. Day by day the table filled and our shared total grew.",
        "## A result that inspires: 5,720 kilometres!",
        "When the challenge ended at midnight on 31 January and the final tally came in, our club stats left us speechless. Our 25 runners collected an incredible 5,720 kilometres together!",
        "For us that number is not statistics — it is proof of character. Kilometres written through early alarms, heavy legs, and hundreds of coffees after freezing on the route. We were not chasing gold or podiums — at 36Soma value is in people. The biggest January win: nobody quit, and we proved that when we run for each other, Kraljevo winter cannot touch us. We ground January out as a real team, ready for every course ahead this year.",
      ],
    },
  },
  {
    slug: "dan-van-grada",
    date: "2026-03-10",
    tags: ["crew"],
    image: "/media/blog-dan-van-grada-hero.webp",
    imageMid: {
      src: "/media/blog-dan-van-grada-mid.webp",
      afterIndex: 4,
      alt: {
        sr: "36Soma Runners na startu Ivanjica Trail trke",
        en: "36Soma Runners at the Ivanjica Trail start line",
      },
    },
    title: {
      sr: "Rano ustajanje, kafa sa pumpe i grmljenje na startu",
      en: "Early alarm, petrol-station coffee, and start-line chaos",
    },
    excerpt: {
      sr: "Trka ne počinje na startnoj liniji, nego na izlazu iz Kraljeva. Uz kafu iz automata, glasnu muziku u kolima i ekipu koja deli svaki kilometar.",
      en: "The race does not begin at the start line, but leaving Kraljevo — machine coffee, loud music in the car, and a crew that shares every kilometre.",
    },
    body: {
      sr: [
        "Trke su super, medalje su lepa uspomena, ali ono što se pamti i o čemu se priča mesecima kasnije nije sam prolazak kroz cilj. Ono što nas drži na okupu je sve ono što se dešava između. To je onaj dugački, uzbudljivi i često potpuno haotični dan kada cela ekipa sedne u kola i krene van grada.",
        "Ceo dan krene pre pucnja. Često i par dana ranije — u grupi na WhatsAppu: ko vozi, ko ima mesto u gepeku, gde staje prva kafa i ko drži plejlistu u kolima.",
        "## Rano ustajanje i miris prve pumpe",
        "Trka ne počinje na startnoj liniji, nego na izlazu iz Kraljeva. Uz kafu iz automata, glasnu muziku u kolima i ekipu koja deli svaki kilometar.",
        "Dan uglavnom krene u vreme kada vikendom inače ne želiš da budeš budan — pakovanje, čarape i startni broj u torbi, polubudni pogled u retrovizor dok se skupljamo. Prva stanica je uvek pumpa; prva zajednička fotka dok sunce tek izlazi. U kolima je uvek pomešana pozitivna trema. Neko nervozno popravlja pertle na zadnjem sedištu, neko po stoti put proverava profil staze i okrepne stanice, dok dežurni klupski zabavljači ispričaju po šalu da spuste puls ekipi. Na putu ka trci nema pojedinaca — svi dišemo kao jedan tim, bez obzira da li neko ide na prvi polumaraton ili na lični rekord na 10K.",
        "## Na startu: grmljenje i tišina pred nalet",
        "Kada stignemo na lokaciju – bilo da je to Čačak, Beograd, Kruševac ili negde dalje preko granice – i kada uđemo u onu reku ljudi u trkačkoj opremi, preplavi te neverovatan nalet adrenalina. Ali u tom ludilu, naša klupska majica i prepoznatljive šarene čarape su naš svetionik. Držimo se zajedno tokom zagrevanja, razmenjujemo poslednje savete i radimo ono naše tradicionalno zajedničko slikanje.",
        "A onda dolazi onaj trenutak — ulazak u start. Muzika sa razglasa grmi, stotine satova pište u isto vreme tražeći GPS signal. Pogledaš levo, pogledaš desno – tu je tvoja ekipa. Više nema treme. Samo čekaš taj znak da kreneš. Tokom same trke, čak i ako se razdvojimo jer svako trči svoj pejs, onaj trenutak kada u prolazu sretneš nekog iz 36Soma na stazi, kada ti dobaci ono glasno „Idemo!“ ili ti pruži ruku u prolazu – to ti da snage za naredna tri kilometra kada noge postanu teške.",
        "## Treće poluvreme: ponos i kafa posle hlađenja",
        "Pravi finiš trke nije na tepihu ispod lučnog cilja. Pravi finiš je ono što mi zovemo „treće poluvreme“. Kada se svi skupimo na travi pored staze, sa medaljama oko vrata, umor nestaje u sekundi. Tada kreće prepričavanje: „Jesi video onaj uspon na petom kilometru?“, „Kako me je izvukla ona okrepa na sedmom!“, „Puls mi je otišao u nebesa, ali nisam stao.“",
        "Teške noge se najbolje leče dobrim ručkom i dugom kafom negde usput dok se vraćamo za Kraljevo. Dok se vozimo nazad kroz sumrak, u kolima vlada ona predivna, teška tišina umora i čistog zadovoljstva. Pogledaš u medalju u krilu, pogledaš ekipu koja drema pored tebe i već u glavi vrtiš pitanje: gde idemo sledeći put? 36Soma ne staje.",
      ],
      en: [
        "Races are great and medals are lovely souvenirs, but what we remember and talk about months later is not only crossing the line. What keeps us together is everything in between — that long, exciting, often chaotic day when the whole crew gets in the car and leaves town.",
        "The whole day starts before the gun. Often a few days earlier — in the group chat: who drives, who has a seat in the boot, where we grab the first coffee, who owns the car playlist.",
        "## Early alarm and the smell of the first petrol station",
        "The race does not begin at the start line — it begins leaving Kraljevo. Machine coffee, loud music in the car, and a crew that has your back.",
        "The day usually starts when you would rather still be asleep on a weekend — packing, socks and bib in the bag, half-awake glances in the rear-view mirror as we meet. First stop is always a petrol station; first group photo as the sun rises. In the car: mixed nerves and jokes. Someone fixes laces on the back seat, someone checks the course profile and aid stations for the hundredth time, while the club comedians drop lines to calm the pulse. On the road there are no individuals — one team, whether you are running your first half marathon or chasing a 10K PR.",
        "## Start corral: noise and silence before the surge",
        "When we arrive — Čačak, Belgrade, Kruševac, or somewhere across the border — and step into the river of runners, adrenaline hits hard. In that madness our club shirt and colourful socks are the lighthouse. We stay together in the warm-up, swap last tips, and take our traditional group photo.",
        "Then the moment. Into the corral. PA music, hundreds of watches beeping for GPS. Look left, look right — your crew is there. No more nerves. Just wait for the signal. During the race we may split by pace, but passing another 36Soma on course, a loud „Let's go!“ or a hand in the feed zone — that carries you through the next three kilometres when legs turn heavy.",
        "## Third half: pride and coffee after cooldown",
        "The real finish is not the arch mat. It is what we call the third half. Everyone on the grass beside the course, medals around necks, fatigue gone in a second. Then the retelling: „Did you see that climb at km five?“, „That aid station at seven saved me“, „My heart rate hit the sky but I did not stop.“",
        "Heavy legs heal with a good meal and long coffee on the drive back to Kraljevo. Through dusk the car holds that beautiful tired silence of satisfaction. You look at the medal in your lap, at the crew half-asleep beside you, and already wonder: where next? 36Soma does not stop.",
      ],
    },
  },
  {
    slug: "leto-zima",
    date: "2026-03-12",
    tags: ["beginners", "tips"],
    image: "/media/blog-leto-zima-hero.webp",
    imageMid: {
      src: "/media/blog-leto-zima-mid.webp",
      afterIndex: 1,
      alt: {
        sr: "36Soma Runners na stazi — letnji trening",
        en: "36Soma Runners on the track — summer training",
      },
    },
    title: {
      sr: "Prognoza je samo izgovor: Kako preživeti +35°C i -5°C",
      en: "The forecast is just an excuse: Surviving +35°C and -5°C",
    },
    excerpt: {
      sr: "Letnja večernja treniranja, jutarnje nedelje, slojevi zimi — prognoza nema moć kad se ekipa okupi.",
      en: "Summer nights, Sunday mornings, winter layers — the forecast fades when the crew shows up.",
    },
    body: {
      sr: [
        "Postoji ta jedna specifična sekunda na okupljanju, negde između zvuka startovanja Garmin satova i prvog dubokog udaha, kada pogledaš u ekipu pored sebe i shvatiš da vremenska prognoza zapravo nema nikakvu moć. Na aplikacijama može da piše svašta – narandžasti meteoalarm, zimska susnežica, letnja sparina koja pritiska pluća – ali kada se ekipa okupi, sve to postaje samo scenografija za narednih nekoliko kilometara.",
        "Nema lošeg vremena za trčanje. To zvuči kao izlizana fraza sa motivacionih postera, ali u Kraljevu je to živa istina. Razlika je samo u tome kako se spremaš, šta oblačiš i u koje vreme puštaš korak.",
        "## Leto: svežina i tišina",
        "Kada u julu i avgustu kraljevački asfalt počne da isijava toplotu kao rerna, trčanje preko dana nije hrabrost – to je čista glupost. Zato leti treniramo uveče. Utorkom i četvrtkom se nalazimo u 20:00h. Tada grad konačno malo prodiše, ulična svetla se upale, a sa Ibra krene onaj blagi, spasonosni vetar.",
        "Ali pravi test karaktera su letnje nedelje. Dok većina grada još uvek spava ili hvata hladovinu prve jutarnje kafe, mi smo na okupljanju već u 07:00h. Zvuči surovo za vikend, znamo. Ali osećaj kada trčiš kroz potpuno prazne ulice, dok je vazduh još uvek hladan i čist, ne može se zameniti ni sa čim. To je tvojih sat vremena pre nego što dan postane pretopli haos.",
        "Šta obući leti? Što manje, to bolje. Lagani šorc, aktivna majica koja ne upija znoj kao pamuk (pamuk je leti tvoj najveći neprijatelj jer postaje težak i pravi žuljeve).",
        "Hidratacija: flašica vode te čeka u prostoru kluba ili na okupljanju. Pije se pre, tokom i obavezno posle trčanja, uz kafu ili hladno piće dok sumiramo utiske.",
        "## Zima: slojevi, magla i građenje karaktera",
        "Zimi se u Kraljevu ne jure brzi splitovi. Zimi se gradi baza i čeliči karakter. Kada magla pritisne grad pa jedva vidiš semafor na sledećem uglu, a vazduh postane oštar i hladan, okupljanje u zoru izgleda potpuno drugačije. Ali to su trenuci kada se ekipa najviše drži zajedno.",
        "Zlatno pravilo zimskog trčanja je matematika slojeva. Nemoj napraviti klasičnu grešku početnika i obući debelu zimsku jaknu. U njoj će ti biti super prvih 500 metara, a posle toga ćeš se skuvati i proći kroz pakao. Pravilo glasi: ako ti je prijatno i toplo dok stojiš na mestu okupljanja i čekaš start, previše si se obukao. Treba da ti bude blago hladno (da zubi malo cvokoću) – jer čim pokrenemo noge, telo će samo podići temperaturu.",
        "Pravilo tri sloja: prvi sloj je aktivni veš sa dugim rukavima koji odvodi znoj sa kože. Drugi sloj je tanji duks koji čuva toplinu. Treći sloj je lagani šuškavac koji te štiti od kraljevačke košave ili sitne kiše.",
        "Ekstremiteti: kapa i rukavice su obavezne. Najviše toplote gubiš preko glave i šaka, a hladni prsti mogu da pokvare i najbolji trening.",
        "Bilo da se sa patika cedi znoj ili gazimo kroz prve slojeve novembarskog mraza, ruta ostaje naša, a ekipa je tu. Nemoj čekati „savršen dan“ na aplikaciji za prognozu. Savršen dan je onaj kada pređeš zonu komfora i pojaviš se na treningu. Promeni slojeve i dođi.",
      ],
      en: [
        "There is a specific second at meet-up — somewhere between Garmin watches beeping to start and your first deep breath — when you look at the crew beside you and realise the weather app never had the last word. Orange alerts, winter flurries, summer humidity crushing your chest: once we meet, it all becomes scenery for the next few kilometres.",
        "There is no bad weather for running. It sounds like a poster slogan, but in Kraljevo it is lived truth. The difference is how you prepare, what you wear, and when you step out.",
        "## Summer mode: chasing cool air and quiet streets",
        "When July and August asphalt in Kraljevo radiates like an oven, daytime running is not bravery — it is a bad idea. So in summer we switch to night mode. Tuesday and Thursday we meet at 8 pm. The city finally breathes, streetlights come on, and that gentle, saving breeze rolls off the Ibar.",
        "Sunday mornings are the real character test. While most of the city still sleeps or grabs the first cool coffee, we are already at meet-up by 7 am. Harsh for a weekend — we know. But running empty streets while the air is still cold and clean is unmatched. Your hour before the day turns into overheated chaos.",
        "What to wear in summer? Less is more. Light shorts, a technical top that does not soak sweat like cotton (cotton is your biggest summer enemy — heavy fabric, chafing).",
        "Hydration: water waits in the club room or at meet-up. Drink before, during, and after — then coffee or something cold while we debrief.",
        "## Winter mode: layers, fog, and building character",
        "In Kraljevo we do not chase fast splits in winter. We build base and steel. When fog presses the city until you barely see the next traffic light and the air turns sharp and cold, a dawn meet-up feels like another world — and that is when the crew sticks closest.",
        "The golden rule is layer math. Do not make the beginner mistake of a thick winter coat. Fine for the first 500 metres, then you boil. If you feel cosy standing still at the meet-up, you wore too much. You want slightly cold (teeth maybe chattering) — once we move, body heat takes over.",
        "Three layers: base — long-sleeve active wear wicking sweat; mid — thin fleece for warmth; shell — light windbreaker for Kraljevo gusts or drizzle.",
        "Extremities: hat and gloves are non-negotiable. Most heat leaves through head and hands; cold fingers ruin the best session.",
        "Whether sweat drips off your shoes or we crunch through November frost, the route stays ours and the crew stays here. Do not wait for the perfect day on the app. The perfect day is when you leave your comfort zone and show up for training. Change your layers and come.",
      ],
    },
  },
  {
    slug: "istezanje",
    date: "2026-03-08",
    tags: ["tips"],
    image: "/media/blog-istezanje-hero.webp",
    imageMid: {
      src: "/media/blog-istezanje-mid.webp",
      afterIndex: 7,
      alt: {
        sr: "36Soma Runners na stazi — zagrevanje i druženje posle treninga",
        en: "36Soma Runners on the track — warm-up and post-run crew time",
      },
    },
    title: {
      sr: "Zašto istezanje nije „dodatak“ nego lek za teške noge",
      en: "Why stretching is not an „extra“ but medicine for heavy legs",
    },
    excerpt: {
      sr: "Zagrevanje pre starta, statičko istezanje posle kruga — deset minuta koje čuvaju kolena sutradan.",
      en: "Warm-up before the start, static stretch after the loop — ten minutes that save your knees tomorrow.",
    },
    body: {
      sr: [
        "Priznajmo odmah na početku – svi smo bar jednom napravili istu grešku. Dođeš na trening, odradiš kilometražu, sat pišti da je kraj, ugasiš aktivnost na Garminu i tvoj mozak automatski prelazi u režim: „To je to, završio sam za danas, gde je ta kafa?“. Istezanje? Ma ko će sad da gubi još deset minuta na to, ionako se osećam super.",
        "A onda se probudiš sutradan ujutru. Ustaneš iz kreveta i shvatiš da su ti listovi tvrdi kao kraljevački asfalt, a kolena te mole za milost dok silaziš niz stepenice. E, to je trenutak kada shvatiš da istezanje i zagrevanje nisu nikakav „luksuz“ niti dosadni dodatak treningu – to su minuti koji doslovno čuvaju tvoje noge i tvoje zdravlje.",
        "## Sve počinje pre prvog kilometra: zagrevanje",
        "Trčanje ne počinje onog trenutka kada pustiš korak ka Ibru. Počinje na okupljanju, u krugu dok još uvek stojimo u mestu i pričamo ko je kako proveo dan. Ali dok razgovor teče, telo mora da se probudi. Zamisli svoje mišiće kao gumicu koja je stajala na hladnom – ako je naglo i snažno povučeš, ona će pući. Ako je prvo malo protrljaš i zagreješ, postaće elastična.",
        "Zato naša tradicija pre starta uključuje dinamičko zagrevanje. Kruženje zglobovima, lagani visoki koleni, izbacivanje nogu, polu-čučnjevi. To nije gubljenje vremena dok čekamo one što kasne. To je jasan signal tvom srcu i mišićima: „Spremite se, sad prelazimo u višu brzinu“. Dobro zagrevanje podmazuje zglobove, podiže temperaturu tela i smanjuje rizik od onih glupih, nervirajućih povreda koje te posle odvoje od staze na mesec dana.",
        "## Kada sat pišti kraj: vrati dug svojim mišićima",
        "Kada završimo rutu i kada se disanje polako smiri, dolazi na red onaj najvažniji deo koji većina trkača najradije preskače – statičko istezanje. Tokom trčanja, tvoji mišići se konstantno skupljaju i skraćuju pod naporom. Ako ih ostaviš u tom stanju i odmah sedneš u kafić ili auto, oni će se tako „ohladiti“ i ostati zgrčeni. To je recept za upale i teške noge.",
        "Istezanje posle treninga je tvoj način da kažeš telu „hvala“. Tih 10 minuta laganih, statičkih vežbi gde zadržavaš položaj po 20–30 sekundi radi magične stvari: vraća elastičnost mišićima, tetivama i listovima koji su podneli najveći teret asfalta; ubrzava oporavak i pomaže telu da brže izbaci mlečnu kiselinu; smiruje puls i služi kao prelaz iz zone napora u potpuno opuštanje.",
        "## Ekipa koja se rasteže zajedno, trči zajedno",
        "Ono što je najbolje kod nas jeste da ni istezanje posle treninga nije dosadno. To je zapravo onaj klupski polukrug u kom se sumiraju utisci sa staze. Dok rastežeš kvadriceps držeći se za rame trkača pored sebe da ne padneš, uvek padne neka dobra šala, dogovor za sledeću trku ili analiza ko je danas „povukao“ jači pejs nego što je trebalo.",
        "Zato sledeći put kada završimo krug, nemoj odmah da pakuješ stvari. Ostani tih desetak minuta u krugu sa ekipom. Tvoja kolena, tetive i listovi će ti biti zahvalni već sledećeg jutra kada bez problema zakoračiš u novi dan.",
      ],
      en: [
        "Let's admit it upfront — we have all made the same mistake. You finish the session, your watch beeps done, you stop the Garmin activity and your brain switches to: „That's it, where's the coffee?“ Stretching? Who has ten more minutes — I feel great.",
        "Then you wake up the next morning. Calves stiff as Kraljevo asphalt, knees begging for mercy on the stairs. That is when you learn warm-up and stretching are not luxury or boring extras — they are the minutes that literally protect your legs and your health.",
        "## It starts before the first kilometre: warm-up",
        "The run does not begin when you step toward the Ibar. It begins at meet-up, in the circle while we still stand and talk about the day. Conversation flows, but the body must wake up. Think of muscles as a cold rubber band — yank it hard and it snaps. Warm it first and it stretches.",
        "Our pre-start tradition is dynamic warm-up: ankle circles, high knees, leg swings, half squats. Not wasted time waiting for latecomers. A clear signal to heart and muscles: „Get ready, we are shifting up a gear.“ Good warm-up lubricates joints, raises body temperature, and cuts the risk of stupid injuries that bench you for a month.",
        "## When the watch beeps: pay your muscles back",
        "When the loop ends and breathing settles, comes the part most runners skip — static stretching. During the run your muscles shorten under load. Leave them there and jump straight into a café or car and they cool down cramped. Recipe for soreness and heavy legs.",
        "Post-run stretch is how you say thank you to your body. Ten minutes of gentle holds for 20–30 seconds: restores elasticity in calves and quads that carried the asphalt; speeds recovery and lactate clearance; eases heart rate down from effort to rest.",
        "## The crew that stretches together runs together",
        "The best part: post-run stretching is not boring. It is the semicircle where we debrief the route. Quad stretch while holding the shoulder of the runner next to you — always a joke, a plan for the next race, or who pushed the pace too hard today.",
        "Next time we finish the loop, do not pack up immediately. Stay those ten minutes in the circle. Your knees, tendons, and calves will thank you tomorrow morning when you walk into the day without wincing.",
      ],
    },
  },
  {
    slug: "benefiti-trcanja",
    date: "2026-03-06",
    tags: ["tips", "beginners"],
    image: "/media/blog-benefiti-hero.webp",
    imageCover: "/media/blog-benefiti-mid.webp",
    heroFullHeight: true,
    imageMid: {
      src: "/media/blog-benefiti-mid.webp",
      afterIndex: 6,
      alt: {
        sr: "36Soma Runners — ekipa na stazi u sumrak",
        en: "36Soma Runners — crew on the track at dusk",
      },
    },
    title: {
      sr: "Kako da prevariš sopstvenu glavu (i zašto uopšte trčati?)",
      en: "How to trick your own brain (and why run at all?)",
    },
    excerpt: {
      sr: "Endorfini, izgovori, trčanje sam vs ekipa — i zašto utorak menja sve.",
      en: "Endorphins, excuses, solo runs vs the crew — and why Tuesday changes everything.",
    },
    body: {
      sr: [
        "Hajde da budemo potpuno iskreni: niko se ne budi svakog jutra sa nezaustavljivom željom da obuče patike i ode da se znoji na asfaltu. Postoje oni dani kada je krevet previše udoban, kada je napolju sivo, ili kada ti se posle napornog dana na poslu ili fakultetu jednostavno ne radi ništa. U tim trenucima, tvoja glava ti nudi milion savršenih izgovora zašto je bolje da ostaneš kod kuće.",
        "I to je sasvim normalno. Pitanje „Zašto uopšte trčati?“ ne postavljaš sebi kada si pun energije – postavljaš ga kada treba da se pokreneš sa nule. Odgovor na to pitanje nije u medicinskim definicijama i brojkama, nego u onome kako se osećaš posle.",
        "## Zdravlje i raspoloženje: reset koji ti treba",
        "Svi znamo da je trčanje dobro za srce, pluća i kondiciju, ali prava magija se zapravo dešava u glavi. Živimo brzo, stres je svuda oko nas, a ekrani nam konstantno troše pažnju. Trčanje je onaj retki, dragoceni trenutak u toku dana kada ne možeš da skroluješ po telefonu, ne odgovaraš na mejlove i ne razmišljaš o obavezama. Postojiš samo ti, tvoj dah i tvoji koraci.",
        "Već posle prvog kilometra telo počinje da luči endorfin – hormon sreće. Možeš da kreneš na trening neraspoložen, besan ili umoran od svakodnevice, ali garantujemo ti da ne postoji osoba koja se sa staze vratila nezadovoljna. Taj osećaj pročišćenja, kada izbaciš sav stres iz sebe i osetiš kako ti hladan vazduh puni pluća, jeste najbolji mentalni reset koji možeš sebi da priuštiš.",
        "## Problem sa disciplinom (i zašto trčanje sam često propada)",
        "Disciplina zvuči kao teška, vojnička reč. Ljudi često kažu: „Nemam ja disciplinu za to“. I u pravu su – jako je teško graditi naviku potpuno sam. Kada trčiš sam, pregovaraš sam sa sobom. Kažeš sebi: „Pa dobro, previše je hladno danas, mračno je, trčaću sutra“. I niko te ne drži odgovornim. Sutra postane prekosutra, i patike brzo završe na dnu ormara.",
        "Tu na scenu stupa klub. U 36Soma niko ne glumi trenera koji ti zvoni na vrata, ali sama činjenica da znaš da te ekipa čeka u utorak na okupljanju menja sve. Kada znaš da će te neko pitati: „Gde si ti u utorak, što te nema?“, odjednom ti tvoji sopstveni izgovori postaju smešni.",
        "## U klubu je sve duplo lakše",
        "Kada trčiš u grupi, disciplina se pretvara u druženje. Više ne razmišljaš o tome koliko ti je teško, jer dok trčiš slušaš neku dobru priču trkača pored sebe, deliš šale i šale te prate. Kilometri prolaze sami od sebe. Kada ti postane teško na nekom usponu, neko te potapše po ramenu ili uspori da isprati tvoj ritam. U ovoj ekipi niko ne ostaje iza.",
        "Zato ne trčimo samo zbog trčanja. Trčimo zbog onog osećaja pripadnosti, zbog zajedničkih pobeda nad sopstvenom lenjošću i zbog one kafe posle treninga gde shvatiš da si upravo pobedio dan. Ako još uvek razmišljaš da li da kreneš – prestani da razmišljaš. Samo se pojavi u utorak. Mi ćemo ti pomoći da prevariš tvoju glavu.",
      ],
      en: [
        "Let's be honest: nobody wakes up every morning desperate to lace up and sweat on asphalt. Some days the bed wins, the sky is grey, or after work or lectures you want to do nothing. Your brain offers a million perfect excuses to stay home.",
        "That is normal. „Why run at all?“ is not a question you ask when you are full of energy — you ask it when you need to start from zero. The answer is not in medical charts — it is in how you feel afterwards.",
        "## Health and mood: the reset you need",
        "We know running helps heart, lungs, and fitness, but the real magic is in your head. Life is fast, stress is everywhere, screens eat attention. Running is that rare moment when you cannot scroll, answer email, or worry about obligations. Just you, your breath, and your steps.",
        "After the first kilometre your body releases endorphins. You can show up grumpy, angry, or drained — we still guarantee nobody comes back from the route unhappy. That cleared-out feeling, stress leaving, cold air filling your lungs — the best mental reset you can buy yourself.",
        "## Discipline (and why solo running often fails)",
        "Discipline sounds military and heavy. „I do not have discipline for that“ — fair. Building the habit alone is brutal. Solo, you negotiate with yourself: „Too cold, too dark, tomorrow.“ Nobody holds you accountable. Tomorrow becomes never and shoes live at the bottom of the closet.",
        "That is where the club steps in. At 36Soma nobody plays drill sergeant at your door — but knowing the crew waits on Tuesday changes everything. When someone will ask „Where were you Tuesday?“, your excuses start sounding silly.",
        "## Everything is easier in a crew",
        "In a group, discipline becomes hanging out. You stop obsessing over difficulty because you hear a story, share a joke, kilometres pass themselves. On a climb someone taps your shoulder or slows to your pace. On this crew nobody gets left behind.",
        "We do not run only for running. We run for belonging, for beating our own laziness together, for post-run coffee when you realise you won the day. Still thinking about starting? Stop thinking. Show up Tuesday. We will help you trick your brain.",
      ],
    },
  },
];

/** Pin order on the blog index (0 = first card). Dates still show on each post. */
const BLOG_LIST_PIN: Record<string, number> = {
  "prvi-put": 2,
};

export function getBlogPosts(_locale: BlogLocale): BlogPost[] {
  const sorted = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const pinned = sorted.filter((p) => p.slug in BLOG_LIST_PIN);
  const rest = sorted.filter((p) => !(p.slug in BLOG_LIST_PIN));
  const out: BlogPost[] = [];
  let restIdx = 0;

  for (let i = 0; i < sorted.length; i++) {
    const pin = pinned.find((p) => BLOG_LIST_PIN[p.slug] === i);
    if (pin) {
      out.push(pin);
    } else if (restIdx < rest.length) {
      out.push(rest[restIdx++]);
    }
  }

  return out;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function blogPostPath(locale: BlogLocale, slug?: string): string {
  const base = locale === "sr" ? "/sr/blog" : "/blog";
  return slug ? `${base}/${slug}/` : `${base}/`;
}

const SR_MONTHS_LATIN = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "jun",
  "jul",
  "avgust",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
] as const;

/** Blog dates in Latin script (sr-RS locale can render Cyrillic month names). */
export function formatBlogDate(iso: string, locale: BlogLocale): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (locale === "sr") {
    return `${day}. ${SR_MONTHS_LATIN[month - 1]} ${year}.`;
  }
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
