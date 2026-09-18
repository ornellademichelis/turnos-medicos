import { arrayEspecialidades } from "../resources.ts"
import type { Especialidad } from "../resources.ts"
import { type Response, type Request } from "express"

export class EspecialidadesController{

    static getAll = async (req: Request, res: Response) => {
        try {
            const especialidadesActivas = arrayEspecialidades.filter((esp: any)=> esp.activa === true)
    
            if (!especialidadesActivas){
                throw new Error('No se encontraron especialidades activas')
            }
            return res.status(200)
                        .json(especialidadesActivas)
    
        } catch (error: any) {
            return res.status(400)
                        .json({ success: false, message: error.message})
        }
    }
    
    static findById =  async (req: Request, res: Response) => {
    try {
        const especialidadId: number | undefined = Number(req.params.id)

        if(!especialidadId){
            throw new Error('Verifica el codigo o ID de la especialidad que buscas.')
        }

        const especialidadSolicitada = arrayEspecialidades
                                        .find((esp: any)=>
                                            esp.especialidadId === especialidadId)

        if (!especialidadSolicitada) {
            throw new Error('Verifica el codigo o ID de la especialidad que buscas.')
        }
        
            return res.status(200).json(especialidadSolicitada)

        }catch (error: any) {
            return res.status(400)
                .json({success: false, message: error.message})
    }
    } 

    static create = async (req: Request, res: Response) => {
        try {
            const {nombreEspecialidad, activa} = req.body
    
            if(!nombreEspecialidad || activa === undefined || activa === null){
                throw new Error('Verifica los datos enviados para la nueva especialidad.')
            }
            
            const nuevaEspecialidad: Especialidad = {
                especialidadId: arrayEspecialidades.length + 1,
                nombreEspecialidad: nombreEspecialidad,
                activa: Boolean(activa)
            }
            arrayEspecialidades.push(nuevaEspecialidad)
    
            return res.status(201)
                .json(nuevaEspecialidad)
    
        } catch (error: any) {
            return res.status(400)
                .json({success: false, message: error.message})
        }
    }

    static delete = async (req: Request, res: Response) => {
    try {
        const especialidadId: number = Number(req.params.id as string)

        if (!especialidadId) {
            throw new Error('Verifica el codigo o ID de la especialidad.')
        }

        const indice: number = arrayEspecialidades
                                    .findIndex((esp: any)=> 
                                                esp.especialidadId === especialidadId)

        arrayEspecialidades[indice].activa = false

        return res.status(200)
                    .json(arrayEspecialidades[indice])    

    } catch (error: any) {
        return res.status(400)
            .json({ error: error.message })
    }
    }
}
