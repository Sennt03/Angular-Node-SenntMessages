# SenntMessages
App de mensajeria en tiempo real con socket.io
* Envio de mensajes, audios, imagenes, documentos, ubicación.
* Eliminar mensajes, bloquear usuarios, traducir mensajes.
* Configuración de perfil, cambio de contraseña.

LINK: https://messages.david-ruiz.online

## Detalles
* La aplicación esta modularizada
* Incluye lazy loading y estrategia de precarga
* Tiene el interceptor de token
* Tipado en propiedades y en las peticiones http
* Las imagenes se suben a un servidor de cloudinary y al cambiar de foto o removerla tambien se eliminan de ese servidor

## Funcionalidades
### Auth
Es un auth normal pero con inputs reactivos, en el formulario de registro valida asincronicamente si los campos de username e email estan disponibles (apenas terminas de escribir tu username o email te valida si esta disponible y te muestra el error si no), tambien valida que el campo de password y confirm password sean iguales.

* Logeo y Registro con formularios reactivos de Angular (ReactiveFormsModule)
* Uso de validaciones por defecto, validaciones asincronas, grupales y personalizadas

## Profile
En los inputs para editar tus datos como el name tambien son reactivos (FormControl) igual con validaciones asiconcronas.

* Cambio de foto de perfil u opciones para eliminar la imagen
* Cambio de tus datos personales, name, username e email
* Cambio de contraseña

## Settings
* Puedes configurar un idioma para traducir mensajes

# Main
El foco de la aplicacion es para creación de chats con cualquier usuario, enviar y recibir mensajes, audios, archivos e imagenes (Proximamente llamadas y videollamadas).

* Busqueda de usuarios por name y username
* Creacion de chats
* Pestaña de chats con mensajes no leidos y el ultimo mensaje enviado o recibido

## Chat
Es un chat conectado con socket.io en mi servidor de node.js

* Input que se amplia en multilinea
* Envio de mensajes y emogis
* Envio de audios, archivos, imagenes y ubicación
* Muestra los mensajes no vistos y vistos
* Mensajes a multiples personas
* Programar envio de mensajes
* Bloquear usuario
* Borrar mensajes


# Proximamente (Actualmente trabajando en ellas)

## Detalles
* Envia notificaciones push al recibir mensajes
* Es una PWA

## Auth
* Recuperacion de contraseña enviando token a email

## Chat
* Eliminar chat
* Llamadas y Videollamadas

## PWA
Se puede descargar la aplicacion como una pwa

* Guarda archivos estaticos en el service worker
* Guarda request para revisar conversaciones sin conexion a internet
