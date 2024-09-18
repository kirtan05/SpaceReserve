import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import {  BaseProvider, styled, DarkTheme } from "baseui";
import { Home } from "./Home";
const engine = new Styletron();

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export default function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <Centered>
        <div className="flex justify-center items-center h-screen bg-gray-800">
         <Home/>
         </div>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}