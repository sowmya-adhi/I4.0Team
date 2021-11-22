import { Injectable } from '@angular/core';

@Injectable()
export class Constant {

    constructor() {}
    public CUSTOMER_API="http://localhost:8080/api/customer";
    public RESPONDENT_API = 'http://localhost:8080/api/Respondent_details'
    public QUESTION_API='http://localhost:8080/api/question';
    public ASSESSMENT_AREA_API='http://localhost:8080/api/AssessmentArea';
    public Assessment_Area_API='http://localhost:8080/api/AssessmentArea';

    public Category_API='http://localhost:8080/api/Category';

    public Question_API='http://localhost:8080/api/question';

    public AssessmentArea_API='http://localhost:8080/api/AssessmentArea';
    public Question_Option_Api="http://localhost:8080/api/questionoption"
    public Question_Type_Api="http://localhost:8080/api/question_type"

    // public Category_API="http://localhost:8080/api/Category"

    // public Question_API="http://localhost:8080/api/question"
    public LOGIN_API='https://digitaltwins.lntinfotech.com:8801/iam-services/api/authentication/login';
    public APPLICATION_API = "https://digitaltwins.lntinfotech.com:8803/application-registry-services/api/app-registry?tenant=digitaltwin";
    public ASSETMETADATA_API="https://digitaltwins.lntinfotech.com:8804/asset-metadata-services/api/assets/";
    public ASSET_TYPES_API= "https://digitaltwins.lntinfotech.com:8804/asset-metadata-services/api/asset-type";
    public TIME_SERIES_API="https://digitaltwins.lntinfotech.com:8810/time-series/api/scan-data";
    public EVENT_API="https://digitaltwins.lntinfotech.com:8809/event-services/api/scan-data";
    public MAINTENANCE_API="https://digitaltwins.lntinfotech.com:8813/enterprise-connector/service-executor/api/executor";
    public TWIN_SERVICE_API="https://digitaltwins.lntinfotech.com:8806/twin-services/api/boms";
    public TWIN_APP="https://digitaltwins.lntinfotech.com/";
    public THRESHOLD_API="https://digitaltwins.lntinfotech.com:8806/twin-services/api/threshold";
    public ARVR_API="https://15.206.99.16";
    public GET_ATTRIBUTES_API = "https://digitaltwins.lntinfotech.com:8804/asset-metadata-services/api/asset-type-attributes/"

    public GET_ASSET_TYPES = "https://digitaltwins.lntinfotech.com:8804/asset-metadata-services/api/asset-type"
    public GET_LAST10_EVENTS = "https://digitaltwins.lntinfotech.com:8809/event-services/api/scan-alert-data"
    public GET_ASSET_BY_TYPE = "https://digitaltwins.lntinfotech.com:8804/asset-metadata-services/api/assets?asset_type_name="
    public UPDATE_ALERT_STATUS = "https://digitaltwins.lntinfotech.com:8809/event-services/api/update-alert-data"
}
