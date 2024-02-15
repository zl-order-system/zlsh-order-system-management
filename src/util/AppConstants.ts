const prod = process.env.ORDER_SYSTEM_PROD;

export default () => {
    if (prod) return {
        backendHost: "https://order-system.octoberserver.net"
    }
    else return {
        backendHost: "https://staging.order-system.octoberserver.net"
    }
}
