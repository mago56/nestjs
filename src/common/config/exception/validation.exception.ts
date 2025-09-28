import {HttpException, ValidationError} from "@nestjs/common";
import {ApiCodeResponse} from "@common/api";
import {isNil} from "lodash";


export class ValidationException extends HttpException {
    constructor(errors: ValidationError[]) {
        super({
            code: ApiCodeResponse.PAYLOAD_IS_NOT_VALID,
            data: errors.map((e) => validationErrorToApiCodeResponse(e)).flat(),
            result: false,
        } ,  499);
    }
}
export const validationErrorToApiCodeResponse = (error: ValidationError): ApiCodeResponse[] => {
    console.log('err' , error);
    const keys : string[] = isNil(error.constraints)? [] : Object.keys(error.constraints);
    return keys.map((k: string) => {
        const code = ApiCodeResponse[`${camelToSnake(error.property)}_${camelToSnake(k)}` as keyof typeof
            ApiCodeResponse];
        return isNil(code) ? ApiCodeResponse.PAYLOAD_IS_NOT_VALID : code;
    });
};

export const camelToSnake = (str: string): string => {
    return str.replace(/([A-Z])/g, " $1").split(' ').join('_').toUpperCase();
};