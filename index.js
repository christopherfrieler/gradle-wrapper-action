const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    try {
        await exec.exec('chmod +x gradlew');

        const gradleArguments = core.getInput('arguments', { required: true }).replace(/\n/g, " ");
        await exec.exec(`./gradlew --no-daemon --stacktrace ${gradleArguments}`);

    } catch (error) {
      core.setFailed(error.message);
    }
}

run()
