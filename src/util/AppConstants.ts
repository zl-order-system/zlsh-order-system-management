const staging = true;


export default () => {
    if (staging)
        return {
            backendHost: "https://staging.order-system.octoberserver.net"
        }
    else
        return {
            backendHost: ""
        }
}
