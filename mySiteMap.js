SalesforceInteractions.init({
    cookieDomain: "cronista.com",
}).then(() => {
    const main = document.querySelector('.main-container');
    const block = main.querySelectorAll('div.block');
    const email = vsm.session.email;
    const idUser = vsm.session.id;
    const userName = vsm.session.title;
    const isSuscriber = site.session.isSuscriber() ? "Suscriptor" : "Usuario";
    console.log(block[0].className)
    const sitemapConfig = {
        global: {
            onActionEvent: (actionEvent) => {
                if (email) {
                    actionEvent.user = actionEvent.user || {};
                    actionEvent.user.attributes = actionEvent.user.attributes || {};
                    actionEvent.user.identities = actionEvent.user.identities || {};
                    actionEvent.user.attributes.emailAddress = email;
                    actionEvent.user.attributes.description = isSuscriber,
                        actionEvent.user.attributes.URL || {};
                    actionEvent.user.attributes.contentZones || {};
                    actionEvent.user.attributes.id = idUser
                }
                console.log(actionEvent)
                return actionEvent;
            },
            contentZones: [
                { name: "Header", selector: '#page-header' },
                { name: "Footer", selector: '#page-footer' },
            ],
            listeners: [
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
                contentZones: [
                    { name: "Bloque1", selector: `.${block[0].className} h2.title` },
                    { name: "Bloque2", selector: `.${block[1].className} h2.title` },
                ],
                isMatch: () => {
                    let url = window.location.href;
                    if (url.includes('?')) {
                        url = url.slice(0, window.location.href.lastIndexOf('?'));
                    }
                    let isMatch = (url === 'https://dev.cronista.com/' ? true : false);

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
                        console.log(SalesforceInteractions.cashDom(e.target).text())
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
                                name: "Article: " + SalesforceInteractions.cashDom(this).text(),
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
                        console.log(SalesforceInteractions.cashDom(e.target).text())
                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: SalesforceInteractions.cashDom(e.target).text(),
                            },
                        });
                    }),
                    SalesforceInteractions.listener("click", `.columnists .items article.item`, (e) => {
                        console.log("testing")
                        console.log(SalesforceInteractions.cashDom(e.target).text())
                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: SalesforceInteractions.cashDom(e.target).text(),
                            },
                        });
                    }),
                ]
            },
        ]
    };
    SalesforceInteractions.initSitemap(sitemapConfig);
});