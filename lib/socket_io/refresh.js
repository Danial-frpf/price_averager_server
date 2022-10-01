const refresh = (socket) => {
    // Signals web socket
    const SOCKET_REFRESH = "refresh";

    socket.on(SOCKET_REFRESH, (response) => {});
};
export default refresh;
