import './App.css';
import { createClient } from '@supabase/supabase-js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { useEffect, useState } from 'react';

const supabase = createClient(
  "https://ymokzuaongfyszmrjnoo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltb2t6dWFvbmdmeXN6bXJqbm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyMjYwOTMsImV4cCI6MjAzODgwMjA5M30.gW-Y1oYxZZelXmj68aTvw3C3v-amySRSlMYZIV1f3a8"
);

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  async function updateTodo(todo) {
    await supabase
      .from("todos")
      .update({ done: !todo.done })
      .eq("id", todo.id);
    await getTodos();
  }
  
  async function createTodo() {
    await supabase.from("todos").insert({ title: text });
    setText("");  // Ekleme işlemi sonrasında input'u temizlemek için
    await getTodos();
  }
  
  async function getTodos() {
    const { data } = await supabase.from("todos").select().order("id");
    setTodos(data);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <input 
        value={text}
        className='m-3'
        placeholder='Başlığı giriniz'
        onChange={(e) => setText(e.target.value)} 
      />

      <button 
        className="bg-primary rounded m-3"
        onClick={createTodo}>
        Ekle
      </button>

      {todos.map((todo) => (
        <div key={todo.id} className="m-3">
          <input 
            className="form-check-input" 
            type="checkbox" 
            checked={todo.done}
            onChange={() => updateTodo(todo)}
          />
          {todo.title}
        </div>
      ))}
    </>
  );
}

export default App;
