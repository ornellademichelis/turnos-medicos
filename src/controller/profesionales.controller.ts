import { arrayProfesionales } from "../resources.ts"
import type { Profesional } from "../resources.ts"
import { type Response, type Request } from "express"

export class ProfesionalesController {
    static statusCode = 200

static getAll = async (req: Request, res: Response) => {
    this.statusCode = 200
    try {
        return res.status(this.statusCode)
                    .json(arrayProfesionales)

    } catch (error: any) {
        this.statusCode = 400
        return res.status(this.statusCode)
                    .json({status: false, message: error.message})
    }
}

static findById = async (req: Request, res: Response) => {
    this.statusCode = 200
    try {
        const profesionalId = req.params.id

        if(!profesionalId){
            this.statusCode = 400
            throw new Error('Verifica el codigo o ID del profesional que buscas.')
        }

        const profesionalSeleccionado = arrayProfesionales
                                            .find((prof: any)=> 
                                                    prof.profesionalId === Number(profesionalId))

        if(!profesionalSeleccionado){
            this.statusCode = 404
            throw new Error('Error al buscar un profesional medico.')
        }

        return res.status(this.statusCode)
            .json(profesionalSeleccionado)

    } catch (error: any) {
        return res.status(this.statusCode)
            .json({success: false, message: error.message})
    }
}

static create = async (req: Request, res: Response) => {
    this.statusCode = 201
    try {
        const { nombre, especialidad, activo} = req.body

        if(!nombre || !especialidad || activo === undefined || activo === null){
            this.statusCode = 400
            throw new Error('Verifica los datos del nuevo profesional a crear.')
        }
        
        const nuevoProfesional: Profesional ={
            profesionalId: arrayProfesionales.length + 1,
            nombre: nombre,
            especialidad: especialidad,
            activo: Boolean(activo)
        }

        arrayProfesionales.push(nuevoProfesional)

        return res.status(this.statusCode)
            .json(nuevoProfesional)

    } catch (error: any) {
        return res.status(this.statusCode)
                        .json({status: false, message: error.message})
    }
}

static modify = async (req: Request, res: Response) => {
    this.statusCode = 200
    try {
        const profesionalId = req.params.id

        if(!profesionalId){
            this.statusCode = 400
            throw new Error('Verifica el codigo o ID del profesional a buscar.')
        }

        const { nombre, especialidad, activo } = req.body

        if(!nombre || !especialidad || activo === undefined || activo === null){
            this.statusCode = 400
            throw new Error('Verifica los datos del profesional a modificar.')
        }
        
        const indice = arrayProfesionales
                        .findIndex((prof: any)=> 
                                    prof.profesionalId === Number(profesionalId))

        if (indice === -1){
            this.statusCode = 404
            throw new Error('No se encontro un profesional con el codigo indicado.')
        }
        arrayProfesionales[indice].nombre = nombre
        arrayProfesionales[indice].especialidad = especialidad
        arrayProfesionales[indice].activo = Boolean(activo)

        return res.status(this.statusCode)
                    .json(arrayProfesionales[indice])

    } catch (error: any) {
        return res.status(this.statusCode)
                    .json({status: false, message: error.message})
    }
}

static delete = async (req: Request, res: Response) => {
    this.statusCode = 204
    try {
        const profesionalId = req.params.id

        if(!profesionalId){
            this.statusCode = 400
            throw new Error('Verifica el codigo o ID del profesional a buscar.')
        }

        const indice = arrayProfesionales
                        .findIndex((prof: any)=> 
                                    prof.profesionalId === Number(profesionalId))

        if (indice === -1){
            this.statusCode = 404
            throw new Error('Error al intentar cambiar el estado activo de un profesional.')
        }
        arrayProfesionales[indice].activo = false
        return res.status(this.statusCode)
                .json({})

    } catch (error: any) {
        return res.status(this.statusCode)
                    .json({status: false, message: error.message})
    }
}
}