let enviroment = "";
let pages = []

esURLValida(window.location.href)

//DATOS DE USUARIO
const email = vsm.session.email != "" ? vsm.session.email : "";
const idUser = vsm.session.id != "" ? vsm.session.id : "";
const firstName = vsm.session.name != "" ? vsm.session.name : "";
const lastName = vsm.session.lastName != "" ? vsm.session.lastName : "";
const isSuscriber = site.session.isSuscriber() && site.session != undefined ? "Suscriptor" : "Usuario";
let dateTime = new Date();
dateTime = `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} - hora ${dateTime.getHours()}:${dateTime.getMinutes()}`

let isMatch = false
let url = ""

//Zonas Genericas
let globalZones = [
    { name: "Header", selector: '#page-header' },
    { name: "Footer", selector: '#page-footer' },
]

//SELECTORES Genericos
let globalListeners = [
    { class: "#page-header-session-box .sign-in-button", labelName: 'Botón Ingresar' },
    { class: "#page-header-middle .b-suscription", labelName: 'Botón Suscribite' },
    { class: ".svg-icon.menu", labelName: 'Botón MENU sitio' },
    { class: ".session.with-avatar", labelName: 'Botón MENU mi perfil' },
    { class: ".session-options li:nth-child(2) a", labelName: 'Botón MI PERFIL' },
    { class: "#main-menu ul li a", labelName: 'TAGS' },
    { class: ".piece.markets.standard ul li", labelName: 'TICKERS' },
]

//SELECTORES Home
let homeListeners = [
    { class: `.section article.item`, labelName: '' },
    { class: `.sectionfull article.item`, labelName: '' },
    { class: `article.locked`, labelName: 'Article Member from Home' },
    { class: `.columnists .items article.item`, labelName: 'Clumnists from Home' },
]

//SELECTORES PayWall
let payWallListeners = [
    { class: `.page.suscripciones a.logo`, labelName: 'Botón - Header Logo El Cronista from Pay Wall' },
    { class: `.suscripcion .items .item .button`, labelName: 'Quiero suscribirme' },
    { class: `.suscripcion .items .item .list_items`, labelName: 'Botón - Mostrar detalles de  planes' },
    { class: "#page-header-session-box .sign-in-button", labelName: 'Botón Ingresar From Pay wall' },
    { class: `.otros-planes .otros-planes__item:first-child p a`, labelName: 'Botón - Plan Jubilado' },
    { class: `.otros-planes .otros-planes__item:nth-child(2) p a`, labelName: 'Botón - Plan Estudiante' },
    { class: `.page.suscripciones .whatsapp-wrapper`, labelName: 'Botón Whatsapp from Pay Wall' },
    { class: `.footer-footer a:first-child`, labelName: 'Botón Terminos y condiciones from Pay Wall' },
    { class: `.footer-footer a:nth-child(2)`, labelName: 'Botón Precios vigentes from Pay Wall' },
]

//SELECTORES Articulo
let articleListeners = [
    { class: `nav.breadcrumb ol li a span`, labelName: 'Breadcrumb' },
    { class: `.speakText`, labelName: 'Botón Escuchar' },
    { class: `#content-share`, labelName: 'Botón Compartir' },
    { class: `.more-list .whatsapp`, labelName: 'Botón Compartir whatsapp' },
    { class: `.more-list .facebook`, labelName: 'Botón Compartir facebook' },
    { class: `.more-list .twitter`, labelName: 'Botón Compartir twitter' },
    { class: `.more-list .linkedIn`, labelName: 'Botón Compartir linkedIn' },
    { class: `.more-list .email`, labelName: 'Botón Compartir email' },
    { class: `.more-list .comments`, labelName: 'Botón Compartir comments' },
    { class: `#bookmark`, labelName: 'Botón Guardar' },
    { class: `.b-suscription-full`, labelName: 'Botón/Caja: Queremos que seas parte de Members' },
]

//Interacciones
let homeInteractions = {
    name: "Home"
}

let payWallInteractions = {
    name: "PayWall"
}

const home = new PageType("Home", "cronista.com", homeInteractions, homeListeners, false);
const payWall = new PageType("PayWall", `cronista.com/suscripciones`, payWallInteractions, payWallListeners, false);

if (document.querySelector("#pagecontent .news") || document.querySelector("#pagecontent .news-minisite") || document.querySelector("#pagecontent .news-es") || document.querySelector("#pagecontent .news-mx")) {
    const metaTag = document.querySelector('meta[property="og:image"]');
    let interaction = {
        name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
        catalogObject: {
            type: "Article",
            id: window.cronistaDataLayer[0].articleProperty.id,
            attributes: {
                url: window.location.href,
                name: SalesforceInteractions.resolvers.fromSelector("#content-title"),
                description: SalesforceInteractions.resolvers.fromSelector(".description"),
                imageUrl: metaTag ? metaTag.getAttribute('content') : null,
                articleId: window.cronistaDataLayer[0].articleProperty.id.toString(),
                seccion: window.cronistaDataLayer[0].articleProperty.category,
                articleTitle: SalesforceInteractions.resolvers.fromSelector("#content-title"),
                publishDate: SalesforceInteractions.resolvers.fromSelector(".author-date time"),
                authorName: window.cronistaDataLayer[0].articleProperty.authorName,
                canonicalUrl: window.cronistaDataLayer[0].articleProperty.canonica,
                accessCondition: window.cronistaDataLayer[0].articleProperty.conditionsOfAccess
            },
        },
    }
    let article = new PageType("Article", window.location.href, interaction, articleListeners, document.querySelector("#pagecontent .news"));
    console.log(article.interaction)
    pages.push(article)
}

//[home, payWall, article]
function Pages() {
    pages.push(home, payWall)
    return pages
}

function PageType(name, myUrl, interaction, myEvents, isArticle) {
    this.name = name;
    this.isMatch = () => {
        let url = window.location.href;
        if (url.includes('?')) {
            url = url.slice(0, window.location.href.lastIndexOf('?'));
        }
        if (url.charAt(url.length - 1) === '/') {
            url = url.slice(0, window.location.href.lastIndexOf('/'));
        }
        if (isArticle) {
            isMatch = true
        } else {
            isMatch = (url === `${enviroment}${myUrl}` ? true : false);
        }
        return isMatch;
    };
    this.interaction = interaction;
    this.listeners = GenerateListeners(name, myEvents);
    if (name == "PayWall") {
        this.onActionEvent = (actionEvent) => {
            return PayWallActions(actionEvent);
        }
    }
}

function GlobalActions(actionEvent) {
    url = window.location.href
    if (email) {
        actionEvent.user = actionEvent.user || {};
        actionEvent.user.attributes = actionEvent.user.attributes || {};
        actionEvent.user.identities = actionEvent.user.identities || {};
        actionEvent.user.attributes.URL || {};
        actionEvent.user.attributes.contentZones || {};
        actionEvent.user.attributes.emailAddress = email;
        actionEvent.user.attributes.isSuscription = isSuscriber;
        actionEvent.user.attributes.name = firstName;
        actionEvent.user.attributes.lastName = lastName;
        actionEvent.user.attributes.date = dateTime
        actionEvent.user.identities.userIdCms = idUser;
    }
    return actionEvent;
}

function PayWallActions(actionEvent) {
    let limit = new URL(window.location.href).searchParams.get("limit")
    actionEvent.user = actionEvent.user || {};
    actionEvent.user.attributes = actionEvent.user.attributes || {};
    if (limit != null) {
        const isLimit = limit === 'true';
        actionEvent.user.attributes.typeOfEntry = !isLimit ? "choque exclusivo" : "choque metered";
        let continueUrl = new URL(window.location.href).searchParams.get("continue")
        actionEvent.user.attributes.continueUrl = continueUrl;
    } else {
        actionEvent.user.attributes.typeOfEntry = "Choque directo";
    }

    return actionEvent;
}

function ReadHomeBlocks(event) {
    let main = document.querySelector('.main-container');
    let block1 = main.childNodes[0].querySelectorAll('article.item');
    let block2 = main.childNodes[2].querySelectorAll('article.item')
    sendDataFromHomeBlocks("Click, Article from home (Bloque1)", event, block1)
    sendDataFromHomeBlocks("Click, Article from home (Bloque2)", event, block2)
}

function sendDataFromHomeBlocks(nameEvent, target, container) {

    for (let i = 0; i < container.length; i++) {
        if (target === container[i]) {
            SalesforceInteractions.sendEvent({
                interaction: {
                    name: nameEvent,
                },
                user: {
                    identities: {
                        emailAddress: email
                    },
                    attributes: {
                        name: userName
                    }
                }
            });
            break;
        }

    }

}

function ReadGlobalEvents(event, listeners) {
    let dataName = listeners.labelName

    if (listeners.labelName == "TICKERS" || listeners.labelName == "TAGS") {
        dataName = listeners.labelName + ": " + SalesforceInteractions.cashDom(event.target).text()
    }

    if (listeners.labelName == 'Quiero suscribirme') {
        dataName = "Botón: " + listeners.labelName + ": " + SalesforceInteractions.cashDom(event.target.parentNode.querySelector(".title")).text()
    }

    if (listeners.labelName == 'Breadcrumb') {
        dataName = listeners.labelName + ": " + SalesforceInteractions.cashDom(event.target).text()
    }

    SalesforceInteractions.sendEvent({
        interaction: {
            name: dataName,
            attributes: {
                userIdCms: idUser,
                name: userName,
                lastName: userName,
                isSuscriber: isSuscriber,
                emailAddress: email,
                continueUrl: url
            },
        },
    });

}

function GenerateContentZones(zones) {

    let ContentZones = [];
    if (zones.length > 0) {
        for (let i = 0; i < zones.length; i++) {
            let ContentZone = {
                name: zones[i].name,
                selector: zones[i].selector
            }
            ContentZones.push(ContentZone)
        }
    }
    return ContentZones;
}

function GenerateListeners(pageType, elements) {
    let listeners = [];

    if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {

            if (pageType == "Home" && (elements[i].class == elements[0].class || elements[i].class == elements[1].class)) {
                let myEventsBlock = SalesforceInteractions.listener("click", elements[i].class, (e) => {
                    ReadHomeBlocks(e.currentTarget)
                })
                listeners.push(myEventsBlock)
            } else {
                let myEvents = SalesforceInteractions.listener("click", `${elements[i].class}`, (e) => {
                    e.preventDefault()
                    ReadGlobalEvents(e, elements[i])
                    e.stopPropagation();
                })

                listeners.push(myEvents)
            }
        }
    }
    return listeners;
}

function esURLValida(url) {
    var regex = url.match(/^https:\/\/(?:dev|qa|www)\./i);
    enviroment = regex[0]
}


SalesforceInteractions.init({
    cookieDomain: "cronista.com",
}).then(() => {
    const sitemapConfig = {
        global: {
            onActionEvent: (actionEvent) => {
                return GlobalActions(actionEvent);
            },
            contentZones: GenerateContentZones(globalZones),
            listeners: GenerateListeners("Global", globalListeners),
        },
        pageTypeDefault: {
            name: "default",
            interaction: {
                name: "Default Page",
            }
        },
        pageTypes: Pages()
    };
    SalesforceInteractions.initSitemap(sitemapConfig);
});

