# Welcome to Baja Valle App 🍷

Baja Valle App es una aplicación móvil multiplataforma desarrollada para Baja Valle, empresa local dedicada al suministro de materiales para viñedos en Ensenada, Baja California. El proyecto tiene como objetivo digitalizar su catálogo de productos y facilitar el proceso de cotización mediante una experiencia móvil moderna e intuitiva.

La aplicación está desarrollada con React Native y Expo, compatible con iOS y Android, siguiendo principios de Atomic Design para garantizar una arquitectura de componentes escalable y reutilizable. El backend se implementa con NestJS y Prisma conectado a una base de datos en Supabase, exponiendo una API REST para la gestión de productos, categorías y solicitudes de contacto.

Entre sus funcionalidades principales se encuentran la visualización del catálogo organizado por categorías, la consulta de detalles de producto con imágenes y especificaciones técnicas, el guardado de productos favoritos y el envío de formularios de contacto directamente desde la app.

## El Problema y la Solución
Baja Valle es un distribuidor de productos esenciales para viñedos. Cuentan con un catálogo de productos que los clientes pueden solicitar y una vez seleccionados, cotizar. Actualmente este catálogo debe ser solicitado directamente por los clientes, ya que no disponen de una herramienta accesible para cualquier cliente potencial. Debido a esto, la empresa busca optimizar el ciclo de venta e inventario de insumos vitivinícolas. 

La aplicación propuesta resuelve la carencia de una herramienta móvil que permita a los clientes explorar el catálogo de corchos, etiquetas y equipos de riego en tiempo real, mejorando el tiempo de respuesta del equipo administrativo. Además facilitará la consulta de disponibilidad de productos, la generación de solicitudes de cotización y la visualización de información detallada como precios y características de los productos.


## Equipo

   - Vargas Gámez Ximena (14065)
   - Moran Amao Andrea (14030)
   - Angela Aguilar Rivas (14024)
   - Raúl Ángel Valdés Corona (12755)
   
## Tecnologías Utilizadas

### Frontend
- React Native
- Expo
- NativeWind
- Zod
- Axios
- Tanstack Query

### Backend
- Netsjs
- Prisma
- Supabase
- PNPM

## Instalación

1. Clona el proyecto

   http
   ```bash
   git clone https://github.com/raulvaldes-cetys/baja-valle-app.git
   ```
   ssh
   ```bash
   git clone git@github.com:raulvaldes-cetys/baja-valle-app.git
   ```


2. Instalar dependencias

   ```bash
   npm install
   ```

3. Abre la app

   ```bash
   npx expo start --clear
   ```

Para este proyecto debes abrir la app usando [Expo Go](https://expo.dev/go)



