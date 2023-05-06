
import * as dotenv from 'dotenv'
dotenv.config()
import crypto from 'crypto'
//import { runNatsController } from './controllers/nats.controller.js'
import { logger } from './utils/logger.js'
import { ErrorCode, JSONCodec, connect, consumerOpts, createInbox } from 'nats';



// const claims = {
//     DATABASE_URL:true, 
//     NATS_URL:true
// }
// Object.entries(claims).forEach(claim => {
//     const [claimKey,claimValue] = claim
//     if(!process.env[claimKey]){
//         if(claimValue) {
//             logger.fatal(`Missing required field ${claimKey}`)
//             process.exit(1)
//         } else {
//             logger.warn(`Missing Optional field ${claimKey}`)
//         }
//     }
// })

//runNatsController();

type ActiveMailing = {
    mailingName: string;
}

const mailingInfo: ActiveMailing[] = [
    {
        mailingName: 'Test Mailing 1',
    },
    {
        mailingName: 'Test Mailing 2',
    },
    {
        mailingName: 'Test Mailing 3',
    },
    {
        mailingName: 'Test Mailing 400',
    },
    {
        mailingName: 'Test Mailing 5',
    },
]

const ids: string[] = []
for (let i = 0; i < 10000; i++) {
    ids.push(crypto.randomUUID())
}

const nc = await connect({
    servers: "ws://127.0.0.1:4222",
    user: "admin",
    pass: "admin",
})

const jsm = await nc.jetstreamManager();
jsm.streams.add({ name: 'mailing', subjects: ['active.*'] })

const js = nc.jetstream();


let timerId = setTimeout(async function tick() {
    console.log(1)
    await js.publish('active.example', JSONCodec().encode(ids.splice(0, 64)));
    if (ids.length > 0) {
        timerId = setTimeout(tick, 500)
    }

}, 500)


const opts = consumerOpts();
opts.durable("example");
opts.manualAck();
opts.ackExplicit();
opts.deliverTo(createInbox());
const sub = await js.subscribe('mailing.*', opts);

console.log(`Received message: ${sub.getProcessed()}`);
for await (const m of sub) {

    console.log(`Received message: ${m.data}`);
    m.ack();
}

// const sub1 = await js.subscribe('mailing.*', opts);

// for await (const m of sub) {
//     console.log(`Received message: ${m.data}`);
//     m.ack();
// }


