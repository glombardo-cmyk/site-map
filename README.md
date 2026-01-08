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



-----------------------------------------------------------------------------------------------


##  En Salesforce Personalization (Marketing Cloud Personalization) el Catálogo de Objetos (Catalog Objects) es:

🗂️ Un modelo estructurado de “cosas” de tu negocio que los usuarios pueden ver, leer o interactuar, y que Salesforce usa para personalizar, recomendar y decidir contenido.

En tu caso (sitio de noticias), los artículos y las cotizaciones YA son objetos de catálogo.

##  🧠 Qué es un Catalog Object (en simple)

##  Un Catalog Object representa una entidad como:

Tipo	Ejemplos
Article	Nota, noticia, editorial
Cotizaciones	Dólar, acciones, bonos
Product	Producto e-commerce
Category	Sección, tema
Author	Periodista

##  👉 Salesforce no piensa en páginas, piensa en objetos.

##  🔥 Para qué sirve el catálogo

El catálogo permite que Salesforce:

haga recomendaciones inteligentes

construya afinidades (le gusta economía, dólar, X autor)

segmente usuarios

entrene modelos de IA

haga personalización real, no solo reglas

Sin catálogo 👉 solo tracking básico.

##  🧩 Cómo se construye (en tu código)

En tu implementación, el catálogo se construye al momento de la vista, usando un CatalogObjectInteraction.

Ejemplo real (TU código)
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
      articleTitle: headlineBasic,
      publishDate,
      authorName: creator,
      accessCondition
    },
    relatedCatalogObjects: {
      Category: [sectionText.toUpperCase()],
      Autores: [creator.toUpperCase()],
      CondicionDeAcceso: [accessCondition.toUpperCase()]
    }
  }
};


Esto hace 3 cosas muy importantes:

1️⃣ Crea / actualiza el objeto en el catálogo
type: "Article",
id: articleId


👉 Si no existe → lo crea
👉 Si existe → lo actualiza

2️⃣ Registra que el usuario LO VIÓ
ViewCatalogObject


👉 Esto es una interacción semántica, no un simple page view.

Salesforce entiende:

“este usuario vio ESTE artículo”

3️⃣ Conecta relaciones
relatedCatalogObjects


Ejemplo:

Article → Category

Article → Author

Article → Condición de acceso

Esto permite cosas como:

“usuarios que leen ECONOMÍA”

“usuarios que leen a ESTE autor”

“usuarios que leen contenido premium”

## 🧠 Diferencia entre Page View y Catalog View
Page View	Catalog Object
Vio una página	Vio un objeto
Sin contexto	Con metadata
Poco inteligente	Entrena IA
Tracking básico	Personalización real

👉 Vos usás ambos, pero el Article sobrescribe el Page View normal.

🧩 Tu catálogo real (según tu código)
📘 Objeto: Article

Atributos:

título

sección

autor

fecha

imagen

tipo de acceso

Relaciones:

Category

Autores

CondicionDeAcceso

📈 Objeto: Cotizaciones
type: "Cotizaciones"


Relación:

TipoDeCotizaciones

🎯 Ejemplos de uso real

Gracias a esto Salesforce puede:

✔ Recomendar artículos similares
✔ Mostrar banners según sección favorita
✔ Ofrecer suscripción a lectores premium
✔ Personalizar home por intereses
✔ Activar campañas post-lectura
