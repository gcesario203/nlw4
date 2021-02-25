import {RouterInstance} from '../config/GlobalRouter'
import {SurveyController} from '.././controllers/SurveyController'

class SurveyRouter
{
    surveyController:SurveyController;


    constructor()
    {
        this.surveyController = new SurveyController();
        this.initRoutes()
    }

    initRoutes()
    {

        RouterInstance.router.post("/surveys", this.surveyController.create)

        RouterInstance.router.get("/surveys", this.surveyController.get)

        RouterInstance.router.get("/surveys/:id", this.surveyController.get)

        RouterInstance.router.delete("/surveys/:id", this.surveyController.deleteById)

        RouterInstance.router.put("/surveys/:id", this.surveyController.create)
    }

}

export {SurveyRouter}