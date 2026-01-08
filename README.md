# 🗺️ Site Map -- Salesforce Personalization

Salesforce Personalization

Procesa los datos para ofrecer **experiencias web personalizadas**. Incluye conceptos de perfiles, segmentos y decisiones de personalización.

## 📚 Documentación oficial
https://developer.salesforce.com/docs/marketing/einstein-personalization/guide/overview.html

La configuración inicial hasta integración web, uso de SDKs (BEACON), campaigns, plantillas y APIs de eventos.
## 📚 Documentación oficial

https://developer.salesforce.com/docs/marketing/personalization/guide/get-started.html



#Personalización de experiencias web

Cómo usar Salesforce Interactions SDK con el módulo Personalization para capturar interacciones, enviar datos y mostrar contenido personalizado.

## 📚 Documentación oficial
https://developer.salesforce.com/docs/marketing/einstein-personalization/guide/personalize-web-experiences.html

---------------------------------------------------------------

## ¿Qué son las Content Zones?

Son espacios definidos dentro de tu sitio web donde Salesforce puede inyectar, reemplazar o personalizar contenido dinámico (banners, módulos, cards, recomendaciones, etc.).

## Ejemplo:
/***********************
 * ZONAS GLOBALES
 ***********************/
const globalZones = [
    { name: "Header", selector: "#sf-header-zone" },
    { name: "Footer", selector: "#sf-footer-zone" }
];

## ¿Para qué sirven?

Las Content Zones permiten que Salesforce:

Muestre banners personalizados

Inserte recomendaciones de contenido o productos

Reemplace módulos existentes

Ejecute campañas de personalización

Decida qué mostrar y a quién, según el perfil del usuario

Sin content zones 👉 no hay dónde renderizar la personalización.

## Mas info:
https://developer.salesforce.com/docs/marketing/personalization/guide/content-zones.html


-----------------------------------------------------------------

## ¿Qué son los listeners?

Son funciones de JavaScript que “escuchan” acciones del usuario en tu sitio (clicks, scroll, submit, vistas, etc.) y envían esos eventos a Salesforce para:

tracking de comportamiento

construcción de perfiles

segmentación

activación de campañas

decisiones de personalización

👉 No muestran contenido
👉 No modifican el DOM
👉 Solo capturan y envían datos

## Ejemplo:

listeners: [
  {
    event: "click",
    selector: ".btn-suscribirse",
    handler: (event) => {
      SalesforceInteractions.sendEvent({
        interaction: {
          name: "Click Suscribirse"
        }
      });
    }
  }
]


## 🧠 Para qué sirven

Los listeners permiten que Salesforce sepa cosas como:

qué artículos leyó un usuario

qué botones clickeó

si hizo scroll

si se logueó

si interactuó con un banner

Sin listeners 👉 Salesforce no aprende nada del usuario.


## Salesforce los engancha al DOM

Cuando:

SalesforceInteractions.initSitemap(sitemapConfig);


SalesforceInteractions.sendEvent({
  interaction: {
    name: "Click CTA Home"
  },
  user: {
    attributes: {
      isSubscriber: true
    }
  }
});
Esto alimenta:

el perfil del usuario

reglas de segmentación

activadores de campañas



--------------------------------------------------------------------


## ¿Qué son las PageTypes?

Son reglas que le dicen a Salesforce “qué tipo de página es esta” y qué comportamiento aplicar en ese contexto.

👉 Básicamente:

PageType = clasificación de páginas + lógica asociada

🧠 ¿Para qué sirven?

Las PageTypes permiten a Salesforce:

Identificar dónde está el usuario

Ejecutar listeners específicos

Habilitar content zones solo en ciertas páginas

Enviar eventos de vista de página

Activar campañas solo en ese tipo de página

Sin PageTypes 👉 todo queda mezclado.

---------------------------------------------------

## Flujo real cuando el usuario navega

Salesforce evalúa todos los PageTypes

El primero cuyo isMatch === true se activa

Se dispara:

interaction (page view)

listeners de ese PageType

contentZones de ese PageType

Se combinan con los elementos global

-------------------------------------------------------------------------------------------------------------------------------

## ¿Qué es PageType en tu implementación?

En este proyecto, PageType es un “constructor” de PageTypes, no es el PageType nativo de Salesforce, sino una abstracción propia que vos creaste para:

centralizar la lógica de isMatch

reutilizar listeners

setear interacciones dinámicas

evitar repetir código

En términos simples:

new PageType(...) devuelve un objeto compatible con SalesforceInteractions.initSitemap
