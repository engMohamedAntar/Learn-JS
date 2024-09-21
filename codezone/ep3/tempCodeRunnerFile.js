fetch("https://google.com").then(() => {
    console.log("End of request ms ",performance.now()-start);
});