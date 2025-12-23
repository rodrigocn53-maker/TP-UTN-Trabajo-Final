
# Documentación de Implementación del Chat

Esta guía detalla los pasos y la lógica utilizada para implementar la visualización de conversaciones y el envío de mensajes en la aplicación estilo WhatsApp Web.

## 1. Estructura de Rutas y Layout
La aplicación utiliza `react-router` para manejar la navegación sin recargar la página.
- **`App.jsx`**: Define las rutas principales.
    - La ruta `/` usa `WhatsAppLayout` como contenedor principal.
    - La ruta `/chat/:contact_id` renderiza `MessagesScreen` dentro del layout.
- **`WhatsAppLayout.jsx`**: Implementa una estructura de grid/flexbox de 3 columnas:
    1. Barra de comunidad (iconos).
    2. Barra lateral de contactos (`ContactSidebar`).
    3. Área principal de chat (`Outlet`). El componente `Outlet` es donde se renderiza `MessagesScreen` cuando se selecciona un chat.

## 2. Gestión de Estado (Contextos)
Se utilizan Contextos de React para compartir datos entre componentes sin pasar "props" manualmente por todos los niveles.
- **`ContactDetailContext`**:
    - **Función Principal**: Cargar los datos del contacto seleccionado basado en la URL (`useParams`).
    - **`loadContactById`**: Simula una petición asíncrona (con `setTimeout`) para obtener los datos del contacto y sus mensajes.
    - **`AddNewMenssage`**: Función que actualiza el estado local `contactSelected` agregando un nuevo mensaje al array `messages`.

## 3. Visualización de Mensajes (`MessagesScreen`)
Este componente es el encargado de mostrar la conversación.
- Consume `ContactDetailContext` para obtener `contactSelected`.
- Si `loadingContact` es true, muestra un mensaje de carga.
- Si ya cargó, renderiza:
    - **Header**: Avatar y nombre del contacto.
    - **`MessagesList`**: Itera sobre `contactSelected.messages` y muestra cada mensaje (diferenciando enviados vs recibidos).
    - **`AddNewMenssage`**: El componente inferior para escribir.

## 4. Envío de Mensajes (`AddNewMenssage`)
- Contiene un formulario con un input.
- Al enviar el formulario (`onSubmit`):
    1. Previene la recarga de la página (`e.preventDefault()`).
    2. Valida que el mensaje no esté vacío.
    3. Llama a `addMessage` (del contexto) con el texto.
    4. Limpia el input.
- Se añadió `autoFocus` para mejorar la experiencia de usuario.

---
*Nota: Los mensajes se guardan en el estado temporal de la aplicación. Al recargar la página, volverán al estado original definido en `contactData.js`.*
