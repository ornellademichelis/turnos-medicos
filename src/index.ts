import { configuracionAgenda, arrayProfesionales, arrayEspecialidades} from "./resources.ts";
import type { Especialidad, Profesional} from "./resources.ts";

import Express, {type Response, type Request} from "express"

const PORT = process.env.PORT || 3000
const app = Express()

//MIDDLEWARE
app.use(Express.json())

//ENDPOINTS 
//hello world 

// GET especialidades -- Obtener el listado completo
app.get('/especialidades', (req: Request, res: Response) => {
    try {
        res.status(200)
            .json(arrayEspecialidades)
    } catch (error) {
        res.status(400)
        .json({ success: false, message: "Error al intentar enviar los datos de especialidades." });
    }
});

// GET especialidades id -- Buscar una especialidad específica por especialidadId
app.get('/especialidades/:id', (req: Request, res: Response) => {
    try {
        const especialidadId: number | undefined = Number(req.params.id)

        if(!especialidadId){
            throw new Error('Error al obtener el codigo de la especialidad.')
        }

        const especialidadSolicitada = arrayEspecialidades.find((esp: any)=>esp.especialidadId === especialidadId)

        if (!especialidadSolicitada) {
            throw new Error('No se encontro la especialidad indicada')
        }else{
            console.clear()
            console.table(especialidadSolicitada)
            res.status(200)
            .json(especialidadSolicitada)
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la especialidad' });
    }
});

// POST especialidades -- Crear una nueva especialidad
app.post('/especialidades', (req: Request, res: Response) => {
    try {
        const {nombreEspecialidad, activa} = req.body

        const nuevaEspecialidad: Especialidad = {
            especialidadId: arrayEspecialidades.length + 1,
            nombreEspecialidad: nombreEspecialidad,
            activa: Boolean(activa)
        }
        arrayEspecialidades.push(nuevaEspecialidad)

        console.clear()
        console.table(nuevaEspecialidad)
        res.status(201)
            .json(nuevaEspecialidad)

    } catch (error) {
        res.status(500).json({ error: 'Error al crear la especialidad' });
    }
});

// DELETE especialidades id -- Borrado lógico (activa: false)
app.delete('/especialidades/:id', (req: Request, res: Response) => {
    try {
        const especialidadId: number = Number(req.params.id as string)

        const indice: number = arrayEspecialidades.findIndex((esp: any)=> esp.especialidadId === especialidadId)

        if (indice > -1) {
            arrayEspecialidades[indice].activa = false

            res.status(204)
                .json({})
        } else {
            res.status(404).json({ error: 'Especialidad no encontrada' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al desactivar la especialidad' });
    }
});

// ENDPOINTS DE PROFESIONALES MÉDICOS

// GET profesionales -- Obtener el listado completo
app.get('/profesionales', (req: Request, res: Response) => {
    try {
        const profesionalesFiltrados: [] = arrayProfesionales.filter((prof: any)=> prof.activo === true)

        res.status(200)
            .json(profesionalesFiltrados)
    } catch (error) {
        res.status(400)
            .json({status: false, errorMessage: "Verifica el codigo de especialidad enviado." })
    }
});

// GET profesionales id -- Buscar un médico específico por medicoId
app.get('/profesionales/:id', (req: Request, res: Response) => {
    try {
        const profesionalId = req.params.id

        const profesionalSeleccionado = arrayProfesionales.find((prof: any)=> prof.profesionalId === Number(profesionalId))
        
        if (profesionalSeleccionado){
            res.status(200)
                .json(profesionalSeleccionado)
        }else{
            throw new Error ('Error al buscar un profesional')
        }

    } catch (error) {
        res.status(400)
            .json({status: false, errorMessage: (error as Error).message || "Error buscando un profesional." })
    }
});

// POST profesionales -- Registrar un nuevo médico
app.post('/profesionales', (req: Request, res: Response) => {
    try {
        const { nombre, especialidad, activo} = req.body
        
        const nuevoProfesional: Profesional ={
            profesionalId: arrayProfesionales.length + 1,
            nombre: nombre,
            especialidad: especialidad,
            activo: Boolean(activo)
        }

        arrayProfesionales.push(nuevoProfesional)

        res.status(201)
            .json(nuevoProfesional)

    } catch (error) {
        res.status(400)
            .json({status: false, errorMessage: (error as Error).message || "Error creando un nuevo profesional." })
    }
});

// PUT profesionales id -- Modificación completa de un profesional
app.put('/profesionales/:id', (req: Request, res: Response) => {
    try {
        const profesionalId = req.params.id
        const { nombre, especialidad, activo } = req.body
        
        const indice = arrayProfesionales.findIndex((prof: any)=> prof.profesionalId === Number(profesionalId))
        if (indice > -1) {
            arrayProfesionales[indice].nombre = nombre
            arrayProfesionales[indice].especialidad = especialidad
            arrayProfesionales[indice].activo = Boolean(activo)

            res.status(200)
                .json(arrayProfesionales[indice])

        }else{
            throw new Error('No se encontro el profesional indicado')
        }

    } catch (error) {
        res.status(400)
            .json({status: false, errorMessage: (error as Error).message || "Error al modificar datos de un profesional." })
    }
});

// DELETE /profesionales id -- Borrado lógico (activo: false)
app.delete('/profesionales/:id', (req: Request, res: Response) => {
    try {
        const profesionalId = req.params.id
        const indice = arrayProfesionales.findIndex((prof: any)=> prof.profesionalId === Number(profesionalId))

        if (indice > -1){
            arrayProfesionales[indice].activo = false
            res.status(204)
                .json({})
        }else {
            throw new Error('Error al intentar cambiar el estado activo de un profesional.')
        }

    } catch (error) {
        res.status(400)
            .json({status: false, errorMessage: (error as Error).message || "Errror al intentar realizar la operacion."})
    }
});

app.use((req: Request, res: Response)=> {
    try{
        res.status(404).json({
            error: 'Endpoint no encontrado',
            ruta: req.originalUrl,
            metodo: req.method
        });
    } catch (error){
        res.status(500).json({error: 'Error interno del servidor'});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
});
