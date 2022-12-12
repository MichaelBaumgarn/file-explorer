import { ChakraProvider } from "@chakra-ui/react";
import { FileExplorer } from "./components/FileExplorer";
import { mockFiles } from "./mockFiles";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <FileExplorer initialFolders={mockFiles} />
      </ChakraProvider>
    </div>
  );
}

export default App;
