import {RouterInstance} from '../config/GlobalRouter'
import {SendMailController} from '.././controllers/SendMailController'

class SendMailRouter
{
    sendMailController:SendMailController;


    constructor()
    {
        this.sendMailController = new SendMailController();
        this.initRoutes()
    }

    initRoutes()
    {
        RouterInstance.router.post("/sendmails", this.sendMailController.execute)
    }
}

export {SendMailRouter}