import {RouterInstance} from '../config/GlobalRouter'
import { UserRouter } from "./UserRoutes"
import {SurveyRouter} from './SurveyRoutes'
import {SendMailRouter} from './SendMailRoutes'

export class RoutesHandler
{
    userRoutes:UserRouter;
    surveyRoutes:SurveyRouter;
    sendMaildRoutes:SendMailRouter

    constructor()
    {
        this.userRoutes = new UserRouter();
        this.surveyRoutes = new SurveyRouter();
        this.sendMaildRoutes = new SendMailRouter();
    }

    init()
    {
        return RouterInstance.router
    }
}