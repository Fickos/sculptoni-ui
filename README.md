# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---
Klijentska strana aplikacije (https://sculptoni-ui.vercel.app/home)
- Aplikaciji je trenutno moguće pristupiti preko kredencijala test,test

Glavna ideja jeste pružiti korisniku intuitivan način modelovanja React aplikacije, i podržati opciju generisanja koda.
Trenutni cilj jeste da se omogući integracija sa redux-om direktno iz okruženja, kao i da se servisne i util funkcije mogu preciznije modelovati.
Prozor za modelovanje pojedinačnog elementa u sistemu (drawer komponenta koja se prikazuje nakon klika je trenutno realizovana samo za komponente i stranice (C i P)).
## Funkcionalnosti koje će biti podržane:
### Biranje opcija na nivou celog projekta
(Ideja je da ovo bude stranica koja se otvara klikom na new project. Nakon što korisnik popuni ove podatke, prikazuje mu se stranica koja mu se trenutno odmah prikazuje)
1. Biranje package-manager-a (npr. npm, yarn, pnpm)
2. Biranje framework-a / build alata (planiram da podržim Vite i potencijalno isključivo klijentske komponente Next.js aplikacije)
(prethodna verzija projekta je bila najsličnija create-react-app okuženju, koje je deprecated, pa mislim da je ova promena neophodna)
3. Odabir zavisnosti direktno iz okruženja (poput https://start.spring.io/)
4. Definisanje ostalih polja package.json fajla
5. CSS plugini (CSS, SCSS, Tailwind...)

### Povezivanje generičkih komponenti direktno iz okruženja
Ideja jeste da kreiram komponente ili grupe komponenti koje se često koriste, kako bi korisnik imao opciju da ih izostavi sa dijagrama i da se fokusira na preciznije / zahtevnije probleme.
Npr. napravio bih generičku komponentu za paginaciju/pretragu, koja se sastoji iz tri komponente SearchField, TableView, PaginationControls. 
Dovoljno je da korisnik obeleži neku komponentu na neki način (stereotip, ili šta god), i otuda ne mora da unosi navedene komponente u svoj model.

### Rukovanje organizacijom i korisnicima
Plan je da kreiram veze između organizacija, korisnika, i projekata, na sličan način kao što je kreirano na GitHub-u, jer mi je dugoročni cilj da git bude u potpunosti integrisan u ovo razvojno okruženje.
Pošto smatram da je ovo vrlo jednostavno proširenje, a ne dodaje neku vrednost samom okruženju označio bih ovo kao NICE TO HAVE.

## TLDR
 Ukratko, glavna proširenja u odnosu na diplomski rad bi predstavljala:
1. Novi, robusniji editor, koji može da podrži veći broj komponenti, i pruža korisniku veću fleksibilnost pri modelovanju
2. Integracija sa redux-om
3. Uniformna struktura kreiranja projekta za Vite i Next.js React aplikacije (gubi se potreba za korišćenjem respektivnih CLI)
4. Kolaborativno okruženje, u smislu više ljudi može da pristipi određenom projektu i da radi na njemu
