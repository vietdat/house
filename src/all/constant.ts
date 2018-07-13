
export class Constant {
    public static DOMAIN = "http://localhost:5004/api/";
    public static readonly myReadonlyProperty = 1;
    public static readonly internalTokenKey = "Fami@123456";
    public static readonly tokenKey = "Fami@1234";

    // Url
    public static readonly sendSmsApi = "http://localhost:5003/api/sms";
    public static readonly createApi = "http://localhost:5004/api/%s";
    public static readonly findByIdApi = "http://localhost:5004/api/%s/byid/%s";
    public static API_COMMON = Constant.DOMAIN + "%s?%s";
    public static API_SEARCH = Constant.DOMAIN + "%s/search?%s";
    public static API_CREATE = Constant.DOMAIN + "%s";
    public static API_GET_BY_ID = Constant.DOMAIN + "%s/byid/%s";
    public static API_GET_BY_IDS = Constant.DOMAIN + "%s/byids?%s";
    public static API_ACTIVE_BY_ID = Constant.DOMAIN + "%s/%s/active";
    public static API_SOFT_DELETE_BY_ID = Constant.DOMAIN + "%s/%s/softdelete";
    public static API_DELETE_BY_ID = Constant.DOMAIN + "%s/%s/delete";
    public static API_UPDATE_BY_ID = Constant.DOMAIN + "%s/%s/update";
    public static API_GET_BY_OWNER = Constant.DOMAIN + "%s/byowner/%s";
}
