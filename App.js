import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTask(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // Fetch Tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      // post tasks to js server so that it became permanent, not lost when reload
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTask([...tasks, data]);
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      // delete task from js server db
      method: "DELETE",
    });
    setTask(tasks.filter((task) => task.id !== id));
  };

  // toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {
      ...taskToToggle,
      // change reminder attribute to the opposite for its current,
      // from true to false and vice versa
      reminder: !taskToToggle.reminder,
    };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTask(
      tasks.map((task) =>
      // if task id == id then set task to all the task attribute but change the db data of reminder, 
      //else return the task
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    /* The Router component is used to wrap your entire application and define the router's behavior. It allows you to specify the type of routing you want to use, such as hash routing or browser routing, and provide any necessary configuration options.

The Route component is used to define a single route in your application. It specifies the path of the route, the component that should be rendered when the route is matched, and any optional props that should be passed to the component.

The Routes component is used to define multiple routes in your application. It allows you to define a set of nested Route components, each with their own path and component, and define how those routes should be rendered.

The main difference between these components is the level of precision they provide when defining routes. The Router component is used to define the overall behavior of the router, while the Route and Routes components are used to define individual routes within your application. */
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Task!"
                )}
              </>
            }
          />
          {<Route path="/about" element={<About />} />}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
