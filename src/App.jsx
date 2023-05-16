import React, { useEffect, useState } from "react"
import useHttp from "./hooks/http-firebase"

import Tasks from "./components/Tasks/Tasks"
import NewTask from "./components/NewTask/NewTask"

function App() {
	const [tasks, setTasks] = useState([])

	const { isLoading, error, sendRequest: fetchTasks } = useHttp()

	useEffect(() => {
		const transformTask = (taskObj) => {
			const loadedTasks = []

			for (const taskKey in taskObj) {
				loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text })
			}

			setTasks(loadedTasks)
		}

		fetchTasks(
			{
				url: "https://http-react-95db4-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
			},
			transformTask
		)
	}, [fetchTasks])

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task))
	}

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	)
}

export default App
