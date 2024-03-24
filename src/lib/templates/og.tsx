export default ({ title = "Welcome" }: { title: string }) => {
  return (
    <div
      style={{
        background: "#fefbfb",
        backgroundColor: "#fdfbfb",
        backgroundImage: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "100%",
            maxHeight: "100%",
            overflow: "hidden",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 554 554"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="#21201c"
                d="M277 554C429.983 554 554 429.983 554 277C554 124.017 429.983 0 277 0C124.017 0 0 124.017 0 277C0 429.983 124.017 554 277 554ZM443.298 348.179C452.344 325.613 457 301.426 457 277H439C439 298.983 434.81 320.751 426.668 341.061C418.527 361.371 406.594 379.825 391.551 395.37C376.508 410.914 358.649 423.245 338.995 431.657C319.34 440.07 298.274 444.4 277 444.4C255.726 444.4 234.66 440.07 215.005 431.657C195.351 423.245 177.492 410.914 162.449 395.37C147.406 379.825 135.473 361.371 127.332 341.061C119.19 320.751 115 298.983 115 277H97C97 301.426 101.656 325.613 110.702 348.179C119.748 370.746 133.006 391.25 149.721 408.522C166.435 425.794 186.278 439.494 208.117 448.842C229.956 458.189 253.362 463 277 463C300.638 463 324.044 458.189 345.883 448.842C367.722 439.494 387.565 425.794 404.279 408.522C420.994 391.25 434.252 370.746 443.298 348.179Z"
              ></path>
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 40,
                color: "#64645e",
                lineHeight: "30px",
                marginBottom: "10px",
              }}
            >
              vorillaz.com
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: "bold",
                lineHeight: "75px",
                color: "#21201c",
              }}
            >
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
