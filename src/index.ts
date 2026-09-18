import { configuracionAgenda, arrayProfesionales, arrayEspecialidades} from "./resources.ts";
import { EspecialidadesController} from "./controller/especialidades.controller.ts"
import { ProfesionalesController } from "./controller/profesionales.controller.ts";
import { GeneralController } from "./controller/general.controller.ts";
//import type { Especialidad, Profesional} from "./resources.ts";

import Express, {type Response, type Request} from "express"

const PORT = process.env.PORT || 3000
const app = Express()

//MIDDLEWARE
app.use(Express.json())

//ENDPOINTS 

//hello world 
app.get("/", GeneralController.helloWorld)

// ESPECIALIDADES
app.get('/especialidades', EspecialidadesController.getAll)
app.get('/especialidades/:id', EspecialidadesController.findById)
app.post('/especialidades', EspecialidadesController.create)
app.delete('/especialidades/:id', EspecialidadesController.delete)


// PROFESIONALES 
app.get('/profesionales', ProfesionalesController.getAll)
app.get('/profesionales/:id', ProfesionalesController.findById)
app.post('/profesionales', ProfesionalesController.create)
app.put('/profesionales/:id', ProfesionalesController.modify)
app.delete('/profesionales/:id', ProfesionalesController.delete)

//404 Not Found
app.use(GeneralController.notFound)

app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en puerto ${PORT}`)
});
