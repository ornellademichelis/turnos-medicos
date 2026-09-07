# Turnos Médicos

## Descripción del Proyecto
Sistema de gestión y consulta de turnos médicos desarrollado con **Node.js**, **TypeScript** y **Express**. La aplicación permite la parametrización de agendas y la lectura asíncrona de profesionales y especialidades desde archivos de datos JSON mediante el módulo nativo `node:fs/promises`.

## Tecnologías Utilizadas
* **Lenguaje:** TypeScript / JavaScript (Node.js)
* **Framework:** Express
* **Módulos nativos:** `node:fs/promises`, `node:path`
* **Formato de datos:** JSON

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