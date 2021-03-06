const core = require('@actions/core');
const exec = require('@actions/exec');
const artifact = require('@actions/artifact');
const glob = require('@actions/glob');

async function run() {
    try {
        await exec.exec('chmod +x gradlew');

        const gradleArguments = core.getInput('arguments', { required: true }).replace(/\n/g, " ");
        await exec.exec(`./gradlew --no-daemon --stacktrace ${gradleArguments}`);

        const artifacts = core.getInput("artifacts")
        if (artifacts) {
            const artifactClient = artifact.create()
            const artifactUploadOptions = {
                continueOnError: false
            }
            for (const artifact of artifacts.split("\n")) {
                const artifactDeclaration = artifact.split(" ", 2);
                const artifactName = artifactDeclaration[0];
                const artifactPathGlobber = await glob.create(artifactDeclaration[1]);
                const artifactPath = await artifactPathGlobber.glob()
                await artifactClient.uploadArtifact(artifactName, artifactPath, '.', artifactUploadOptions)
            }
        }

    } catch (error) {
      core.setFailed(error.message);
    }
}

run()
