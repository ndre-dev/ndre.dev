// Dark is the default. A visitor who picks light keeps it on later visits.

export const themeKey = 'theme';
export const themeColour = { dark: '#0b1526', light: '#f7f8fb' };

export const introKey = 'intro-seen';

// Runs in <head> before the page paints:
// - a light visitor sees no dark flash
// - the intro plays once per visit, not on every language switch
export const themeScript = `(function(){var d=document.documentElement;try{if(localStorage.getItem('${themeKey}')==='light')d.dataset.theme='light'}catch(e){}try{if(sessionStorage.getItem('${introKey}'))d.dataset.intro='done';else sessionStorage.setItem('${introKey}','1')}catch(e){}})()`;
