---
layout: post
title: "Onderzoek: Customizability React Native E-Commerce App"
description: "Research on white-labeling and modular architecture for a React Native app. (Dutch)"
author: "Maxime Orione"
---

## Probleemstelling
Dit onderzoek is in verband met het ontwikkelen van een (React Native) smartphone applicatie voor e-commerce platformen. Het is de bedoeling de achterliggende logica van deze app zo te bouwen dat deze, voor de ontwikkelaars, makkelijk aan te passen is aan verschillende vragen van verschillende klanten. Deze achterliggende logica/architectuur kan men vergelijken met het idee van een "shopping app maker" vanuit het standpunt van de ontwikkelaars.

In andere woorden; de e-commerce app moet zo "customizable" mogelijk zijn, en dit op twee aspecten: de app moet geen initiële branding uitstralen (**white-labeling**), en de achterliggende code moet opgesplitst worden in dynamische modules die makkelijk toe te voegen en te verwijderen zijn (**modulaire architectuur**). Met het toepassen van deze twee aspecten kunnen ontwikkelaars makkelijk code hergebruiken en telkens nieuwe apps uitbouwen voor verschillende klanten.

Dit onderzoek zou in verband met deze twee aspecten de volgende vragen willen beantwoorden:

* Hoe passen we white-labeling toe aan de app?
	* Hoe zit white-labeling op het vlak van design?
	* Hoe passen we re-branding toe op een technische manier (op niveau van code)?
* Hoe splitsen we de app op in modules?
	* Hoe worden modules ingeladen/geïmporteerd?
	* Hoe maken we deze modules individueel aanpasbaar?
	* Hoe verbinden we modules met elkaar?

## Onderzoeksmethode
Aan de hand van een literatuurstudie zullen deze vragen beantwoord worden. Aan de hand van die antwoorden zal er een proof of concept uitgewerkt worden die de twee oplossingen demonstreren.

## Literatuurstudie
Gebruik maken van white-labeling kan namelijk zijn voor- en nadelen hebben [[x]](http://www.marketingprofs.com/opinions/2015/27296/three-reasons-white-labeling-your-products-is-a-fab-idea-and-two-reasons-it-isnt):

* Voordelen:
	* Focus op functionaliteit en herbruikbaarheid van de app.
	* Styling in React Native hangt typisch aan CSS code, die makkelijk aanpasbaar is.
	* Kost-effectief.
* Nadelen:
	* De verschillende eindproducten (aangepaste en afgewerkte apps) zouden zeer gelijk kunnen "voelen". Herkenbaarheid van functionaliteit of "feel" van de verschillende apps kan niet ideaal zijn.
	* Geen credit voor wat er gemaakt wordt, maar dat is niet zo erg voor AppFoundry, denk ik.

### White-labeling
> Een white label-product wordt geproduceerd door één bedrijf en wordt verpakt en verkocht door andere bedrijven onder verschillende merknamen. Het eindproduct lijkt dan vervaardigd te zijn door de marketeer.

[[x]](https://www.investopedia.com/terms/w/white-label-product.asp)

Met 'white-labeling' bedoelt men dat de app geen initiële branding uitstraalt. Het design van de app moet aanpasbaar zijn aan de branding en stijl van een klant. Het aanpassen hiervan noemt men "re-branding". Er wordt onderzocht naar het toepassen van white-labeling op vlak van design en op vlak van code.

#### Design
* Geschiedenis van white-labeling?
	* Vinyl Records

* Kijken naar dingen zoals SquareSpace (app makers)
* Is white-labeling meer dan alleen maar "alles is wit"?
	* Kijken naar Bootstrap enzo
	* Basics (typische native UX)
* React Native Storybook (blogpost)
* Limieten (white labeling is een "feature")
	* KISS

#### Technisch
* Opsplitsen van app design en functionaliteit
	* Vergelijken met HTML vs. CSS	
* JSON config file? (Structuur uitzoeken)
	* Waarom niet gewoon `styling.js` aanpassen?

Styling in React Native wordt met het volgende aangemaakt [[x]](https://facebook.github.io/react-native/docs/style.html):

```javascript
const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
```

Een constante `styles` wordt aangemaakt door een `JSON` object door te geven aan de `StyleSheet.create()` functie. De naamgevingen en structuur van de styling is zeer gelijkend met CSS code. React (Native) laat dus al toe om op een vrij simpele manier de styling aan te passen.
Het `JSON` object dat doorgegeven wordt kan uitgeschreven worden in een aparte `.JSON` file.

### Modulaire Architectuur
De app moet ook makkelijk aanpasbaar zijn op het niveau van de code. Hiervoor is het de bedoeling de app uit te bouwen aan de hand van 'modules'.

* "Modular Architecture"
* Privé NPM
* Components
	* importeren (Maven?)
	* properties aanpassen, subklassen voor meer customizability?
	* verbinden (Controller vs. Passing via Constructor)
* Ander soort modules? (technische modules)

## Resultaten
(proof of concept)

----------

## Bronnen
### White-labeling

* [Marketing Strategy - Three Reasons White-Labeling Your Products Is a Fab Idea (and Two Reasons It Isn't) : MarketingProfs Article](http://www.marketingprofs.com/opinions/2015/27296/three-reasons-white-labeling-your-products-is-a-fab-idea-and-two-reasons-it-isnt)
* [White Label BuildFire Mobile Apps and Dashboard for Your Development Agency](https://buildfire.com/white-label/)
* [White-label product - Wikipedia](https://en.wikipedia.org/wiki/White-label_product)
* [White-Labelling UX & Implementation – Design for Experience – Medium](https://medium.com/design-for-experience/white-labelling-ux-implementation-22d30233ff73)
* [7 Practical Tips for Cheating at Design – Refactoring UI – Medium](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886)
* [Storybook - UI dev environment you'll love to use](https://storybook.js.org/)
* [React Native Storybook | AppFoundry](https://www.appfoundry.be/blog/2018/01/19/react-native-storybook/)
* [6 Reasons To Become A White Label Mobile App Reseller - Bizness Apps](https://www.biznessapps.com/blog/app-reseller-tip-what-makes-a-successful-white-label-mobile-app/)
* [white label product strategy - Google Search](https://www.google.be/search?dcr=0&ei=95OfWpTdF8WukwW6lIfQDw&q=white+label+product+strategy&oq=best+practices+for+white-labeling&gs_l=psy-ab.3.0.0i71k1l8.0.0.0.3599580.0.0.0.0.0.0.0.0..0.0....0...1c..64.psy-ab..0.0.0....0.K-3yzb5PelA)
* [ecommerce app maker - Google Search](https://www.google.be/search?dcr=0&ei=ZpWfWtyCHcf9kwWggJzQDA&q=ecommerce+app+maker&oq=ecommerce+app+maker&gs_l=psy-ab.3..0j0i22i10i30k1j0i22i30k1.709.846.0.1014.2.2.0.0.0.0.65.127.2.2.0....0...1c.1.64.psy-ab..0.2.127....0.k4U_IePscAM)
* [white label ecommerce app - Google Search](https://www.google.be/search?dcr=0&q=white+label+ecommerce+app&spell=1&sa=X&ved=0ahUKEwjKt_XX1srZAhVDKFAKHZZfCMYQBQgmKAA&biw=1920&bih=1046)
* [White Label Product](https://www.investopedia.com/terms/w/white-label-product.asp)
* [Everything you'll want to know before styling in React Native.](https://www.okgrow.com/posts/react-native-styling-tips)
* [Are there any white label ecommerce / shopping cart services for iOS? - Quora](https://www.quora.com/Are-there-any-white-label-ecommerce-shopping-cart-services-for-iOS)
* [What are the pros and cons of a White Label Product marketing? - Quora](https://www.quora.com/What-are-the-pros-and-cons-of-a-White-Label-Product-marketing)
* [White-Labeling vs. Co-Branding, Which One Is Right for Your Business? | SherWeb](https://www.sherweb.com/blog/white-labeling-cobranding/)
* [React Native Styling](https://www.tutorialspoint.com/react_native/react_native_styling.htm)
* [The Ultimate Guide to White Label Solutions - Vendasta](https://www.vendasta.com/blog/the-ultimate-guide-to-white-label)

### Modulaire Architectuur

* [Implicit Code Splitting and Chunk Loading with React Router and Webpack | Henley Edition](http://henleyedition.com/implicit-code-splitting-with-react-router-and-webpack/)
* [Scalable React and React Native Apps – Getty/IO Blog — Hire The Best Remote Javascript Consultants](https://blog.getty.io/scalable-react-and-react-native-apps-b99f952d0d53)
* [01 - Working with private packages | npm Documentation](https://docs.npmjs.com/private-modules/intro)
* [reactjs - Dynamic loading of react components - Stack Overflow](https://stackoverflow.com/questions/36952448/dynamic-loading-of-react-components)
* [reactjs - Subclassing in React - Stack Overflow](https://stackoverflow.com/questions/41285135/subclassing-in-react)
* [Modular Application Architecture - Intro - Asmir Mustafic](https://www.goetas.com/blog/modular-application-architecture-intro/)
* [modular architecture react native - Google Search](https://www.google.be/search?q=modular+architecture+react+native&gws_rd=cr&dcr=0&ei=w6ieWvToBdDQkwX2oZnoCw)