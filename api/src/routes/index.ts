import {RouterInstance} from '../config/GlobalRouter'
import { UserRouter } from "./UserRoutes"
import {SurveyRouter} from './SurveyRoutes'
import {SendMailRouter} from './SendMailRoutes'
import {AnswerRouter} from './AnswerRoutes'
import {NpsRouter} from './NpsRoutes'

export class RoutesHandler
{
    userRoutes:UserRouter;
    surveyRoutes:SurveyRouter;
    sendMaildRoutes:SendMailRouter;
    answerRoutes: AnswerRouter;
    npsRoutes:NpsRouter

    constructor()
    {
        this.userRoutes = new UserRouter();
        this.surveyRoutes = new SurveyRouter();
        this.sendMaildRoutes = new SendMailRouter();
        this.answerRoutes = new AnswerRouter();
        this.npsRoutes = new NpsRouter();
    }

    init()
    {
        return RouterInstance.router
    }
}