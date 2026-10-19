# 🍕 Pizzería Mamma Mía — Hito 6

Proyecto desarrollado con React y Vite cuyo objetivo es implementar un carrito de compras compartido mediante **Context API**, permitiendo mantener sincronizados los productos, sus cantidades y el total entre las distintas páginas de la aplicación.

Este hito continúa el proyecto anterior e incorpora mejoras en la navegación hacia el detalle de cada pizza.

## Tecnologías utilizadas

- React.
- Vite.
- JavaScript.
- React Router DOM.
- Context API.
- Bootstrap y React Bootstrap.
- CSS.

## Funcionalidades implementadas

### Carrito de compras con Context API

Se centralizó el estado del carrito utilizando `CartContext.jsx` y `CartProvider.jsx`.

El proveedor comparte los productos seleccionados, el total y las funciones necesarias para:

- Añadir una pizza.
- Aumentar su cantidad si ya existe en el carrito.
- Disminuir la cantidad.
- Eliminar un producto.
- Retirar automáticamente los productos cuya cantidad llega a cero.

Los componentes consumen esta información mediante `useContext`, evitando mantener carritos independientes en cada página.

### Añadir productos desde Home

El botón **Añadir** de cada tarjeta incorpora la pizza seleccionada al carrito.

Si el producto ya existe, se incrementa su cantidad en lugar de crear una fila duplicada. Cada pizza se identifica mediante el `id` entregado por la API.

### Total actualizado en la navegación

El componente `Navigation.jsx` consume el contexto para mostrar el total actualizado de la compra.

El enlace del total permite acceder a la página del carrito sin recargar la aplicación.

### Página del carrito

La página `Cart.jsx` muestra los productos que el usuario ha seleccionado, incluyendo:

- Imagen y nombre.
- Precio unitario.
- Cantidad.
- Subtotal por producto.
- Total de la compra.

Desde esta página es posible aumentar o disminuir cantidades y eliminar productos. Cuando no existen productos seleccionados, se muestra un mensaje de carrito vacío.

### Cálculo compartido del total

El total se calcula dentro del proveedor a partir del precio y la cantidad de cada producto:

```js
const total = cart.reduce(
  (sum, item) => sum + item.price * item.count,
  0
);
```

Tanto la navegación como la página del carrito utilizan este mismo valor, manteniendo los montos sincronizados.

### Detalle dinámico de cada pizza

Se reemplazó la ruta fija del detalle por una ruta dinámica:

```jsx
<Route path="/pizza/:id" element={<Pizza />} />
```

El botón **Ver más** de cada tarjeta dirige a la página correspondiente a su identificador.

En `Pizza.jsx`, el hook `useParams` permite recuperar el `id` desde la URL para consultar la pizza seleccionada y mostrar:

- Imagen.
- Nombre.
- Descripción.
- Ingredientes.
- Precio.
- Botón para añadir al carrito.

También se consideran estados de carga y error durante la consulta a la API.

### Ajustes de presentación

Se incorporaron clases CSS para personalizar el color del título **Detalles del pedido** y del nombre de la pizza en su página de detalle.

Además, el acceso al detalle se realiza desde las tarjetas de Home, eliminando la necesidad de mantener una pizza específica como opción del menú principal.

## Organización de los archivos principales

```text
src/
├── components/
│   ├── CardPizza.jsx
│   └── Navigation.jsx
├── context/
│   ├── CartContext.jsx
│   └── CartProvider.jsx
├── pages/
│   ├── Home.jsx
│   ├── Pizza.jsx
│   └── Cart.jsx
├── utils/
│   └── formatCurrency.js
├── App.jsx
├── App.css
└── main.jsx
```

## Funcionamiento del estado compartido

`CartProvider` envuelve la aplicación y mantiene una única instancia del estado del carrito.

Las tarjetas y la página de detalle utilizan sus funciones para agregar productos. La navegación y el carrito consumen los datos actualizados para mostrar cantidades y totales.

Las actualizaciones se realizan creando nuevos arreglos y objetos mediante `map`, `filter` y el operador de propagación, sin modificar directamente el estado existente.

El total es un valor derivado del carrito, por lo que no necesita un estado independiente.

## Instalación y ejecución

### 1. Preparar el proyecto

Clona el repositorio o descomprime el proyecto y abre una terminal en la carpeta que contiene `package.json`.

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Iniciar la API

La aplicación requiere que el backend de pizzas se encuentre disponible en:

```text
http://localhost:5000
```

Las consultas utilizadas son:

```text
GET /api/pizzas
GET /api/pizzas/:id
```

El backend debe iniciarse por separado, siguiendo las instrucciones de su propio proyecto.

### 4. Iniciar el frontend

```bash
npm run dev
```

Abre la dirección que Vite indique en la terminal.

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción. |
| `npm run preview` | Permite visualizar la compilación localmente. |
| `npm run lint` | Ejecuta la revisión de código con ESLint. |

## Comprobaciones funcionales

Para revisar el comportamiento de la aplicación:

1. Añadir una pizza desde Home y comprobar que aumenta el total.
2. Añadir nuevamente la misma pizza y verificar que aumenta su cantidad.
3. Abrir el carrito desde el total de la navegación.
4. Aumentar y disminuir cantidades desde el carrito.
5. Comprobar que ambos totales siempre coinciden.
6. Eliminar productos y verificar el mensaje de carrito vacío.
7. Abrir el detalle de distintas pizzas mediante **Ver más**.
8. Añadir una pizza desde su página de detalle.

## Alcance y consideraciones

- El carrito comienza vacío.
- Los productos permanecen seleccionados durante la navegación interna.
- Al recargar la página, el carrito se reinicia porque el estado se almacena en memoria.
- La persistencia con `localStorage` y el procesamiento de pagos quedan fuera del alcance de este hito.
- Las consultas de pizzas permanecen en Home y Pizza; trasladarlas a un contexto adicional es una mejora opcional.

## Aprendizajes

Este desafío permitió aplicar el patrón de creación, provisión y consumo de un contexto en React.

También se trabajó la actualización inmutable del estado, el cálculo de valores derivados, el uso de rutas dinámicas y la separación de responsabilidades entre componentes, páginas y proveedor del carrito.