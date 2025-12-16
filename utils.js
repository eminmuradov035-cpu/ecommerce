export const refreshTokens = async (callback) => {
    try {
        const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken")
        const res = await fetch("https://ilkinibadov.com/api/v1/auth/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                refreshToken
            })
        })

        if (res.ok) {
            const data = await res.json()
            localStorage.setItem("accessToken", data.accessToken)
            sessionStorage.setItem("accessToken", data.accessToken)
            callback()
        }
    } catch (error) {
        console.error(error)
    }
}