import React from "react";

export function Home() {
  console.log(process.env.APPSETTING_apikey);

  return (
    <div>
      <h1>Home</h1>;
      <img src="https://gravengerv2.blob.core.windows.net/photos/1/25f300a1-cd45-4fbb-a27a-9a04f6195236.png" />
    </div>
  );
}
