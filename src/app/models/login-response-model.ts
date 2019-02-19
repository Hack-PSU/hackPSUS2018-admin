export class LoginResponseModel {
    api_reponse: string;
    status: number;
    body: {
        result: string;
        data: {
            admin: boolean;
            privilege: number;
        }
        uid: number;
    }
}