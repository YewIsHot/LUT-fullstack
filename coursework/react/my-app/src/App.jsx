import { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([
    {
      id: 0,
      text: "yep1 lmao",
      date: "morgen 5th",
      reminder: true
    },
    {
      id: 1,
      text: "yep2 kek",
      date: "gestern 5th",
      reminder: false
    }
  ])

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length }])
  }

  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router>
      <div className="App container">
        <Header onButtonClick={toggleShowAddTask} />
        <Routes>
          <Route path="/" element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Display'}
            </>
          }></Route>
          <Route path="/about" Component={About} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
