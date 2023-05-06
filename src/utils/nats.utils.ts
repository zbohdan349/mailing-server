import { Subscription, Msg, headers, Empty } from "nats.ws";
import { logger } from "./logger.js";
type HandleSubscribeOpt = {
    sub: Subscription,
    reqFun: (data: any) => Promise<any>,
    decodeArgFun?: (arg: Uint8Array) => any
    encodeResFun: (arg: any) => Uint8Array
}

export const handleSubscribe = async (opt: HandleSubscribeOpt) => {
    for await (const m of opt.sub) {
        logger.info(`[${opt.sub.getProcessed()}]:[${opt.sub.getSubject()}]`);
        const h = headers()
        let data;
        try {
            if (opt.decodeArgFun) {
                data = opt.decodeArgFun(m.data)
            }
        } catch (error) {
            logger.warn(error);
            h.append('status', '400')
            m.respond(Empty, { headers: h })
            return
        }

        opt.reqFun(data)
            .then((result) => {
                h.append('status', '200')
                m.respond(opt.encodeResFun(result), { headers: h })
            })
            .catch((error) => {
                if (error?.code) {
                    h.append('status', `${error.code}`)
                    logger.error(error.message);

                } else {
                    h.append('status', '500')
                    logger.error(error.message);
                }
                m.respond(Empty, { headers: h })
            })
    }
}