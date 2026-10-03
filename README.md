# TurnosMed API

## Descripción del Proyecto
Sistema de gestión y consulta de turnos médicos desarrollado con **Node.js**, **TypeScript** y **Express**. La aplicación permite la parametrización de agendas y la lectura asíncrona de profesionales y especialidades desde archivos de datos JSON mediante el módulo nativo `node:fs/promises`.

---

## Tecnologías Utilizadas
* **Lenguaje:** TypeScript / JavaScript (Node.js)
* **Framework:** Express
* **Módulos nativos:** `node:fs/promises`, `node:path`
* **Formato de datos:** JSON

---

## Estructura del Proyecto
```text
turnos-medicos/
├── src/
│   ├── data/
│   │   ├── especialidades.json
│   │   └── profesionales.json
│   ├── index.ts
│   └── resources.ts
├── package.json
├── tsconfig.json
└── README.md
```
--- 

## Documentación de Endpoints (API REST)

### Especialidades (`/especialidades`)

#### 1. Obtener todas las especialidades
- **Método:** `GET`
- **Ruta:** `/especialidades`
- **Respuesta (`200 OK`):**
  ```json
  [
    {
      "especialidadId": 1,
      "nombreEspecialidad": "Cardiología",
      "activa": true
    },
    {
      "especialidadId": 2,
      "nombreEspecialidad": "Dermatología",
      "activa": true
    }
  ]

#### 2. Obtener especialidad por ID
- **Método:** `GET`
- **Ruta:** `/especialidades/:id`
- **Respuesta (`200 OK`):**
```json
{
  "especialidadId": 1,
  "nombreEspecialidad": "Cardiología",
  "activa": true
}
```
- **Respuesta de Error (`404 Not Found`):**

```json
{
  "error": "Especialidad no encontrada"
}
```

#### 3. Crear especialidad
- **Método:** `POST`
- **Ruta:** `/especialidades`
- **Request Body (JSON):**
```json
{
  "nombreEspecialidad": "Rehabilitación muscular",
  "activa": true
}

```
- **Respuesta (`201 Created`):**
```json
{
  "especialidadId": 21,
  "nombreEspecialidad": "Rehabilitación muscular",
  "activa": true
}
```

#### 4. Eliminar especialidad
- **Método:** `DELETE`
- **Ruta:** `/especialidades/:id`

- **Respuesta (`204 No Content / 200 OK`)**

---

### Profesionales (`/profesionales`)

#### 1. Obtener todos los profesionales
- **Método:** `GET`
- **Ruta:** `/profesionales`
- **Respuesta (`200 OK`):**
  ```json
  [
    {
      "profesionalId": 1,
      "nombre": "Dr. Carlos Gómez",
      "especialidad": "Cardiología",
      "activo": true
    }
  ]

#### 2. Obtener profesional por ID
- **Método:** `GET`
- **Ruta:** `/profesionales/:id`

- **Respuesta (`200 OK`):**
```json
{
  "profesionalId": 1,
  "nombre": "Dr. Carlos Gómez",
  "especialidad": "Cardiología",
  "activo": true
}
```

#### 3. Crear profesional
-**Método:** `POST`
- **Ruta:** `/profesionales`
- **Request Body (JSON):**
```json
{
  "nombre": "Herminda González",
  "especialidad": "Hematología",
  "activo": true
}
```
- **Respuesta (`201 Created`):**
```json
{
  "profesionalId": 31,
  "nombre": "Herminda González",
  "especialidad": "Hematología",
  "activo": true
}
```

#### 4. Actualizar profesional
- **Método:** `PUT`
- **Ruta:** `/profesionales/:id`
- **Request Body (JSON):**
```json
{
  "nombre": "Dr. Carlos Gómez Actualizado",
  "especialidad": "Neurología",
  "activo": true
}
```
- **Respuesta (`200 OK`):**
```json
{
  "profesionalId": 1,
  "nombre": "Dr. Carlos Gómez Actualizado",
  "especialidad": "Neurología",
  "activo": true
}
```

#### 5. Eliminar profesional
- **Método:** `DELETE`
-**Ruta:** `/profesionales/:id`
- **Respuesta (`204 No Content`)**

Manejo de Errores Globales
404 Not Found (Ruta inexistente):

```json
{
  "error": "Endpoint no encontrado",
  "ruta": "/ruta-inexistente",
  "metodo": "GET"
}
```
400 Bad Request (Formato JSON inválido o parámetros incorrectos).

# Pasos para trabajar con este proyecto

1. Descargar el proyecto desde: 'https://github.com/ornellademichelis/turnos-medicos'

2. Inicializar el proyecto 
bash
npm install

MAC - Linux 
bash
sudo npm install

3. Ejecutar en ambiente DEV
bash
npm run dev

4. Transpilar el proyecto
bash
npm run build

5. Ejecutar en PROD
bash
npm run prod

