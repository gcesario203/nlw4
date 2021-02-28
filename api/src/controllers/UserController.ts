import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from 'yup'

class UserController
{
    async create(req:Request,res:Response){
        const {name,email} = req.body;
        const {id} = req.params

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        const userRepository = getCustomRepository(UserRepository)

        if(id)
        {
            const user = await userRepository.findOne(id)

            try {
                await userRepository.update({id:user.id},
                    {
                        name:name,
                        email:email
                    })

                res.status(203).send
                ({
                    "message":"Update success"
                })
            } catch {
                res.status(400).send
                ({
                    "message":`User not found`
                })   
            }
        }
        else
        {
            const userAlreadyExists = await userRepository.findOne(
                {
                    email
                })
    
            if(userAlreadyExists)
            {
                return res.status(400).json(
                    {
                        "message":"Email already exists"
                    })
            }

            const user = userRepository.create(
                {
                    name,email
                })
    
            await userRepository.save(user)
    
            return res.status(201).json(
                {
                    "message":"User successfully created",
                    "id":user.id
                })
        }
    }

    async deleteById(req:Request,res:Response)
    {
        const {id} = req.params || null

        const userRepository = getCustomRepository(UserRepository)

        if(id)
        {
            const user = await userRepository.findOne(id)
            
            try {
                await userRepository.remove(user);

                return res.status(200).json({"message":"User successfully deleted"})
            } catch (error) {
                return res.status(500).json({"message":`Something goes wrong: ${error}`})
            }
        }
        else
        {
             res.status(400).json({"message":"User not found"})
        }
    }

    async get(req:Request,res:Response)
    {
        const {id} = req.params

        const userRepository = getCustomRepository(UserRepository)

        if(id)
        {
            const user = await userRepository.findOne(id) 
            
            return user ? res.status(200).json(user): res.status(400).json({"message":"User not found"})
        }
        else
        {
            const users = await userRepository.find()

            return res.status(200).json(users)
        }
    }
}

export { UserController };
