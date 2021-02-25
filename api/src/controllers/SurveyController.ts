import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';

class SurveyController
{
    async create(req:Request,res:Response){
        const {title,description} = req.body;
        const {id} = req.params

        const surveyRepository = getCustomRepository(SurveyRepository)

        if(id)
        {
            const survey = await surveyRepository.findOne(id)

            try {
                await surveyRepository.update({id:survey.id},
                    {
                        title:title,
                        description:description
                    })

                res.status(203).send
                ({
                    "message":"Update success"
                })
            } catch {
                res.status(400).send
                ({
                    "message":`survey not found`
                })   
            }
        }
        else
        {
            const surveyAlreadyExists = await surveyRepository.findOne(
                {
                    title
                })
    
            if(surveyAlreadyExists)
            {
                return res.status(400).json(
                    {
                        "message":"title already exists"
                    })
            }

            const survey = surveyRepository.create(
                {
                    title,description
                })
    
            await surveyRepository.save(survey)
    
            return res.status(201).json(
                {
                    "message":"survey successfully created",
                    "id":survey.id
                })
        }
    }

    async deleteById(req:Request,res:Response)
    {
        const {id} = req.params || null

        const surveyRepository = getCustomRepository(SurveyRepository)

        if(id)
        {
            const survey = await surveyRepository.findOne(id)
            
            try {
                await surveyRepository.remove(survey);

                return res.status(200).json({"message":"Survey successfully deleted"})
            } catch (error) {
                return res.status(500).json({"message":`Something goes wrong: ${error}`})
            }
        }
        else
        {
             res.status(400).json({"message":"Survey not found"})
        }
    }

    async get(req:Request,res:Response)
    {
        const {id} = req.params || null

        const surveyRepository = getCustomRepository(SurveyRepository)

        if(id)
        {
            const survey = await surveyRepository.findOne(id) 
            
            return survey ? res.status(200).json(survey): res.status(400).json({"message":"survey not found"})
        }
        else
        {
            const surveys = await surveyRepository.find()

            return res.status(200).json(surveys)
        }
    }
}

export { SurveyController };
