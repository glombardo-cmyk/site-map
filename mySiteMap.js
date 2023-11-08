SalesforceInteractions.init({
    cookieDomain: "cronista.com",
}).then(() => {

    const enviroment = 'https://qa';
    let dateTime = new Date();
    dateTime = `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} - hora ${dateTime.getHours()}:${dateTime.getMinutes()}`

    //DATOS DE USUARIO
    const email = vsm.session.email != "" ? vsm.session.email : "";
    const idUser = vsm.session.id != "" ? vsm.session.id : "";
    const userName = vsm.session.title != "" ? vsm.session.title : "";
    const isSuscriber = site.session.isSuscriber() && site.session != undefined ? "Suscriptor" : "Usuario";




    let isMatch = false
    let url = ""
    //SELECTORES DE LA Genericos
    const ulOptions = document.querySelector('.session-options');
    const ItemsList = ulOptions.querySelectorAll('li');
    const perfil = ItemsList[1].querySelector('a');

    function sendData(nameEvent, target, container) {

        for (let i = 0; i < container.length; i++) {

            if (target === container[i]) {
                console.log(nameEvent + "Elemento: " + (i + 1));
                SalesforceInteractions.sendEvent({
                    interaction: {
                        name: nameEvent + " " + SalesforceInteractions.cashDom(container[i]).text(),
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

    const sitemapConfig = {
        global: {
            onActionEvent: (actionEvent) => {
                url = window.location.href
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
                //Botón ingresá HEADER
                SalesforceInteractions.listener("click", '#page-header-session-box .sign-in-button', (e) => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Click Botón " + SalesforceInteractions.cashDom('#page-header-session-box .sign-in-button').text(),
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
                }),
                //Botón suscripción
                SalesforceInteractions.listener("click", `#page-header-middle .b-suscription`, () => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Click Botón " + SalesforceInteractions.cashDom(`#page-header-middle .b-suscription`).text(),
                            attributes: {
                                name: userName,
                                lastName: userName,
                                isSuscriber: isSuscriber,
                                continueUrl: url
                            },
                            user: { identities: { emailAddress: email, userIdCms: idUser } },
                        },
                    });
                }),
                //Menu Hamburguesa
                SalesforceInteractions.listener("click", `.svg-icon.menu`, (e) => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: "Click Botón menu",
                        },
                    });
                }),
                //Botón perfil 
                SalesforceInteractions.listener("click", `${perfil.tagName}`, (e) => {
                    if (e.target.innerText == "Mi perfil") {
                        console.log(e.target.innerText)
                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: "Click Botón perfil",
                            },
                        });
                    }
                }),
                //TAGS
                SalesforceInteractions.listener("click", `#main-menu ul li a`, (e) => {
                    switch (e.currentTarget.innerText) {
                        case "EDICIÓN IMPRESA":
                            console.log("Click TAG: " + SalesforceInteractions.cashDom(e.currentTarget).text())
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: "Click TAG: " + SalesforceInteractions.cashDom(e.currentTarget).text(),
                                },
                            });
                            break;
                        case "DÓLAR":
                            console.log("Click TAG: " + SalesforceInteractions.cashDom(e.currentTarget).text())
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: "Click TAG: " + SalesforceInteractions.cashDom(e.currentTarget).text(),
                                },
                            });
                            break;
                        case "DÓLAR BLUE":
                            console.log("Click TAG: " + SalesforceInteractions.cashDom(e.currentTarget).text())
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: "Click TAG: " + SalesforceInteractions.cashDom(e.currentTarget).text(),
                                },
                            });
                            break;
                        case "QUIÉN ES QUIÉN":
                            console.log("Click TAG: " + SalesforceInteractions.cashDom(e.currentTarget).text())
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: "Click TAG: " + e.target.innerText,
                                },
                            });
                            break;
                    }
                }),
                //Tickers
                SalesforceInteractions.listener("click", ".piece.markets.standard ul li", (e) => {
                    switch (e.currentTarget.querySelector("a span.name").innerText) {
                        case "DÓLAR BLUE":
                            console.log(SalesforceInteractions.cashDom(e.currentTarget.querySelector("a span.name")).text())

                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: "Click TICKER: " + SalesforceInteractions.cashDom(e.currentTarget.querySelector("a span.name")).text(),
                                },
                            });
                            break;
                        case "DÓLAR BNA":
                            console.log(SalesforceInteractions.cashDom(e.currentTarget.querySelector("a span.name")).text())

                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: "Click TICKER: " + SalesforceInteractions.cashDom(e.currentTarget.querySelector("a span.name")).text(),
                                },
                            });
                            break;
                        case "DÓLAR MEP":
                            console.log(SalesforceInteractions.cashDom(e.currentTarget.querySelector("a span.name")).text())

                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: "Click TICKER: " + SalesforceInteractions.cashDom(e.currentTarget.querySelector("a span.name")).text(),
                                },
                            });
                            break;
                        case "DÓLAR TARJETA":
                            console.log(SalesforceInteractions.cashDom(e.currentTarget.querySelector("a span.name")).text())

                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: "Click TICKER: " + SalesforceInteractions.cashDom(e.currentTarget.querySelector("a span.name")).text(),
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
                name: "Default Page",
            }
        },
        pageTypes: [
            {
                name: "Page Home",
                isMatch: () => {
                    let url = window.location.href;
                    if (url.includes('?') || url.includes('/')) {
                        url = url.slice(0, window.location.href.lastIndexOf('?'));
                    }
                    isMatch = (url === `${enviroment}.cronista.com` ? true : false);


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
                            return "Page Home";
                        }
                    },
                    attributes: {
                        userIdCms: idUser,
                        name: userName,
                        isSuscriber: isSuscriber,
                        emailAddress: email,
                    },
                },
                listeners: [
                    SalesforceInteractions.listener("click", `.block article.item`, (e) => {
                        let main = document.querySelector('.main-container');
                        let blocks = main.querySelectorAll('div.block');
                        var block1 = blocks[0].querySelectorAll('article.item');
                        var block2 = blocks[1].querySelectorAll('article.item');
                        sendData("Click, Article from home (Bloque1): ", e.currentTarget, block1)
                        sendData("Click, Article from home (Bloque2): ", e.currentTarget, block2)
                    }),
                    SalesforceInteractions.listener("click", `article.locked`, (e) => {
                        console.log(SalesforceInteractions.cashDom(e.currentTarget).text())
                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: "Click, Article Member from home: " + SalesforceInteractions.cashDom(e.currentTarget).text(),
                            },
                        });
                    }),
                    SalesforceInteractions.listener("click", `.columnists .items article.item`, (e) => {
                        console.log(SalesforceInteractions.cashDom(e.currentTarget).text())
                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: "Click, Columnists: " + SalesforceInteractions.cashDom(e.target).text(),
                            },
                        });
                    }),
                ]
            }
        ]
    };
    SalesforceInteractions.initSitemap(sitemapConfig);
});