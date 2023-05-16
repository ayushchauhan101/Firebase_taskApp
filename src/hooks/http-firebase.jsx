import { useState, useCallback } from "react"

function useHttp(applyData) {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const sendRequest = useCallback(async (requestConfig) => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await fetch(
				// dynamic url and method configuration depending upon props sent by each component
				// built to be re-usable for various requests like GET, POST etc.
				requestConfig.url,
				{
                    // only append to the request if not empty i.e while fetching
					method: requestConfig.method ? requestConfig.method : "GET",
					headers: requestConfig.headers ? requestConfig.headers : {},
					body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
				}
			)

			if (!response.ok) {
				throw new Error("Request failed!")
			}

			const data = await response.json()
			// appending the response data from the url to received applyData
			applyData(data)
		} catch (err) {
			setError(err.message || "Something went wrong!")
		}
		setIsLoading(false)
	}, [applyData])

	return {
		isLoading,
		error,
		sendRequest,
	}
}

export default useHttp
