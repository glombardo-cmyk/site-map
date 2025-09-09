let enviroment = "";
let pages = []

esURLValida(window.location.href)

//DATOS DE USUARIO
let isAnonimus = false;
let isWebApp = false;
let email = "";
let idUser = "";
let firstName = "";
let lastName = "";
let isSuscriber = "Usuario";
let userDni = "";
let phone = "";

if (typeof vsm.loggedIn === 'function') {
    // La función existe
    isAnonimus = vsm.loggedIn() === false || vsm.loggedIn() === null || vsm.loggedIn() === undefined ? true : false
    isWebApp = site.isWebAPP;
    email = vsm.session.email != "" ? vsm.session.email : "";
    idUser = vsm.session.id != "" ? vsm.session.id : "";
    firstName = vsm.session.name != "" ? vsm.session.name : "";
    lastName = vsm.session.lastName != "" ? vsm.session.lastName : "";
    isSuscriber = site.session.isSuscriber() && site.session != undefined ? "Suscriptor" : "Usuario";
}
let isMatch = false
let url = ""
let dateTime = new Date();
dateTime = `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} - hora ${dateTime.getHours()}:${dateTime.getMinutes()}`


//Zonas Genericas
let globalZones = [
    { name: "Header", selector: '#page-header' },
    { name: "Footer", selector: '#page-footer' },
]

//SELECTORES Genericos
let globalListeners = [
    { class: "#page-header-session-box .sign-in-button", labelName: 'Botón Ingresar', ItPropagation: false },
    { class: "#page-header-middle .b-suscription", labelName: 'Botón Suscribite', ItPropagation: false },
    { class: ".svg-icon.menu", labelName: 'Botón MENU sitio', ItPropagation: false },
    { class: ".session.with-avatar", labelName: 'Botón MENU mi perfil', ItPropagation: true },
    { class: ".session-options li:nth-child(2) a", labelName: 'Botón MI PERFIL', ItPropagation: true },
    { class: "#main-menu ul li a", labelName: 'TAGS', ItPropagation: false },
    { class: "#page-header .piece.markets.standard ul li", labelName: 'TICKERS', ItPropagation: false },
    { class: ".mitem.pwa-signed-in.session-box", labelName: 'Botón MENU mi perfil (MOBILE)', ItPropagation: true },
    { class: ".mitem.pwa-signed-in.session-box .session-options li:nth-child(2) a", labelName: 'Botón MI PERFIL (MOBILE)', ItPropagation: true },
    { class: ".pwa-footer-fixed-bar .mitem.dolar", labelName: 'Botón MENU Dólar (MOBILE)', ItPropagation: false },
]

//SELECTORES Home
let homeListeners = [
    { class: `.section article.item`, labelName: '', ItPropagation: false },
    { class: `.sectionfull article.item`, labelName: '', ItPropagation: false },
    { class: `article.locked`, labelName: 'Article Member from Home', ItPropagation: false },
    { class: `.columnists .items article.item`, labelName: 'Clumnists from Home', ItPropagation: false },
      { class: "#onboardingUsuarioHome .panel.step-panel.selected[index='3'] .botonera .btn-verde", labelName: 'Botón: Descubrí Members', ItPropagation: false },
    { class: "#onboardingSuscriptorHome .panel.step-panel.selected[index='4'] .botonera .btn-blanco", labelName: 'Botón: ir a Newsletter', ItPropagation: false },
    { class: "#onboardingSuscriptorHome .panel.step-panel.selected[index='5'] .botonera .btn-blanco", labelName: 'Botón: Ir al Quién es quién', ItPropagation: false },
    { class: "#onboardingSuscriptorHome .panel.step-panel.selected[index='5'] .botonera .btn-verde", labelName: 'Botón: Seguir navegando', ItPropagation: false },
    { class: "#user-notification-message a.close", labelName: 'Botón cerrar modal onboarding en Home', ItPropagation: false }
]

//SELECTORES PayWall
let payWallListeners = [
    { class: `.page.suscripciones a.logo`, labelName: 'Botón - Header Logo El Cronista from Pay Wall', ItPropagation: false },
    { class: `.suscripcion .items .item .button`, labelName: 'Quiero suscribirme', ItPropagation: false },
    { class: `.suscripcion .items .item .list_items`, labelName: 'Botón - Mostrar detalles de  planes', ItPropagation: false },
    { class: "#page-header-session-box .sign-in-button", labelName: 'Botón Ingresar From Pay wall', ItPropagation: false },
    { class: `.otros-planes .otros-planes__item:first-child p a`, labelName: 'Botón - Plan Jubilado', ItPropagation: false },
    { class: `.otros-planes .otros-planes__item:nth-child(2) p a`, labelName: 'Botón - Plan Estudiante', ItPropagation: false },
    { class: `.page.suscripciones .whatsapp-wrapper`, labelName: 'Botón Whatsapp from Pay Wall', ItPropagation: false },
    { class: `.footer-footer a:first-child`, labelName: 'Botón Terminos y condiciones from Pay Wall', ItPropagation: false },
    { class: `.footer-footer a:nth-child(2)`, labelName: 'Botón Precios vigentes from Pay Wall', ItPropagation: false },
    { class: `.cardGroup #planCorpo`, labelName: 'Planes Corporativos', ItPropagation: false },
    { class: `.cardGroup #needHelp`, labelName: '¿Necesitás ayuda?', ItPropagation: false },
]

//SELECTORES LogInWall
let logInWallListeners = [
    { class: `#appleid-signin`, labelName: 'Botón - Iniciar sesión con Apple', ItPropagation: false },
    { class: `#facebook`, labelName: 'Botón - Iniciar sesión con Facebook', ItPropagation: false },
    { class: `#google`, labelName: 'Botón - Iniciar sesión con Google', ItPropagation: false },
    { class: `#vpllocallogin .localloginbtn`, labelName: 'Botón - Iniciá sesión con tu E-mail', ItPropagation: false },
    { class: `.submit`, labelName: 'Botón - Iniciar sesión', ItPropagation: false },
    { class: `.signup a`, labelName: 'Botón - Registrate', ItPropagation: false },
    { class: `.forgotpassword a`, labelName: 'Botón - Olvidé mi contraseña', ItPropagation: false },
    { class: `.terminosypolitica a:first-child`, labelName: 'Botón - Política de privacidad', ItPropagation: false },
    { class: `.terminosypolitica a:nth-child(2)`, labelName: 'Botón - Terminos y condiciones', ItPropagation: false },
    { class: `#vplsignup input.vsmform.submit`, labelName: 'Botón - Registrarme', ItPropagation: false },
]

let landingEventosListeners = [
    { class: `#btnInscribite`, labelName: 'Botón - Inscribite', ItPropagation: false },
    { class: `.vsmform.submit`, labelName: 'Botón - Confirmar', ItPropagation: false },
]


//SELECTORES Articulo
let articleListeners = [
    { class: `nav.breadcrumb ol li a span`, labelName: 'Breadcrumb', ItPropagation: false },
    { class: `.speakText`, labelName: 'Botón Escuchar', ItPropagation: false },
    { class: `#content-share`, labelName: 'Botón Compartir' },
    { class: `.more-list .whatsapp a`, labelName: 'Botón Compartir whatsapp', ItPropagation: true },
    { class: `.more-list .facebook a`, labelName: 'Botón Compartir facebook', ItPropagation: true },
    { class: `.more-list .twitter a`, labelName: 'Botón Compartir twitter', ItPropagation: true },
    { class: `.more-list .linkedIn a`, labelName: 'Botón Compartir linkedIn', ItPropagation: true },
    { class: `.more-list .email a`, labelName: 'Botón Compartir email', ItPropagation: true },
    { class: `.more-list .comments a`, labelName: 'Botón Compartir comments', ItPropagation: true },
    { class: `#bookmark`, labelName: 'Botón Guardar', ItPropagation: false },
    { class: `.b-member-black .button-wrapper`, labelName: 'Botón/Caja: Invertí en periodismo de calidad', ItPropagation: false },
    { class: `#powerbeans-widget button[role="switch"]#airplane-mode`, labelName: 'Botón/tabs play reproductor', ItPropagation: false },
    { class: `#powerbeans-widget .beans-flex.beans-items-center.beans-justify-center.beans-border.beans-border-solid.beans-rounded-3xl.beans-cursor-pointer.powerbeans_btn`, labelName: 'Botón Play reproductor Powerbeans', ItPropagation: false },
    { class: `.summary-ai.s-ai.show`, labelName: 'Botón Leer resumen', ItPropagation: false },
]

//SELECTORES LANDING DÓLAR
let landingDolarListeners = [
    { class: ".dolar .markets table tr", labelName: 'dolares', ItPropagation: false },
    { class: `nav.breadcrumb ol li a span`, labelName: 'Breadcrumb', ItPropagation: false },
]

//SELECTORES MERCADOS ONLINE
let mercadosOnlineListeners = [
    { class: `nav.breadcrumb ol li a span`, labelName: 'Breadcrumb', ItPropagation: false },
]

//SELECTORES Cotizaciones
let cotizacionesListeners = [
    { class: `nav.breadcrumb ol li a span`, labelName: 'Breadcrumb', ItPropagation: false },
    { class: `.markets.button #button-follow`, labelName: 'Seguir (cotización)', ItPropagation: false },
]

//SELECTORES streaming exclusivo
let streamingExclusivoListeners = [
    { class: "#paywallButton-btn", labelName: 'Quiero participar', ItPropagation: false }
]

//SELECTORES formulario de suscripciones
let suscriptionsFormListeners = [
    { class: ".panels .panel:first-child form .button", labelName: 'Botón form siguiente 1', ItPropagation: false },
    { class: ".panels .panel:nth-child(2) form .button:first-child", labelName: 'Botón volver formulario', ItPropagation: false },
]

//SELECTORES perfil
let perfilListeners = [
    { class: ".panel.step-panel.selected[index='3'] .botonera .btn-verde", labelName: 'Botón Entendido modal (¿Tenés alguna duda?)', ItPropagation: false },
    { class: "#user-notification-message a.close", labelName: 'Botón cerrar modal', ItPropagation: false },
    { class: ".sectionsummary__button-group a.button", labelName: 'Botón Cancelar suscripción', ItPropagation: false }
]

//Interacciones
let homeInteractions = {
    name: "Home"
}

let payWallInteractions = {
    name: PayWallIteractionName()
}

let logInWallInteractions = {
    name: "LogInWall"
}

let landingDolarInteractions = {
    name: "Landing Dólar"
}

let mercadosOnlineInteractions = {
    name: "Mercados online"
}

let confirmacionOnAirInteractions = {
    name: "Confirmacion On Air"
}

let streamingExclusivoInteractions = {
    name: "Streaming Exclusivo"
}

let suscriptionsFormInteractions = {
    name: "Suscriptions form"
}

let suscriptionsConfirmInteractions = {
    name: "Suscriptions Confirm"
}

let globalDataInteractions = {
    name: "Datos Globales"
}

let landingEventosGeneralInteractions = {
    name: "Eventos General"
}

let landingEventosInteractions = {
    name: "Inscripción a eventos"
}

let perfilInteractions = {
    name: "Perfil"
}

//LLamadas a las distintas page type para el match
const home = new PageType("Home", "cronista.com", homeInteractions, homeListeners, false);
const payWall = new PageType("PayWall", "cronista.com/suscripciones", payWallInteractions, payWallListeners, false);
const logInWall = new PageType("LogInWall", "cronista.com/ingresa", logInWallInteractions, logInWallListeners, false);
const landingDolar = new PageType("Landing Dólar", "cronista.com/MercadosOnline/dolar.html", landingDolarInteractions, landingDolarListeners, document.querySelector(".page.dolar"));
const mercadosOnline = new PageType("Mercados Online", "cronista.com/informacion-de-mercados", mercadosOnlineInteractions, mercadosOnlineListeners, false);
const streamingExclusivo = new PageType("Streaming Exclusivo", "cronista.com/on-air/streaming-exclusivo", streamingExclusivoInteractions, streamingExclusivoListeners, false);
const confirmacionOnAir = new PageType("ConfirmacionOnAir", "cronista.com/on-air/confirmacion-onair", confirmacionOnAirInteractions, [], false);
const suscriptionsForm = new PageType("Suscriptions form", "cronista.com/suscripciones/plan-xxx", suscriptionsFormInteractions, suscriptionsFormListeners, false);
//La confirmación a la suscripción se va trackear directamente en el archivo suscription.js del cms
//const suscriptionsConfirm = new PageType("Suscriptions Confirm", "cronista.com/suscripciones/plan-xxx/#listo", suscriptionsConfirmInteractions, [], false);
const globalData = new PageType("Datos Globales", "cronista.com/datos", globalDataInteractions, [], false);
const landingEventosGeneral = new PageType("Eventos General", "cronista.com/eventos", landingEventosGeneralInteractions, [], false);
const landingInternaEvento = new PageType("Inscripción a eventos", "cronista.com/eventos/", landingEventosInteractions, landingEventosListeners, false);
const perfil = new PageType("Perfil", "cronista.com/0/perfil", perfilInteractions, perfilListeners, false);



if (validarParteDeURL(window.location.href, "MercadosOnline") && !validarParteDeURL(window.location.href, "cronista.com/MercadosOnline/dolar.html")) {
    let cotizacionesInteractions = {
        name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
        catalogObject: {
            type: "Cotizaciones",
            id: window.cronistaDataLayer[0].articleProperty.id,
            attributes: {
                url: window.location.href,
                name: SalesforceInteractions.cashDom(".section-header-title a").text(),
            },
            relatedCatalogObjects: {
                TipoDeCotizaciones: SalesforceInteractions.DisplayUtils.pageElementLoaded(
                    "html",
                ).then((ele) => {
                    return [window.cronistaDataLayer[0].articleProperty.category.toUpperCase()]
                }),
            },
        },
    }
    let cotizaciones = new PageType("Cotizaciones", "cronista.com/MercadosOnline", cotizacionesInteractions, cotizacionesListeners, false);
    pages.push(cotizaciones)
}

if (document.querySelector("#pagecontent .news") || document.querySelector("#pagecontent .news-minisite") || document.querySelector("#pagecontent .news-es") || document.querySelector("#pagecontent .news-mx")) {



    const metaTag = document.querySelector('meta[property="og:image"]');
    if (metaTag != null) {
        let interaction = {
            name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
            catalogObject: {
                type: "Article",
                id: window.cronistaDataLayer[0].articleProperty.id,
                attributes: {
                    url: window.location.href,
                    name: SalesforceInteractions.resolvers.fromSelector("#content-title"),
                    description: SalesforceInteractions.resolvers.fromSelector(".description"),
                    imageUrl: metaTag ? metaTag.getAttribute('content') : "https://www.cronista.com/files/image/514/514552/63fffa1910bdd.png",
                    articleId: window.cronistaDataLayer[0].articleProperty.id.toString(),
                    seccion: window.cronistaDataLayer[0].articleProperty.category,
                    articleTitle: SalesforceInteractions.resolvers.fromSelector("#content-title"),
                    publishDate: SalesforceInteractions.resolvers.fromSelector(".author-date time"),
                    authorName: window.cronistaDataLayer[0].articleProperty.authorName,
                    canonicalUrl: window.cronistaDataLayer[0].articleProperty.canonica,
                    accessCondition: window.cronistaDataLayer[0].articleProperty.conditionsOfAccess
                },
                relatedCatalogObjects: {
                    Category: SalesforceInteractions.DisplayUtils.pageElementLoaded(
                        "html",
                    ).then((ele) => {
                        return [window.cronistaDataLayer[0].articleProperty.category.toUpperCase()]
                    }),
                    Autores: SalesforceInteractions.DisplayUtils.pageElementLoaded(
                        "html",
                    ).then((ele) => {
                        return [window.cronistaDataLayer[0].articleProperty.authorName.toUpperCase()]
                    }),
                    CondicionDeAcceso: SalesforceInteractions.DisplayUtils.pageElementLoaded(
                        "html",
                    ).then((ele) => {
                        return [window.cronistaDataLayer[0].articleProperty.conditionsOfAccess.toUpperCase()]
                    }),
                },
            },

        }
        let article = new PageType("Article", window.location.href, interaction, articleListeners, document.querySelector("#pagecontent .news"));
        pages.push(article)
    }
}

function noTieneClase(elemento, clase) {
    if (elemento) { // Verifica si el elemento no es null
        return !elemento.classList.contains(clase);
    } else {
        console.error('El elemento es null o no existe en el DOM.');
        return false; // O lanza un error, según lo que necesites
    }
}


//Función que devuelve el array con las info de las pageType
/*[home, payWall, article, logInWall, landingDolar, mercadosOnline, confirmacionOnAir,
streamingExclusivo, suscriptionsForm, suscriptionsConfirm, landingEventosGeneral, landingEventos,perfil]*/
function Pages() {
    pages.push(home, payWall, logInWall, landingDolar, mercadosOnline, confirmacionOnAir, streamingExclusivo, suscriptionsForm, globalData, landingEventosGeneral, landingInternaEvento, perfil)
    return pages
}

//MATCH PAGE
function PageType(name, myUrl, interaction, myEvents, IsTemplate) {
    this.name = name;
    this.isMatch = () => {
        let url = window.location.href;
        if (url.includes('?')) {
            url = url.slice(0, window.location.href.lastIndexOf('?'));
        }
        if (url.charAt(url.length - 1) === '/') {
            url = url.slice(0, -1);
        }

        //VALIDO POR TEMPLATE SI EXISTE LA CLASE
        if (IsTemplate) {
            isMatch = true
        } else {
            //VALIDO POR URL
            isMatch = (url === `${enviroment}${myUrl}` ? true : false);
            if (name == "Cotizaciones" && validarParteDeURL(url, "MercadosOnline")) {
                isMatch = true
            }
            if (name == "Suscriptions form" && validarParteDeURL(url, "cronista.com/suscripciones/plan-") && !validarParteDeURL(url, "/#listo")) {
                isMatch = true
            }
            if (name == "Inscripción a eventos" && validarParteDeURL(url, "cronista.com/eventos/") && !validarParteDeURL(url, "cronista.com/eventos/thankyou-page")) {
                interaction.name = name + ": " + SalesforceInteractions.cashDom(document.querySelector(".eventtitle")).text()

                isMatch = true
            }
            if (name == "Inscripción a eventos" && validarParteDeURL(url, "cronista.com/eventos/thankyou-page")) {
                interaction.name = name + ": Thankyou-page" + " " + SalesforceInteractions.cashDom(document.querySelector(".eventtitle")).text()
                isMatch = true
            }

        }
        return isMatch;
    };
    this.interaction = interaction;
    this.listeners = GenerateListeners(name, myEvents);
}

function validarParteDeURL(url, parte) {
    const parteEscapada = parte.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(parteEscapada);
    return regex.test(url);
}

//acciones globales del usuario
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
        actionEvent.user.attributes.isWebApp = isWebApp;
        actionEvent.user.attributes.name = firstName;
        actionEvent.user.attributes.lastName = lastName;
        actionEvent.user.attributes.date = dateTime
        actionEvent.user.attributes.isAnonimus = isAnonimus
        actionEvent.user.identities.userIdCms = idUser;
    }
    return actionEvent;
}

//Distingo que tipo de choque es metered/exclusivo/directo
function PayWallIteractionName() {
    let typeOfPayWall = "";
    let limit = new URL(window.location.href).searchParams.get("limit")

    if (limit != null) {
        const isLimit = limit === 'true';
        typeOfPayWall = !isLimit ? "choque exclusivo" : "choque metered";
        //let continueUrl = new URL(window.location.href).searchParams.get("continue")
        typeOfPayWall = "Pay wall - " + typeOfPayWall;
    } else {
        typeOfPayWall = "Pay wall - Choque directo";
    }

    return typeOfPayWall;
}

//Divide en bloques la home para distinguir a que nota le dio click y lo envia el evento a Perso con las caracteristicas del mismo
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
                        name: firstName,
                        lastName: lastName
                    }
                }
            });
            break;
        }

    }

}

//Envia el evento a Perso con las caracteristicas del mismo
function ReadGlobalEvents(event, listeners) {

    let dataName = listeners.labelName
    let isSend = true
    let nameTarget = SalesforceInteractions.cashDom(event.target).text()

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

    if (listeners.labelName == "TICKERS") {
        let tickerElement = event.currentTarget.querySelector("a span.name")
        dataName = listeners.labelName + ": " + SalesforceInteractions.cashDom(tickerElement).text()
    }

    if (listeners.labelName == 'Quiero suscribirme') {
        dataName = "Botón: " + listeners.labelName + ": " + SalesforceInteractions.cashDom(event.target.parentNode.querySelector(".title")).text()
    }

    if (listeners.labelName == 'Breadcrumb') {
        dataName = listeners.labelName + ": " + nameTarget
    }

    if (listeners.labelName == 'Botón - Iniciar sesión') {
        let emailAnonimus = SalesforceInteractions.cashDom(".input.username .username").val()
        email = emailAnonimus
    }

    if (listeners.labelName == 'Botón - Registrarme') {
        let emailAnonimus = SalesforceInteractions.cashDom(".vsmemail input").val()
        let registerName = SalesforceInteractions.cashDom('input[name="vsm_name"]').val()
        let registerLastName = SalesforceInteractions.cashDom('input[name="vsm_lastname"]').val()
        firstName = registerName
        lastName = registerLastName
        email = emailAnonimus
    }

    if (listeners.labelName == 'dolares') {
        dataName = "Cotización dólar: " + SalesforceInteractions.cashDom(event.currentTarget.querySelector(".name")).text()
    }
    
     if (listeners.labelName == 'Botón Cancelar suscripción') { 
        const popupDescriptionElement = document.querySelector(".popup-description");
    
        if (popupDescriptionElement) { // Comprueba si el elemento existe
            dataName = "Cancelar suscripción: " + SalesforceInteractions.cashDom(popupDescriptionElement).text();
        } else {
            console.warn("El elemento con la clase .popup-description no existe.");
        }
    }

    if (listeners.labelName == 'Botón form siguiente 1') {
        let suscriptionPhone = SalesforceInteractions.cashDom('input[name="phone"]').val()
        let suscriptionDNI = SalesforceInteractions.cashDom('input[name="document"]').val()
        let suscriptionName = SalesforceInteractions.cashDom('input[name="name"]').val()
        let suscriptionLastName = SalesforceInteractions.cashDom('input[name="lastname"]').val()
        firstName = suscriptionName
        lastName = suscriptionLastName
        userDni = suscriptionDNI
        phone = suscriptionPhone
        const dataSuscriptionForm = [suscriptionPhone, suscriptionDNI, suscriptionName, suscriptionLastName];
        for (let i = 0; i < dataSuscriptionForm.length; i++) {
            if (!dataSuscriptionForm[i].trim()) {
                isSend = false
            }
        }
    }

    if (listeners.labelName == 'Botón - Confirmar') {
        isSend = false
        const campos = [
            'vsm_name',
            'vsm_lastname',
            'vsm_eMail',
            'Ocupación',
            'vsm_company',
            'vsm_jobtitle'
        ];

        const valoresCampos = {};

        campos.forEach(nombreCampo => {
            valoresCampos[nombreCampo] = document.querySelector(`input[name="${nombreCampo}"], select[name="${nombreCampo}"]`).value;
        });

        for (let nombreCampo in valoresCampos) {
            if (!valoresCampos[nombreCampo].trim()) {
                console(`Por favor ingresa ${nombreCampo.replace('_', ' ')}.`);
                break;
            }
        }

        SalesforceInteractions.sendEvent({
            interaction: {
                name: dataName + ": " + SalesforceInteractions.cashDom(document.querySelector(".eventtitle")).text(),
            },
            user: {
                attributes: {
                    userIdCms: vsm.session.id,
                    name: document.querySelector('input[name="vsm_name"]').value,
                    lastName: document.querySelector('input[name="vsm_lastname"]').value,
                    dni: "",
                    phone: "",
                    isSuscriber: isSuscriber,
                    emailAddress: document.querySelector('input[name="vsm_eMail"]').value,
                    continueUrl: url,
                    isAnonimus: isAnonimus,
                    ocupacion: document.querySelector('select[name="Ocupación"]').value,
                    empresa: document.querySelector('input[name="vsm_company"]').value,
                    puesto: document.querySelector('input[name="vsm_jobtitle"]').value,
                },
            }
        });
    }

    if (isSend) {
        SalesforceInteractions.sendEvent({
            interaction: {
                name: dataName,
            },
            user: {
                attributes: {
                    userIdCms: idUser,
                    name: firstName,
                    lastName: lastName,
                    dni: userDni,
                    phone: phone,
                    isSuscriber: isSuscriber,
                    emailAddress: email,
                    continueUrl: url,
                    isAnonimus: isAnonimus
                },
            }
        });
    }


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

//Armo los listeners para enviarlos a SaleForce
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
                    if (elements[i].ItPropagation) {
                        e.stopPropagation();
                    }
                    ReadGlobalEvents(e, elements[i])
                })
                listeners.push(myEvents)
            }
        }
    }
    return listeners;
}

function esURLValida(url) {
    var regex = url.match(/^https:\/\/(?:dev|qa|qa2|www)\./i);
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