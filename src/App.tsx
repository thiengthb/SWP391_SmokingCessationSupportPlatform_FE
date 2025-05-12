import { useState } from "react"
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      Hello world
      <Button 
        variant='outline'
        onClick={() => setCount(count + 1)}
      >
        {count}
      </Button>
    </div>
  )
}

export default App
