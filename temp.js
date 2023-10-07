const start = performance.now();

const async1 = () =>
  new Promise((res) => {
    setTimeout(() => {
      res("async1");
    }, 2000);
  }).then(() => {
    console.log("Waited for 2 seconds");
  });

const async2 = () =>
  new Promise((res) => {
    setTimeout(() => {
      res("async2");
    }, 5000);
  }).then(() => {
    console.log("Waited for 5 seconds");
  });

const fn = () =>
  new Promise((resolve) => {
    // async1();
    // async2();
    Promise.all([async1(), async2()]).then((data) => {
      console.log(data);
      resolve();
    });
  });

fn().then(() => {
  const stop = performance.now();
  console.log("Total time taken: ", (stop - start) / 1000, "s");
});

// 2 + 5 = 7
// 5
