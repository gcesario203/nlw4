import {RouterInstance} from '../config/GlobalRouter'
import {UserController} from '.././controllers/UserController'

class UserRouter
{
    userController:UserController;


    constructor()
    {
        this.userController = new UserController();
        this.initRoutes()
    }

    initRoutes()
    {
        RouterInstance.router.post("/users", this.userController.create)

        RouterInstance.router.get("/users", this.userController.get)

        RouterInstance.router.get("/users/:id", this.userController.get)

        RouterInstance.router.delete("/users/:id", this.userController.deleteById)

        RouterInstance.router.put("/users/:id", this.userController.create)
    }

}

export {UserRouter}