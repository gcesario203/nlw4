import {RouterInstance} from '../config/GlobalRouter'
import {NpsController} from '.././controllers/NpsController'

class NpsRouter
{
    npsController:NpsController;


    constructor()
    {
        this.npsController = new NpsController();
        this.initRoutes()
    }

    initRoutes()
    {
        RouterInstance.router.get("/nps/:surveyId", this.npsController.execute)
    }
}

export {NpsRouter}