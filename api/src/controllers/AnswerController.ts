import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersxSurveysRepository } from '../repositories/UserxSurveysRepository';

class AnswerController
{
    async execute(req:Request,res:Response)
    {
        const {sxu} = req.query
        const {value} = req.params

        const sxuRepo = await getCustomRepository(UsersxSurveysRepository);

        const existSxu = await sxuRepo.findOne({
            where:{id:sxu}
        })

        if(existSxu)
        {
            try {
                await sxuRepo.update({id:existSxu.id},
                    {
                        value: Number.parseInt(value)
                    })
                    
                res.status(203).json(
                    {
                        "message":"Agradecemos o feedback"
                    })
            } catch {
                res.status(500).json(
                    {
                        "message":"Something goes wrong"
                    })
            }
        }
        else
        {
            res.status(404).json(
                {
                    "message":"Survey not found"
                }) 
        }
    }
}

export {AnswerController}