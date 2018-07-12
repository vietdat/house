
export class Constant {
    public static readonly myReadonlyProperty = 1;
    public static readonly internalTokenKey = "Fami@123456";
    public static readonly tokenKey = "Fami@1234";

    // Url
    public static readonly sendSmsApi = "http://localhost:5003/api/sms";
    public static readonly createApi = "http://localhost:5004/api/%s";
    public static readonly findByIdApi = "http://localhost:5004/api/%s/byid/%s";

}
