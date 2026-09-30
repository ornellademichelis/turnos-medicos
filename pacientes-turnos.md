# Documentación del Módulo de Pacientes y Turnos

## 1. Explicación de las Estructuras de Datos

### Entidad: Pacientes (`pacientes.json`)
Esta estructura almacena la información personal, de contacto y de cobertura médica de los usuarios registrados en el sistema. Es requerida para vincular a una persona real con la solicitud de una atención médica.

- **`codigoPaciente`** *(Number)*: Identificador único e incremental del paciente dentro del sistema.
- **`nombreCompleto`** *(String)*: Nombre y apellido completo del paciente.
- **`documento`** *(String)*: Documento Nacional de Identidad (DNI) o pasaporte.
- **`fechaNacimiento`** *(String - YYYY-MM-DD)*: Fecha de nacimiento utilizada para calcular la edad o validar rangos etarios.
- **`email`** *(String)*: Dirección de correo electrónico de contacto para enviar notificaciones de turnos.
- **`telefono`** *(String)*: Número telefónico principal de contacto.
- **`coberturaSalud`** *(String)*: Obra social o medicina prepaga a la que pertenece el paciente.
- **`activo`** *(Boolean)*: Indicador lógico de baja/alta en el sistema (utilizado para el borrado lógico/soft delete).

---

### Entidad: Turnos (`turnos.json`)
Representa la asignación de una cita médica. Vincula el momento de la consulta con la especialidad, el profesional de la salud y el paciente involucrado, además de llevar la trazabilidad del estado del turno.

- **`codigoTurno`** *(Number)*: Identificador único e incremental de la cita médica.
- **`fecha`** *(String - YYYY-MM-DD)*: Día agendado para la consulta.
- **`hora`** *(String - HH:mm)*: Horario estipulado para la atención.
- **`especialidad`** *(String)*: Ámbito o rama médica correspondiente al turno.
- **`profesional`** *(String)*: Nombre del profesional médico que brindará la atención.
- **`nombrePaciente`** *(String)*: Nombre del paciente asignado a dicho turno.
- **`estadoTurno`** *(String)*: Situación actual del turno dentro de su ciclo de vida (corresponde a uno de los estados válidos).

---

### Entidad: Estados de Turno (`estados-turnos.json`)
Catálogo de referencia que parametriza y describe la evolución del ciclo de vida por el cual transiciona un turno desde su creación hasta su finalización o anulación.

- **`id`** *(Number)*: Identificador numérico del estado.
- **`nombre`** *(String)*: Etiqueta descriptiva del estado:
  - `registrado`: Cita agendada en el sistema.
  - `validado`: Cobertura y datos confirmados previo a la atención.
  - `presente`: Paciente anunciado en la sala de espera.
  - `en consulta`: Paciente siendo atendido por el profesional.
  - `finalizado`: Consulta médica concluida con éxito.
  - `cancelado`: Turno suspendido previamente.
  - `no presentado`: El paciente ausente a la cita.
- **`descripcion`** *(String)*: Detalle funcional de lo que implica dicho estado.

---

## 2. Explicación de Endpoints

### Módulo: Pacientes

#### `GET /pacientes`
- **Descripción:** Obtiene la lista completa de todos los pacientes registrados en el sistema. Filtra por defecto aquellos que se encuentren activos.
- **Respuesta:** Array con los objetos de pacientes (Status `200 OK`).

#### `GET /pacientes/:codigoPaciente`
- **Descripción:** Busca y retorna la información detallada de un paciente específico utilizando su código identificador.
- **Respuesta:** Objeto del paciente encontrado (Status `200 OK`) o mensaje de error si no existe (Status `404 Not Found`).

#### `POST /pacientes`
- **Descripción:** Registra un nuevo paciente en el sistema. Valida que se envíen todos los campos obligatorios (`nombreCompleto`, `documento`, `email`, etc.).
- **Respuesta:** Objeto del paciente recién creado junto a su `codigoPaciente` generado (Status `201 Created`).

#### `PUT /pacientes/:codigoPaciente`
- **Descripción:** Actualiza los datos de un paciente existente identificado por su código (por ejemplo, cambio de teléfono, email o cobertura de salud).
- **Respuesta:** Objeto del paciente con la información actualizada (Status `200 OK`).

#### `DELETE /pacientes/:codigoPaciente` *(Soft Delete)*
- **Descripción:** Realiza un borrado lógico del paciente. En lugar de eliminar el registro del JSON/base de datos, cambia la propiedad `"activo": false` para preservar el historial de turnos asociados.
- **Respuesta:** Confirmación de la operación (Status `200 OK` o `204 No Content`).

---

### Módulo: Turnos Médicos

#### `GET /turnos`
- **Descripción:** Recupera la lista completa de turnos agendados en el sistema, incluyendo información de la cita, profesional, paciente y su estado actual.
- **Respuesta:** Array con el listado de turnos (Status `200 OK`).

#### `GET /turnos/:codigoTurno`
- **Descripción:** Consulta el detalle de un turno particular mediante su código identificador.
- **Respuesta:** Objeto con los datos detallados del turno (Status `200 OK`) o un mensaje de error si el código no coincide con ningún registro (Status `404 Not Found`).

#### `POST /turnos`
- **Descripción:** Asigna y registra un nuevo turno médico. Al momento del alta, el turno se genera automáticamente asignándole el estado inicial `"registrado"`.
- **Respuesta:** Objeto del turno agendado con su `codigoTurno` y `estadoTurno: "registrado"` (Status `201 Created`).

#### `PUT /turnos/:codigoTurno`
- **Descripción:** Permite modificar la información del turno o avanzar dentro del flujo de estados de atención (`registrado` $\rightarrow$ `validado` $\rightarrow$ `presente` $\rightarrow$ `en consulta` $\rightarrow$ `finalizado`, o en su defecto `cancelado` / `no presentado`). Valida que el valor ingresado en `estadoTurno` coincida con uno de los nombres parametrizados en el modelo de estados.
- **Respuesta:** Objeto del turno con el nuevo estado o datos actualizados (Status `200 OK`) o error de validación en caso de ingresar un estado no permitido (Status `400 Bad Request`).