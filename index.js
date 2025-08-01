const core = require('@actions/core');
const exec = require('@actions/exec');
const cache = require('@actions/cache');
const artifact = require('@actions/artifact');
const glob = require('@actions/glob');

async function run() {
    try {
        const gradleDistributionCacheKey = core.getInput('gradle_dist_cache_key', { required: true })
        const gradleDistributionCachePaths = ['~/.gradle/wrapper/dists']
        const restoredGradleDistributionCacheKey = await cache.restoreCache(gradleDistributionCachePaths, gradleDistributionCacheKey);
        if (restoredGradleDistributionCacheKey !== gradleDistributionCacheKey) {
            core.saveState('gradleDistributionCacheKeyToSave', gradleDistributionCacheKey);
        }

        const gradleDependenciesCacheKey = core.getInput('gradle_deps_cache_key', { required: true })
        const gradleDependenciesRestoreCacheKeys = ['gradle-deps-']
        const gradleDependenciesCachePaths = ['~/.gradle/caches/modules-2']
        const restoredGradleDependenciesCacheKey = await cache.restoreCache(gradleDependenciesCachePaths, gradleDependenciesCacheKey, gradleDependenciesRestoreCacheKeys);
        if (restoredGradleDependenciesCacheKey !== gradleDependenciesCacheKey) {
            core.saveState('gradleDependenciesCacheKeyToSave', gradleDependenciesCacheKey);
        }

        await exec.exec('chmod +x gradlew');

        try {
            const gradleArguments = core.getInput('arguments', { required: true }).replace(/\n/g, " ");
            await exec.exec(`./gradlew --no-daemon --stacktrace ${gradleArguments}`);
        } finally {
            const artifacts = core.getInput("artifacts")
            if (artifacts) {
                const artifactClient = artifact.default
                for (const artifact of artifacts.split("\n")) {
                    const artifactDeclaration = artifact.split(" ");
                    const artifactName = artifactDeclaration[0];
                    const artifactPathGlobber = await glob.create(artifactDeclaration.slice(1).join("\n"));
                    const artifactPath = await artifactPathGlobber.glob()
                    await artifactClient.uploadArtifact(artifactName, artifactPath, '.', {})
                }
            }
        }

    } catch (error) {
      core.setFailed(error.message);
    }
}

run()
