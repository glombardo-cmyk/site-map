/***********************
 * VARIABLES GLOBALES
 ***********************/
let enviromentPerso = "";
let pagesPerso = [];

// Detecta entorno
esURLValida(window.location.href);

/***********************
 * ARC IDENTITY
 ***********************/
function getArcUserProfile() {
    const raw = localStorage.getItem("ArcId.USER_PROFILE");
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
        console.warn("ArcId.USER_PROFILE inválido");
        return null;
    }
}

const arcUser = getArcUserProfile();

/***********************
 * DATOS USUARIO
 ***********************/
let isAnonimusPerso = true;
let emailPerso = "";
let idUserPerso = "";
let firstNamePerso = "";
let lastNamePerso = "";
let isSuscriberPerso = document.cookie.includes("crprm") ? "Suscriptor" : "Usuario";

if (arcUser) {
    isAnonimusPerso = false;
    emailPerso = arcUser.email || "";
    idUserPerso = arcUser.uuid || "";
    firstNamePerso = arcUser.firstName || "";
    lastNamePerso = arcUser.lastName || "";
}

/***********************
 * FECHA
 ***********************/
const now = new Date();
const dateTime = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()} - hora ${now.getHours()}:${now.getMinutes()}`;

/***********************
 * ZONAS GLOBALES
 ***********************/
const globalZones = [
    { name: "Header", selector: "#sf-header-zone" },
    { name: "Footer", selector: "#sf-footer-zone" }
];

/***********************
 * LISTENERS GLOBALES
 ***********************/
const globalListeners = [
    { class: ".masthead__ticker-item a", labelName: "Ticker" },
    { class: ".masthead__user-info__signin", labelName: "Botón Ingresar" },
    { class: ".masthead__subscribe-button", labelName: "Botón Suscribite" },
    { class: ".burger-icon", labelName: "Botón Menu" },
    { class: ".masthead__nav-list .masthead__nav-list-item a", labelName: "TAGS" },
    { class: ".masthead__user-info .masthead__user-navigation", labelName: 'Botón MENU mi perfil', ItPropagation: true },
    { class: ".masthead__user-info .masthead__user-navigation__user-icon", labelName: 'Botón MI PERFIL', ItPropagation: true },
];

/***********************
 * PAGE TYPES - LISTENERS
 ***********************/
const homeListeners = [
    { class: ".story-card:not(:has(.story-card__restricted))", labelName: "Free Article Home" },
    { class: ".story-card:has(.story-card__restricted)", labelName: "Member Article Home" }
];

const payWallListeners = [
    { class: ".paywall-card__button", labelName: "Quiero suscribirme" }
];

const articleListeners = [
    { class: ".masthead__ticker-item a", labelName: "Ticker" },
    { class: ".masthead__main-share", labelName: "Compartir" },
    { class: ".paywall-chain__btn", labelName: `Ver todos los planes`, ItPropagation: false },
    { class: ".paywall-chain__inner .swiper-slide:first-child .paywall-card__button", labelName: `${SalesforceInteractions.cashDom(document.querySelector(".paywall-chain__inner .swiper-slide:first-child .paywall-card__title")).text()}`, ItPropagation: false },
    { class: ".paywall-chain__inner .swiper-slide:nth-child(2) .paywall-card__button", labelName: `${SalesforceInteractions.cashDom(document.querySelector(".paywall-chain__inner .swiper-slide:first-child .paywall-card__title")).text()}`, ItPropagation: false },
    { class: ".paywall-chain__inner .swiper-slide:nth-child(3) .paywall-card__button", labelName: `${SalesforceInteractions.cashDom(document.querySelector(".paywall-chain__inner .swiper-slide:first-child .paywall-card__title")).text()}`, ItPropagation: false },
];

//SELECTORES perfil
const perfilListeners = [
   // { class: ".panel.step-panel.selected[index='3'] .botonera .btn-verde", labelName: 'Botón Entendido modal (¿Tenés alguna duda?)', ItPropagation: false },
    { class: ".profile__modal-btn profile__modal-btn--primary", labelName: 'Botón Cerrar sesión modal', ItPropagation: false },
    { class: ".profile-suscriptions__btn.profile-suscriptions__btn--secondary", labelName: 'Botón Cancelar suscripción', ItPropagation: false }
]

//SELECTORES Cotizaciones
const cotizacionesListeners = [
    { class: ".masthead__ticker-item a", labelName: "Ticker" },
    { class: `.markets-breadcrumb__item a span`, labelName: 'Breadcrumb', ItPropagation: false },
    { class: `.markets-feed__card__button.false`, labelName: 'Seguir (cotización)', ItPropagation: false },
]


//SELECTORES LANDING DÓLAR
const landingDolarListeners = [
    { class: ".masthead__ticker-item a", labelName: "Ticker" },
    { class: ".markets-feed__card__name a", labelName: 'dolares', ItPropagation: false },
    { class: `.markets-breadcrumb__item a span`, labelName: 'Breadcrumb', ItPropagation: false },
    { class: ".markets-feed__card__button", labelName: `Dolares|Siguiendo`, ItPropagation: false },
]

//SELECTORES MERCADOS ONLINE
const mercadosOnlineListeners = [
    { class: ".masthead__ticker-item a", labelName: "Ticker" },
    { class: `nav.breadcrumb ol li a span`, labelName: 'Breadcrumb', ItPropagation: false },
    { class: ".markets-navigation__item", labelName: "Botón - indicador" },
]

//SELECTORES LogInWall
const logInWallListeners = [
    //{ class: `#appleid-signin`, labelName: 'Botón - Iniciar sesión con Apple', ItPropagation: false },
    { class: `#facebook-btn`, labelName: 'Botón - Iniciar sesión con Facebook', ItPropagation: false },
    { class: `.sign-in-with-google-button`, labelName: 'Botón - Iniciar sesión con Google', ItPropagation: false },
    { class: `.user-access__btn user-access__btn--submit`, labelName: 'Botón - Iniciá sesión con tu E-mail', ItPropagation: false },
    //{ class: `.submit`, labelName: 'Botón - Iniciar sesión', ItPropagation: false },
    { class: `.user-access__login__btn--register`, labelName: 'Botón - Registrate', ItPropagation: false },
    { class: `.user-access__login__btn--recover`, labelName: 'Botón - Olvidé mi contraseña', ItPropagation: false },
    { class: `.user-access__footer a:first-child`, labelName: 'Botón - Política de privacidad', ItPropagation: false },
    { class: `.user-access__footer a:nth-child(2)`, labelName: 'Botón - Terminos y condiciones', ItPropagation: false },
    { class: `.user-access__register__footer .user-access__btn user-access__btn--submit`, labelName: 'Botón - Registrarme', ItPropagation: false },
]

const suscriptionsFormListeners = [
    { class: ".panels .panel:first-child form .button", labelName: 'Botón form siguiente 1', ItPropagation: false },
    { class: ".panels .panel:nth-child(2) form .button:first-child", labelName: 'Botón volver formulario', ItPropagation: false },
]

/***********************
 * HELPERS
 ***********************/
function existeClase(selector) {
    return document.querySelector(selector) !== null;
}

function validarParteDeURL(url, parte) {
    return new RegExp(parte.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(url);
}

/***********************
 * PAGE TYPE CONSTRUCTOR
 ***********************/
function PageType(name, myUrl, interaction, myEvents, isTemplate) {
    this.name = name;
    this.isMatch = () => {
        let url = window.location.href.split("?")[0].replace(/\/$/, "");
        let match = false;

        if (isTemplate === true) {
            return true;
        }

        if (myUrl && url === `${enviromentPerso}${myUrl}`) {
            match = true;
        }

        if (name == "Suscriptions form" && validarParteDeURL(url, "/suscripciones/plan-") && !validarParteDeURL(url, "/#listo")) {
            
            this.interaction.name = "Suscriptions form: " + SalesforceInteractions.cashDom(document.querySelector(".plans-card-v2__title")).text();
            this.listeners = GenerateListeners(name, myEvents);
            
            return true;
        }
        
        if (name == 'Evento' && validarParteDeURL(url, "/eventos/")) {
            
            this.interaction.name = "Evento: " + SalesforceInteractions.cashDom(document.querySelector(".event-header__title")).text();
            this.listeners = GenerateListeners(name, myEvents);
            
            return true;
        }

        if (name == 'Tema' && validarParteDeURL(url, "/tema/")) {
            
            this.interaction.name = "Tema: " + SalesforceInteractions.cashDom(document.querySelector(".section-head__title")).text();
            this.listeners = GenerateListeners(name, myEvents);
            
            return true;
        }

        if (name === "Home" && url === enviromentPerso) {
            match = true;
        }

        if (name === "Article" && document.querySelector(".right-rail__main")) {
            
            const articleInteraction = buildArticleInteraction();

            if (articleInteraction) {
                this.interaction = articleInteraction;
            }
            observePaywall();
            this.listeners = GenerateListeners(name, myEvents);
            
            return true;
        }

        if (validarParteDeURL(window.location.href, "MercadosOnline") && !validarParteDeURL(window.location.href, "/MercadosOnline/dolar.html")) {
            
            const cotizacionesInteraction = buildCotizacionesInteraction()
           
            if(cotizacionesInteraction){
                this.interaction = cotizacionesInteraction;
            }
            
            match = true;
        }
        
        return match;
    };

    this.interaction = interaction;
    this.listeners = GenerateListeners(name, myEvents);
}

/***********************
 * GENERAR LISTENERS
 ***********************/
function GenerateListeners(pageType, elements = []) {
    const listeners = [];
    elements.forEach(el => {
        listeners.push(
            SalesforceInteractions.listener("click", el.class, e => {
                ReadGlobalEvents(e, el);
            })
        );
    });
    return listeners;
}

/***********************
 * GLOBAL ACTIONS
 ***********************/
function GlobalActions(actionEvent) {
    actionEvent.user = actionEvent.user || {};
    actionEvent.user.attributes = {
        emailAddress: emailPerso,
        name: firstNamePerso,
        lastName: lastNamePerso,
        isAnonimusPerso,
        isSuscriberPerso,
        date: dateTime
    };
    if (idUserPerso) {
        actionEvent.user.identities = {
            userId: idUserPerso,
            userIdCms: idUserPerso
        };
    }
    return actionEvent;
}

/***********************
 * EVENT HANDLER
 ***********************/
function ReadGlobalEvents(event, listeners) {

    let dataName = listeners.labelName
    let isSend = true
    let nameTarget = SalesforceInteractions.cashDom(event.target).text()
    
    if (listeners.labelName == 'Quiero suscribirme') {
        dataName = "Botón: " + listeners.labelName + ": " + SalesforceInteractions.cashDom(event.target.parentNode.querySelector(".paywall-card__title")).text()
    }

    if (listeners.labelName === 'Ticker') {
        const container = event.target.closest(".masthead__ticker-item");
        const child = container.querySelector(".masthead__ticker-name");

        dataName = "Botón: " + listeners.labelName + ": " +
            SalesforceInteractions.cashDom(child).text();
    }

     if (listeners.labelName == "Dolares|Siguiendo") {
        const card = event.target.closest(".markets-feed__card");
        const title = card.querySelector(".markets-feed__card__name a");

        if (title) {
            dataName = "Dolares Siguiendo: - " + SalesforceInteractions.cashDom(title).text();
        }
    }
    
   if (listeners.labelName === 'Botón - indicador') {
        const container = event.target.closest(".markets-navigation__item");
        const child = container.querySelector(".markets-navigation__button");

        dataName = listeners.labelName + ": " +
            SalesforceInteractions.cashDom(child).text();
    }

    if (listeners.labelName == "TAGS") {
        switch (event.target.innerText) {
            case "EDICIÓN IMPRESA":
                dataName = "TAG: " + nameTarget
                break;
            case "DÓLAR":
                dataName = "TAG: " + nameTarget
                break;
            case "DÓLAR BLUE":
                dataName = "TAG: " + nameTarget
                break;
            case "QUIÉN ES QUIÉN":
                dataName = "TAG: " + nameTarget
                break;
            default:
                isSend = false
                break;
        }
    }

    SalesforceInteractions.sendEvent({
        interaction: { name: dataName },
        user: {
            attributes: {
                emailAddress: emailPerso,
                name: firstNamePerso,
                lastName: lastNamePerso,
                isAnonimusPerso
            }
        }
    });
}

/***********************
 * PAGE TYPES DEFINICIÓN
 ***********************/
const home = new PageType(
    "Home",
    "",
    { name: "Home View" },
    homeListeners,
    false
);

const homeEspana = new PageType(
    "HomeEspana",
    "/espana",
    { name: "Home España View" },
    homeListeners,
    false
);

const homeMexico = new PageType(
    "HomeMexico",
    "/mexico",
    { name: "Home Mexico View" },
    homeListeners,
    false
);

const homeColombia = new PageType(
    "HomeColombia",
    "/colombia",
    { name: "Home Colombia View" },
    homeListeners,
    false
);

const homeUSA = new PageType(
    "HomeUsa",
    "/usa",
    { name: "Home USA View" },
    homeListeners,
    false
);

const payWall = new PageType(
    "PayWall",
    "/suscripciones" || "/suscripciones/?utm_id=direct",
    { name: "PayWall View" },
    payWallListeners,
    false
);


const perfil = new PageType(
    "Perfil", 
    "/usuario/perfil", 
    { name: "Perfil View" }, 
    perfilListeners, 
    false
);

const landingDolar = new PageType(
    "Landing Dólar", 
    "/MercadosOnline/dolar.html", 
    { name: "Landing Dólar View" }, 
    landingDolarListeners, 
   false);

const mercadosOnline = new PageType(
    "Mercados Online", 
    "/informacion-de-mercados", 
    { name: "Mercados online View" }, 
    mercadosOnlineListeners, 
    false);

const article = new PageType(
    "Article",
    null,
    { name: "Article View" },
    articleListeners,
    false
);

const cotizaciones = new PageType(
    "Cotizaciones", 
    "/MercadosOnline", 
    { name: "Cotizaciones View" },
    cotizacionesListeners, 
    false);

const globalData = new PageType(
    "Datos Globales", 
    "/datos", 
    { name: "Datos Globales View" },
    [], 
    false);

    
const landingEventosGeneral = new PageType(
    "Eventos General", 
    "/eventos", 
    { name: "Eventos General View" },
    [], 
    false);

const landingEvento = new PageType(
    "Evento", 
    "/eventos", 
    { name: "Eventos View" },
    [], 
    false);    

const logInWall = new PageType(
    "LogInWall", 
    "/ingresa", 
     { name: "LogInWall View" },
    logInWallListeners, 
    false);

const suscriptionsForm = new PageType(
    "Suscriptions form", 
    "/suscripciones/plan-xxx", 
    { name: "Suscriptions form View" },
    suscriptionsFormListeners, 
    false);

const temas = new PageType(
    "Tema", 
    "/tema/", 
    { name: "Temas View" },
    [], 
    false);
    
const columnistas = new PageType(
    "Columnistas", 
    "/columnistas", 
    { name: "Columnistas View" },
    [], 
    false);



/***********************
 * PAGE TYPES ARRAY (FILTRADO)
 ***********************/
function Pages() {
     pagesPerso.push(home, homeEspana, payWall, perfil, landingDolar, mercadosOnline, article, cotizaciones, globalData, landingEventosGeneral, logInWall, suscriptionsForm,temas,columnistas,homeMexico,homeColombia,homeUSA);
     return pagesPerso
}

function observePaywall() {
    if (window.__paywallObserved) return;
    window.__paywallObserved = true;

    const observer = new MutationObserver(() => {
        const paywall = document.querySelector(".paywall-chain--show");
        if (paywall && !paywall.dataset.sfTracked) {
            paywall.dataset.sfTracked = "true";

            SalesforceInteractions.sendEvent({
                interaction: {
                    name: "Paywall Shown"
                }
            });

            observer.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

/***********************
 * ENTORNO
 ***********************/
function esURLValida(url) {
    const match = url.match(/^https:\/\/(dev|qa|qa2|www)\.cronista\.com/i);
    if (match) {
        enviromentPerso = match[0];
    } else if (url.includes("arc-cdn.net")) {
        enviromentPerso = "https://elcronista-el-cronista-sandbox.web.arc-cdn.net";
    } else {
        enviromentPerso = "";
    }
}

   
/***********************
     // --- Funciones para construir el catalogObject de forma síncrona ---
 ***********************/
function buildArticleInteraction() {
    const metaTag = document.querySelector('meta[property="og:image"]');
    if (!metaTag || !window.Fusion?.globalContent) return null;

    const articleId = Fusion.globalContent._id
        ? String(Fusion.globalContent._id)
        : null;

    if (!articleId) return null;

    const headlineBasic = Fusion.globalContent.headlines.basic || "";
    const subheadline = Fusion.globalContent.subheadlines.basic || "";
    const imageUrl = metaTag.getAttribute('content');
    const sectionText =
        SalesforceInteractions.cashDom(".masthead__main-titled-section").text() || "";
    const creator = Fusion.globalContent.creator || "";
    const publishDate = Fusion.globalContent.publish_date
        ? new Date(Fusion.globalContent.publish_date).toISOString()
        : null;
    const canonicalUrl = Fusion.globalContent.canonical_url || window.location.href;
    const accessCondition =
        Fusion.globalContent.content_restrictions?.content_code || "";

    return {
        name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
        catalogObject: {
            type: "Article",
            id: articleId,
            attributes: {
                url: canonicalUrl,
                name: headlineBasic,
                description: subheadline,
                imageUrl,
                articleId,
                seccion: sectionText,
                articleTitle: headlineBasic,
                publishDate,
                authorName: creator,
                canonicalUrl,
                accessCondition
            },
            relatedCatalogObjects: {
                Category: [sectionText.toUpperCase()],
                Autores: [creator.toUpperCase()],
                CondicionDeAcceso: [accessCondition.toUpperCase()]
            }
        }
    };
}

function buildCotizacionesInteraction() {
    if (!window.Fusion?.globalContent) return null;

    const {
        _id,
        Nombre,
        tokenValue
    } = Fusion.globalContent;

    if (!_id) return null;

    return {
        name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
        catalogObject: {
            type: "Cotizaciones",
            id: String(_id),
            attributes: {
                url: window.location.href,
                name: Nombre || "",
            },
            relatedCatalogObjects: {
                TipoDeCotizaciones: tokenValue
                    ? [tokenValue.toUpperCase()]
                    : []
            },
        },
    };
}


/***********************
 * INIT SALESFORCE
 ***********************/
function waitForPageReady(callback) {
    let attempts = 0;
    const maxAttempts = 50;

    const interval = setInterval(() => {
        attempts++;

        const fusionReady = !!window.Fusion?.globalContent;
        const bodyReady = document.readyState === "complete";

        if (fusionReady && bodyReady) {
            clearInterval(interval);
            callback();
        }

        if (attempts >= maxAttempts) {
            clearInterval(interval);
        }
    }, 100);
}

function getCookieDomain() {
    const host = window.location.hostname;
    // Producción
    if (host === "cronista.com" || host.endsWith(".cronista.com")) {
        return "cronista.com";
    }

    // Desarrollo / local
    return host; 
    // o null si no querés cookie cross-domain
}


SalesforceInteractions.init({
    cookieDomain: getCookieDomain()
}).then(() => {

    const sitemapConfig = {
        global: {
            onActionEvent: GlobalActions,
            contentZones: globalZones,
            listeners: GenerateListeners("Global", globalListeners)
        },
        pageTypeDefault: {
            name: "default",
            interaction: { name: "Default Page" }
        },
        pageTypes: Pages()
    };

    if (window.__sfSitemapInitialized__) return;
    window.__sfSitemapInitialized__ = true;
    
    waitForPageReady(() => {
        console.log("SITEMAP OK", sitemapConfig);
        SalesforceInteractions.initSitemap(sitemapConfig);
    });
});