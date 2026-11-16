// Q7: The Lazy Loader - Promise.allSettled

function loadProfile() { return new Promise(r => setTimeout(() => r("Profile Loaded"), 2000)); }
function loadPosts() { return new Promise(r => setTimeout(() => r("Posts Loaded"), 1500)); }
function loadMessages() { return new Promise(r => setTimeout(() => r("Messages Loaded"), 1000)); }

// Wraps a loader so it rejects when shouldFail is true (after the loader finishes)
function withFailure(loader, moduleName, shouldFail) {
  return loader().then((result) => {
    if (shouldFail) {
      throw new Error(`${moduleName} failed to load`);
    }
    return result;
  });
}

async function loadDashboard() {
  const startTime = Date.now();

  // Randomly pick ONE module (0, 1 or 2) to reject
  const failingIndex = Math.floor(Math.random() * 3);
  const modules = [
    { name: "Profile", loader: loadProfile },
    { name: "Posts", loader: loadPosts },
    { name: "Messages", loader: loadMessages },
  ];

  // All three start at the same time (in parallel)
  const results = await Promise.allSettled(
    modules.map((module, index) => withFailure(module.loader, module.name, index === failingIndex))
  );

  // allSettled never rejects; each result has status "fulfilled" or "rejected"
  results.forEach((result, index) => {
    const name = modules[index].name;
    if (result.status === "fulfilled") {
      console.log(`SUCCESS: ${name} -> ${result.value}`);
    } else {
      console.log(`FAILED : ${name} -> ${result.reason.message}`);
    }
  });

  const totalTime = Date.now() - startTime;
  // Total is about 2000 ms (the slowest module), not 4500 ms, because they run in parallel
  console.log(`Total time taken: ${totalTime} ms`);
}

loadDashboard();
