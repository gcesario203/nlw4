import {RouterInstance} from '../config/GlobalRouter'
import { UserRouter } from "./UserRoutes"
import {SurveyRouter} from './SurveyRoutes'
import {SendMailRouter} from './SendMailRoutes'
import {AnswerRouter} from './AnswerRoutes'

export class RoutesHandler
{
    userRoutes:UserRouter;
    surveyRoutes:SurveyRouter;
    sendMaildRoutes:SendMailRouter;
    answerRoutes: AnswerRouter;

    constructor()
    {
        this.userRoutes = new UserRouter();
        this.surveyRoutes = new SurveyRouter();
        this.sendMaildRoutes = new SendMailRouter();
        this.answerRoutes = new AnswerRouter();
    }

    init()
    {
        return RouterInstance.router
    }
}