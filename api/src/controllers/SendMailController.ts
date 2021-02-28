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

        const suveryUserAlreadyExists = await surveyxuserRepo.findOne(
            {
                where:[
                    {userId: user.id},
                    {surveyId: survey.id},
                    {value: null}
                ]
            }
        )

        const path = resolve(__dirname,'..','views','emails','npsMail.hbs')
        const vars = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            userId: user.id,
            link: process.env.URL_MAIL,
            surveyId: survey.id
        }

        if(suveryUserAlreadyExists)
        {
            await SendMailService.execute(email,survey.title, vars,path);
            res.status(200).json(
                {
                    "message":"Sended again the survey",
                    ...suveryUserAlreadyExists
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
    
            await SendMailService.execute(email,survey.title, vars,path);
    
            return res.status(200).json({message:"Survey created successfull",...surveyXuser})
        }
    }
}

export { SendMailController }