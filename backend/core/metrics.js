import client from "prom-client"

client.collectDefaultMetrics(); //CPU memory, event loop

export const webhooksTotal = new client.Counter({
    name: "kronos_webhooks_total",
    help: "Github webhooks received",
    labelNames: ["result"],
})


export {client};