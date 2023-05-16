import { useState } from "react"

function useHttp(requestConfig, applyData) {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const sendRequest = async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await fetch(
				// dynamic url and method configuration depending upon props sent by each component
				// built to be re-usable for various requests like GET, POST etc.
				requestConfig.url,
				{
					method: requestConfig.method,
					headers: requestConfig.headers,
					body: JSON.stringify(requestConfig.body),
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
	}

	return {
		isLoading,
		error,
		sendRequest,
	}
}

export default useHttp
