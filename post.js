const core = require('@actions/core');
const cache = require('@actions/cache');

async function run() {
    try {
        const gradleDistributionCacheKeyToSave = core.getState('gradleDistributionCacheKeyToSave');
        if (gradleDistributionCacheKeyToSave) {
            const gradleDistributionCachePaths = ['~/.gradle/wrapper/dists']
            await cache.saveCache(gradleDistributionCachePaths, gradleDistributionCacheKeyToSave);
        } else {
            core.info('cache hit for gradle-distribution, not saving cache.')
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
