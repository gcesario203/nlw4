import { EntityRepository, Repository } from "typeorm";
import { UsersxSurveys } from "../models/UserxSurvey";

@EntityRepository(UsersxSurveys)
class UsersxSurveysRepository extends Repository<UsersxSurveys>
{

}

export {UsersxSurveysRepository}