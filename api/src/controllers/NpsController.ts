import {Request,Response} from 'express'
import { getCustomRepository, IsNull, Not } from 'typeorm'
import { UsersxSurveysRepository } from '../repositories/UserxSurveysRepository'

class NpsController
{
    async execute(req:Request,res:Response)
    {
        const {surveyId} = req.params

        const sxuRepo = getCustomRepository(UsersxSurveysRepository)

        const surveys = await sxuRepo.find(
            {
                where:{surveyId:surveyId, value: Not(IsNull())}
            })

        const total = surveys.length;
        const refrat = surveys.filter(sxu=>sxu.value >= 0  && sxu.value <= 6).length
        const promot = surveys.filter(sxu => sxu.value >= 9 && sxu.value <= 10).length
        const passive = surveys.filter(sxu=>sxu.value >= 7  && sxu.value <= 8).length

        const result = Number(
            ((promot - refrat) / total) * 100
        ).toFixed(2)
        
        res.status(200).json({
            "refrators":refrat,
            "promoters":promot,
            "passives":passive,
            "total":total,
            "result":result

        })
    }
}


export {NpsController}