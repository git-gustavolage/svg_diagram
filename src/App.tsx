import React from "react";

import { ViewportContainer } from "./view/ViewportContainer";

const App: React.FC = () => {

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <ViewportContainer />
    </div>
  );
};

export default App;
