SalesforceInteractions.init({
    cookieDomain: "cronista.com",
}).then(() => {

    const enviroment = 'https://qa';
    let dateTime = new Date();
    dateTime = `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} - hora ${dateTime.getHours()}:${dateTime.getMinutes()}`

    //DATOS DE USUARIO
    const email = vsm.session.email;
    const idUser = vsm.session.id;
    const userName = vsm.session.title;
    const isSuscriber = site.session.isSuscriber() ? "Suscriptor" : "Usuario";


    let main = ""
    let block = ""
    let isMatch = false;
    //SELECTORES DE LA Genericos
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
                    actionEvent.user.attributes.URL || {};
                    actionEvent.user.attributes.contentZones || {};
                    actionEvent.user.attributes.emailAddress = email;
                    actionEvent.user.attributes.isSuscription = isSuscriber;
                    actionEvent.user.attributes.name = userName;
                    actionEvent.user.attributes.lastName = userName;
                    actionEvent.user.attributes.date = dateTime
                    actionEvent.user.identities.userIdCms = idUser;
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
                            name: "Botón menu",
                        },
                    });
                }),
                SalesforceInteractions.listener("click", `${perfil.tagName}`, (e) => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Botón perfil",
                        },
                    });
                }),
                //TAGS
                SalesforceInteractions.listener("click", `#main-menu li a span`, (e) => {
                    switch (e.target.innerText) {
                        case "EDICIÓN IMPRESA":
                            console.log(e.target.innerText)
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: e.target.innerText,
                                },
                            });
                            break;
                        case "DÓLAR":
                            console.log(e.target.innerText)
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: e.target.innerText,
                                },
                            });
                            break;
                        case "DÓLAR BLUE":
                            console.log(e.target.innerText)
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: e.target.innerText,
                                },
                            });
                            break;
                        case "QUIÉN ES QUIÉN":
                            console.log(e.target.innerText)
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: e.target.innerText,
                                },
                            });
                            break;
                    }
                }),
                //Tickers
                SalesforceInteractions.listener("click", `#market-scrll-1 li a span`, (e) => {
                    console.log(e.target.innerText)
                    switch (e.target.innerText) {
                        case "DÓLAR BLUE":
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: e.target.innerText,
                                },
                            });
                            break;
                        case "DÓLAR BNA":
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: e.target.innerText,
                                },
                            });
                            break;
                        case "DÓLAR MEP":
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: e.target.innerText,
                                },
                            });
                            break;
                        case "DÓLAR TARJETA":
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: e.target.innerText,
                                },
                            });
                            break;
                    }
                }),
            ],
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
                isMatch: () => {
                    let url = window.location.href;
                    if (url.includes('?')) {
                        url = url.slice(0, window.location.href.lastIndexOf('?'));
                    }
                    isMatch = (url === `${enviroment}.cronista.com` ? true : false);
                    if (isMatch) {
                        main = document.querySelector('.main-container');
                        block = main.querySelectorAll('div.block');
                    }
                    return isMatch;
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
                        userIdCms: idUser,
                        name: userName,
                        isSuscriber: isSuscriber,
                        email: email,
                        url: window.location.href,
                    },
                },
                listeners: isMatch ? [
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
                                name: "Article from home: " + SalesforceInteractions.cashDom(e.target).text(),
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
                                name: SalesforceInteractions.cashDom(e.target).text(),
                            },
                        });
                    }),
                    SalesforceInteractions.listener("click", `.columnists .items article.item`, (e) => {
                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: SalesforceInteractions.cashDom(e.target).text(),
                            },
                        });
                    }),
                ] : []
            },
            {
                name: "PayWall",
                isMatch: () => {
                    let url = window.location.href;

                    if (url.includes('?')) {
                        url = url.slice(0, window.location.href.lastIndexOf('?'));
                    }

                    isMatch = (url === `${enviroment}.cronista.com/suscripciones/` ? true : false);

                    return isMatch;
                },
                onActionEvent: (actionEvent) => {
                    if (email) {
                        let limit = new URL(window.location.href).searchParams.get("limit")
                        let continueUrl = new URL(window.location.href).searchParams.get("continue")
                        actionEvent.user = actionEvent.user || {};
                        actionEvent.user.attributes = actionEvent.user.attributes || {};
                        actionEvent.user.attributes.typeOfEntry = limit ? "choque metered" : "Choque directo";
                        actionEvent.user.attributes.continueUrl = continueUrl;
                    }
                    return actionEvent;
                },
            }
        ]
    };
    SalesforceInteractions.initSitemap(sitemapConfig);
});