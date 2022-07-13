import * as React from "react";

function Home() {
  return (
    <div>
      <div class="body">
        <div class="container">
          <h2 style={{ paddingBottom: "8%" }}>Interesting Tagline of TPAT</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <div style={{ paddingTop: "5%" }}>
            <a
              style={{
                border: "2px solid #E26C40",
                padding: "2.5%",
                color: "#E26C40",
                borderRadius: "15%",
                textDecoration: "none",
              }}
              href="try-it-yourself"
            >
              Try It Yourself
            </a>
          </div>
        </div>
      </div>
      <h2 class="subtitle">Service that TPAT provide/categories</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div class="secondContainer">
          <div class="row">
            <div class="column">
              <img src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png" />

              <h1 style={{ paddingTop: "5%" }}>Category 1</h1>
              <p style={{ paddingTop: "5%" }}>
                Description on the category 1, or things/services that you
                provide
              </p>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <img src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png" />

              <h1 style={{ paddingTop: "5%" }}>Category 2</h1>
              <p style={{ paddingTop: "5%" }}>
                Description on the category 2, or things/services that you
                provide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
