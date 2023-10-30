SalesforceInteractions.init({
    cookieDomain: "cronista.com",
}).then(() => {

    const urlCronista = 'https://qa.cronista.com/';
    const dateTime = " | " + new Date().toString()
    //DATOS DE USUARIO
    const email = vsm.session.email;
    const idUser = vsm.session.id;
    const userName = vsm.session.title;
    const isSuscriber = site.session.isSuscriber() ? "Suscriptor" : "Usuario";

    //TAGS
    let edicionImpresaTag = "";
    let dolarTag = "";
    let dolarBlueTag = "";
    let quienEsQuienTag = "";
    document.querySelectorAll("#main-menu li").forEach(card => {
        const text = card.querySelector("a span").innerText;
        switch (text) {
            case "EDICIÓN IMPRESA":
                edicionImpresaTag = card.querySelector("a span");
                break;
            case "DÓLAR":
                dolarTag = card.querySelector("a span");
                break;
            case "DÓLAR BLUE":
                dolarBlueTag = card.querySelector("a span");
                break;
            case "QUIÉN ES QUIÉN":
                quienEsQuienTag = card.querySelector("a span");
                break;
        }
    });
    let subMenuEdicionImpresaTag = "";
    let subMenuQuienEsQuienTag = "";
    document.querySelectorAll("#more-list li").forEach(card => {
        const text = card.querySelector("a span").innerText;
        console.log(text)
        switch (text) {
            case "EDICIÓN IMPRESA":
                subMenuEdicionImpresaTag = card.querySelector("a span");
                break;
            case "QUIÉN ES QUIÉN":
                subMenuQuienEsQuienTag = card.querySelector("a span");
                break;
        }
    });

    //Tickers
    let dolarBlueTicker = "";
    let dolarBnaTicker = "";
    let dolarMepTicker = "";
    let dolarTarjetaTicker = "";
    document.querySelectorAll("#market-scrll-1 li").forEach(card => {
        const text = card.querySelector("a span").innerText;
        switch (text) {
            case "DÓLAR BLUE":
                dolarBlueTicker = card.querySelector("a span");
                break;
            case "DÓLAR BNA":
                dolarBnaTicker = card.querySelector("a span");
                break;
            case "DÓLAR MEP":
                dolarMepTicker = card.querySelector("a span");
                break;
            case "DÓLAR TARJETA":
                dolarTarjetaTicker = card.querySelector("a span");
                break;
        }
    });

    //SELECTORES DE LA HOME
    const main = document.querySelector('.main-container');
    const block = main.querySelectorAll('div.block');
    const ulOptions = document.querySelector('.session-options');
    const ItemsList = ulOptions.querySelectorAll('li');
    const perfil = ItemsList[1].querySelector('a');

    const sitemapConfig = {
        global: {
            onActionEvent: (actionEvent) => {
                if (email) {
                    actionEvent.user = actionEvent.user || {};
                    actionEvent.user.attributes = actionEvent.user.attributes || {};
                    actionEvent.user.identities = actionEvent.user.identities || {};
                    actionEvent.user.attributes.emailAddress = email;
                    actionEvent.user.attributes.description = isSuscriber;
                    actionEvent.user.attributes.URL || {};
                    actionEvent.user.attributes.contentZones || {};
                    actionEvent.user.attributes.id = idUser
                }

                return actionEvent;
            },
            contentZones: [
                { name: "Header", selector: '#page-header' },
                { name: "Footer", selector: '#page-footer' },
            ],
            listeners: [
                //MENU HEADER
                SalesforceInteractions.listener("click", '#page-header-session-box .sign-in-button', () => {
                    SalesforceInteractions.sendEvent({
                        interaction: { name: SalesforceInteractions.cashDom('#page-header-session-box .sign-in-button').text(), },
                    });
                }),
                SalesforceInteractions.listener("click", `#page-header-middle .b-suscription`, () => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: SalesforceInteractions.cashDom(`#page-header-middle .b-suscription`).text(),
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `.svg-icon.menu`, (e) => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Botón menu" + dateTime,
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `${perfil.tagName}`, (e) => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Botón perfil" + dateTime,
                        },
                    });
                }),
                //TAGS           
                SalesforceInteractions.listener("click", `${dolarTag.tagName}`, (e) => {
                    console.log("dolar BNA")
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Dólar BNA tag" + dateTime,
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `${dolarBlueTag.tagName}`, (e) => {
                    console.log("dolar blue")
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Dólar blue tag" + dateTime,
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `${edicionImpresaTag.tagName}`, (e) => {
                    console.log("edicionImpresaTag")
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Edición impresa tag" + dateTime,
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `${quienEsQuienTag.tagName}`, (e) => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Quien es quien tag" + dateTime,
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `${subMenuEdicionImpresaTag.tagName}`, (e) => {
                    console.log("edicionImpresaTag")
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Edición impresa tag" + dateTime,
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `${subMenuQuienEsQuienTag.tagName}`, (e) => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Quien es quien tag" + dateTime,
                        },
                    });
                }),
                //TICKERS
                SalesforceInteractions.listener("click", `${dolarBlueTicker.tagName}`, (e) => {
                    console.log("dolar blue ticker")
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Dólar blue ticker" + dateTime,
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `${dolarBnaTicker.tagName}`, (e) => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Dólar BNA ticker" + dateTime,
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `${dolarMepTicker.tagName}`, (e) => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Dólar mep ticker" + dateTime,
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `${dolarTarjetaTicker.tagName}`, (e) => {
                    console.log("dolarTarjetaTicker")
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Dólar tarjeta ticker" + dateTime,
                        },
                    });
                }),
            ]
        },
        pageTypeDefault: {
            name: "default",
            interaction: {
                name: "Default",
            }
        },
        pageTypes: [
            {
                name: "Home",
                action: "Home",
                isMatch: () => {
                    let url = window.location.href;
                    if (url.includes('?')) {
                        url = url.slice(0, window.location.href.lastIndexOf('?'));
                    }
                    let isMatch = (url === urlCronista ? true : false);

                    return isMatch;
                },
                onActionEvent: (actionEvent) => {
                    if (email) {
                        actionEvent.user = actionEvent.user || {};
                        actionEvent.user.attributes = actionEvent.user.attributes || {};
                        actionEvent.user.attributes.email = email;
                        actionEvent.user.name = userName;
                    };
                    return actionEvent;
                },
                interaction: {
                    action: "Ingresa a la home",
                    name: () => {
                        let url = new URL(window.location.href);
                        url = url.searchParams.get("utm_source");
                        if (url) {
                            return "Home-UTM: " + url;
                        }
                        else {
                            return "Home";
                        }
                    },
                    attributes: {
                        id: idUser,
                        name: userName,
                        description: isSuscriber,
                        email: email,
                        url: window.location.href,
                    },
                },
                listeners: [
                    SalesforceInteractions.listener("click", `.${block[0].className} h2.title`, (e) => {
                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: "Article: " + SalesforceInteractions.cashDom(e.target).text(),
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
                    }),
                    SalesforceInteractions.listener("click", `.${block[1].className} h2.title`, () => {
                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: "Article: " + SalesforceInteractions.cashDom(this).text() + dateTime,
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
                    }),
                    SalesforceInteractions.listener("click", `.locked a`, (e) => {
                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: SalesforceInteractions.cashDom(e.target).text() + dateTime,
                            },
                        });
                    }),
                    SalesforceInteractions.listener("click", `.columnists .items article.item`, (e) => {
                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: SalesforceInteractions.cashDom(e.target).text() + dateTime,
                            },
                        });
                    }),
                ]
            },
        ]
    };
    SalesforceInteractions.initSitemap(sitemapConfig);
});