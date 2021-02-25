import {RouterInstance} from '../config/GlobalRouter'
import { UserRouter } from "./UserRoutes"
import {SurveyRouter} from './SurveyRoutes'

export class RoutesHandler
{
    userRoutes:UserRouter;
    surveyRoutes:SurveyRouter;

    constructor()
    {
        this.userRoutes = new UserRouter();
        this.surveyRoutes = new SurveyRouter();
    }

    init()
    {
        return RouterInstance.router
    }
}