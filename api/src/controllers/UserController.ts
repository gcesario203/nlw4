import {Request,Response} from 'express'
import {User} from '../models/User'
import {getRepository} from 'typeorm'

class UserController
{
    async create(req:Request,res:Response){
        const {name,email} = req.body;

        const userRepository = getRepository(User)

        const userAlreadyExists = await userRepository.findOne(
            {
                email
            })

        if(userAlreadyExists)
        {
            return res.status(400).json(
                {
                    "message":"User already exists"
                })
        }

        const user = userRepository.create(
            {
                name,email
            })

        await userRepository.save(user)

        return res.json(user)
    }
}

export{UserController}