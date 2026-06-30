export function handleUnauthorized(response) {

    if (response.status === 401 || response.status === 403) {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login?expired=true";
        throw new Error("Unauthorized");
    }

    return response;
}