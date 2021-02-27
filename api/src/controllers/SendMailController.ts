import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { UserRepository } from '../repositories/UserRepository';
import { UsersxSurveysRepository } from '../repositories/UserxSurveysRepository';

class SendMailController
{
    async execute(req:Request,res:Response)
    {
        const {email,surveyId} = req.body

        const userRepo = getCustomRepository(UserRepository);
        const surveyRepo = getCustomRepository(SurveyRepository);
        const surveyxuserRepo = getCustomRepository(UsersxSurveysRepository);

        const userExists = await userRepo.findOne({ email })

        if(!userExists)
        {
            return res.status(400).json(
                {
                    "message":"User not exists"
                })
        }

        const surveyExists = await surveyRepo.findOne({id:surveyId})

        if(!surveyExists)
        {
            return res.status(400).json(
                {
                    "message":"Survey not exists"
                })
        }

        const surveyXuser = surveyxuserRepo.create(
            {
                userId:userExists.id,
                surveyId:surveyExists.id,
            })

        await surveyxuserRepo.save(surveyXuser)

        return res.json(surveyXuser)
    }
}

export { SendMailController }