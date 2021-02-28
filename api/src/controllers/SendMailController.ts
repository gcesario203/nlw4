import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { UserRepository } from '../repositories/UserRepository';
import { UsersxSurveysRepository } from '../repositories/UserxSurveysRepository';
import SendMailService from '../services/SendMailService'
import {resolve} from 'path'

class SendMailController
{

    async execute(req:Request,res:Response)
    {
        const {email,surveyId} = req.body

        const userRepo = getCustomRepository(UserRepository);
        const surveyRepo = getCustomRepository(SurveyRepository);
        const surveyxuserRepo = getCustomRepository(UsersxSurveysRepository);

        const user = await userRepo.findOne({ email })

        if(!user)
        {
            return res.status(400).json(
                {
                    "message":"User not exists"
                })
        }

        const survey = await surveyRepo.findOne({id:surveyId})

        if(!survey)
        {
            return res.status(400).json(
                {
                    "message":"Survey not exists"
                })
        }

        const surveyUserAlreadyExists = await surveyxuserRepo.findOne(
            {
                where:{userId: user.id,surveyId: survey.id,value: null},
                relations:["user","survey"], 
            }
        )

        const path = resolve(__dirname,'..','views','emails','npsMail.hbs')
        const vars = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            sxuId: 0,
            link: process.env.URL_MAIL,
        }

        if(surveyUserAlreadyExists)
        {
            vars.sxuId = surveyUserAlreadyExists.id
            await SendMailService.execute(email,survey.title, vars,path);
            res.status(200).json(
                {
                    "message":"Sended again the survey",
                    ...surveyUserAlreadyExists
                })
        }
        else
        {
            const surveyXuser = surveyxuserRepo.create(
                {
                    userId:user.id,
                    surveyId:survey.id,
                })
    
            await surveyxuserRepo.save(surveyXuser)

            vars.sxuId = surveyXuser.id
    
            await SendMailService.execute(email,survey.title, vars,path);
    
            return res.status(200).json({message:"Survey created successfull",...surveyXuser})
        }
    }
}

export { SendMailController }