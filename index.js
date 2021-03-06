const core = require('@actions/core');

async function run() {
    try {
        console.log(`TODO: perform action`);
    } catch (error) {
      core.setFailed(error.message);
    }
}

run()
