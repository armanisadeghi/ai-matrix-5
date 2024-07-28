declare module "cors" {
    import { RequestHandler } from "express";

    interface CorsOptions {
        origin?:
            | ((origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void)
            | string
            | boolean
            | RegExp
            | (string | RegExp)[];
        methods?: string | string[];
        allowedHeaders?: string | string[];
        exposedHeaders?: string | string[];
        credentials?: boolean;
        maxAge?: number;
        preflightContinue?: boolean;
        optionsSuccessStatus?: number;
    }

    function cors(options?: CorsOptions): RequestHandler;

    export = cors;
}
