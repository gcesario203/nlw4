import {RouterInstance} from '../config/GlobalRouter'
import {AnswerController} from '.././controllers/AnswerController'

class AnswerRouter
{
    answerController:AnswerController;


    constructor()
    {
        this.answerController = new AnswerController();
        this.initRoutes()
    }

    initRoutes()
    {
        RouterInstance.router.get("/answers/:value", this.answerController.execute)
    }
}

export {AnswerRouter}